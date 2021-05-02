import {SplideSlide} from '@splidejs/react-splide';
import { ShowModel, showPopupStore } from '../../../../../../app/show/ShowFacade';
import styles from "../../../../../../styles/module/StartPage.module.css"
import {playerStore} from "../../../../../../app/player/PlayerFacade";
import {userStore} from "../../../../../../app/auth/AuthFacade";
import React from "react";
import Link from "next/link";

const TopSpliderPage = (props) => {

    if (props.show) {
        const show: ShowModel = props.show;

        // Play the selected Episode
        const playEpisode = (seasonIndex: number, episodeIndex: number) => {
            playerStore.setShow(show)
            playerStore.changeEpisode(seasonIndex, episodeIndex)
        }

        // Get the player progress of the User
        let watchedProgressTotal = userStore.getWatchedShowProgress(show, true)

        return (
            <SplideSlide className={styles.startPageSlider}>
                <div className="relative" style={{height: "40rem"}}>
                    <div className={styles.topSection}>
                        <div className={styles.backDrop} style={{backgroundImage: `url(${show.background})`, backgroundPosition: props.background}}/>
                    </div>

                    <div className="absolute w-full bottom-1/2 transform translate-y-1/2">
                        <div className="w-11/12 mx-auto">
                            <div className="w-max">

                                <img className="transform transition ease-in-out select-none scale-100 hover:scale-110 cursor-pointer" onClick={() => showPopupStore.open(show)} style={{width: "35rem"}}
                                     src={show.logo} alt=""/>

                            <div className="mt-8 w-max mx-auto">
                                {show.seasons.length > 0 ? (
                                    <Link href="/watch">
                                        <button onClick={() => playEpisode(userStore.getLastWatchedEpisode(show).seasonIndex, userStore.getLastWatchedEpisode(show).episodeIndex)} className="bg-red-500 hover:bg-red-400 focus:outline-none text-2xl rounded text-white px-10 py-3 mx-4 font-avenir">
                                            {watchedProgressTotal <= 0 ? "Play" : "Resume"}
                                        </button>
                                    </Link>
                                ) : (
                                    <button className="bg-red-500 hover:bg-red-400 focus:outline-none text-2xl rounded text-white px-10 py-3 mx-4 font-avenir">
                                        Coming soon
                                    </button>
                                )}
                                <button onClick={() => showPopupStore.open(show.name)} className="bg-gray-500 hover:bg-gray-400 focus:outline-none text-2xl rounded text-white px-10 py-3 mx-4 font-avenir">
                                    Information
                                </button>
                            </div>

                            </div>
                        </div>
                    </div>
                </div>
            </SplideSlide>
        )
    }

    return (
        <div />
    )
}

export default TopSpliderPage