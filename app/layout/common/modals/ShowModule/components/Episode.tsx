import {AiOutlinePlayCircle} from "react-icons/ai"
import showPopupStore from "../../../../../show/popup/ShowPopupStore";
import playerStore from "../../../../../player/PlayerStore";
import {useRouter} from "next/router";
import useProgressiveImage from "../../../../../utils/hooks/useProgressiveImage";

const Episode = (props) => {
    const imageLoaded = useProgressiveImage(props.episode.thumbnail)

    const router = useRouter()

    const playEpisode = () => {
        let seasonIndex = showPopupStore.selectedSeason
        let episodeIndex = props.index

        playerStore.setShow(showPopupStore.show)
        playerStore.changeEpisode(seasonIndex, episodeIndex)
        router.push('/watch').then(() => {})
        showPopupStore.close()
    }

    return (
        <div className="flex items-center mb-4 rounded">

            {imageLoaded ? (
                <div className="mr-4">
                    <div onClick={() => playEpisode()}
                         className="w-24 h-16 md:h-28 md:w-48 rounded bg-cover episodeSelector relative"
                         style={{backgroundImage: `url(${props.episode.thumbnail})`}}>
                        {props.groupWatch ? (
                            <button>
                                <div className="overlay rounded w-24 h-16 md:h-28 md:w-48">
                                    <span>
                                         <AiOutlinePlayCircle color="white" size="3rem"/>
                                    </span>
                                </div>
                            </button>
                        ) : (
                            <div className="overlay rounded">
                                <span>
                                    <AiOutlinePlayCircle color="white" size="3rem"/>
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="mr-4">
                    <div onClick={() => playEpisode()}
                         className="w-24 h-16 md:h-28 bg-gray-900 md:w-48 animate-pulse rounded bg-cover episodeSelector relative">
                        {props.groupWatch ? (
                            <button>
                                <div className="overlay rounded w-24 h-16 md:h-28 md:w-48">
                                    <span>
                                         <AiOutlinePlayCircle color="white" size="3rem"/>
                                    </span>
                                </div>
                            </button>
                        ) : (
                            <div className="overlay rounded">
                            <span>
                                <AiOutlinePlayCircle color="white" size="3rem"/>
                            </span>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className="w-full">
                <h4 className="text-md pr-3 md:p-0 md:text-2xl text-white font-bold font-avenir">{props.episode.name}</h4>
                <h5 className="hidden md:block text-md text-gray-100 font-avenir">
                    {props.episode.shortDescription}
                </h5>
            </div>
            <div className="mr-5 hidden lg:block">
                <p className="lg:text-right text-md text-gray-400">
                    {Math.round(props.episode.length / 60)}m
                </p>
            </div>
        </div>
    )
}

export default Episode