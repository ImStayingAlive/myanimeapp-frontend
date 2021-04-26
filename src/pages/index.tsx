import Navbar from "../layout/common/navbar/Navbar";
import Footer from "../layout/common/Footer";
import HomeView from "../layout/views/home/HomeView";
import mainStore from "../layout/common/store/MainStore";
import SEO from "../layout/common/SEO";
import Preloader from "../layout/common/PreloaderComponent";
import {observer} from "mobx-react-lite";
import SEOModel from "../app/utils/models/SEOModel";

const Home = observer(() => {

    const SEOData = new SEOModel(
        "MyAnimeApp",
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
                    <Navbar/>
                    <HomeView/>
                    <Footer/>
                </main>
            ) : (
                <Preloader />
            )}
        </div>
    )
})

export default Home
