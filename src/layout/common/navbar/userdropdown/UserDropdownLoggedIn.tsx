import React from "react";
import {loginService, userStore} from "../../../../app/auth/AuthFacade";
import {Menu, Transition} from "@headlessui/react";
import Link from "next/link";
import {FiTool, FiInfo, FiLogOut} from "react-icons/fi"
import {BsChevronRight} from "react-icons/bs"

const UserDropdownLoggedIn = () => {

    return (
        <div className="relative">
            <Menu>
                {({open}) => {
                    return (
                        <div>
                            <div className="justify-end">
                                <Menu.Button className="flex items-center lg:mb-0 focus:outline-none">
                                    <div>
                                        <p className="font-avenir text-gray-100 text-base font-medium">
                                            {userStore.user.name}
                                        </p>
                                    </div>
                                    <div className="w-12 h-12 bg-cover rounded-md ml-3">
                                        <img src={userStore.user.avatar} alt=""
                                             className="rounded h-full w-full overflow-hidden shadow"/>
                                    </div>
                                </Menu.Button>
                            </div>
                            <Transition
                                as={React.Fragment}
                                show={open}
                                enter="transition-opacity duration-200"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition-opacity duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0">
                                <Menu.Items static
                                            className="absolute w-80 p-3 bg-dropDownDark rounded-lg origin-top-right transform -right-1 focus:outline-none"
                                            style={{marginTop: '0.5rem'}}>

                                    <Menu.Item>
                                        <Link href="/profile">
                                            <div
                                                className="flex items-center group hover:bg-dropDownLight p-2.5 rounded-lg cursor-pointer">
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
                                        </Link>
                                    </Menu.Item>

                                    <hr className="border-dropDownHoverLight my-2"/>

                                    <Menu.Item>
                                        <Link href="/settings">
                                            <div
                                                className="flex items-center group hover:bg-dropDownLight p-2.5 rounded-lg cursor-pointer text-gray-300 my-1">
                                                <div className="flex items-center w-full">
                                                    <FiTool
                                                        className="h-10 w-10 bg-dropDownLight rounded-full group-hover:bg-dropDownHoverLight p-2.5"/>
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
                                        </Link>
                                    </Menu.Item>

                                    <Menu.Item>
                                        <Link href="/help">
                                            <div
                                                className="flex items-center group hover:bg-dropDownLight p-2.5 rounded-lg cursor-pointer text-gray-300 my-1">
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
                                        </Link>
                                    </Menu.Item>

                                    <Menu.Item>
                                        <div
                                            onClick={() => loginService.logout()}
                                            className="flex items-center group hover:bg-dropDownLight p-2.5 rounded-lg cursor-pointer text-gray-300 my-1">
                                            <div className="flex items-center w-full">
                                                <FiLogOut
                                                    className="h-10 w-10 bg-dropDownLight rounded-full group-hover:bg-dropDownHoverLight p-2.5"/>
                                                <span className="ml-3 font-avenir pt-1">
                                                    <h1 className="text-lg">
                                                        Logout
                                                    </h1>
                                                </span>
                                            </div>

                                            <span className="pt-1">
                                                    <BsChevronRight size="1.3rem"/>
                                                </span>
                                        </div>
                                    </Menu.Item>
                                </Menu.Items>
                            </Transition>
                        </div>
                    );
                }}
            </Menu>
        </div>
    )
}

export default UserDropdownLoggedIn