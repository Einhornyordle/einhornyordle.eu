"use strict";

const modpacks = [
    {
        "name": "Antimatter Chemistry",
        "link": "https://myftb.de/servers/antimatter",
        "world": "2",
        "version": "1",
        "mode": "1"
    },
    {
        "name": "Better Minecraft [PLUS] - 1.18.2",
        "link": "https://myftb.de/servers/BetterMinecraft118Plus",
        "world": "0",
        "version": "2",
        "mode": "0"
    },
    {
        "name": "Direwolf20 1.12",
        "link": "https://myftb.de/servers/direwolf-112",
        "world": "0",
        "version": "1",
        "mode": "0"
    },
    {
        "name": "Direwolf20 1.7",
        "link": "https://myftb.de/servers/direwolf-17",
        "world": "0",
        "version": "0",
        "mode": "0"
    },
    {
        "name": "Divine Journey 2",
        "link": "https://myftb.de/servers/divinejourney2",
        "world": "0",
        "version": "1",
        "mode": "1"
    },
    {
        "name": "Enigmatica 2: Expert",
        "link": "https://myftb.de/servers/enigmatica-2-expert",
        "world": "0",
        "version": "1",
        "mode": "1"
    },
    {
        "name": "Feed the Factory",
        "link": "https://myftb.de/servers/feedthefactory",
        "world": "0",
        "version": "1",
        "mode": "1"
    },
    {
        "name": "GT: New Horizons",
        "link": "https://myftb.de/servers/gt-new-horizons",
        "world": "0",
        "version": "0",
        "mode": "1"
    },
    {
        "name": "Harvestblock",
        "link": "https://myftb.de/servers/harvestblock",
        "world": "1",
        "version": "1",
        "mode": "1"
    },
    {
        "name": "Infinity Avaritia",
        "link": "https://myftb.de/servers/infinity-avaritia",
        "world": "0",
        "version": "0",
        "mode": "1"
    },
    {
        "name": "Infinity Evolved",
        "link": "https://myftb.de/servers/infinity-evolved",
        "world": "0",
        "version": "0",
        "mode": "-1"
    },
    {
        "name": "Infinity Evolved Reloaded",
        "link": "https://myftb.de/servers/infinity-evolved-reloaded",
        "world": "0",
        "version": "1",
        "mode": "-1"
    },
    {
        "name": "Infinity Skyblock",
        "link": "https://myftb.de/servers/infinity-skyblock",
        "world": "1",
        "version": "0",
        "mode": "1"
    },
    {
        "name": "Life in the Woods",
        "link": "https://myftb.de/servers/life-in-the-woods",
        "world": "0",
        "version": "0",
        "mode": "0"
    },
    {
        "name": "LitW: After Humans",
        "link": "https://myftb.de/servers/litw-after-humans",
        "world": "0",
        "version": "0",
        "mode": "0"
    },
    {
        "name": "Multiblock Madness",
        "link": "https://myftb.de/servers/multiblock-madness",
        "world": "0",
        "version": "1",
        "mode": "1"
    },
    {
        "name": "Nomifactory",
        "link": "https://myftb.de/servers/nomifactory",
        "world": "0",
        "version": "1",
        "mode": "1"
    },
    {
        "name": "Regrowth",
        "link": "https://myftb.de/servers/regrowth",
        "world": "2",
        "version": "0",
        "mode": "1"
    },
    {
        "name": "Revelation",
        "link": "https://myftb.de/servers/revelation",
        "world": "0",
        "version": "1",
        "mode": "0"
    },
    {
        "name": "SkyFactory 2.5",
        "link": "https://myftb.de/servers/skyfactory-25",
        "world": "1",
        "version": "0",
        "mode": "0"
    },
    {
        "name": "SkyFactory 4",
        "link": "https://myftb.de/servers/skyfactory-4",
        "world": "1",
        "version": "1",
        "mode": "0"
    },
    {
        "name": "Staged Learning",
        "link": "https://myftb.de/servers/staged-learning",
        "world": "0",
        "version": "1",
        "mode": "1"
    },
    {
        "name": "Stoneblock 2",
        "link": "https://myftb.de/servers/stoneblock-2",
        "world": "1",
        "version": "1",
        "mode": "0"
    },
    {
        "name": "TPPI 2",
        "link": "https://myftb.de/servers/tppi2",
        "world": "0",
        "version": "0",
        "mode": "0"
    },
    {
        "name": "Ultimate Reloaded",
        "link": "https://myftb.de/servers/ultimate-reloaded",
        "world": "0",
        "version": "1",
        "mode": "0"
    },
    {
        "name": "Vault Hunters 3rd Edition",
        "link": "https://myftb.de/servers/vaulthunters3",
        "world": "0",
        "version": "2",
        "mode": "2"
    }
];

onload = function () { FillModpacklist(modpacks); };

function FillModpacklist(data) {
    let modpacklist = document.getElementById("modpacks");
    modpacklist.innerHTML = "";
    for (const modpack of data) {
        let child = document.createElement("a");
        child.innerHTML = modpack.name;
        child.href = modpack.link;
        child.target = "_blank";
        modpacklist.appendChild(child);
        modpacklist.appendChild(document.createElement("br"));
        modpacklist.appendChild(document.createElement("br"));
    }
}

function Filter() {
    FillModpacklist(modpacks.filter(modpack =>
        Array.from(document.getElementById("world").selectedOptions).map(option => option.value).includes(modpack.world) &&
        Array.from(document.getElementById("version").selectedOptions).map(option => option.value).includes(modpack.version) &&
        (modpack.mode === "-1" ? Array.from(document.getElementById("mode").selectedOptions).map(option => option.value).some(mode => mode === "0" || mode === "1") : Array.from(document.getElementById("mode").selectedOptions).map(option => option.value).includes(modpack.mode))
    ));
}