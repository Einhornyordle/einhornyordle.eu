local data = {
    name = "Crystal_ECore_Manager",
    type = "ecore",
    energyStored = 0,
    maxEnergyStored = 0,
    transferPerTick = 0
}
local modem = peripheral.find("modem")
local core = peripheral.find("draconic_rf_storage")

if core == nil then
    term.setTextColor(16384)
    print("Error 404: Core not found")
    term.setTextColor(1)
    return
end

while true do
    data["energyStored"] = core.getEnergyStored()
    data["maxEnergyStored"] = core.getMaxEnergyStored()
    data["transferPerTick"] = core.getTransferPerTick()
    modem.transmit(25890, 25890, data)
    term.clear()
    term.setCursorPos(1, 1)
    print(data["name"])
    print()
    print()
    print("Stored Energy: " .. data["energyStored"] .. " rf")
    print()
    print("Energy Capacity: " .. data["maxEnergyStored"] .. " rf")
    print()
    print("Current Transfer: " .. data["transferPerTick"] .. " rf/t")
    os.sleep(0.5)
end
