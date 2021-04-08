import userStore from "../stores/UserStore";
import api from "../provider/AxiosProvider";
import cookieService from "./CookieService";
import User from "../interfaces/User";
const cookieTokenKey = "secureToken"

class LoginService {

    /**
     * Call everytime you to update the current user.
     * Use cases: First loading page, Update data if you post something
     *
     * @param callback isn't nec
     */
    update(callback : Function) {
        if (cookieService.existsCookie(cookieTokenKey)) {
            let token = cookieService.getCookie(cookieTokenKey);
            let data = {token: token}
            api.post("/auth/tokenLogin", data)
                .then((response) => {
                    if (response.data.success) {
                        let user: User = response.data.user;

                        //-------------------------------------------------------
                        userStore.setUser(user)
                        this.setGroup(user)
                        userStore.setIsLoggedIn(true)
                        //-------------------------------------------------------
                    } else {
                        userStore.setIsLoggedIn(false)
                    }

                    if (callback != null) {
                        callback(response.data)
                    }
                })
        } else if (callback != null) {
            callback()
        }
    }

    /**
     * Login with given username and password
     * Use cases: When you click on the sign in button on the login page
     *
     * @param username
     * @param password
     * @param rememberMe
     * @param callback
     */
    login(username: string, password: string, rememberMe: boolean, callback: Function) {
        let data: object = {userName: username, password: password}
        api.post("/auth/login", data)
            .then((response) => {
                if (response.data.success === true) {
                    let user: User = response.data.user;
                    if (rememberMe) {
                        // @ts-ignore
                        cookieService.setCookie(cookieTokenKey, user.token, 2592000)
                    } else {
                        // @ts-ignore
                        cookieService.setCookie(cookieTokenKey, user.token)
                    }

                    //-------------------------------------------------------
                    userStore.setUser(user)
                    this.setGroup(user)
                    userStore.setIsLoggedIn(true)
                    //-------------------------------------------------------

                }
                if (callback != null) {
                    callback(response.data)
                }
            })
    }

    /**
     * Setting the current group with the given user
     * Use cases: In update function ( You don't need actually somewhere else)
     *
     * @param user
     */
    setGroup(user) {
        api.get("/group/find/" + user.group)
            .then((response) => {
                if (response.data.success === true) {
                    userStore.setGroup(response.data.group)
                }
            })
    }

    /**
     * Logout the current user ( Deleting the cookie )
     * Use cases: On logout button click
     */
    logout() {
        userStore.setIsLoggedIn(false)
        cookieService.removeCookie(cookieTokenKey)
    }

}

const loginService = new LoginService()

export default loginService