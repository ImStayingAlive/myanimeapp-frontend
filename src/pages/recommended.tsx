import Navbar from "../layout/common/navbar/Navbar";
import Footer from "../layout/common/Footer";
import Header from "../layout/common/Header";
import BrowseShows from "../layout/views/browse/BrowseShows";
import {observer} from "mobx-react-lite";
import {showStore} from "../app/show/ShowFacade";
import mainStore from "../layout/common/store/MainStore";
import Preloader from "../layout/common/PreloaderComponent";
import SEOModel from "../app/utils/models/SEOModel";
import SEO from "../layout/common/SEO";

const Recommended = observer(() => {

    const SEOData = new SEOModel(
        "MyAnimeApp - Recommended",
        "#DC143C",
        "Watch Anime for Free!",
        "https://i.imgur.com/EZRvRiG.jpeg",
        "https://anime.necrocloud.eu"
    )

    return (
        <div className="min-h-screen w-full">
            <SEO data={SEOData} />

            {mainStore.loaded ? (
                <main>
                    <Navbar />
                    <Header title="Recommended for you" subtitle="Based on what you have previously watched." />

                    <BrowseShows dataSet={showStore.recommended} />

                    <Footer />
                </main>
            ) : (
                <Preloader />
            )}
        </div>
    )
})

export default Recommended
