import {AppProps} from "next/app";
import {Helmet} from "react-helmet";
import {observer} from "mobx-react-lite";
import '../styles/globals.css'
import Toast from "../layout/common/Toast";
import ShowPopup from "../layout/common/modals/ShowModule/ShowPopup";
import {useEffect} from "react";
import {showStore} from "../app/show/store/ShowStore";
import {loginService, userStore} from "../app/auth/AuthFacade";
import mainStore from "../layout/common/store/MainStore";
import DownView from "../layout/views/error/DownView";

const App = observer(({Component, pageProps}: AppProps) => {

    /* Initial Load Information */
    useEffect(() => {
        showStore.retrieveShows((success) => {
            if (success) {
                loginService.update(() => {
                    if (userStore.isLoggedIn) {
                        mainStore.setLoaded(true)
                    } else {
                        mainStore.setLoaded(true)
                    }
                })
            } else {
                mainStore.setOffline(true)
            }
        })
    }, [userStore.isLoggedIn])

    if (mainStore.offline) {
        return <DownView />
    }

    return (
        <div>
            {/* Body Settings */}
            <Helmet>
                <body className="antialiased font-sans bg-richBlack scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-600"/>
            </Helmet>

            {/* Page Component */}
            <Component {...pageProps} />

            {/* Load Toasts and Popups */}
            <Toast/>
            <ShowPopup/>
        </div>
    )
})

export default App
