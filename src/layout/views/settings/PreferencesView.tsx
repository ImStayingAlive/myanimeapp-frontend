import SettingsSidebar from "./components/SettingsSidebar";
import React from "react";
import SettingsInput from "./components/SettingsInput";
import AvatarInput from "./components/AvatarInput";
import {userStore} from "../../../app/auth/AuthFacade";
import SettingsSwitch from "./components/SettingsSwitch";

const PreferencesView = () => {

    const handle = (input) => {
        alert(input)
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
                                function={handle}
                                default={true}
                            />

                            <SettingsSwitch
                                label="Automatically play next episodes"
                                function={handle}
                                default={true}
                            />

                            <SettingsSwitch
                                label="Save watch history"
                                function={handle}
                                default={false}
                            />

                            <div className="my-4 flex items-center">
                                <button className="bg-blue-500 px-6 mr-3 mt-4 py-3 rounded-md font-avenir text-white focus:outline-none">
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