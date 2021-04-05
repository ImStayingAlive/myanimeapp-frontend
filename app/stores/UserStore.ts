import {makeAutoObservable} from "mobx";
import api from "../provider/AxiosProvider";

class UserStore {

    isLoggedIn: boolean = false
    user: object
    group: object
    watchLater: object

    constructor() {
        makeAutoObservable(this)
    }

    setIsLoggedIn(value: boolean) {
        this.isLoggedIn = value
    }

    setUser(user: object) {
        this.user = user
        // @ts-ignore
        api.defaults.headers.common["Auth"] = user.token
    }
}

const userStore = new UserStore()
export default userStore