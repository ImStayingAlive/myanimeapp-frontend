import React from "react";
import {Menu, Transition} from '@headlessui/react'
import Link from "next/link"
import userStore from '../../../../auth/user/store/UserStore'
import loginService from '../../../../auth/LoginService';

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
                                        <p className="font-avenir text-gray-400 text-xs">View Profile</p>
                                    </div>
                                    <div className="w-12 h-12 bg-cover rounded-md ml-3">
                                        <img src={userStore.user.avatar} alt=""
                                             className="rounded h-full w-full overflow-hidden shadow"/>
                                    </div>
                                </Menu.Button>
                            </div>
                            <Transition as={React.Fragment} show={open}>
                                <Menu.Items static
                                            className="absolute w-60 bg-gray-900 rounded-b-xl rounded-l-xl origin-top-right transform -right-1 focus:outline-none pt-2 pb-3"
                                            style={{marginTop: '0.5rem'}}>
                                    <Menu.Item>
                                        <div className="block px-4 py-2 text-xs text-gray-400">
                                            My Account
                                        </div>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <div>
                                            <Link href="/profile">
                                                <a className="block px-4 py-2 text-sm leading-5 transition duration-150 ease-in-out text-gray-200 hover:bg-gray-800 focus:outline-none">
                                                    My Profile
                                                </a>
                                            </Link>
                                        </div>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <div>
                                            <Link href="/settings">
                                                <a className="block px-4 py-2 text-sm leading-5 transition duration-150 ease-in-out text-gray-200 hover:bg-gray-800 focus:outline-none">
                                                    Settings
                                                </a>
                                            </Link>
                                        </div>
                                    </Menu.Item>
                                    <div className="border-t border-gray-600 mt-2"/>
                                    <Menu.Item>
                                        <div className="pt-2">
                                            <a onClick={() => loginService.logout()}
                                               className="cursor-pointer block px-4 py-2 text-sm leading-5 transition duration-150 ease-in-out text-gray-200 hover:bg-gray-800 focus:outline-none">
                                                Logout
                                            </a>
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