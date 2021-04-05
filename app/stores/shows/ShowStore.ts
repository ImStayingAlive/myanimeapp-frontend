import {makeAutoObservable} from "mobx";
import api from "../../provider/AxiosProvider";

class ShowStore {

    shows: Array<object> = []

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
        this.shows.forEach((value: object) => {
            // @ts-ignore
            if (name === value.name) {
                return value
            }
        });

        return false
    }
}

const showState = new ShowStore()
export default showState