import Navbar from "../layout/common/navbar/Navbar";
import {observer} from "mobx-react-lite";
import mainStore from "../layout/common/store/MainStore";
import Preloader from "../layout/common/PreloaderComponent";
import SEOModel from "../app/utils/models/SEOModel";
import SEO from "../layout/common/SEO";

const notFound = observer(() => {

    const SEOData = new SEOModel(
        "MyAnimeApp - Not Found",
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
                </main>
            ) : (
                <Preloader />
            )}
        </div>
    )
})

export default notFound