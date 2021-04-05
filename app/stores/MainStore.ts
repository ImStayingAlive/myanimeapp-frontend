import {makeAutoObservable} from "mobx";

class MainStore {

    loaded: boolean = false

    constructor() {
        makeAutoObservable(this)
    }

}

const mainStore = new MainStore()
export default mainStore