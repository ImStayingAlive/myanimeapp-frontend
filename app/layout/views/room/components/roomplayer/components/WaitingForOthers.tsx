import {RiLoader4Line} from "react-icons/ri"
import {observer} from "mobx-react-lite";
import {useEffect} from "react";
import {roomStore} from "../../../../../../room/RoomFacade";

const WaitingForOthers = observer(() => {

    useEffect(() => {
    }, [roomStore.readyPlay])


    if (roomStore.readyPlay) {
        return (
            <></>
        )
    }

    return (
        <div className="h-screen w-full absolute top-0 left-0 relative">
            <div className="h-full w-full bg-richBlack opacity-50 absolute top-0 left-0 z-0" />

            <div className="absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 z-50">
                <div className="p-6 bg-gray-700 select-none rounded-lg flex items-center">
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