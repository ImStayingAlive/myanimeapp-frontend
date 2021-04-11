import {makeAutoObservable} from "mobx";
import {RoomModel, roomService, CommandRegistry } from "../../PlayerFacade";
import {userStore} from "../../../auth/AuthFacade";

class RoomStore {

    // Room Data
    room: RoomModel
    ownerTime: number
    usersLoaded: number = 0

    // Local User Driven States
    loaded: boolean = false
    playing: boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    openConnection(roomName: any, callback: Function) {
       roomService.findRoom(roomName, (response) => {
           if (!response) {
                callback(false)
           } else {
               this.room = response
               this.loaded = true
               roomService.connect(userStore.user, this.room.name, (message) => {
                   CommandRegistry(message.data)
               })
               callback(true)
           }
       })
    }

    refreshRoom(callback) {
        roomService.findRoom(this.room.name, (room) => {
            this.room = room
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
        this.room = undefined
        this.loaded = false
        this.ownerTime = undefined
        this.usersLoaded = 0
        this.playing = false
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

    getCurrentSeason() {
        if (this.room.roomShow.show.seasons[this.room.roomShow.seasonIndex] !== undefined) {
            return this.room.roomShow.show.seasons[this.room.roomShow.seasonIndex]
        }

        return this.room.roomShow.show.seasons[0]
    }

    getOwner() {
        return this.room.owner.user
    }
}

const roomStore = new RoomStore()

export default roomStore