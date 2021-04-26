import {useEffect} from "react";
import {AppProps} from "next/app";
import {Helmet} from "react-helmet";
import {observer} from "mobx-react-lite";
import {showStore} from "../app/show/ShowFacade";
import {loginService, userStore} from "../app/auth/AuthFacade"
import mainStore from "../layout/common/store/MainStore";
import '../../styles/globals.css'
import Preloader from "../layout/common/PreloaderComponent";
import Toast from "../layout/common/Toast";
import ShowPopup from "../layout/common/modals/ShowModule/ShowPopup";
import OpenPopup from "../layout/common/modals/OpenPopup";
import Head from "next/head";

const App = observer(({Component, pageProps}: AppProps) => {

    useEffect(() => {
        showStore.retrieveShows(() => {
            loginService.update(() => {
                if (userStore.isLoggedIn) {
                    mainStore.setLoaded(true)
                } else {
                    mainStore.setLoaded(true)
                }
            })
        })
    }, [userStore.isLoggedIn])

    if (!mainStore.loaded) {
        return <>
                    <Head>
                        <title>
                            GroupWatch invite.
                        </title>
                        <meta property="og:url" content="https://anime.necrocloud.eu" />
                        <meta property="og:type" content="website" />
                        <meta property="og:title" content="You have been invited to a GroupWatch session! Join now." />
                        <meta name="twitter:card" content="summary" />
                        <meta
                            property="og:description"
                            content=""
                        />
                        <meta property="og:site_name" content="MyAnimeApp" />
                        <meta property="og:image" content="https://i.imgur.com/O4iLnbg.jpeg" />
                    </Head>
                    <Preloader/>
               </>
    }

    return (
        <div>
            <Helmet>
                <body className="antialiased font-sans bg-richBlack scrollbar-thin
                                 scrollbar-thumb-gray-900 scrollbar-track-gray-600"/>
            </Helmet>

            {/* Page Component */}
            <Component {...pageProps} />

            {/* Load Toasts and Popups */}
            <Toast/>
            <ShowPopup/>

            {/* See if the popup needs to be opened due to the URL */}
            <OpenPopup/>
        </div>
    )
})

export default App
