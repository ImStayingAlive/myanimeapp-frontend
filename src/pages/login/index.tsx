import Navbar from "../../layout/common/navbar/Navbar";
import LoginPage from "../../layout/views/login/LoginPage";
import {observer} from "mobx-react-lite";
import mainStore from "../../layout/common/store/MainStore";
import Footer from "../../layout/common/Footer";
import Preloader from "../../layout/common/PreloaderComponent";
import SEOModel from "../../app/utils/models/SEOModel";
import SEO from "../../layout/common/SEO";

const Login = observer(() => {

    const SEOData = new SEOModel(
        "MyAnimeApp - Login",
        "#DC143C",
        "Login to your account and continue watching! Endless hours of entertainment await you.",
        "https://i.imgur.com/EZRvRiG.jpeg",
        "https://anime.necrocloud.eu"
    )

    return (
        <div className="min-h-screen w-full">
            <SEO data={SEOData} />

            {mainStore.loaded ? (
                <main>
                    <Navbar/>
                    <LoginPage/>
                    <Footer/>
                </main>
            ) : (
                <Preloader />
            )}
        </div>
    );
})

export default Login