import {observer} from "mobx-react-lite";
import videojs from 'video.js'
import {useEffect} from "react";
import PlayerOverlay from "./components/PlayerOverlay";
import Router, {useRouter} from "next/router";
import PlayerEventHandler from "./components/PlayerEventHandler";
import PreloaderComponent from "../../common/PreloaderComponent";
import {playerStore} from "../../../app/player/PlayerFacade";
import {formatURL, showPopupStore} from "../../../app/show/ShowFacade";
import PlayerMediaSession from "./components/PlayerMediaSession";

const Player = observer(() => {
    const router = useRouter()
    let player: any = null

    if (playerStore.show == null) {
        router.push("/").then(() => {
        })
    }

    useEffect(() => {

            if (playerStore.hasShow) {
                // Video Options
                let playerOptions = {
                    playsInline: 'auto',
                    controls: true,
                    poster: playerStore.getCurrentEpisode().thumbnail,
                    sources: [{
                        src: playerStore.getCurrentEpisode().videoSource,
                        type: playerStore.getVideoType()
                    }]
                }

                // Init Player
                if (player === null) {
                    if (document.getElementById("player")) {
                        if (videojs.getAllPlayers().length == 0) {
                            player = videojs('player', playerOptions)
                        } else {
                            player = videojs.getPlayer('player')

                            player.poster(playerStore.getCurrentEpisode().thumbnail)
                            player.src(playerStore.getCurrentEpisode().videoSource)
                            player.currentType = playerStore.getVideoType()
                        }

                        PlayerOverlay(player)
                        PlayerEventHandler(player)
                        PlayerMediaSession(player)
                    }
                }

                const closePlayer = () => {
                    Router.push({
                        pathname: '/',
                        query: {show: formatURL(playerStore.show.name)},
                    }).then(() => {
                        showPopupStore.open(playerStore.show)
                    })
                }

                /* Event Listeners */
                document.querySelectorAll('#closeButton').forEach(function (element) {
                    element.addEventListener("click", () => closePlayer())
                });

                return function cleanup() {
                    if (!playerStore.playingNextEpisode) {
                        playerStore.watchSession = 0
                        player.dispose()
                    }
                }
            }
        }
        ,
        [playerStore.currentEpisodeIndex]
    )

    return (
        <div>
            <div className="h-screen bg-black" key='uniqueKey'>
                <div data-vjs-player="">
                    <video autoPlay onContextMenu={(e) => e.preventDefault()} id="player"
                           className="video-player-theme video-js">
                        <source id="video-player-source"/>
                    </video>
                </div>
            </div>


            {!playerStore.loaded && (
                <div className="absolute top-0 left-0 z-10 bg-gray-800 h-screen w-full">
                    <PreloaderComponent/>
                </div>
            )}
        </div>
    )
})

export default Player