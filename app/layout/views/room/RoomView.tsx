import {useRouter} from "next/router";
import {useEffect} from "react";
import {toast} from "react-toastify";
import PreloaderComponent from "../../common/PreloaderComponent";
import RoomLobby from "./components/roomlobby/RoomLobby";
import {observer} from "mobx-react-lite";
import Head from "next/head";
import Player from "./components/roomplayer/Player";
import {roomStore} from "../../../room/RoomFacade";

const RoomView = observer(() => {
    const router = useRouter()
    const {roomName} = router.query

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
            <main>
                <Head>
                    <title>MyAnimeAPP</title>
                    <link rel="icon" href={"/favicon.ico"}/>
                </Head>
                <PreloaderComponent/>
            </main>
        )
    }

    return (
        <main>
            <Head>
                <title>
                    {roomStore.getOwner().name}'s Room &bull; Watching {roomStore.getShowInfo().displayName}
                </title>
                <link rel="icon" href={"/favicon.ico"}/>
            </Head>
            {roomStore.playing ? (
                <Player />
            ) : (
                <RoomLobby/>
            )}
        </main>
    )
})

export default RoomView