import {makeAutoObservable} from "mobx";
import {RoomModel, roomService, CommandRegistry } from "../RoomFacade";
import {userStore} from "../../auth/AuthFacade";
import {runInAction} from "mobx"

class RoomStore {

    // Room Data
    room: RoomModel
    ownerTime: number
    buffering: boolean = true
    readyPlay: boolean = true

    // Local User Driven States
    loaded: boolean = false
    playing: boolean = false
    bufferingUsers: number = 0

    // Episode Popup Settings
    popupOpen: boolean = false
    popupSelectedSeason: number = 0
    dropDownOpen: boolean = false


    constructor() {
        makeAutoObservable(this)
    }

    openConnection(roomName: any, callback: Function) {
       roomService.findRoom(roomName, (response) => {
           if (!response) {
                callback(false)
           } else {
               runInAction(() => {
                   this.room = response
                   this.loaded = true
               })
               roomService.connect(userStore.user, this.room.name, (message) => {
                   CommandRegistry(message.data)
               })
               callback(true)
           }
       })
    }

    refreshRoom(callback) {
        roomService.findRoom(this.room.name, (room) => {
            runInAction(() => {
                this.room = room
            })
            if (callback) {
                callback(callback)
            }
        })
    }

    disconnect() {
        if (this.loaded) {
            roomService.disconnect()
        }
        this.reset()
    }

    reset() {
        runInAction(() => {
            this.room = undefined
            this.loaded = false
            this.ownerTime = undefined
            this.playing = false
            this.popupOpen = false
            this.popupSelectedSeason = 0
            this.dropDownOpen = false
        })
    }

    getShowInfo() {
        return this.room.roomShow.show
    }

    getCurrentEpisode() {
        if (this.room.roomShow.show.seasons[this.room.roomShow.seasonIndex].episodes[this.room.roomShow.episodeIndex] !== undefined) {
            return this.room.roomShow.show.seasons[this.room.roomShow.seasonIndex].episodes[this.room.roomShow.episodeIndex]
        }

        return this.room.roomShow.show.seasons[0].episodes[0]
    }

    getVideoType() {
        if (this.getCurrentEpisode().videoSource.endsWith(".m3u8")) {
            return 'application/x-mpegURL'
        }

        return 'video/mp4'
    }

    getCurrentSeason() {
        if (this.room.roomShow.show.seasons[this.room.roomShow.seasonIndex] !== undefined) {
            return this.room.roomShow.show.seasons[this.room.roomShow.seasonIndex]
        }

        return this.room.roomShow.show.seasons[0]
    }

    getOwner() {
        return this.room.owner.user
    }

    setEpisode(seasonIndex: number, episodeIndex: number) {
        roomService.updateEpisode(this.room.name, seasonIndex, episodeIndex, () => {
        })
    }

    toggleEpisodePopup() {
        runInAction(() => {
            this.popupOpen = !this.popupOpen
            this.dropDownOpen = false
        })
    }

    toggleEpisodeDropdown() {
        runInAction(() => {
            this.dropDownOpen = !this.dropDownOpen
        })
    }

    setPopupSeason(seasonIndex: number) {
        runInAction(() => {
            this.popupSelectedSeason = seasonIndex
        })
    }

    playVideo() {
        if (userStore.user.name === this.getOwner().name) {
            roomService.setIsRunning(this.room.name, true)
            roomService.sendMessage("beginPlayback")
            runInAction(() => {
                this.playing = true
            })
            return;
        }

        if (this.room.running) {
            runInAction(() => {
                this.playing = true
            })
        }
    }

    setBuffering(status: boolean) {
        runInAction(() => {
            this.buffering = status
        })

        if (status) {
            console.log("SET")
            roomService.sendMessage("buffering")
        } else {
            roomService.sendMessage("finishedBuffering")
        }
    }

    addBufferingUser() {
        runInAction(() => {
            this.bufferingUsers++
        })
        this.checkBufferingUsers()
        console.log("Add"  + this.bufferingUsers)
    }

    removeBufferingUser() {
        if (this.bufferingUsers > 0) {
            runInAction(() => {
                this.bufferingUsers--
            })
        }
        this.checkBufferingUsers()
        console.log("Remove" + this.bufferingUsers)
    }

    checkBufferingUsers() {
        let ready: boolean = true
        if (this.bufferingUsers !== 0) {
            ready = false
        }

        runInAction(() => {
            this.readyPlay = ready
        })
    }
}

const roomStore = new RoomStore()

export default roomStore