import {observer} from "mobx-react-lite";
import videojs from 'video.js'
import playerStore from "../../stores/player/PlayerStore";
import {useEffect} from "react";
import {formatURL, showState} from "../../stores/shows/ShowStore";
import PlayerOverlay from "../../components/player/PlayerOverlay";
import {useRouter} from "next/router";
import OverlayButtons from "../../components/player/OverlayButtons";

const Player = observer(() => {
    const router = useRouter()
    let player: any = null

    if (playerStore.show == null) {
        // Display Last Show/Episode/Season the User Watched
        playerStore.setShow(showState.getShow("attack on titan"));
    }

    /*
    setTimeout(() => {
        playerStore.changeEpisode(0, 1)
    }, 2000)
     */

    useEffect(() => {
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
            }
        }

        player.on("loadeddata", () => {
            if (!playerStore.loaded) {
                PlayerOverlay(player)
                playerStore.setLoaded(true)

                document.querySelectorAll('#closeButton').forEach(function (element) {
                    element.addEventListener("click", () => closePlayer())
                });
                document.querySelectorAll('#skipIntro').forEach(function (element) {
                    element.addEventListener("click", () => player.currentTime(playerStore.getCurrentEpisode().introStart + playerStore.getCurrentEpisode().introLength))
                });
            }
        })

        const closePlayer = () => {
            router.push("/show/" + formatURL(playerStore.show.name)).then(r => {})
        }

        return function cleanup() {
            console.log("Unmount")
            player.dispose()
        }
    }, [playerStore.currentEpisodeIndex])

    return (
        <div>
            <div className="h-screen bg-black" key='uniqueKey'>
                <div data-vjs-player="">
                    <video autoPlay onContextMenu={(e) => e.preventDefault()} id="player"
                           className="video-player-theme video-js">
                        <source id="video-player-source"/>
                    </video>
                    <OverlayButtons />
                </div>
            </div>
            {!playerStore.loaded && (
                <div className="absolute top-0 left-0 z-10 bg-gray-800 h-screen w-full">
                </div>
            )}
        </div>
    )
})

export default Player