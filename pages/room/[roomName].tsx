import { useRouter } from "next/router"
import {useEffect} from "react"
import roomStore from "../../app/player/room/store/RoomStore";
import RoomLobby from "../../app/layout/views/room/components/roomlobby/RoomLobby";
import PreloaderComponent from "../../app/layout/common/PreloaderComponent";
import {observer} from "mobx-react-lite";
import {toast} from "react-toastify";

const Room = observer(() => {

    const router = useRouter()
    const { roomName } = router.query

    useEffect(() => {
        roomStore.openConnection(roomName, (status) => {
            if (!status) {
                router.push("/").then(() => {
                    toast.error("The room was not found.")
                })
            }
        })

        return function cleanup() {
            roomStore.disconnect()
        }
    }, [])

    useEffect(() => {
    }, [roomStore])

    if (!roomStore.loaded) {
        return (
            <PreloaderComponent />
        )
    }

    if (roomStore.playing) {
        return (
            <h1>Player goes here!</h1>
        )
    }

    return (
        <RoomLobby />
    )
})

export default Room