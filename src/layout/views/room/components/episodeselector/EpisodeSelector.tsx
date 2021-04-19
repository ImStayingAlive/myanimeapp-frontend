import {observer} from "mobx-react-lite"
import {Transition} from "@headlessui/react";
import SeasonOverview from "./components/SeasonOverview";
import { roomStore } from "../../../../../app/room/RoomFacade";

const EpisodeSelector = observer(() => {
        return (
            <Transition show={roomStore.popupOpen}
                        enter="transition-opacity ease-linear duration-100"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">

                <div className="fixed z-40 inset-0 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-600">
                    <div className="flex items-end justify-center pt-4 px-4 text-center sm:block sm:p-0">
                        <div onClick={() => roomStore.toggleEpisodePopup()} className="fixed inset-0 transition-opacity"
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
                                className="bg-gray-700 min-h-0 sm:min-h-screen xl:min-h-0 inline-block align-bottom rounded-lg md:rounded-none xl:rounded-lg text-left overflow-hidden shadow-xl transform transition-all xl:my-8 sm:align-middle sm:max-w-7xl sm:w-full"
                                role="dialog" aria-modal="true" aria-labelledby="modal-headline">

                                {/* Display SeasonOverview */}
                                {roomStore.room.roomShow.show.seasons.length > 0 && roomStore.room.roomShow.show.seasons[0].name !== "Movie" ? (
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

export default EpisodeSelector