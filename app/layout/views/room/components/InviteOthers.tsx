import React, {useState} from "react"
import {MdAdd} from "react-icons/md";
import {Transition} from "@headlessui/react";
import {toast} from "react-toastify";

const InviteOthers = (props) => {
    const [openPopup, togglePopup] = useState(false)

    const copyLink = () => {
        toast.success("The link is in your clipboard!")
    }

    return (
        <div>
            <div className="h-16 inline-block w-16 ml-3">
                <div onClick={() => togglePopup(true)}
                     className="bg-gray-800 hover:bg-gray-700 cursor-pointer rounded-full transform hover:scale-110 transition duration-500 ease-in-out">
                    <MdAdd className="p-2 text-blue-400" size="4rem"/>
                </div>
            </div>


            <Transition show={openPopup}
                        enter="transition-opacity ease-linear duration-100"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">


                <div
                    className="fixed z-40 inset-0 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-600">
                    <div className="flex items-end justify-center pt-4 px-4 text-center sm:block sm:p-0">
                        <div onClick={() => togglePopup(false)} className="fixed inset-0 transition-opacity"
                             aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-900 opacity-75">
                            </div>
                        </div>

                        <Transition.Child
                            enter="transition-opacity ease-linear duration-100"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0">

                            <div className="absolute top-1/3 left-1/2 text-left transform -translate-x-1/2" role="dialog"
                                 aria-modal="true" aria-labelledby="modal-headline">
                                <div className="md:w-80 rounded shadow-lg p-6 bg-gray-800">
                                    <h1 className="text-lg font-bold leading-none text-gray-300">
                                        Invite your friends.
                                    </h1>
                                    <p className="text-sm leading-5 pt-6 text-gray-300">
                                        Share the link with people you want to invite to your room!
                                    </p>
                                    <p className=" text-xs font-semibold py-4 leading-4 text-indigo-400 uppercase">
                                        Your link
                                    </p>
                                    <div className="flex items-center h-full justify-between text-sm font-semibold leading-6 bg-gray-900 rounded h-12 w-full">
                                        <div>
                                            <input id="copyLink" className="pl-4 h-full bg-gray-900 text-base font-medium leading-tight text-gray-100" value={"https://anime.necrocloud.eu/room/" + props.roomId} />
                                        </div>
                                        <div onClick={() => copyLink()} className="bg-indigo-700 p-3.5 rounded-r cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20}
                                                 viewBox="0 0 20 20" fill="none">
                                                <path
                                                    d="M16.6667 7.5H9.16667C8.24619 7.5 7.5 8.24619 7.5 9.16667V16.6667C7.5 17.5871 8.24619 18.3333 9.16667 18.3333H16.6667C17.5871 18.3333 18.3333 17.5871 18.3333 16.6667V9.16667C18.3333 8.24619 17.5871 7.5 16.6667 7.5Z"
                                                    stroke="white" strokeWidth="1.66667" strokeLinecap="round"
                                                    strokeLinejoin="round"/>
                                                <path
                                                    d="M4.16675 12.5H3.33341C2.89139 12.5 2.46746 12.3244 2.1549 12.0119C1.84234 11.6993 1.66675 11.2754 1.66675 10.8334V3.33335C1.66675 2.89133 1.84234 2.4674 2.1549 2.15484C2.46746 1.84228 2.89139 1.66669 3.33341 1.66669H10.8334C11.2754 1.66669 11.6994 1.84228 12.0119 2.15484C12.3245 2.4674 12.5001 2.89133 12.5001 3.33335V4.16669"
                                                    stroke="white" strokeWidth="1.66667" strokeLinecap="round"
                                                    strokeLinejoin="round"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </Transition.Child>
                    </div>
                </div>
            </Transition>
        </div>
    )
}

export default InviteOthers