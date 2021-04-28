import {useEffect} from "react";
import RoomLobby from "./components/roomlobby/RoomLobby";
import {observer} from "mobx-react-lite";
import Player from "./components/roomplayer/Player";
import { roomStore } from "../../../app/room/RoomFacade";
import Preloader from "../../common/PreloaderComponent";

const RoomView = observer(() => {

    useEffect(() => {
    }, [roomStore])

    if (!roomStore.loaded) {
        return <Preloader/>
    }

    return (
        <main>
            {roomStore.playing ? (
                <Player />
            ) : (
                <RoomLobby/>
            )}
        </main>
    )
})

export default RoomView