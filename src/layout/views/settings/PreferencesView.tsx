import SettingsSidebar from "./components/SettingsSidebar";
import React from "react";
import SettingsSwitch from "./components/SettingsSwitch";
import {api, userEditStore, userStore} from "../../../app/auth/AuthFacade";
import {toast} from "react-toastify";

const PreferencesView = () => {

    const submit = () => {
        let data = {
            userName: userStore.user.name,
            settings: {}
        }

        if (userEditStore.autoPlay != null) {
            data.settings["autoPlayNextEpisode"] = userEditStore.autoPlay
        }

        if (userEditStore.skipIntro != null) {
            data.settings["autoSkipIntro"] = userEditStore.skipIntro
        }

        if (userEditStore.dontSaveWatchHistory != null) {
            data.settings["dontSaveWatchHistory"] = userEditStore.dontSaveWatchHistory
        }

        api.post("/user/update", data)
            .then((response) => {
                if (response.data.success) {
                    userStore.setUser(response.data.user)
                    toast.success("Your changes were updated!")
                } else {
                    toast.error("An unknown error occurred!")
                    console.log(response.data)
                }
            })
    }

    return (
        <div className="container xl:w-2/3 3xl:w-1/2 mx-auto" style={{minHeight: "70vh"}}>

            <main className="bg-gray-700 rounded-xl -mt-8 md:-mt-20 2xl:-mt-28 relative ">
                <div className="lg:flex">
                    <SettingsSidebar page="preferences" />

                    <div className="w-full">
                        <div className="p-8">

                            <SettingsSwitch
                                label="Automatically skip openings"
                                function={(value) => userEditStore.skipIntro = value}
                                default={userStore.getSetting("autoSkipIntro")}
                            />

                            <SettingsSwitch
                                label="Automatically play next episodes"
                                function={(value) => userEditStore.autoPlay = value}
                                default={userStore.getSetting("autoPlayNextEpisode")}
                            />

                            <SettingsSwitch
                                label="Dont save watch history"
                                function={(value) => userEditStore.dontSaveWatchHistory = value}
                                default={userStore.getSetting("dontSaveWatchHistory")}
                            />

                            <div className="my-4 flex items-center">
                                <button onClick={() => submit()} className="bg-blue-500 px-6 mr-3 mt-4 py-3 rounded-md font-avenir text-white focus:outline-none">
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </div>
    )
}

export default PreferencesView