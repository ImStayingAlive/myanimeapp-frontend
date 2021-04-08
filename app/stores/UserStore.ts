import {makeAutoObservable} from "mobx";
import api from "../provider/AxiosProvider";
import User from "../interfaces/User";
import loginService from "../service/LoginService";
import { toast } from "react-toastify";
import Show from "../interfaces/Show";
import {showState} from "./shows/ShowStore";

class UserStore {

    isLoggedIn: boolean = false
    user: User
    group: object
    watchLater: Array<object>

    constructor() {
        makeAutoObservable(this)
    }

    setIsLoggedIn(value: boolean) {
        this.isLoggedIn = value
    }

    setUser(user: User) {
        this.user = user
        api.defaults.headers.common["Auth"] = user.token
    }

    setGroup(group: object) {
        this.group = group
    }

    getWatchedShowProgress(show: Show, all: boolean) {
        if (!this.existsUser()) {
            return 0
        }

        let maxTime = 0;
        let currentTime = 0;
        let percent = 0;
        if (all) {

            let lastWatchedEpisode = this.getLastWatchedEpisode(show)
            if (lastWatchedEpisode.seasonIndex != 0 || lastWatchedEpisode.episodeIndex != 0) {
                percent = 5
            }

            /*
            for (let i = 0; i < show.seasons.length; i++) {
                let season = show.seasons[i];

                for (let j = 0; j < season.episodes.length; j++) {
                    let episode = season.episodes[j];
                    maxTime += episode.length;
                }
            }

            let watchedShow = this.user.watchedShows[show.name];
            if (watchedShow) {
                let seasons = Object.keys(watchedShow.seasons);

                for (let i = 0; i < seasons.length; i++) {
                    let season = watchedShow.seasons[seasons[i]];

                    if (season) {
                        let episodes = Object.keys(season.episodes);
                        for (let j = 0; j < episodes.length; j++) {
                            let episode = season.episodes[episodes[j]];
                            currentTime += episode.timestamp;
                            percent = (100 * currentTime) / maxTime;
                        }
                    }
                }
            }*/
        } else {
            let watchedShow = this.user.watchedShows[show.name];
            if (watchedShow) {
                let currentEpisode = watchedShow.currentEpisode
                if (currentEpisode) {
                    maxTime = show.seasons[currentEpisode.seasonIndex].episodes[currentEpisode.episodeIndex].length
                    currentTime += currentEpisode.timestamp
                    percent = (100 * currentTime) / maxTime;
                }
            }
        }

        return percent
    }

    getLastWatchedEpisode(show: Show) {
        let info = {
            seasonIndex: 0,
            episodeIndex: 0
        };

        if (!this.existsUser()) {
            return info
        }

        let watchedShow = this.user.watchedShows[show.name];

        if (watchedShow) {
            let currentEpisode = watchedShow.currentEpisode
            if (currentEpisode) {
                info = {
                    seasonIndex: currentEpisode.seasonIndex,
                    episodeIndex: currentEpisode.episodeIndex
                }
            }
        }

        return info
    }

    // Check is the User exists
    existsUser() {
        if (this.user === undefined || this.user == null) {
            return false;
        }
        return this.user.name != null;
    }

    // Check if the User has watched the Episode
    // Needs a showName, the Season Index and the Episode Index
    getCurrentTimeInEpisode(showName: string, seasonIndex: number, episodeIndex: number) {
        if (!this.existsUser()) {
            return;
        }
        let show = this.user.watchedShows[showName];
        if (show) {
            let season = show.seasons[seasonIndex];
            if (season) {
                let episode = season.episodes[episodeIndex];
                if (episode) {
                    return episode.timestamp;
                }
            }
        }
        return false;
    }

    // See if the User has watched a show
    // Returns false or the Show Object
    hasWatchedShow(showName: string) {
        if (!this.existsUser()) {
            return false
        }

        let show = this.user.watchedShows[showName];
        return !!show;
    }

    // Set the Watch Status of a certain Episode
    // needs the ShowName, Season and Episode Index
    // as well as the Timestamp and a callback
    setWatchedEpisode(showName: string, seasonIndex: number, episodeIndex: number, timestamp: number, callback: Function) {
        if (!this.existsUser()) {
            callback()
        }

        let data = {
            showName: showName,
            seasonIndex: seasonIndex,
            episodeIndex: episodeIndex,
            timestamp: timestamp
        }
        api.post("/user/set/watchedEpisode/" + this.user.name, data)
            .then((response) => {
                if (response.data.success === true) {
                    loginService.update(() => {
                        if (callback != null) {
                            callback()
                        }
                    })
                }
            })
    }

    // Set the current Episode the User is watching
    // needs the ShowName, Season and EpisodeIndex and a callback
    setCurrentEpisode(showName: string, seasonIndex: number, episodeIndex: number, callback: Function) {
        if (!this.existsUser()) {
            return;
        }
        let data = {
            showName: showName,
            seasonIndex: seasonIndex,
            episodeIndex: episodeIndex
        }
        api.post("/user/set/currentEpisode/" + this.user.name, data)
            .then((response) => {
                if (response.data.success === true) {
                    loginService.update(() => {
                        if (callback != null) {
                            callback()
                        }
                    })
                }
            })
    }

    // Add or remove a Show from the Watch later list
    toggleWatchLater(show: Show, callback: Function) {
        if (!this.existsUser()) {
            return;
        }

        let data = {
            showName: show.name,
            add: !this.isInWatchLater(show.name)
        }

        api.post("/user/watchLater/modify/" + this.user.name, data)
            .then((response) => {
                if (response.data.success === true) {
                    loginService.update(() => {
                        if (this.isInWatchLater(show.name)) {
                            toast.success("You added " + show.displayName + " to your list.")
                        } else {
                            toast.warning("You removed " + show.displayName + " from your list.")
                        }

                        this.getWatchLater(() => {
                            callback()
                        })
                    })
                }
            })
    }

    isInWatchLater(showName: String) {
        for (let i = 0; i < this.user.watchLater.length; i++) {
            if (this.user.watchLater[i] === showName) {
                return true;
            }
        }
        return false;
    }

    getWatchLater(callback: Function) {
        api.get("/user/watchLater/list/" + this.user.name).then((response) => {
            if (response.data.success) {
                this.watchLater = response.data.shows

                if (callback) {
                    callback(callback)
                }
            } else {
                if (callback) {
                    callback(callback)
                }
            }
        })
    }

    getWatchedShows() {
        let tempShows = []
        for (const [name] of Object.entries(this.user.watchedShows)) {
            tempShows.push(showState.getShow(name.toLowerCase()))
        }
        return tempShows
    }
}

const userStore = new UserStore()
export default userStore