import RoomView from "../../layout/views/room/RoomView";
import {observer} from "mobx-react-lite";
import mainStore from "../../layout/common/store/MainStore";
import Preloader from "../../layout/common/PreloaderComponent";
import SEOModel from "../../app/utils/models/SEOModel";
import SEO from "../../layout/common/SEO";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {RoomModel, roomStore} from "../../app/room/RoomFacade";
import {toast} from "react-toastify";
import {api, userStore} from "../../app/auth/AuthFacade";
import LoginPage from "../../layout/views/login/LoginPage";
import { createCanvas, loadImage } from "canvas"

// @ts-ignore
const Room = observer(({data}) => {

    const router = useRouter()
    const {roomName} = router.query


    useEffect(() => {
        if (mainStore.loaded) {
            roomStore.openConnection(roomName, (status) => {
                if (!status) {
                    router.push("/").then(() => {
                        toast.error("The room was not found.")
                    })
                }
            })
        }

        return function cleanup() {
            roomStore.disconnect()
        }
    }, [mainStore.loaded])

    const SEOData = new SEOModel(
        "MyAnime - Watch " + data.showName,
        "#1E90FF",
        data.userName + " invited you to join their GroupWatch! Join them now and begin watching " + data.showName + "!",
        data.showImage,
        "https://anime.necrocloud.eu"
    )

    return (
        <div className="min-h-screen w-full">
            <SEO data={SEOData}/>

            {mainStore.loaded ? (
                <main>
                    {userStore.isLoggedIn ? (
                        <RoomView/>
                    ) : (
                        <LoginPage/>
                    )}
                </main>
            ) : (
                <Preloader/>
            )}

        </div>
    )
})

// This gets called on every request
export async function getServerSideProps(context) {
    let data = {
        ownerName: "",
        showName: "",
        showImage: ""
    }
    const {roomName} = context.query

    await api.get("/room/find/" + roomName)
        .then((response) => {
            data.ownerName = response.data.owner.user.name
            data.showName = response.data.roomShow.show.displayName
            data.showImage = generateImage(response.data.owner.user.name, response.data.roomShow.show.displayName)
        })

    return {props: {data}}
}

const generateImage = (userName, showName) => {
    const width = 1200
    const height = 500

    const canvas = createCanvas(width, height)
    const context = canvas.getContext('2d')

    context.fillStyle = '#031d54'
    context.fillRect(0, 0, width, height)

    context.font = 'bold 70pt Avenir Heavy'
    context.textAlign = 'center'
    context.textBaseline = 'top'
    context.fillStyle = '#fff'

    context.fillText(userName + ' invited you', 600, 150)

    context.font = 'bold 30pt Avenir Heavy'
    context.fillText('to watch ' + showName + '!', 600, 275)

    context.font = 'bold 30pt Bebas Neue'
    context.fillStyle = '#ef4444'
    context.fillText('My', 510, 400)
    context.fillStyle = '#fff'
    context.fillText('AnimeApp', 640, 400)

    return canvas.toDataURL('image/png')
}

export default Room