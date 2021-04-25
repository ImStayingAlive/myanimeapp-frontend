import {makeAutoObservable, runInAction} from "mobx";
import {registerService} from "../RegisterFacade";
import timeStampUtil from "../../utils/TimeStampUtil";
import {toast} from "react-toastify";

class RegisterStore {

    page: string = "welcome"
    loading: boolean = false
    timeout;

    /* Temp User Data */
    username: string = ""
    email: string = ""
    password: string = ""

    usernameTaken: boolean = false
    emailCorrect: boolean = true
    passwordOkay: boolean = true

    constructor() {
        makeAutoObservable(this)
    }

    changePage(page) {
        runInAction(() => {
            this.page = "loading"

            setTimeout(() => {
                this.page = page
            }, 400)
        })
    }

    setUsername(username) {
        timeStampUtil.setTimeStamp("searchUser", 500)

        if (this.timeout) {
            clearTimeout(this.timeout)
        }

        this.timeout = setTimeout(() => {
            if (timeStampUtil.isAvailable("searchUser")) {
                registerService.checkUsername(username, (response) => {
                    if (response) {
                        runInAction(() => {
                            this.usernameTaken = true
                        })
                    } else {
                        runInAction(() => {
                            this.usernameTaken = false
                        })
                    }
                })

                runInAction(() => {
                    this.username = username
                })
            }
        }, 500)
    }

    setEmail(email) {
        if (email.includes("@") && email.includes(".")) {
            runInAction(() => {
                this.emailCorrect = true
            })
        } else if (email == "") {
            runInAction(() => {
                this.emailCorrect = true
            })
        } else {
            runInAction(() => {
                this.emailCorrect = false
            })
        }

        runInAction(() => {
            this.email = email
        })
    }

    setPassword(password) {
        if (password.length > 6) {
            runInAction(() => {
                this.passwordOkay = true
            })
        } else {
            runInAction(() => {
                this.passwordOkay = false
            })
        }

        this.password = password
    }

    register() {
        runInAction(() => {
            this.loading = true
        })

        setTimeout(() => {
            runInAction(() => {
                this.loading = false
            })
            if (this.passwordOkay && !this.usernameTaken && this.emailCorrect) {
                if (this.password.length + this.username.length > 9) {
                    registerService.registerUser()
                    return;
                }
            }
            toast.warn("Please check your inputs again!")
        }, 500)
    }
}

const registerStore = new RegisterStore()
export default registerStore