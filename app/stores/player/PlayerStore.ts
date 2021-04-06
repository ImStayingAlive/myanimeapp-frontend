import {makeAutoObservable} from "mobx";
import Show from "../../classes/Show";

class PlayerStore {

    loaded: boolean = false
    show: Show
    currentSeasonIndex: number = 0
    currentEpisodeIndex: number = 0
    groupWatch: boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    setShow(show: Show) {
        this.show = show
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
        if (this.show.seasons[this.currentSeasonIndex].episodes[this.currentEpisodeIndex + 1] !== null) {
            return (this.show.seasons[this.currentSeasonIndex].episodes[this.currentEpisodeIndex + 1])
        } else if (this.show.seasons[this.currentSeasonIndex + 1].episodes[0] !== null) {
            return this.show.seasons[this.currentSeasonIndex + 1].episodes[0]
        } else {
            return false
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