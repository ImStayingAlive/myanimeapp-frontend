import Command from "../interfaces/room/Command";
import {toast} from "react-toastify";
import roomStore from "../stores/room/RoomStore";

let commands: Array<Command> = []

commands.push(new Command("RoomJoined: ", (result) => {
    toast.success(result + " joined the room.")
}))

commands.push(new Command("RoomLeave: ", (result) => {
    toast.error(result + " left the room.")
}))

commands.push(new Command("renderRoom", () => {
    roomStore.refreshRoom(() => {})
}))

const CommandService = (message: String) => {
    console.log(message)

    commands.map((command) => {
        if (message.startsWith(command.name)) {
            let result = message.replace(command.name, "")
            command.onCommand(result)
        }
    })
}

export default CommandService