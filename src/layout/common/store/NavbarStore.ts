import {makeAutoObservable, runInAction} from "mobx";

class NavbarStore {

    mobileIsOpen: boolean = false

    /* Dropdown */
    dropDownOpen: boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    toggleMobile(status: boolean) {
        this.mobileIsOpen = status
    }

    toggleDropDown() {
        runInAction(() => {
            this.dropDownOpen = !this.dropDownOpen
        })
    }

    closeDropDown() {
        runInAction(() => {
            this.dropDownOpen = false
        })
    }
}

const navbarStore = new NavbarStore()
export default navbarStore