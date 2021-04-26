import RoomView from "../../layout/views/room/RoomView";
import {observer} from "mobx-react-lite";
import mainStore from "../../layout/common/store/MainStore";
import Preloader from "../../layout/common/PreloaderComponent";
import SEOModel from "../../app/utils/models/SEOModel";
import SEO from "../../layout/common/SEO";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {roomStore} from "../../app/room/RoomFacade";
import {toast} from "react-toastify";
import {userStore} from "../../app/auth/AuthFacade";
import LoginPage from "../../layout/views/login/LoginPage";

const Room = observer(() => {

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

    const SEOData = new SEOModel(
        "MyAnimeApp - GroupWatch",
        "#1E90FF",
        "You were invited to join a GroupWatch! Click on the invite link, sign in and begin watching with your friends.",
        "https://i.imgur.com/EZRvRiG.jpeg",
        "https://anime.necrocloud.eu"
    )

    return (
        <div className="min-h-screen w-full">
            <SEO data={SEOData} />

            {mainStore.loaded ? (
                <main>
                    {userStore.isLoggedIn ? (
                        <RoomView />
                    ): (
                        <LoginPage />
                    )}
                </main>
            ) : (
                <Preloader />
            )}

        </div>
    )
})

export default Room