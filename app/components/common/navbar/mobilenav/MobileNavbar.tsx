import {Transition} from "@headlessui/react";
import navbarStore from "../../../../stores/NavbarStore";
import MobileNavLink from "./MobileNavLink";

const MobileNavbar = () => {
    return (
        <Transition show={navbarStore.mobileIsOpen}>
            <div className="fixed inset-0 overflow-hidden xl:hidden">
                <Transition.Child
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <div onClick={() => navbarStore.toggleMobile(false)} className="absolute z-10 inset-0 bg-gray-900 bg-opacity-75 transition-opacity" aria-hidden="true">
                    </div>
                </Transition.Child>


                <Transition.Child
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="-translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-x-0"
                    leaveTo="-translate-x-full">
                    <div className="fixed bg-gray-900 w-7/12 md:w-1/3 h-screen z-20">
                        <div className="px-6 h-full">
                            <div className="flex flex-col justify-between w-full">
                                <div>
                                    <ul className="f-m-m">

                                        <MobileNavLink text="Home" link="/" />
                                        <MobileNavLink text="New & Popular" link="/recently-added" />
                                        <MobileNavLink text="New Seasons" link="/new-seasons" />
                                        <MobileNavLink text="Search" link="/search" />

                                    </ul>
                                </div>
                                <div className="w-full pt-20">
                                    <div className="border-t border-gray-700">


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Transition.Child>
            </div>
        </Transition>
    )
}

export default MobileNavbar