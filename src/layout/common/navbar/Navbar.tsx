import navbarStore from "../store/NavbarStore";
import NavbarList from "./NavbarList";
import styles from "../../../../styles/module/Navbar.module.css"
import {GoSearch} from "react-icons/go"
import Link from "next/link"
import UserDropdownNotLoggedIn from "./userdropdown/UserDropdownNotLoggedIn";
import {Divide as Hamburger} from 'hamburger-react'
import {observer} from "mobx-react-lite";
import UserDropdownLoggedIn from "./userdropdown/UserDropdownLoggedIn";
import MobileNavbar from "./mobilenav/MobileNavbar";
import { userStore } from "../../../app/auth/AuthFacade";

const Navbar = observer(() => {
    return (
        <div className="fixed top-0 z-10 w-screen">
            <div className={`relative z-20 ${styles.gradient}`}>
                <div className="w-11/12 relative mx-auto px-4 sm:px-6">
                    <div className="flex justify-between items-center py-3 md:justify-start md:space-x-10">

                        <div className="flex items-center justify-start">
                            <h1 className="font-bebas tracking-wider navLink cursor-pointer text-5xl pt-1 pl-1 uppercase">
                                <span className="text-red-500">My</span>
                                <span className="text-gray-100">Anime</span>
                            </h1>
                            <ul className="hidden xl:flex justify-start ml-6">
                                <NavbarList />
                            </ul>
                        </div>

                        <div className="absolute right-2 xl:hidden">
                            <a className={navbarStore.mobileIsOpen ? "text-white" : "text-gray-400"}>
                                <Hamburger toggled={navbarStore.mobileIsOpen} toggle={(status: boolean) => navbarStore.toggleMobile(status)}/>
                            </a>
                        </div>
                        <div className="hidden xl:flex items-center justify-end md:flex-1 lg:w-0">

                            <div className="mr-5 pr-5 border-r border-gray-300">
                                <Link href="/search">
                                    <a className="cursor-pointer">
                                        <GoSearch className="text-gray-400 hover:text-white" size="1.2rem" />
                                    </a>
                                </Link>
                            </div>

                            {userStore.isLoggedIn ? (
                                <UserDropdownLoggedIn />
                            ): (
                                <UserDropdownNotLoggedIn />
                            )}

                        </div>
                    </div>
                </div>

                <MobileNavbar />

            </div>
        </div>
    )
})

export default Navbar