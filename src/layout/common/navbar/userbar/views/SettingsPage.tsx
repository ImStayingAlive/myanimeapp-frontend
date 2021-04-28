import {Transition} from "@headlessui/react";
import React from "react";
import {FiGlobe, FiUser, FiDatabase, FiDollarSign} from "react-icons/fi";
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
                    className="flex items-center group hover:bg-dropDownLight p-2.5 rounded-lg cursor-pointer text-gray-300 my-1">
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
            <hr className="border-dropDownHoverLight my-2"/>

            <Link href="/settings/account">
                <div className="flex items-center group hover:bg-dropDownLight p-2.5 rounded-lg cursor-pointer text-gray-300 my-1">
                    <div className="flex items-center w-full">
                        <FiUser
                            className="h-10 w-10 bg-dropDownLight rounded-full group-hover:bg-dropDownHoverLight p-2.5"/>
                        <span className="ml-3 font-avenir pt-1">
                                <h1 className="text-lg">
                                    Account Settings
                                </h1>
                            </span>
                    </div>
                </div>
            </Link>

            <Link href="/settings/account">
                <div className="flex items-center group hover:bg-dropDownLight p-2.5 rounded-lg cursor-pointer text-gray-300 my-1">
                    <div className="flex items-center w-full">
                        <FiGlobe
                            className="h-10 w-10 bg-dropDownLight rounded-full group-hover:bg-dropDownHoverLight p-2.5"/>
                        <span className="ml-3 font-avenir pt-1">
                                <h1 className="text-lg">
                                    Language
                                </h1>
                            </span>
                    </div>
                </div>
            </Link>

            <Link href="/settings/account">
                <div className="flex items-center group hover:bg-dropDownLight p-2.5 rounded-lg cursor-pointer text-gray-300 my-1">
                    <div className="flex items-center w-full">
                        <FiDollarSign
                            className="h-10 w-10 bg-dropDownLight rounded-full group-hover:bg-dropDownHoverLight p-2.5"/>
                        <span className="ml-3 font-avenir pt-1">
                                <h1 className="text-lg">
                                    Billing
                                </h1>
                            </span>
                    </div>
                </div>
            </Link>

            <Link href="/settings/account">
                <div className="flex items-center group hover:bg-dropDownLight p-2.5 rounded-lg cursor-pointer text-gray-300 my-1">
                    <div className="flex items-center w-full">
                        <FiDatabase
                            className="h-10 w-10 bg-dropDownLight rounded-full group-hover:bg-dropDownHoverLight p-2.5"/>
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