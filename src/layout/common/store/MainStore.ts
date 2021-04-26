import {makeAutoObservable, runInAction} from "mobx";

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

    setTitle(title) {
        runInAction(() => {
            this.seo.title = title
        })
    }
}

const mainStore = new MainStore()
export default mainStore