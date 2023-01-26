local port = 25890
local data = {
    name = "Crystal_Miner",
    type = "miner",
    broken = 0
}
local modem = peripheral.find("modem")
while true do
    if turtle.getItemSpace() < 1 then
        if turtle.getSelectedSlot() > 15 then
            turtle.select(1)
        else
            turtle.select(turtle.getSelectedSlot() + 1)
        end
    else
        if turtle.dig() then
            data["broken"] = data["broken"] + 1
        end
    end
    if modem then
        modem.transmit(port, port, data)
    end
    term.clear()
    term.setCursorPos(1, 1)
    print(data["name"])
    print()
    print("Blocks broken: " .. data["broken"])
end
