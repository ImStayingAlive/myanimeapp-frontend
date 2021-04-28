import {makeAutoObservable, runInAction} from "mobx";

class MainStore {

    loaded: boolean = false
    title: string = "MYAnimeApp"
    offline: boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    setLoaded (status: boolean) {
        this.loaded = status
    }

    setTitle(title) {
        runInAction(() => {
            this.title = title
        })
    }

    setOffline(status) {
        runInAction(() => {
            this.offline = status
        })
    }
}

const mainStore = new MainStore()
export default mainStore