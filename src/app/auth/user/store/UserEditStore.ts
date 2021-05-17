import {makeAutoObservable} from "mobx";

class UserEditStore {

    password: string
    email: string

    // Settings
    skipIntro: boolean
    autoPlay: boolean
    dontSaveWatchHistory: boolean

    constructor() {
        makeAutoObservable(this)
    }
}

const userEditStore = new UserEditStore()
export default userEditStore