import timeStampUtil from "../../../../../../utils/TimeStampUtil";
import {roomStore} from "../../../../../../room/RoomFacade";

const PlayerEventHandler = (player) => {

    player.on("progress", () => {
        if (player.bufferedEnd() - player.currentTime() > 5) {
            if (roomStore.buffering) {
                roomStore.setBuffering(false)
            }
        } else {
            if (!roomStore.buffering) {
                roomStore.setBuffering(true)
            }
        }
    })

    // Check if Player is at the end
    // And start the next episode timer
    player.on("timeupdate", () => {
        if (player.currentTime() > 2) {
            let modularTime = Math.round(player.currentTime() % 5);
            if (modularTime === 0) {
                if (timeStampUtil.isAvailable("playerTimeUpdate")) {
                    //console.log("Update")
                    timeStampUtil.setTimeStamp("playerTimeUpdate", 1000 * 2)
                }
            }
        }
    })

}

export default PlayerEventHandler