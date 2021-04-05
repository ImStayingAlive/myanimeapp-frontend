import '../styles/globals.css'
import Preloader from "../app/components/common/PreloaderComponent";
import mainStore from "../app/stores/MainStore";
import {observer} from "mobx-react-lite";
import {AppProps} from "next/app";
import {useEffect} from "react";
import showState from "../app/stores/shows/ShowStore";

const App = observer(({Component, pageProps}: AppProps) => {

  useEffect(() => {
    showState.retrieveShows(() => {
      mainStore.loaded = true
      console.table(showState.shows)
    })
  }, [])

  if(!mainStore.loaded) {
    return <Preloader />
  }

  return <Component {...pageProps} />
})

export default App
