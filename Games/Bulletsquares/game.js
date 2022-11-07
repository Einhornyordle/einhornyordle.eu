'use strict';
onload = function () {
    //Variables
    const canvas = document.getElementById('mainCanvas');
    const ctx = canvas.getContext('2d');
    const webSocket = new WebSocket('wss://einhornyordle.eu:25890');

    var cache = null;
    var keystates = [];

    function calcSize(size) {
        canvas.width
        return 100 / size;
    }

    function handleMessage(event) {
        console.debug('Message received:', event);
        var command = event.data.substring(0, event.data.indexOf(':'));
        switch (command) {
            case 'sync':
                cache = JSON.parse(event.data.substring(event.data.indexOf(':') + 1));
                redraw();
                break;
        }
    }

    function redraw() {
        canvas.height = innerHeight;
        canvas.width = innerWidth;
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        if (cache && cache.length > 0) {
            cache.forEach(player => {
                var size = canvas.width < canvas.height ? canvas.width / player.size : canvas.height / player.size;
                ctx.fillStyle = player.color;
                ctx.fillRect(canvas.width / 2 - size / 2, canvas.height / 2 - size / 2, size, size)
            });
        }
    }

    redraw();

    //Events
    webSocket.onopen = (e) => { console.info('Connection established', e); };
    webSocket.onclose = (e) => { console.warn('Connection lost', e); };
    webSocket.onerror = (e) => { console.error('Connection error', e); };
    webSocket.onmessage = handleMessage;

    this.onkeydown  = (e) => { console.debug(e.code); };
    this.onkeyup = (e) => { console.debug(e.code); };

    this.onresize = () => { redraw(); };
};
