import {makeAutoObservable, runInAction} from "mobx";

class MainStore {

    loaded: boolean = false
    title: string = "MYAnimeApp"

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
}

const mainStore = new MainStore()
export default mainStore