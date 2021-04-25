import { userStore } from "../../../../../../app/auth/AuthFacade";
import {playerController, roomService, roomStore} from "../../../../../../app/room/RoomFacade";
import timeStampUtil from "../../../../../../app/utils/TimeStampUtil";
import {playerStore} from "../../../../../../app/player/PlayerFacade";
import reactions from "../../../../../../app/player/reactions/Reaction";

const PlayerEventHandler = (player) => {

    player.on("loadeddata", () => {
        roomStore.setBuffering(false)
        roomStore.setPlayerLoaded(true)
        playerController.setTime(roomStore.room.roomShow.currentTime)
        player.volume(playerStore.getVolume())
    })

    player.on("volumechange", () => {
        playerStore.setVolume(player.volume())
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

    /*-------------*
     * Add Emoji Button
     *-------------*/

    let toolbarButton = player.controlBar.addChild("button");
    let reactionIcon = toolbarButton.el();

    reactionIcon.classList.add("reaction-toolbar")

    let reactionDiv = document.createElement('div');
    reactionDiv.classList.add("reaction-div")

    reactionIcon.appendChild(reactionDiv)

    for (let i = 0; i < reactions.length; i++) {
        let currentEmoji = reactions[i]
        let emoji = document.createElement('img');
        emoji.id = currentEmoji.id
        emoji.classList.add("emojiIcon")
        emoji.src = currentEmoji.source
        reactionDiv.appendChild(emoji)
    }

    function sendEmoji(type) {
        if (timeStampUtil.isAvailable("sendEmoji")) {
            roomService.sendMessage("Emoji: " + type + "/User: " + userStore.user.name)
            timeStampUtil.setTimeStamp("sendEmoji", 2450)
        }
    }

    /* Event Listeners */
    document.querySelectorAll('#skipIntro').forEach(function (element) {
        element.addEventListener("click", () => player.currentTime(roomStore.getCurrentEpisode().introStart + roomStore.getCurrentEpisode().introLength))
    });

    document.querySelectorAll('#nextEpisode').forEach(function (element) {
        element.addEventListener("click", () => roomStore.loadNextEpisode())
    });

    document.querySelectorAll('.emojiIcon').forEach(item => {
        item.addEventListener('click', () => {
            sendEmoji(item.id)
        })
    })
}

export default PlayerEventHandler