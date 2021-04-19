import {makeAutoObservable} from "mobx";

class NavbarStore {

    mobileIsOpen: boolean = false
    userDropdownIsOpen: boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    toggleMobile(status: boolean) {
        this.mobileIsOpen = status
    }
}

const navbarStore = new NavbarStore()
export default navbarStore