import {Menu, Transition} from "@headlessui/react";
import React from "react";
import {FiInfo, FiLogOut, FiTool} from "react-icons/fi";
import {BsChevronRight} from "react-icons/bs";
import Link from "next/link";
import {loginService, userStore} from "../../../../../app/auth/AuthFacade";

const StartPage = (props) => {

    return (
        <Transition
            show={props.page === "start"}
            enter="transition-opacity duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transform transition duration-300"
            leaveFrom="translate-x-0 opacity-100"
            leaveTo="-translate-x-20 opacity-0">

            <div className="flex items-center group hover:bg-dropDownLight p-2.5 rounded-lg cursor-pointer">
                <img src={userStore.user.avatar} alt=""
                     className="h-16 w-16 bg-dropDownLight rounded-full group-hover:bg-dropDownHoverLight">
                </img>
                <span className="ml-3 font-avenir">
                            <h1 className="text-xl text-gray-100">
                                {userStore.user.name}
                            </h1>
                            <h3 className="text-sm text-gray-500">
                                View your profile.
                            </h3>
                        </span>
            </div>
            <hr className="border-dropDownHoverLight my-2"/>

            <div onClick={() => props.setPage("settings")}>
                <div
                    className="flex items-center group hover:bg-dropDownLight p-2.5 rounded-lg cursor-pointer text-gray-300 my-1">
                    <div className="flex items-center w-full">
                        <FiTool className="h-10 w-10 bg-dropDownLight rounded-full group-hover:bg-dropDownHoverLight p-2.5"/>
                        <span className="ml-3 font-avenir pt-1">
                                <h1 className="text-lg">
                                    Settings
                                </h1>
                            </span>
                    </div>

                    <span className="pt-1">
                            <BsChevronRight size="1.3rem"/>
                        </span>
                </div>
            </div>

            <div onClick={() => props.setPage("help")}>
                <div className="flex items-center group hover:bg-dropDownLight p-2.5 rounded-lg cursor-pointer text-gray-300 my-1">
                    <div className="flex items-center w-full">
                        <FiInfo
                            className="h-10 w-10 bg-dropDownLight rounded-full group-hover:bg-dropDownHoverLight p-2.5"/>
                        <span className="ml-3 font-avenir pt-1">
                                <h1 className="text-lg">
                                    Help
                                </h1>
                            </span>
                    </div>

                    <span className="pt-1">
                            <BsChevronRight size="1.3rem"/>
                        </span>
                </div>
            </div>

            <div onClick={() => loginService.logout()} className="flex items-center group hover:bg-dropDownLight p-2.5 rounded-lg cursor-pointer text-gray-300 my-1">
                <div className="flex items-center w-full">
                    <FiLogOut className="h-10 w-10 bg-dropDownLight rounded-full group-hover:bg-dropDownHoverLight p-2.5"/>
                    <span className="ml-3 font-avenir pt-1">
                            <h1 className="text-lg">
                                Logout
                            </h1>
                        </span>
                </div>
            </div>
        </Transition>
    )
}

export default StartPage