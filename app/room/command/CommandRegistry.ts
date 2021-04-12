import {toast} from "react-toastify";
import {userStore} from "../../auth/AuthFacade"
import {roomStore} from "../RoomFacade"
import Command from "./Command";

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

commands.push(new Command("renderRoom", () => {
    roomStore.refreshRoom(() => {})
}))

commands.push(new Command("buffering", () => {
    roomStore.addBufferingUser()
}))

commands.push(new Command("finishedBuffering", () => {
    roomStore.removeBufferingUser()
}))

commands.push((new Command("beginPlayback", () => {
    if (!roomStore.playing) {
        roomStore.playVideo()
    }
})))

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