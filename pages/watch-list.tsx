import Head from 'next/head'
import Navbar from "../app/components/common/navbar/Navbar";
import Footer from "../app/components/common/Footer";
import {useEffect} from "react";
import userStore from "../app/stores/UserStore";
import Router from "next/router";
import Header from "../app/components/common/Header";
import BrowseShows from "../app/views/browse/BrowseShows";
import {observer} from "mobx-react-lite";

const WatchList = observer(() => {

    useEffect(() => {

    }, [userStore.watchLater])

    if (!userStore.isLoggedIn) {
        Router.push({
            pathname: '/login',
        }).then(r => {})

        return (
            <div>

            </div>
        )
    }

    return (
        <div className="min-h-screen w-full">
            <Head>
                <title>MyAnimeAPP</title>
                <link rel="icon" href={"/favicon.ico"} />
            </Head>

            <main>
                <Navbar />
                <Header title="Watch List" subtitle="For a bit of late night binging." />

                <BrowseShows dataSet={userStore.watchLater} />

                <Footer />
            </main>
        </div>
    )
})

export default WatchList
