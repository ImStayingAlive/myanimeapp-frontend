import Navbar from "../layout/common/navbar/Navbar";
import Footer from "../layout/common/Footer";
import {observer} from "mobx-react-lite";
import mainStore from "../layout/common/store/MainStore";
import Preloader from "../layout/common/PreloaderComponent";
import Search from "../layout/views/browse/Search";
import SEOModel from "../app/utils/models/SEOModel";
import SEO from "../layout/common/SEO";

const Recommended = observer(() => {

    const SEOData = new SEOModel(
        "MyAnimeApp - Search",
        "#DC143C",
        "Watch Anime for Free!",
        "https://i.imgur.com/EZRvRiG.jpeg",
        "https://anime.necrocloud.eu"
    )

    return (
        <div className="w-full">
            <SEO data={SEOData} />

            {mainStore.loaded ? (
                <main>
                    <Navbar />
                    <Search />
                    <Footer />
                </main>
            ) : (
                <Preloader />
            )}
        </div>
    )
})

export default Recommended
