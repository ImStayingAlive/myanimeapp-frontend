import React from "react";
import {AiOutlinePlayCircle} from "react-icons/ai"
import userStore from "../../../app/auth/user/store/UserStore";
import showPopupStore from "../../../app/show/popup/ShowPopupStore";
import { ShowModel } from '../../../app/show/ShowFacade';
import useProgressiveImage from '../../../app/utils/hooks/useProgressiveImage';
import styles from "../../../../styles/module/ShowCard.module.css"
import Image from "next/image"

const ShowCard = (props) => {

    // Set Data
    const show: ShowModel = props.show
    const loadedBackground = useProgressiveImage(show.background)
    const loadedLogo = useProgressiveImage(show.logo)

    // Get Watch Progress
    let watchedProgress: number = 0;
    let watchedProgressALL: number = 0
    let watchedInfo: { seasonIndex: number; episodeIndex: number }
    if (userStore.isLoggedIn) {
        watchedProgress = userStore.getWatchedShowProgress(show, false)
        watchedProgressALL = userStore.getWatchedShowProgress(show, true)
        watchedInfo = userStore.getLastWatchedEpisode(show)
    }

    if (!loadedLogo || !loadedBackground) {
        return (
            <div
                className="mx-5 h-44 sm:w-96 sm:h-56 shadow bg-gray-800 rounded-md bg-cover bg-center relative shadow showCard">
                <div className="h-full w-full bg-gray-900 animate-pulse rounded-md"/>
            </div>
        )
    }

    if (props.wide) {
        return (
            <div onClick={() => showPopupStore.open(show)}
                 className={"mx-5 h-44 sm:w-96 sm:h-56 shadow hover:shadow-2xl bg-gray-800 rounded-md bg-cover bg-center relative cursor-pointer " + styles.showCard}
                 style={{backgroundImage: `url(${show.background})`}}>

                <Image
                    src={show.logo}
                    alt="Show Logo"
                    width=""
                    height=""
                />

                <div className={"rounded-md " + styles.overlay}>
                    <div className={styles.playDiv}>
                        <AiOutlinePlayCircle color="white" size="3rem"/>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full">
                        <h1 className="text-white text-xl font-avenir px-2">
                            {show.displayName}
                        </h1>
                        {(watchedInfo && watchedProgressALL !== 0) && show.seasons[0].name !== "Movie" ? (
                            <h2 className="text-gray-200 text-sm font-avenir px-2 pb-2">
                                S{show.seasons[watchedInfo.seasonIndex].seasonNumber}:E{watchedInfo.episodeIndex + 1}
                            </h2>
                        ) : (
                            <div className="h-2"/>
                        )}
                        <div style={{width: watchedProgress + "%"}}
                             className="bg-red-500 h-1 rounded-r relative -mt-1"/>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div onClick={() => showPopupStore.open(show)}
             className={"mx-5 h-72 w-56 sm:w-96 sm:h-56 shadow hover:shadow-2xl bg-gray-600 rounded-md bg-cover bg-center relative cursor-pointer " + styles.showCard}
             style={{backgroundImage: `url(${show.background})`}}>

            <Image
                src={show.logo}
                alt="Show Logo"
                width=""
                height=""
            />

            <div className={"rounded-md " + styles.overlay}>
                <div className={styles.playDiv}>
                    <AiOutlinePlayCircle color="white" size="3rem"/>
                </div>
                <div className="absolute bottom-0 left-0 w-full">
                    <h1 className="text-white text-xl font-avenir px-2">
                        {show.displayName}
                    </h1>
                    {(watchedInfo && watchedProgressALL !== 0) && show.seasons[0].name !== "Movie" ? (
                        <h2 className="text-gray-200 text-sm font-avenir px-2 pb-2">
                            S{show.seasons[watchedInfo.seasonIndex].seasonNumber}:E{watchedInfo.episodeIndex + 1}
                        </h2>
                    ) : (
                        <div className="h-2"/>
                    )}
                    <div style={{width: watchedProgress + "%"}}
                         className="bg-red-500 h-1 rounded-r relative -mt-1"/>
                </div>
            </div>
        </div>
    )
}

export default ShowCard