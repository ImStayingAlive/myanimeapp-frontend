import {observer} from "mobx-react-lite";
import {Transition} from "@headlessui/react";
import TopBar from "./components/TopBar";
import SeasonOverview from "./components/SeasonOverview";
import { showPopupStore } from "../../../../app/show/ShowFacade";
import styles from "../../../../../styles/module/ShowPopup.module.css"

const ShowPopup = observer(() => {

        if (!showPopupStore.isLoaded) {
            return <Transition show={showPopupStore.isOpen}/>
        }

        return (
            <Transition show={showPopupStore.isOpen}
                        enter="transition-opacity ease-linear duration-100"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">

                <div className="fixed z-40 inset-0 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-600">
                    <div className="flex items-end justify-center pt-4 px-4 text-center sm:block sm:p-0">
                        <div onClick={() => showPopupStore.close()} className="fixed inset-0 transition-opacity"
                             aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-900 opacity-75">
                            </div>
                        </div>

                        <Transition.Child
                            enter="transition ease-in-out duration-300 transform delay-100"
                            enterFrom="scale-0"
                            enterTo="scale-100"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="scale-100"
                            leaveTo="scale-0">

                            <div
                                className={"bg-gray-700 min-h-0 sm:min-h-screen xl:min-h-0 inline-block align-bottom rounded-lg md:rounded-none xl:rounded-lg text-left overflow-hidden shadow-xl transform transition-all xl:my-8 sm:align-middle sm:max-w-7xl sm:w-full " + styles.showPopup}
                                role="dialog" aria-modal="true" aria-labelledby="modal-headline">

                                {/* Display Top Banner */}
                                <TopBar />

                                {/* Display Show Description */}
                                <div className="mx-9">
                                    <p className="font-avenir text-gray-200 text-lg lg:pr-36">
                                        {showPopupStore.show.description}
                                    </p>
                                </div>

                                <div className="mt-9 mx-9 text-gray-400 font-avenir">
                                    <p>
                                        Genres: Action, Adventure, Comedy, Romance
                                    </p>
                                    <p>
                                        Studio: {showPopupStore.show.producer}
                                    </p>
                                </div>

                                {/* Display SeasonOverview */}
                                {showPopupStore.show.seasons.length > 0 && showPopupStore.show.seasons[0].name !== "Movie" ? (
                                    <SeasonOverview />
                                ) : (
                                    <div className="h-6" />
                                )}

                            </div>
                        </Transition.Child>
                    </div>
                </div>
            </Transition>
        )
    }
)

export default ShowPopup