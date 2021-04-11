import { UserModel } from "../../auth/AuthFacade";
import { ShowModel } from "../../show/ShowFacade";

interface RoomModel {

    name: string
    owner: RoomUser
    ownerConnected: boolean
    users: Array<RoomUser>

    lastPersonTimestamp: number
    roomShow: RoomShow
    running: boolean
}

interface RoomUser {

    user: UserModel
}

interface RoomShow {

    show: ShowModel
    seasonIndex: number
    episodeIndex: number
    currentTime: number
}

export type {RoomModel, RoomUser, RoomShow}