import SettingsSidebar from "./components/SettingsSidebar";
import React from "react";

const BillingView = () => {
    return (
        <div className="container xl:w-2/3 3xl:w-1/2 mx-auto" style={{minHeight: "70vh"}}>

            <main className="bg-gray-700 rounded-xl -mt-8 md:-mt-20 2xl:-mt-28 relative">
                <div className="lg:flex">
                    <SettingsSidebar page="billing" />

                    <div className="w-full">
                        <div className="p-8">
                            <h1 className="text-2xl font-avenir text-white my-2">
                                You do not have a Premium account yet.
                            </h1>

                            <button className="bg-blue-600 mt-3 p-3 rounded font-avenir text-white cursor-not-allowed focus:outline-none">
                                Upgrade your account to Premium!
                            </button>
                        </div>
                    </div>
                </div>
            </main>

        </div>
    )
}

export default BillingView