import Show from "../../../classes/Show";
import {useProgressiveImage} from "../../../hooks/useProgressiveImage";
import {AiOutlinePlayCircle} from 'react-icons/ai'
import userStore from "../../../stores/UserStore";
import showPopupStore from "../../../stores/shows/ShowPopupStore";

const ShowCard = (props) => {

    // Set Data
    const show: Show = props.show
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
            <div className="mx-5 w-56 h-72 sm:w-96 sm:h-56 shadow bg-gray-800 rounded-md bg-cover bg-center relative shadow showCard">
                <div className="h-full w-full bg-gray-900 animate-pulse rounded-md" />
            </div>
        )
    }

    if (props.wide) {
        return (
            <div onClick={() => showPopupStore.open(show)}
                 className="mx-5 h-44 sm:w-96 sm:h-56 shadow hover:shadow-2xl bg-gray-600 rounded-md bg-cover bg-center relative showCard cursor-pointer"
                 style={{backgroundImage: `url(${show.background})`}}>

                <img src={show.logo} alt=""/>

                <div className="overlay rounded-md">
                    <div className="playDiv">
                        <AiOutlinePlayCircle color="white" size="3rem"/>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full">
                        <h1 className="text-white text-xl font-avenir px-2">
                            {show.displayName}
                        </h1>
                        {watchedInfo && watchedProgressALL !== 0 ? (
                            <h2 className="text-gray-200 text-sm font-avenir px-2 pb-2">
                                S{watchedInfo.seasonIndex + 1}:E{watchedInfo.episodeIndex + 1}
                            </h2>
                        ): (
                            <div className="h-2" />
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
             className="mx-5 h-72 w-56 sm:w-96 sm:h-56 shadow hover:shadow-2xl bg-gray-600 rounded-md bg-cover bg-center relative showCard cursor-pointer"
             style={{backgroundImage: `url(${show.background})`}}>

            <img src={show.logo} alt=""/>

            <div className="overlay rounded-md">
                <div className="playDiv">
                    <AiOutlinePlayCircle color="white" size="3rem"/>
                </div>
                <div className="absolute bottom-0 left-0 w-full">
                    <h1 className="text-white text-xl font-avenir px-2">
                        {show.displayName}
                    </h1>
                    {watchedInfo && watchedProgressALL !== 0 && show.seasons[0].name !== "Movie" ? (
                        <h2 className="text-gray-200 text-sm font-avenir px-2 pb-2">
                            S{watchedInfo.seasonIndex + 1}:E{watchedInfo.episodeIndex + 1}
                        </h2>
                    ): (
                        <div className="h-2" />
                    )}
                    <div style={{width: watchedProgress + "%"}}
                         className="bg-red-500 h-1 rounded-r relative -mt-1"/>
                </div>
            </div>
        </div>
    )
}

export default ShowCard