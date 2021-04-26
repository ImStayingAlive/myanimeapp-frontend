import {AppProps} from "next/app";
import {Helmet} from "react-helmet";
import {observer} from "mobx-react-lite";
import '../../styles/globals.css'
import Toast from "../layout/common/Toast";
import ShowPopup from "../layout/common/modals/ShowModule/ShowPopup";
import OpenPopup from "../layout/common/modals/OpenPopup";
import {useEffect} from "react";
import {showStore} from "../app/show/store/ShowStore";
import {loginService, userStore} from "../app/auth/AuthFacade";
import mainStore from "../layout/common/store/MainStore";

const App = observer(({Component, pageProps}: AppProps) => {

    /* Initial Load Information */
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

            {/* See if the popup needs to be opened due to the URL */}
            <OpenPopup/>
        </div>
    )
})

export default App
