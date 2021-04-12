import {observer} from "mobx-react-lite";
import videojs from 'video.js'
import {useEffect} from "react";
import PlayerOverlay from "./components/PlayerOverlay";
import PlayerEventHandler from "./components/PlayerEventHandler";
import {playerController, roomStore} from "../../../../../room/RoomFacade"
import WaitingForOthers from "./components/WaitingForOthers";

const Player = observer(() => {
    let player: any = null

    useEffect(() => {
        if (roomStore.loaded) {
            // Video Options
            let playerOptions = {
                playsInline: 'auto',
                controls: true,
                poster: roomStore.getCurrentEpisode().thumbnail,
                sources: [{
                    src: roomStore.getCurrentEpisode().videoSource,
                    type: roomStore.getVideoType()
                }]
            }

            // Init Player
            if (player === null) {
                if (document.getElementById("player")) {
                    if (videojs.getAllPlayers().length == 0) {
                        player = videojs('player', playerOptions)
                    } else {
                        player = videojs.getPlayer('player')

                        player.poster(roomStore.getCurrentEpisode().thumbnail)
                        player.src(roomStore.getCurrentEpisode().videoSource)
                        player.currentType = roomStore.getVideoType()
                    }
                    PlayerOverlay(player)
                    PlayerEventHandler(player)
                    playerController.setPlayer(player)
                }
            }

            const closePlayer = () => {
                roomStore.playing = false
            }

            /* Event Listeners */
            document.querySelectorAll('#closeButton').forEach(function (element) {
                element.addEventListener("click", () => closePlayer())
            });

            return function cleanup() {
                player.dispose()
            }
        }
    }, [])

    return (
        <div>
            <div className="h-screen bg-black" key='uniqueKey'>
                <div data-vjs-player="">
                    <video autoPlay onContextMenu={(e) => e.preventDefault()} id="player"
                           className="video-player-theme video-js">
                        <source id="video-player-source"/>
                    </video>
                    <WaitingForOthers />
                </div>
            </div>
        </div>
    )
})

export default Player