import {useRouter} from "next/router";
import Head from "next/head";
import Navbar from "../../app/components/common/navbar/Navbar";
import userStore from "../../app/stores/UserStore";
import StartPageLoggedIn from "../../app/views/startpage/StartPageLoggedIn";
import StartPageLoggedOut from "../../app/views/startpage/StartPageLoggedOut";
import {useEffect} from "react";
import showPopupStore from "../../app/stores/shows/ShowPopupStore";
import {showState, unFormatURL} from "../../app/stores/shows/ShowStore";

const Show = () => {
    const router = useRouter()
    const { showName } = router.query

    useEffect(() => {
        let tempShow: any = showState.getShow(unFormatURL(showName))
        showPopupStore.open(tempShow)
    }, [])

    return (
        <div className="min-h-screen w-full">
            <Head>
                <title>MyAnimeAPP</title>
                <link rel="icon" href={"/favicon.ico"} />
            </Head>

            <main>
                <Navbar />
                {userStore.isLoggedIn ? (
                    <StartPageLoggedIn />
                ): (
                    <StartPageLoggedOut />
                )}
            </main>
        </div>
    )
}

export default Show