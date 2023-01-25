term.clear()
term.setCursorPos(1, 1)
local modem = peripheral.find("modem")
local core = peripheral.find("draconic_rf_storage")

if core == nil and modem == nil then
    print("You need to connect a wireless modem and the desconic core first")
    return
end

local data = {}
data["sender"] = "ECoreManager"
while true do
    data["energyStored"] = core.getEnergyStored()
    data["maxEnergyStored"] = core.getMaxEnergyStored()
    data["transferPerTick"] = core.getTransferPerTick()
    modem.transmit(25890, 25890, data)
    os.sleep(0.5)
end
