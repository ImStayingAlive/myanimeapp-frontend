import SettingsSidebar from "./components/SettingsSidebar";
import React from "react";
import SettingsInput from "./components/SettingsInput";
import {api, loginService, userEditStore, userStore} from "../../../app/auth/AuthFacade";
import dynamic from "next/dynamic";
import {toast} from "react-toastify";
import {useRouter} from "next/router";

const AvatarInput = dynamic(
    () => import("./components/AvatarInput"),
    {ssr: false}
)

const SettingsView = () => {

    const router = useRouter()

    const updateUser = () => {
        let data = {
            userName: userStore.user.name,
        }

        if (userEditStore.email != null) {
            data["mail"] = userEditStore.email
        }

        if (userEditStore.password != null) {
            data["newPassword"] = userEditStore.password
        }

        if (userEditStore.password || userEditStore.email != null) {
            api.post("/user/update", data)
                .then((response) => {
                    if (response.data.success) {
                        if (userEditStore.password != null) {
                            router.push("/").then(() => {
                                loginService.logout()
                            })
                        } else {
                            userStore.setUser(response.data.user)
                            toast.success("Your changes were updated!")
                        }
                    } else {
                        toast.error("An unknown error occurred!")
                        console.log(response.data)
                    }
                })
        }
    }

    const logoutAllDevices = () => {
        let data = {
            userName: userStore.user.name
        }

        api.post("/user/logout", data)
            .then((response) => {
                if (response.data.success) {
                    router.push("/").then(() => {
                        loginService.logout()
                    })
                } else {
                    toast.error("An error occurred!")
                }
            })
    }

    return (
        <div className="container xl:w-2/3 3xl:w-1/2 mx-auto" style={{minHeight: "70vh"}}>

            <main className="bg-gray-700 rounded-xl -mt-8 md:-mt-20 2xl:-mt-28 relative">
                <div className="lg:flex">
                    <SettingsSidebar page="account"/>

                    <div className="w-full">
                        <div className="p-8">

                            <AvatarInput/>
                            <SettingsInput
                                label="Username"
                                default={userStore.user.name}
                                check={true}
                                type="text"
                                disabled={true}
                                function={() => {
                                }}
                            />
                            <SettingsInput
                                label="Email"
                                default={userStore.user.mail}
                                check={true}
                                type="email"
                                disabled={false}
                                function={(value) => userEditStore.email = value}
                            />
                            <SettingsInput
                                label="Password"
                                default="As If we would put your password here xD"
                                check={true}
                                disabled={false}
                                type="password"
                                function={(value) => userEditStore.password = value}
                            />

                            <div className="my-4 flex items-center">
                                <a onClick={() => updateUser()} className="bg-blue-500 px-6 mr-3 mt-4 py-3 rounded-md font-avenir text-white focus:outline-none">
                                    Save Changes
                                </a>
                                <a onClick={() => logoutAllDevices()}
                                        className="bg-red-500 px-6 mt-4 py-3 rounded-md font-avenir text-white focus:outline-none">
                                    Logout of all devices
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </div>
    )
}

export default SettingsView