import {RiLoader4Line} from "react-icons/ri"
import {observer} from "mobx-react-lite";
import {useEffect} from "react";
import { roomStore } from "../../../../../../app/room/RoomFacade";
import {Player} from "@lottiefiles/react-lottie-player";
import LottieLoader from '../../../../../../../public/lottiefiles/anime/narutoSleeping.json'

const WaitingForOthers = observer(() => {

    useEffect(() => {
    }, [roomStore.readyPlay])


    if (roomStore.readyPlay) {
        return (
            <></>
        )
    }

    return (
        <div className="h-screen w-full absolute top-0 left-0 relative z-50">
            <div className="h-full w-full bg-richBlack opacity-75 absolute top-0 left-0 z-0" />

            <div className="absolute left-1/2 top-1/3 transform -translate-x-1/2 z-50">
                <Player autoplay style={{width: "200px", height: "200px"}} loop src={LottieLoader} />
                <div className="p-6 bg-gray-700 -mt-5 select-none rounded-lg flex items-center relative z-20">
                    <RiLoader4Line className="animate-spin text-gray-200" size="1.6rem" />
                    <span className="pl-3 font-avenir text-xl text-gray-200">
                        Waiting for other users to load.
                    </span>
                </div>
            </div>
        </div>
    )
})

export default WaitingForOthers