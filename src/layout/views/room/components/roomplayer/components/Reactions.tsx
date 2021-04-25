import {observer} from "mobx-react-lite";
import Reaction from "./Reaction";
import { useEffect } from "react";
import reactionStore from "../../../../../../app/room/reactions/ReactionStore";

const Reactions = observer(() => {

    useEffect(() => {
    }, [reactionStore.rerender])

    return (
        <div className="vjs-overlay z-10 text-right top-16 right-5 hidden lg:block">

            {Object.keys(reactionStore.reactions).map((value) =>
                <Reaction key={value} name={reactionStore.reactions[value].name} emoji={reactionStore.reactions[value].emoji} />
            )}
        </div>
    )
})

export default Reactions