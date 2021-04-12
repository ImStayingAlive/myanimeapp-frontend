import {toast} from "react-toastify";
import {userStore} from "../../auth/AuthFacade"
import {playerController, roomStore} from "../RoomFacade"
import Command from "./Command";
import timeStampUtil from "../../utils/TimeStampUtil";

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

commands.push(new Command("Paused/User: ", (result) => {
    if (roomStore.playing) {
        if (result !== userStore.user.name) {
            if (timeStampUtil.isAvailable("paused")) {
                playerController.pauseVideo()
            }
        }
    }
}))

commands.push(new Command("Playing/User: ", (result) => {
    if (roomStore.playing) {
        if (result !== userStore.user.name) {
            if (timeStampUtil.isAvailable("playing")) {
                playerController.playVideo()
            }
        }
    }
}))

commands.push(new Command("Skip: ", (result) => {
    if (roomStore.playing) {
        if (timeStampUtil.isAvailable("skip")) {
            let args = result.split("/")
            let timeDif = Math.round(playerController.player.currentTime()) - args[0];
            let userName = args[1].replace("User: ", "");

            if ((timeDif > 3 || timeDif < -3) && userName !== userStore.user.name) {
                playerController.setTime(args[0])
                timeStampUtil.setTimeStamp("skip", 800)
            }
        }
    }
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