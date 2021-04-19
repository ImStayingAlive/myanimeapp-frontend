import Head from 'next/head'
import Navbar from "../layout/common/navbar/Navbar";
import Footer from "../layout/common/Footer";
import Header from "../layout/common/Header";
import BrowseShows from "../layout/views/browse/BrowseShows";
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
                <Header title="New Seasons" subtitle="New seasons of your favorite shows." />

                <BrowseShows dataSet={showStore.shows} />

                <Footer />
            </main>
        </div>
    )
})

export default Recommended
