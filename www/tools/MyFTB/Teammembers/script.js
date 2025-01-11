"use strict";

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