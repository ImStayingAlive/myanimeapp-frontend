import navbarStore from "../store/NavbarStore";
import NavbarList from "./NavbarList";
import {GoSearch, GoInbox} from "react-icons/go"
import Link from "next/link"
import {Divide as Hamburger} from 'hamburger-react'
import {observer} from "mobx-react-lite";
import MobileNavbar from "./mobilenav/MobileNavbar";
import { userStore } from "../../../app/auth/AuthFacade";
import styles from "../../../styles/module/Navbar.module.css"
import UserBar from "./userbar/UserBar";
import UserBarNotLoggedIn from "./userbar/UserBarNotLoggedIn";

const Navbar = observer(() => {
    return (
        <div className={"fixed top-0 z-10 w-screen " + styles.navbar}>
            <div className={"relative z-20 " + styles.gradient}>
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

                            {userStore.isLoggedIn ? (
                                <>
                                    <div className="mx-4">
                                        <Link href="/search">
                                            <a className="cursor-pointer">
                                                <GoSearch className="text-gray-400 hover:text-white" size="1.5rem" />
                                            </a>
                                        </Link>
                                    </div>
                                    <div className="ml-4 mr-6">
                                        <Link href="/invite-codes">
                                            <a className="cursor-pointer">
                                                <GoInbox className="text-gray-400 hover:text-white" size="1.5rem" />
                                            </a>
                                        </Link>
                                    </div>
                                    <UserBar />
                                </>
                            ): (
                                <UserBarNotLoggedIn />
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