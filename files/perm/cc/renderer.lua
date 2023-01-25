peripheral.find("modem").open(25890)

while true do
    msg = {os.pullEvent("modem_message")}
    term.clear()
    term.setCursorPos(1, 1)
    if msg[5]["sender"] == "ECoreManager" then
        print("Stored Energy: " .. msg[5]["energyStored"] .. "rf")
        print("Energy Capacity: " .. msg[5]["maxEnergyStored"] .. "rf")
        print("Current Transfer: " .. msg[5]["transferPerTick"] .. "rf/t")
    end
end