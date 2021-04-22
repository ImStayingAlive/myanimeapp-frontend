import {observer} from "mobx-react-lite";
import {AiOutlineCaretDown} from "react-icons/ai";
import { roomStore } from "../../../../../../app/room/RoomFacade";
import { ShowModel } from "../../../../../../app/show/ShowFacade";
import Episode from "./Episode";

const SeasonOverview = observer(({}) => {

    const show: ShowModel = roomStore.room.roomShow.show
    const seasonNumber: number = roomStore.room.roomShow.show.seasons.length

    return (
        <div className="px-9 mt-5 mb-8">
            <div className="md:border-b border-gray-400">

                {seasonNumber === 1 ? (
                    <div className="relative md:float-right">
                        <div className="bg-gray-800 rounded text-white flex items-center justify-between">
                            <p className="text-white px-7 py-5 text-xl leading-3 tracking-normal font-normal select-none font-avenir">
                                {show.seasons[0].name}
                            </p>
                        </div>
                    </div>
                ): (
                    <div className="relative md:float-right">
                        <div className="bg-gray-800 cursor-pointer rounded text-white flex items-center justify-between"
                             onClick={() => roomStore.toggleEpisodeDropdown()}>
                            <p className="font-avenir text-white pl-7 pr-3 py-5 text-xl leading-3 tracking-normal font-normal select-none">{show.seasons[roomStore.popupSelectedSeason].name}</p>
                            <div className="cursor-pointer text-white mr-6">
                                <AiOutlineCaretDown className={roomStore.dropDownOpen ? ("transform duration-300 ease-in-out icon icon-tabler icon-tabler-chevron-up rotate-180") : ("transform duration-300 ease-in-out icon icon-tabler icon-tabler-chevron-up")}/>
                            </div>
                        </div>


                        {roomStore.dropDownOpen && (
                            <ul className="visible font-avenir bg-gray-800 shadow rounded mt-2 py-1 w-full absolute z-10 select-none">
                                {show.seasons.map((value, index) => {
                                    return (
                                        <li key={index} onClick={() => {
                                            roomStore.setPopupSeason(index)
                                            roomStore.toggleEpisodeDropdown()
                                        }}
                                            className="cursor-pointer text-gray-400 hover:text-white hover:bg-gray-600 text-sm leading-3 tracking-normal py-3 px-3 font-normal">
                                            {value.name}
                                        </li>
                                    )
                                })}
                            </ul>
                        )}
                    </div>
                )}

                <h1 className="hidden font-avenir md:block text-gray-200 text-4xl py-3">
                    Episodes
                </h1>
            </div>

            <div className="flex">
                <div className="w-full">
                    <div className="border-b border-gray-700 pt-4">

                        {show.seasons[roomStore.popupSelectedSeason].episodes.map((episode: object, index: number) =>
                            <Episode key={index} index={index} episode={episode} groupWatch="false" />
                        )}

                    </div>
                </div>
            </div>
        </div>
    )
})

export default SeasonOverview