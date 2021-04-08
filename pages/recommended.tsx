import Head from 'next/head'
import Navbar from "../app/components/common/navbar/Navbar";
import Footer from "../app/components/common/Footer";
import {useEffect} from "react";
import userStore from "../app/stores/UserStore";
import Router from "next/router";
import Header from "../app/components/common/Header";
import BrowseShows from "../app/views/browse/BrowseShows";
import {observer} from "mobx-react-lite";
import { showState } from '../app/stores/shows/ShowStore';

const Recommended = observer(() => {

    return (
        <div className="min-h-screen w-full">
            <Head>
                <title>MyAnimeAPP</title>
                <link rel="icon" href={"/favicon.ico"} />
            </Head>

            <main>
                <Navbar />
                <Header title="Recommended for you" subtitle="Based on what you have previously watched." />

                <BrowseShows dataSet={showState.shows} />

                <Footer />
            </main>
        </div>
    )
})

export default Recommended
