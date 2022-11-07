while true do
    if turtle.getItemSpace() < 1 then
        if turtle.getSelectedSlot() > 15 then
            turtle.select(1)
        else
            turtle.select(turtle.getSelectedSlot() + 1)
        end
    else
        turtle.dig()
    end
end
