import User from "../User";
import RoomShow from "./RoomShow";

interface Room {

    name: string
    owner: User
    isOwnerConnected: boolean
    users: Array<User>

    lastPersonTimestamp: number
    roomShow: RoomShow
    running: boolean
}

export default Room