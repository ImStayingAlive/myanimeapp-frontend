import CommandModel from "./Command";
import {toast} from "react-toastify";
import roomStore from "../store/RoomStore";
import userStore from "../../../auth/user/store/UserStore";

let commands: Array<CommandModel> = []

commands.push(new CommandModel("RoomJoined: ", (result) => {
    if (userStore.user.name !== result) {
        toast.success(result + " joined the room.")
    }
    roomStore.refreshRoom(() => {})
}))

commands.push(new CommandModel("RoomLeave: ", (result) => {
    if (userStore.user.name !== result) {
        toast.error(result + " left the room.")
    }
    roomStore.refreshRoom(() => {})
}))

const CommandRegistry = (message: String) => {
    console.log(message)

    commands.map((command) => {
        if (message.startsWith(command.name)) {
            let result = message.replace(command.name, "")
            command.onCommand(result)
        }
    })
}

export default CommandRegistry