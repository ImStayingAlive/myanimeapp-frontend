import Navbar from "../layout/common/navbar/Navbar";
import Footer from "../layout/common/Footer";
import {useEffect} from "react";
import userStore from "../app/auth/user/store/UserStore";
import Router from "next/router";
import Header from "../layout/common/Header";
import BrowseShows from "../layout/views/browse/BrowseShows";
import {observer} from "mobx-react-lite";
import mainStore from "../layout/common/store/MainStore";
import Preloader from "../layout/common/PreloaderComponent";
import {toast} from "react-toastify";
import SEOModel from "../app/utils/models/SEOModel";
import SEO from "../layout/common/SEO";

const WatchList = observer(() => {

    const SEOData = new SEOModel(
        "MyAnimeApp - Search",
        "#DC143C",
        "Watch Anime for Free!",
        "https://i.imgur.com/EZRvRiG.jpeg",
        "https://anime.necrocloud.eu"
    )

    useEffect(() => {
    }, [userStore.watchLater])

    if (!userStore.isLoggedIn) {
        Router.push({
            pathname: '/login',
        }).then(() => {
            toast("Please login first!")
        })
    }

    return (
        <div className="min-h-screen w-full">
            <SEO data={SEOData} />

            {mainStore.loaded && userStore.isLoggedIn ? (
                <main>
                    <Navbar />
                    <Header title="Watch List" subtitle="For a bit of late night binging." />

                    <BrowseShows dataSet={userStore.watchLater} />

                    <Footer />
                </main>
            ) : (
                <Preloader />
            )}
        </div>
    )
})

export default WatchList
