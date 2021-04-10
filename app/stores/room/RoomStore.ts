import {makeAutoObservable} from "mobx";
import Room from "../../interfaces/room/Room";
import roomService from "../../service/RoomService";
import userStore from "../UserStore";
import {toast} from "react-toastify";
import CommandService from "../../service/CommandService";

class RoomStore {

    // Room Data
    room: Room
    ownerTime: number
    usersLoaded: number = 0

    // Local User Driven States
    loaded: boolean = false
    playing: boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    openConnection(roomName: string) {
       roomService.findRoom(roomName, (room) => {
           this.room = room
           this.loaded = true
           roomService.connect(userStore.user, this.room.name, (message) => {
                CommandService(message.data)
           })
       })
    }

    disconnect() {
        roomService.disconnect()
        this.reset()
    }

    reset() {
        this.room = undefined
        this.loaded = false
        this.ownerTime = undefined
        this.usersLoaded = 0
        this.playing = false
    }
}

const roomStore = new RoomStore()

export default roomStore