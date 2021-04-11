import Head from 'next/head'
import Navbar from "../app/layout/common/navbar/Navbar";
import Footer from "../app/layout/common/Footer";
import {useEffect} from "react";
import userStore from "../app/auth/user/store/UserStore";
import Router from "next/router";
import Header from "../app/layout/common/Header";
import BrowseShows from "../app/layout/views/browse/BrowseShows";
import {observer} from "mobx-react-lite";

const WatchList = observer(() => {

    useEffect(() => {

    }, [userStore.watchLater])

    if (!userStore.isLoggedIn) {
        Router.push({
            pathname: '/login',
        }).then(() => {})

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
