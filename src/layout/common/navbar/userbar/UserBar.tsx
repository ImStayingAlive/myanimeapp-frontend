import React, {useEffect, useRef, useState} from "react";
import {userStore} from "../../../../app/auth/AuthFacade";
import {observer} from "mobx-react-lite";
import {Transition} from "@headlessui/react";
import navbarStore from "../../store/NavbarStore";
import {useClickAway} from 'react-use';
import StartPage from "./views/StartPage";
import SettingsPage from "./views/SettingsPage";
import HelpPage from "./views/HelpPage";
import {FiChevronDown} from "react-icons/fi"

const UserBar = observer(() => {

    const [page, setPage] = useState("start")

    const userDropdown = useRef(null);
    let timeout;

    const toggleDropDown = () => {
        navbarStore.toggleDropDown()
        setTimeout(() => {
            setPage("start")
        }, 200)
    }

    const changePage = (page) => {
        setPage("loading")
        timeout = setTimeout(() => {
            setPage(page)
        }, 400)
    }

    useClickAway(userDropdown, () => {
        navbarStore.closeDropDown()
        timeout = setTimeout(() => {
            setPage("start")
        }, 200)
    });

    useEffect(() => {
        return function cleanup() {
            if (timeout) {
                clearTimeout(timeout)
            }
        }
    }, [])

    return (
        <div ref={userDropdown} className="relative">
            {/* User Dropdown Button */}
            <button onClick={() => toggleDropDown()} className="justify-end flex items-center lg:mb-0 focus:outline-none group">
                <div className="w-12 h-12 bg-cover rounded-md">
                    <img src={userStore.user.avatar} alt=""
                         className="rounded h-full w-full overflow-hidden shadow"/>
                </div>
                <span className={!navbarStore.dropDownOpen ? "transition transform rotate-0" : "transition transform rotate-180 "}>
                    <FiChevronDown className="text-gray-300 group-hover:text-white mx-2" size="1.3rem"  />
                </span>
            </button>

            {/* Dropdown Start */}
            <Transition
                show={navbarStore.dropDownOpen}
                enter="transition-opacity duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0">

                <nav className="absolute w-80 p-3 mt-2 bg-dropDownDark rounded-lg origin-top-right -right-1 focus:outline-none overflow-hidden">

                    <div style={{minHeight: "18.5rem"}}>
                        <StartPage page={page} setPage={changePage} />
                        <SettingsPage page={page} setPage={changePage} />
                        <HelpPage page={page} setPage={changePage} />
                    </div>

                </nav>
            </Transition>

        </div>
    )
})

export default UserBar