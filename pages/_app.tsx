import '../styles/globals.css'
import Preloader from "../app/components/common/PreloaderComponent";
import mainStore from "../app/stores/MainStore";
import {observer} from "mobx-react-lite";
import {AppProps} from "next/app";
import {useEffect} from "react";
import {showState} from "../app/stores/shows/ShowStore";
import Toast from "../app/components/common/Toast";
import loginService from "../app/service/LoginService";
import userStore from "../app/stores/UserStore";
import {Helmet} from "react-helmet";
import ShowPopup from "../app/components/common/modals/ShowModule/ShowPopup";
import OpenPopup from "../app/components/common/modals/OpenPopup";

const App = observer(({Component, pageProps}: AppProps) => {

    useEffect(() => {
        showState.retrieveShows(() => {
            loginService.update(() => {
                if (userStore.isLoggedIn) {
                    userStore.getWatchLater(() => {
                        mainStore.setLoaded(true)
                    })
                } else {
                    mainStore.setLoaded(true)
                }
            })
        })
    }, [userStore.isLoggedIn])

    if (!mainStore.loaded) {
        return <Preloader/>
    }

    return (
        <div>
            <Helmet>
                <body className="antialiased font-sans bg-richBlack scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-600"/>
            </Helmet>
            <Component {...pageProps} />
            <Toast/>
            <ShowPopup/>
            <OpenPopup />
        </div>
    )
})

export default App
