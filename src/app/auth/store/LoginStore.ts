import {makeAutoObservable} from "mobx";

class LoginStore {

    userName: string;
    password: string;
    rememberMe: boolean;
    loading: boolean = false;

    constructor() {
        makeAutoObservable(this)
    }
}

const loginStore = new LoginStore()
export default loginStore