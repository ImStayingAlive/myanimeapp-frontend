import SEOModel from "../../app/utils/models/SEOModel";
import SEO from "../../layout/common/SEO";
import mainStore from "../../layout/common/store/MainStore";
import Navbar from "../../layout/common/navbar/Navbar";
import Header from "../../layout/common/Header";
import Footer from "../../layout/common/Footer";
import Preloader from "../../layout/common/PreloaderComponent";
import {observer} from "mobx-react-lite";
import PreferencesView from "../../layout/views/settings/PreferencesView";
import {userStore} from "../../app/auth/AuthFacade";

const preferences = observer(() => {

    const SEOData = new SEOModel(
        "MyAnimeApp - Preferences",
        "#DC143C",
        "Watch Anime for Free!",
        "https://i.imgur.com/EZRvRiG.jpeg",
        "https://anime.necrocloud.eu"
    )

    return (
        <div className="min-h-screen w-full">
            <SEO data={SEOData} />

            {mainStore.loaded && userStore.isLoggedIn ? (
                <main>
                    <Navbar />
                    <Header title="Preferences" subtitle="" />

                    <PreferencesView />

                    <Footer />
                </main>
            ) : (
                <Preloader />
            )}
        </div>
    )
})

export default preferences