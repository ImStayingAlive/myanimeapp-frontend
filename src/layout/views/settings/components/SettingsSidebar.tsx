import {FiPackage, FiUser, FiDatabase, FiDollarSign} from "react-icons/fi";
import React from "react";
import Link from "next/link"

const SettingsSidebar = (props) => {

    return (
        <div className="lg:w-96 bg-gray-800 p-3 rounded-t-lg lg:rounded-l-xl lg:rounded-tr-none select-none">
            <ul className="text-gray-300 font-avenir text-xl mx-2 flex lg:flex-col justify-center">
                <li className={props.page === "account" ? "bg-gray-700 p-2.5 mx-2 lg:mx-0 rounded-lg cursor-pointer my-2" : "hover:bg-gray-700 p-2.5 rounded-lg mx-2 lg:mx-0 cursor-pointer my-2"}>
                    <Link href="/settings">
                        <div className="flex items-center text-gray-300">
                            <FiUser className="h-10 w-10 bg-gray-900 rounded-full p-2.5"/>
                            <span className="hidden lg:block ml-3 font-avenir pt-1">
                                <h1 className="text-lg">
                                    Account Settings
                                </h1>
                        </span>
                        </div>
                    </Link>
                </li>
                <li className={props.page === "preferences" ? "bg-gray-700 p-2.5 mx-2 lg:mx-0 rounded-lg cursor-pointer my-2" : "hover:bg-gray-700 p-2.5 rounded-lg mx-2 lg:mx-0 cursor-pointer my-2"}>
                    <Link href="/settings/preferences">
                        <div className="flex items-center text-gray-300">
                            <FiPackage className="h-10 w-10 bg-gray-900 rounded-full p-2.5"/>
                            <span className="hidden lg:block ml-3 font-avenir pt-1">
                                    <h1 className="text-lg">
                                        Preferences
                                    </h1>
                            </span>
                        </div>
                    </Link>
                </li>
                <li className={props.page === "billing" ? "bg-gray-700 p-2.5 mx-2 lg:mx-0 rounded-lg cursor-pointer my-2" : "hover:bg-gray-700 p-2.5 mx-2 lg:mx-0 rounded-lg cursor-pointer my-2"}>
                    <Link href="/settings/billing">
                        <div className="flex items-center text-gray-300">
                            <FiDollarSign className="h-10 w-10 bg-gray-900 rounded-full p-2.5"/>
                            <span className="hidden lg:block ml-3 font-avenir pt-1">
                                    <h1 className="text-lg">
                                        Billing
                                    </h1>
                            </span>
                        </div>
                    </Link>
                </li>
                <li className={props.page === "data" ? "bg-gray-700 p-2.5 mx-2 lg:mx-0 rounded-lg cursor-pointer my-2" : "hover:bg-gray-700 p-2.5 mx-2 lg:mx-0 rounded-lg cursor-pointer my-2"}>
                    <Link href="/settings/data">
                        <div className="flex items-center text-gray-300">
                            <FiDatabase className="h-10 w-10 bg-gray-900 rounded-full p-2.5"/>
                            <span className="hidden lg:block ml-3 font-avenir pt-1">
                                    <h1 className="text-lg">
                                        My Data
                                    </h1>
                            </span>
                        </div>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default SettingsSidebar