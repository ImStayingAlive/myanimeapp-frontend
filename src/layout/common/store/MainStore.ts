import {makeAutoObservable} from "mobx";

class MainStore {

    loaded: boolean = false
    seo: {
        title: "MyAnimeApp"
    }

    constructor() {
        makeAutoObservable(this)
    }

    setLoaded (status: boolean) {
        this.loaded = status
    }
}

const mainStore = new MainStore()
export default mainStore