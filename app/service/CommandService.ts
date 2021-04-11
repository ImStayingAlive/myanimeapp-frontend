import Command from "../interfaces/room/Command";
import {toast} from "react-toastify";
import roomStore from "../stores/room/RoomStore";
import userStore from "../stores/UserStore";

let commands: Array<Command> = []

commands.push(new Command("RoomJoined: ", (result) => {
    if (userStore.user.name !== result) {
        toast.success(result + " joined the room.")
    }
    roomStore.refreshRoom(() => {})
}))

commands.push(new Command("RoomLeave: ", (result) => {
    if (userStore.user.name !== result) {
        toast.error(result + " left the room.")
    }
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