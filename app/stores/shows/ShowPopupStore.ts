import Show from "../../classes/Show";
import {makeAutoObservable} from "mobx";
import {formatURL} from "./ShowStore";

class ShowPopupStore {

    isOpen: boolean = false
    isLoaded: boolean = false
    show: Show
    muted: boolean = true
    showEpisodeCount: number = 6
    selectedSeason: number = 0
    seasonDropdown: boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    open(show: Show) {
        this.isLoaded = true
        this.show = (show == null || undefined) ? null : show;

        document.title = 'Watch Now! ' + show.displayName
        if (!this.isOpen) {
            this.isOpen = true
            window.history.replaceState(null, 'Watch Now! ' + show.displayName, "/show/" + formatURL(show.name))
            document.body.classList.remove('scrollbar-thin');
            document.body.classList.add('overflow-hidden');
        }
    }

    close() {
        this.isOpen = false
        window.history.replaceState(null, '', "/")
        document.body.classList.add('scrollbar-thin');
        document.body.classList.remove('overflow-hidden');
        this.reset()
    }

    reset() {
        this.muted = true
        this.showEpisodeCount = 6
        this.selectedSeason = 0
        this.seasonDropdown = false
    }

    setMuted(status: boolean) {
        this.muted = status
    }

    setShowEpisodeCount(number: number) {
        this.showEpisodeCount = number
    }

    toggleSeasonDropdown(status: boolean) {
        this.seasonDropdown = status
    }

    setSelectedSeason(index: number) {
        this.selectedSeason = index
    }
}

const showPopupStore = new ShowPopupStore()
export default showPopupStore