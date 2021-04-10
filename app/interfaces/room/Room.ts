import RoomShow from "./RoomShow";
import RoomUser from "./RoomUser";

interface Room {

    name: string
    owner: RoomUser
    isOwnerConnected: boolean
    users: Array<RoomUser>

    lastPersonTimestamp: number
    roomShow: RoomShow
    running: boolean
}

export default Room