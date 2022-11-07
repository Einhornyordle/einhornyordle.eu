local reactorNames = {"BiggerReactors_Reactor"}
local reactor = nil
for i=1, #reactorNames do
    reactor = peripheral.find(reactorNames[i])
    if reactor then
        break
    end
end

if not reactor then
    term.setTextColor(colors.red)
    print("Could not find reaktor!")
    term.setTextColor(colors.white)
    return
end

local result = 0

while true do
    term.clear()
    term.setCursorPos(1, 1)
    result = math.ceil(reactor.battery().stored() / reactor.battery().capacity() * 10000) / 100
    reactor.setAllControlRodLevels(result)
    print("Currently operating at " .. 100 - result .. "% power")
    os.sleep(2)
end
