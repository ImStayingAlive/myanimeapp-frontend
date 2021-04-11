import Head from 'next/head'
import Navbar from "../app/layout/common/navbar/Navbar";
import Footer from "../app/layout/common/Footer";
import Header from "../app/layout/common/Header";
import BrowseShows from "../app/layout/views/browse/BrowseShows";
import {observer} from "mobx-react-lite";
import {showStore} from "../app/show/ShowFacade";

const Recommended = observer(() => {

    return (
        <div className="min-h-screen w-full">
            <Head>
                <title>MyAnimeAPP</title>
                <link rel="icon" href={"/favicon.ico"} />
            </Head>

            <main>
                <Navbar />
                <Header title="Recently added" subtitle="New and popular shows." />

                <BrowseShows dataSet={showStore.shows} />

                <Footer />
            </main>
        </div>
    )
})

export default Recommended
