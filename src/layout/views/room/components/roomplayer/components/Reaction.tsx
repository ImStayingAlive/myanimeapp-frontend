import React from "react"
import {Player} from "@lottiefiles/react-lottie-player";

import crying from "../../../../../../../public/lottieFiles/emojis/Crying.json"
import angry from "../../../../../../../public/lottieFiles/emojis/Angry.json"
import heartEyes from "../../../../../../../public/lottieFiles/emojis/Heart Eyes.json"
import laughingTears from "../../../../../../../public/lottieFiles/emojis/Laughing Tears.json"
import shocked from "../../../../../../../public/lottieFiles/emojis/Shocked.json"

const Reaction = (data) => {

    let emoji;
    let icon = false;
    if (data.emoji === "laugh") {
        emoji = laughingTears
    }
    else if (data.emoji === "love") {
        emoji = heartEyes
    }
    else if (data.emoji === "surprised") {
        emoji = shocked
    }
    else if (data.emoji === "cry") {
        emoji = crying
    }
    else if (data.emoji === "angry") {
        emoji = angry
    }
    else {
        emoji = laughingTears
    }

    return (
        <div className="reactionDiv w-min rounded mr-0 ml-auto select-none flex items-center mb-3">
            <h1 className="text-xl font-avenir text-white flex items-center">
                {data.name}
                {icon && (
                    <span className="ml-3">
                        {icon}
                    </span>
                )}
            </h1>
            {emoji && (
                <Player autoplay loop src={emoji} />
            )}
        </div>
    )
}

export default Reaction