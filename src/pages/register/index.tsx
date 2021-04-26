import RegisterView from "../../layout/views/register/RegisterView";
import {observer} from "mobx-react-lite";
import mainStore from "../../layout/common/store/MainStore";
import Navbar from "../../layout/common/navbar/Navbar";
import Footer from "../../layout/common/Footer";
import Preloader from "../../layout/common/PreloaderComponent";
import SEOModel from "../../app/utils/models/SEOModel";
import SEO from "../../layout/common/SEO";

const Register = observer(() => {

    const SEOData = new SEOModel(
        "MyAnimeApp - Register",
        "#DC143C",
        "Register for a free account. Watch hours of Anime. GroupWatch with your friends. Anime watching just became simple and enjoyable!",
        "https://i.imgur.com/EZRvRiG.jpeg",
        "https://anime.necrocloud.eu"
    )

    return (
        <div className="min-h-screen w-full">
            <SEO data={SEOData} />

            {mainStore.loaded ? (
                <main>
                    <Navbar/>
                    <RegisterView/>
                    <Footer/>
                </main>
            ) : (
                <Preloader />
            )}
        </div>
    )
})

export default Register