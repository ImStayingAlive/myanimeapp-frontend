import {makeAutoObservable} from "mobx";
import api from "../../provider/AxiosProvider";
import Show from "../../classes/Show";

class ShowStore {

    shows: Array<Show> = []

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

const showState = new ShowStore()
export {showState, formatURL, unFormatURL}