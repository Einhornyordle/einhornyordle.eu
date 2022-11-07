onload = () => {
    let game = {
        mainDiv: document.getElementById('mainDiv'),
        sidebarDiv: document.getElementById('sidebarDiv')
    }

    let resources = [
        {
            id: 'wood',
            name: 'Wood',
            amount: 0,
            level: 1,
            upgrade: {
                wood: 100
            }
        },
        {
            id: 'stone',
            name: 'Stone',
            amount: 0,
            level: 0,
            upgrade: {
                wood: 1000
            }
        }
    ]

    function resourceButtonClicked(param) {
        let resource = resources.find(element => element.id === param.target.id.split('Button').shift())
        document.getElementById(resource.id + 'Span').innerText = resource.amount += resource.level;
    }
    
    function redraw() {
        for (let resource of resources) {
            let element = document.createElement('button')
            element.id = resource.id + 'Button'
            element.innerText = resource.level === 0 ? '???' : resource.name
            element.onclick = resourceButtonClicked;
            mainDiv.appendChild(element)
    
            sidebarDiv.innerHTML += resource.name + ': <span id="' + resource.id + 'Span">' + resource.amount + '</span><br>'
        }
    }

    redraw();    
}
