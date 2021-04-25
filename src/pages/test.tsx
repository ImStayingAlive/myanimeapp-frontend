import videojs from 'video.js'
import {useEffect} from "react";
import reactions from "../app/player/reactions/Reaction";

const test = () => {

    useEffect(() => {
        let playerOptions = {
            playsInline: 'auto',
            controls: true,
            poster: 'https://cdn.necrocloud.eu/shows/weatheringwithyou/Movie/Episode1/thumbnail.png',
            sources: [{
                src: 'https://cdn.necrocloud.eu/shows/weatheringwithyou/Movie/Episode1/video.m3u8',
                type: 'application/x-mpegURL'
            }]
        }
        let player = videojs('player', playerOptions)


        /*-------------*
        * Add Emoji Button to controlbar
        *-------------*/

        let toolbarButton = player.controlBar.addChild("button");
        let reactionIcon = toolbarButton.el();

        reactionIcon.classList.add("reaction-toolbar")

        let reactionDiv = document.createElement('div');
        reactionDiv.classList.add("reaction-div")

        reactionIcon.appendChild(reactionDiv)

        for (let i = 0; i < reactions.length; i++) {
            let currentEmoji = reactions[i]
            let emoji = document.createElement('img');
            emoji.id = currentEmoji.id
            emoji.classList.add("emojiIcon")
            emoji.src = currentEmoji.source
            reactionDiv.appendChild(emoji)
        }
    }, [])

    return (
        <div className="h-screen bg-black" key='uniqueKey'>
            <div data-vjs-player="">
                <video autoPlay onContextMenu={(e) => e.preventDefault()} id="player"
                       className="video-player-theme video-js">
                    <source id="video-player-source"/>
                </video>
            </div>
        </div>
    )
}

export default test