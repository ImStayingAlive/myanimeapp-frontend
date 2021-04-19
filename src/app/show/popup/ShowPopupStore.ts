import {ShowModel, formatURL} from "../ShowFacade"
import {makeAutoObservable} from "mobx";
import Router from 'next/router'

class ShowPopupStore {
    isOpen: boolean = false
    isLoaded: boolean = false
    show: ShowModel
    muted: boolean = true
    showEpisodeCount: number = 6
    selectedSeason: number = 0
    seasonDropdown: boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    open(show: ShowModel) {
        this.isLoaded = true
        this.show = (show == null || undefined) ? null : show;

        if (!this.isOpen) {
            Router.push({
                pathname: '',
                query: {show: formatURL(this.show.name)},
            }, '', {shallow: true}).then(() => {
                this.isOpen = true
                document.body.classList.remove('scrollbar-thin');
                document.body.classList.add('overflow-hidden');
            })
        }
    }

    close() {
        if (this.isOpen) {
            Router.push('', '', {shallow: true}).then(() => {
                this.isOpen = false
                document.body.classList.add('scrollbar-thin');
                document.body.classList.remove('overflow-hidden');
                this.reset()
            })
        }
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