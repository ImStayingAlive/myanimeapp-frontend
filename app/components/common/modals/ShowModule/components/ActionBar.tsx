import React, {useState} from "react"
import {observer} from "mobx-react-lite";
import {FaCheck, FaPlus, FaUsers} from "react-icons/fa";
import {BiLoaderAlt} from "react-icons/bi";
import showPopupStore from "../../../../../stores/shows/ShowPopupStore";
import userStore from "../../../../../stores/UserStore";
import playerStore from "../../../../../stores/player/PlayerStore";
import Link from "next/link"

const ActionBar = observer(() => {
    const [groupWatch, setGroupWatch] = useState("false")

    // Open a new watchRoom
    const openRoom = () => {
        setGroupWatch("loading")

        setTimeout(() => {
        }, 1000)
    }

    // Play the selected Episode
    const playEpisode = (seasonIndex: number, episodeIndex: number) => {
        playerStore.setShow(showPopupStore.show)
        playerStore.changeEpisode(seasonIndex, episodeIndex)
        showPopupStore.close()
    }

    if (groupWatch !== "false" && groupWatch !== "loading") {
        window.location.href = "/room/" + groupWatch
    }

    // If the User is not logged In render this
    if (!userStore.isLoggedIn) {
        return (
            <div className="show-info">
                <img className="show-logo select-none max-h-24 max-w-md md:max-h-40 mx-auto"
                     src={showPopupStore.show.logo} alt=""/>
                <div className="my-1 md:my-5 h-1 rounded">
                </div>
                <div className="flex">
                    {showPopupStore.show.seasons.length > 0 ? (
                        <a onClick={() => playEpisode(0, 0)}
                           className="bg-red-500 hover:bg-red-400 py-2 px-8 text-2xl rounded text-white font-oswald uppercase min-h select-none">
                            Play
                        </a>
                    ) : (
                        <a className="bg-red-500 cursor-pointer hover:bg-red-400 py-2 px-8 text-2xl rounded text-white font-oswald uppercase min-h select-none">
                            Coming soon..
                        </a>
                    )}

                    <button disabled
                            className="bg-gray-800 cursor-not-allowed px-3 ml-4 text-2xl rounded text-white font-oswald uppercase focus:outline-none">
                        <FaPlus/>
                    </button>
                    <button disabled
                            className="bg-gray-800 cursor-not-allowed px-3 ml-4 text-2xl rounded text-white font-oswald uppercase focus:outline-none">
                        <FaUsers/>
                    </button>
                </div>
            </div>
        )
    }

    // Get the player progress of the User
    let watchedProgress = userStore.getWatchedShowProgress(showPopupStore.show, false)
    let watchedProgressTotal = userStore.getWatchedShowProgress(showPopupStore.show, true)

    // If the User is LoggedIn Show this
    return (
        <div className="show-info">
            <img className="show-logo select-none max-h-24 md:max-h-40 max-w-md mx-auto" src={showPopupStore.show.logo}
                 alt=""/>
            <div
                className={watchedProgress <= 0 ? "hidden md:block h-1 rounded my-5" : "hidden md:block h-1 bg-gray-600 rounded my-5"}>
                <div style={{width: watchedProgress + "%"}} className="bg-red-500 h-1 rounded relative"/>
            </div>
            <div className="flex">
                {showPopupStore.show.seasons.length > 0 ? (
                    <Link href="/watch">
                        <a className="bg-red-500 hover:bg-red-400 py-2 px-8 text-2xl rounded text-white font-oswald uppercase min-h select-none"
                           onClick={() => playEpisode(userStore.getLastWatchedEpisode(showPopupStore.show).seasonIndex, userStore.getLastWatchedEpisode(showPopupStore.show).episodeIndex)}>
                            {watchedProgressTotal <= 0 ? "Play" : "Resume"}
                        </a>
                    </Link>
                ) : (
                    <a className="bg-red-500 cursor-pointer hover:bg-red-400 py-2 px-8 text-2xl rounded text-white font-oswald uppercase min-h select-none">
                        Coming soon..
                    </a>
                )}

                <button
                    onClick={() => userStore.toggleWatchLater(showPopupStore.show, () => {
                    })}
                    className="bg-gray-800 hover:bg-gray-600 px-3 ml-4 text-2xl rounded text-white font-oswald uppercase has-tooltip focus:outline-none">
                    {userStore.isInWatchLater(showPopupStore.show.name) ? (
                        <div>
                            <FaCheck/>
                            <span className="tooltip text-2xl p-5">
                                    Remove from list
                                </span>
                        </div>
                    ) : (
                        <div>
                            <FaPlus/>
                            <span className="tooltip text-2xl p-5">
                                    Add to Watch later
                                </span>
                        </div>
                    )}
                </button>
                <button onClick={() => openRoom()}
                        className="bg-gray-800 hover:bg-gray-600 px-3 ml-4 text-2xl rounded text-white font-oswald uppercase has-tooltip focus:outline-none">
                    {groupWatch === "loading" ? (
                        <BiLoaderAlt className="animate-spin"/>
                    ) : (
                        <FaUsers/>
                    )}
                    <span className="tooltip text-2xl p-5">
                            New Group Watch
                        </span>
                </button>
            </div>
        </div>
    )
})

export default ActionBar