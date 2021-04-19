import {makeAutoObservable} from "mobx";
import {api} from "../../auth/AuthFacade"
import {ShowModel} from "../ShowFacade"

class ShowStore {

    shows: Array<ShowModel> = []

    constructor() {
        makeAutoObservable(this)
    }

    retrieveShows(callback) {
        api.get("/show/all").then((response) => {
            if (response.data.length > 0) {
                this.shows = (response.data)

                if (callback) {
                    callback(callback)
                }
            } else {
            }
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