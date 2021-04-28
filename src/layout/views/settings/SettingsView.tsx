import SettingsSidebar from "./components/SettingsSidebar";
import React from "react";
import SettingsInput from "./components/SettingsInput";
import {userStore} from "../../../app/auth/AuthFacade";
import dynamic from "next/dynamic";

const AvatarInput = dynamic(
    () => import("./components/AvatarInput"),
    {ssr: false}
)

const SettingsView = () => {

    const handle = (input) => {
        alert(input)
    }

    return (
        <div className="container xl:w-2/3 3xl:w-1/2 mx-auto" style={{minHeight: "70vh"}}>

            <main className="bg-gray-700 rounded-xl -mt-8 md:-mt-20 2xl:-mt-28 relative">
                <div className="lg:flex">
                    <SettingsSidebar page="account" />

                    <div className="w-full">
                        <div className="p-8">

                            <AvatarInput />
                            <SettingsInput
                                label="Username"
                                default={userStore.user.name}
                                check={true}
                                type="text"
                                function={handle}
                            />
                            <SettingsInput
                                label="Email"
                                default={userStore.user.mail}
                                check={true}
                                type="email"
                                function={handle}
                            />
                            <SettingsInput
                                label="Password"
                                default="As If we would put your password here xD"
                                check={true}
                                type="password"
                                function={() => {}}
                            />

                            <div className="my-4 flex items-center">
                                <button className="bg-blue-500 px-6 mr-3 mt-4 py-3 rounded-md font-avenir text-white focus:outline-none">
                                    Save Changes
                                </button>
                                <button className="bg-red-500 px-6 mt-4 py-3 rounded-md font-avenir text-white focus:outline-none">
                                    Logout of all devices
                                </button>


                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </div>
    )
}

export default SettingsView