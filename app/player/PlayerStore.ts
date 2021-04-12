import {makeAutoObservable} from "mobx";
import userStore from "../auth/user/store/UserStore";
import ShowModel from "../show/ShowModel";

class PlayerStore {

    loaded: boolean = false
    hasShow: boolean = false
    show: ShowModel
    currentSeasonIndex: number = 0
    currentEpisodeIndex: number = 0
    groupWatch: boolean = false
    watchSession: number = 0
    playingNextEpisode: boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    setShow(show: ShowModel) {
        this.show = show
        this.watchSession = 0
        this.hasShow = true
    }

    changeEpisode(seasonIndex: number, episodeIndex: number) {
        this.currentSeasonIndex = seasonIndex
        this.currentEpisodeIndex = episodeIndex
        this.loaded = false
    }

    setLoaded(status: boolean) {
        this.loaded = status
    }

    getCurrentEpisode() {
        return this.show.seasons[this.currentSeasonIndex].episodes[this.currentEpisodeIndex]
    }

    getNextEpisode() {
        if (this.show.seasons[this.currentSeasonIndex].episodes[this.currentEpisodeIndex + 1] !== undefined) {
            return (this.show.seasons[this.currentSeasonIndex].episodes[this.currentEpisodeIndex + 1])
        } else if (this.show.seasons[this.currentSeasonIndex + 1] !== undefined) {
            if (this.show.seasons[this.currentSeasonIndex + 1].episodes[0] !== undefined) {
                return this.show.seasons[this.currentSeasonIndex + 1].episodes[0]
            }
        } else {
            return false
        }
    }

    playNextEpisode() {
        this.watchSession++
        this.playingNextEpisode = true
        if (userStore.isLoggedIn) {
            userStore.setWatchedEpisode(this.show.name, this.currentSeasonIndex, this.currentEpisodeIndex, 0, () => {
                    if (this.show.seasons[this.currentSeasonIndex].episodes[this.currentEpisodeIndex + 1] !== undefined) {
                        this.changeEpisode(this.currentSeasonIndex, this.currentEpisodeIndex + 1)
                    } else if (this.show.seasons[this.currentSeasonIndex + 1] !== undefined) {
                        if (this.show.seasons[this.currentSeasonIndex + 1].episodes[0] !== undefined) {
                            this.changeEpisode(this.currentSeasonIndex + 1, this.currentEpisodeIndex + 1)
                        }
                    }
                }
            )
        } else {
            if (this.show.seasons[this.currentSeasonIndex].episodes[this.currentEpisodeIndex + 1] !== undefined) {
                this.changeEpisode(this.currentSeasonIndex, this.currentEpisodeIndex + 1)
            } else if (this.show.seasons[this.currentSeasonIndex + 1] !== undefined) {
                if (this.show.seasons[this.currentSeasonIndex + 1].episodes[0] !== undefined) {
                    this.changeEpisode(this.currentSeasonIndex + 1, this.currentEpisodeIndex + 1)
                }
            }
        }
    }

    getCurrentSeason() {
        return this.show.seasons[this.currentSeasonIndex]
    }

    getVideoType() {
        if (this.getCurrentEpisode().videoSource.endsWith(".m3u8")) {
            return 'application/x-mpegURL'
        }

        return 'video/mp4'
    }
}

const playerStore = new PlayerStore()
export default playerStore