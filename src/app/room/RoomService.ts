import api from "../auth/AxiosProvider";
import { toast } from "react-toastify";
import { UserModel } from "../auth/AuthFacade";

let socketUrl = "wss://api.myanime.app/room/lobby/";

class RoomService {

    socket: WebSocket

    createRoom(user: UserModel, showName: string, callback: Function) {
        let data = {owner: user.name, show: showName}
        console.log("Sending Data...")
        api.post("/room/create", data)
            .then((response) => {
                if (response.data.success) {
                    if (callback) {
                        callback(response.data.room.name)
                    }
                }
            })
            .catch(() => {
                toast.error("The room could not be created. Please try again later!")
                if (callback) {
                    callback(false)
                }
            });
    }

    findRoom(name, callback) {
        api.get("/room/find/" + name)
            .then((response) => {
                if (response.data === "") {
                    callback(false)
                }
                callback(response.data)
        })
    }

    connect(user: UserModel, roomName: string, callback: Function) {
        if (this.socket) {
            if (this.socket.readyState === WebSocket.OPEN) {
                return;
            }
        }

        this.socket = new WebSocket(socketUrl + roomName + "/" + user.name)

        this.socket.onopen = () => {
            toast.success("You joined the room.")
        }
        this.socket.onmessage = (message) => {
            if (callback) {
                callback(message)
            }
        }

        const keepAlive = () => {
            if (this.socket !== undefined) {
                if (this.socket.readyState === WebSocket.OPEN){
                    this.sendMessage("keepAlive")
                    setTimeout(keepAlive, 30000)
                }
            }
        }
        setTimeout(keepAlive, 25000)
    }

    disconnect() {
        toast.error("You left the room.")
        this.socket.close()
        this.socket = undefined
    }

    sendMessage(message) {
        this.socket.send(message)
    }

    setIsRunning(roomName: string, running: boolean) {
        let data = {
            room: roomName,
            running: running
        }

        api.post("/room/update/running", data)
            .then((response) => {
                if (response.data.success) {

                }
            })
            .catch(() => {
                toast.error("Unexpected error occurred! Please try again.")
            });
    }

    updateTime(roomName: string, time: number) {
        let data = {
            room: roomName,
            time: time
        }

        api.post("/room/update/time", data)
            .then(() => {})
            .catch(() => {})
    }

    updateEpisode(roomName: string, seasonIndex: number, episodeIndex: number, callback: Function) {
        let data = {
            room: roomName,
            seasonIndex: seasonIndex,
            episodeIndex: episodeIndex
        }

        api.post("/room/update/episode", data)
            .then((response) => {
                if (response.data.success) {
                    this.updateTime(roomName, 0)
                    this.sendMessage("renderRoom")
                    if (callback) {
                        callback(callback)
                    }
                }
            })
            .catch(() => {
                toast.error("Unexpected error occurred! Please try again.")
            });
    }
}

const roomService = new RoomService()
export default roomService