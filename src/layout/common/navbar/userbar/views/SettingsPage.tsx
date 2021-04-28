import {Transition} from "@headlessui/react";
import React from "react";
import {FiPackage, FiUser, FiDatabase, FiDollarSign} from "react-icons/fi";
import {BsChevronLeft} from "react-icons/bs";
import Link from "next/link";

const SettingsPage = (props) => {



    return (
        <Transition
            show={props.page === "settings"}
            enter="transition-opacity duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transform transition duration-300"
            leaveFrom="translate-x-0 opacity-100"
            leaveTo="-translate-x-20 opacity-0">

            <div onClick={() => props.setPage("start")}>
                <div
                    className="flex items-center group hover:bg-gray-700 p-2.5 rounded-lg cursor-pointer text-gray-300 my-1">
                    <div className="flex items-center w-full">
                        <BsChevronLeft size="1.3rem"/>
                        <span className="ml-3 font-avenir pt-1">
                                <h1 className="text-lg">
                                    Back
                                </h1>
                            </span>
                    </div>
                </div>
            </div>
            <hr className="border-gray-700 my-2"/>

            <Link href="/settings">
                <div onClick={() => props.close()} className="flex items-center group hover:bg-gray-700 p-2.5 rounded-lg cursor-pointer text-gray-300 my-1">
                    <div className="flex items-center w-full">
                        <FiUser
                            className="h-10 w-10 bg-gray-700 rounded-full group-hover:bg-gray-800 p-2.5"/>
                        <span className="ml-3 font-avenir pt-1">
                                <h1 className="text-lg">
                                    Account Settings
                                </h1>
                            </span>
                    </div>
                </div>
            </Link>

            <Link href="/settings/preferences">
                <div onClick={() => props.close()} className="flex items-center group hover:bg-gray-700 p-2.5 rounded-lg cursor-pointer text-gray-300 my-1">
                    <div className="flex items-center w-full">
                        <FiPackage
                            className="h-10 w-10 bg-gray-700 rounded-full group-hover:bg-gray-800 p-2.5"/>
                        <span className="ml-3 font-avenir pt-1">
                                <h1 className="text-lg">
                                    Preferences
                                </h1>
                            </span>
                    </div>
                </div>
            </Link>

            <Link href="/settings/billing">
                <div onClick={() => props.close()} className="flex items-center group hover:bg-gray-700 p-2.5 rounded-lg cursor-pointer text-gray-300 my-1">
                    <div className="flex items-center w-full">
                        <FiDollarSign
                            className="h-10 w-10 bg-gray-700 rounded-full group-hover:bg-gray-800 p-2.5"/>
                        <span className="ml-3 font-avenir pt-1">
                                <h1 className="text-lg">
                                    Billing
                                </h1>
                            </span>
                    </div>
                </div>
            </Link>

            <Link href="/settings/data">
                <div onClick={() => props.close()} className="flex items-center group hover:bg-gray-700 p-2.5 rounded-lg cursor-pointer text-gray-300 my-1">
                    <div className="flex items-center w-full">
                        <FiDatabase
                            className="h-10 w-10 bg-gray-700 rounded-full group-hover:bg-gray-800 p-2.5"/>
                        <span className="ml-3 font-avenir pt-1">
                                <h1 className="text-lg">
                                    My Data
                                </h1>
                            </span>
                    </div>
                </div>
            </Link>
        </Transition>
    )
}

export default SettingsPage