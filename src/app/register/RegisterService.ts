import {api, loginService} from "../auth/AuthFacade";
import {registerStore} from "./RegisterFacade";
import {toast} from "react-toastify";
import Router from 'next/router'

class RegisterService {

    checkUsername(username, callback) {
        if (username.length > 0) {
            api.get("/user/find/" + username)
                .then((response) =>  {
                     callback(response.data.success)
                })
                .catch(() => {
                    return false
                })
        }
        else {
            return false
        }
    }

    generateRandomAvatar(name) {
        let colors = [
            "f39c12",
            "ff6b6b",
            "6ab04c"
        ]

        let color = colors[Math.floor(Math.random() * colors.length)]

        return "https://avatar.oxro.io/avatar.svg?name=" + name + "&background=" + color + "&length=1"
    }

    registerUser() {
        let data = {
            userName: registerStore.username,
            password: registerStore.password,
            mail: registerStore.email,
            avatar: this.generateRandomAvatar(registerStore.username)
        }

        api.post("/auth/register", data)
            .then((response) => {
                if (response.data.success) {
                    loginService.login(registerStore.username, registerStore.password,true,() => {
                        Router.push("/").then(() => {
                            toast.success("You were successfully registered!")
                        })
                    })
                } else {
                    toast.error("An error occurred. Please try again!")
                }
            })
    }
}

const registerService = new RegisterService()
export default registerService