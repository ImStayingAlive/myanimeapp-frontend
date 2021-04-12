import timeStampUtil from "../../../../../../utils/TimeStampUtil";
import {playerController, roomService, roomStore} from "../../../../../../room/RoomFacade";
import {userStore} from "../../../../../../auth/AuthFacade";

const PlayerEventHandler = (player) => {

    player.on("loadeddata", () => {
        roomStore.setBuffering(false)
        roomStore.setPlayerLoaded(true)
        playerController.setTime(roomStore.room.roomShow.currentTime)
    })

    player.on("progress", () => {
        if (player.bufferedEnd() - player.currentTime() > 2) {
            if (roomStore.buffering) {
                roomStore.setBuffering(false)
            }
        } else {
            if (!roomStore.buffering) {
                roomStore.setBuffering(true)
            }
        }
    })

    player.on("seeking", () => {
        if (timeStampUtil.isAvailable("playerSkip")) {
            roomService.sendMessage("Skip: " + Math.round(player.currentTime()) + "/User:" + userStore.user.name)
        }
    })

    player.on("play", () => {
        if (timeStampUtil.isAvailable("playing")) {
            setTimeout(() => {
                if (!player.paused()) {
                    roomService.sendMessage("Playing/User: " + userStore.user.name)
                    timeStampUtil.setTimeStamp("playing", 800)
                }
            }, 300)
        }
    })

    player.on("pause", () => {
        if (timeStampUtil.isAvailable("paused")) {
            setTimeout(() => {
                if (player.paused()) {
                    roomService.sendMessage("Paused/User: " + userStore.user.name)
                    timeStampUtil.setTimeStamp("paused", 800)
                }
            }, 300)
        }
    })

    if (userStore.user.name === roomStore.getOwner().name) {
        player.on("timeupdate", () => {
            if (player.currentTime() > 2) {
                let modularTime = Math.round(player.currentTime() % 2);
                if (modularTime === 0) {
                    if (timeStampUtil.isAvailable("playerTimeUpdate")) {
                        roomService.updateTime(roomStore.room.name, Math.round(player.currentTime()))
                        timeStampUtil.setTimeStamp("playerTimeUpdate", 1000 * 2)
                    }
                }
            }
        })
    }

    /* Event Listeners */
    document.querySelectorAll('#skipIntro').forEach(function (element) {
        element.addEventListener("click", () => player.currentTime(roomStore.getCurrentEpisode().introStart + roomStore.getCurrentEpisode().introLength))
    });

    document.querySelectorAll('#nextEpisode').forEach(function (element) {
        element.addEventListener("click", () => roomStore.loadNextEpisode())
    });
}

export default PlayerEventHandler