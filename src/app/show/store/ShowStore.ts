import {makeAutoObservable, runInAction} from "mobx";
import {api, userStore} from "../../auth/AuthFacade"
import {ShowModel} from "../ShowFacade"

class ShowStore {

    shows: Array<ShowModel> = []
    recentlyAdded: Array<ShowModel> = []
    recommended: Array<ShowModel> = []
    newSeasons: Array<ShowModel> = []
    continueWatching: Array<ShowModel> = []

    constructor() {
        makeAutoObservable(this)
    }

    retrieveShows(callback) {
        api.get("/show/all").then((response) => {
            if (response.data.length > 0) {
                runInAction(() => {
                    this.shows = (response.data)
                })
                if (userStore.isLoggedIn) {
                    this.retrieveHomeShows(() => {
                        if (callback) {
                            callback()
                        }
                    })
                } else {
                    if (callback) {
                        callback()
                    }
                }
            } else {
            }
        })
    }

    retrieveHomeShows(callback) {
        api.get("/show/home")
            .then((response) => {
                runInAction(() => {
                    this.recommended = response.data.recommended
                    this.recentlyAdded = response.data.recentlyAdded
                    this.newSeasons = response.data.newSeasons
                    this.continueWatching = response.data.continueWatching
                })

                callback()
            })
    }

    getShow(name) {
        for (let i = 0; i < this.shows.length; i++) {
            if (this.shows[i].name === name) {
                return this.shows[i]
            }
        }
    }
}

function formatURL(showName) {
    return showName.replace(/\s+/g, '-').toLowerCase()
}

function unFormatURL(showName) {
    return showName.replace(/-/g, ' ').toLowerCase()
}

const showStore = new ShowStore()
export {showStore, formatURL, unFormatURL}