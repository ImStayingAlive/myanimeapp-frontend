import {makeAutoObservable} from "mobx";
import {RoomModel, roomService, CommandRegistry, playerController} from "../RoomFacade";
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
    playerLoaded: boolean = false
    playing: boolean = false
    bufferingUsers: number = 0
    bufferingSelf: boolean = false

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

               if (!this.room.ownerConnected) {
                   roomService.setIsRunning(this.room.name, false)
               }
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
            if (userStore.user.name === this.getOwner().name) {
                roomService.sendMessage("stopPlayback")
                roomService.setIsRunning(this.room.name, false)
            }
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
            roomService.sendMessage("beginPlayback")
            roomService.setIsRunning(this.room.name, true)
        }
        this.setBuffering(true)
        this.refreshRoom(() => {
            runInAction(() => {
                this.playing = true
            })
        })
    }

    stopVideo(callback: Function = () => {}) {
        if (userStore.user.name === this.getOwner().name) {
            roomService.sendMessage("stopPlayback")
            roomService.setIsRunning(this.room.name, false)
        }

        if (this.playing) {
            runInAction(() => {
                this.playing = false
            })
        }

        this.refreshRoom(() => {
            if (callback) {
                callback(callback)
            }
        })
    }

    setBuffering(status: boolean) {
        if (status) {
            if (!this.bufferingSelf) {
                runInAction(() => {
                    this.bufferingSelf = true
                })
                if (!this.buffering) {
                    roomService.sendMessage("buffering")
                }
            }
        } else {
            runInAction(() => {
                this.bufferingSelf = false
            })
            roomService.sendMessage("finishedBuffering")
        }
        runInAction(() => {
            this.buffering = status
        })
    }

    addBufferingUser() {
        runInAction(() => {
            this.bufferingUsers++
        })
        this.checkBufferingUsers()
    }

    removeBufferingUser() {
        if (this.bufferingUsers > 0) {
            runInAction(() => {
                this.bufferingUsers--
            })
        }
        this.checkBufferingUsers()
    }

    checkBufferingUsers() {
        if (this.bufferingUsers > 0) {
            runInAction(() => {
                this.readyPlay = false
            })
            playerController.pauseVideo()
        } else {
            runInAction(() => {
                this.readyPlay = true
            })
            this.resetBuffering()
            playerController.playVideo()
        }
    }

    resetBuffering() {
        console.log("RESETING")
        runInAction(() => {
            this.buffering = false
            this.bufferingUsers = 0
        })
    }

    setPlayerLoaded(status: boolean) {
        runInAction(() => {
            this.playerLoaded = status
        })
    }

    getNextEpisode() {
        if (this.getShowInfo().seasons[this.room.roomShow.seasonIndex].episodes[this.room.roomShow.episodeIndex + 1] !== undefined) {
            return (this.getShowInfo().seasons[this.room.roomShow.seasonIndex].episodes[this.room.roomShow.episodeIndex + 1])
        } else if (this.getShowInfo().seasons[this.room.roomShow.seasonIndex + 1] !== undefined) {
            if (this.getShowInfo().seasons[this.room.roomShow.seasonIndex + 1].episodes[0] !== undefined) {
                return this.getShowInfo().seasons[this.room.roomShow.seasonIndex + 1].episodes[0]
            }
        } else {
            return false
        }
    }

    loadNextEpisode() {
        this.stopVideo()

        if (this.getShowInfo().seasons[this.room.roomShow.seasonIndex].episodes[this.room.roomShow.episodeIndex + 1] !== undefined) {
            roomService.updateEpisode(this.room.name, this.room.roomShow.seasonIndex, this.room.roomShow.episodeIndex + 1, () => {
            })
        } else if (this.getShowInfo().seasons[this.room.roomShow.seasonIndex + 1] !== undefined) {
            if (this.getShowInfo().seasons[this.room.roomShow.seasonIndex + 1].episodes[0] !== undefined) {
                roomService.updateEpisode(this.room.name, this.room.roomShow.seasonIndex + 1, 0, () => {
                })
            }
        } else {
            roomService.updateEpisode(this.room.name, 0, 0, () => {
            })
        }
    }
}

const roomStore = new RoomStore()

export default roomStore