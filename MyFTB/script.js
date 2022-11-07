"use strict";
onload = function () {
    if ('ontouchstart' in window) {
        document.getElementById("mcc").hidden = true;
        document.getElementById("mccOld").hidden = false;
    }
}

function CommandToClipboard() {
    var output = document.getElementById("output");
    output.value = "";
    for (var element of document.getElementById("mcc").firstElementChild.children) {
        if (element.children[1]) {
            output.value += element.children[1].firstElementChild.value + " ";
        }
    }
    output.value = output.value.trim();
    output.hidden = false;
    output.select();
    navigator.clipboard.writeText(output.value);
}

function Reset() {
    document.getElementById("output").value = "";
    for (var element of document.getElementById("mcc").firstElementChild.children) {
        if (element.children[1]) {
            element.children[1].firstElementChild.value = "";
        }
    }
    output.hidden = true;
}

function CommandToClipboardOld() {
    var output = document.getElementById("outputOld");
    output.value = document.getElementById("customBotcommand").value === "" && document.getElementById("botcommand").value !== "!executecommand" ? document.getElementById("botcommand").value : (document.getElementById("customBotcommand").value === "" ? document.getElementById("botcommand").value : document.getElementById("customBotcommand").value) + " " +
        (document.getElementById("customServer").value === "" ? document.getElementById("horizonsServer").hidden ? document.getElementById("adventureServer").value : document.getElementById("horizonsServer").value : document.getElementById("customServer").value) + " " +
        (document.getElementById("customCommand").value === "" ? document.getElementById("command").value : document.getElementById("customCommand").value) + " " +
        (document.getElementById("customParameter").value === "" ? document.getElementById("parameter").value : document.getElementById("customParameter").value);
    output.hidden = false;
    output.select();
    navigator.clipboard.writeText(output.value);
}

function ChangeServers(team) {
    switch (team) {
        case "adventure":
            document.getElementById("adventureServer").hidden = false;
            document.getElementById("horizonsServer").hidden = true;
            break;
        case "horizons":
            document.getElementById("adventureServer").hidden = true;
            document.getElementById("horizonsServer").hidden = false;
            break;
        default:
            break;
    }
}

var index = -1;
var commands = [];

function CreateQuestCommands() {
    var username = document.getElementById("username").value;
    var quests = document.getElementById("checkAll").value.split("\n");
    var commandList = document.getElementById("outputCommandList");

    index = -1;
    commands = [];

    for (var quest of quests) {
        var data = quest.split(" ");
        var id = -1;
        if (data.includes("[CHAT]")) {
            id = data[data.indexOf("[CHAT]") + 1];
        }
        else if (Number(quest)) {
            id = quest;
        }

        if (id != -1) {
            commandList.value += "/bq_admin complete " + id + " " + username + "\n";
            commands.push("/bq_admin complete " + id + " " + username);
        }
    }

    var command = document.getElementById("outputCommand");
    if (commands && commands.length > 0) {
        index = 0;
        command.value = commands[index];

        document.getElementById("back").hidden = false;
        document.getElementById("next").hidden = false;
        commandList.hidden = false;
    }
    command.hidden = false;
    command.select();
    navigator.clipboard.writeText(command.value);
}

function NextCommand(change) {
    if (index + change > -1 && index + change < commands.length) {
        index += change;
    }
    var command = document.getElementById("outputCommand");
    command.value = commands[index];
    command.select();
    navigator.clipboard.writeText(command.value);
}