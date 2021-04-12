import {roomService, roomStore} from "../RoomFacade";
import {userStore} from "../../auth/AuthFacade";
import { makeAutoObservable } from "mobx";

class PlayerController {

    player;

    constructor() {
        makeAutoObservable(this)
    }

    setPlayer(player) {
        this.player = player
        this.playVideo()
    }

    playVideo() {
        try {
            if (this.player.paused()) {
                this.player.play()
            }
        }catch(exception) {
        }
    }

    pauseVideo() {
        try {
            if (!this.player.paused()) {
                this.player.pause()
            }
        }catch(exception) {
        }
    }

    setTime(seconds) {
        this.player.currentTime(seconds)
        this.player.play()
        if (roomStore.getOwner().name === userStore.user.name) {
            roomService.updateTime(roomStore.room.name, seconds)
        }
    }
}

const playerController = new PlayerController()
export {playerController}
