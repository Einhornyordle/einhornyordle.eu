local data = {}
local modem = peripheral.find("modem")

if modem then
    modem.open(25890)
else
    term.setTextColor(16384)
    print("Error 404: Modem not found")
    term.setTextColor(1)
    return
end

local screen = {}
local line = 0
local linemap = {}

function printLanding()
    line = 0
    linemap = {}
    for type, members in pairs(data) do
        print(type)
        line = line + 1
        for name, memberdata in pairs(members) do
            print("  " .. name)
            line = line + 1
            linemap[line] = {
                type = type,
                name = name
            }
        end
    end
end

function printEcore(ecore)
    print(ecore["name"])
    print()
    print()
    print("Stored Energy: " .. ecore["energyStored"] .. " rf")
    print()
    print("Energy Capacity: " .. ecore["maxEnergyStored"] .. " rf")
    print()
    print("Current Transfer: " .. ecore["transferPerTick"] .. " rf/t")
end

function printMiner(miner)
    print(miner["name"])
    print()
    print("Blocks broken: " .. miner["broken"])
end

while true do
    msg = {os.pullEvent()}
    if msg[1] == "modem_message" then
        if msg[5]["type"] then
            if not data[msg[5]["type"]] then
                data[msg[5]["type"]] = {}
            end
            data[msg[5]["type"]][msg[5]["name"]] = msg[5];
        end
    elseif msg[1] == "mouse_click" then
        if msg[2] == 2 then
            screen = {}
        elseif linemap[msg[4]] then
            screen = linemap[msg[4]]
        end
    end

    term.clear()
    term.setCursorPos(1, 1)
    if screen["type"] then
        if screen["type"] == "ecore" then
            printEcore(data[screen["type"]][screen["name"]])
        elseif screen["type"] == "miner" then
            printMiner(data[screen["type"]][screen["name"]])
        end
    else
        printLanding()
    end
end
