import Command from "../interfaces/room/Command";
import {toast} from "react-toastify";

let commands: Array<Command> = []

commands.push(new Command("RoomJoined: ", (result) => {
    toast.success(result + " joined the room.")
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