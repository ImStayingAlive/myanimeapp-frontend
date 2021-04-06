import Head from 'next/head'
import StartPageLoggedOut from "../app/views/startpage/StartPageLoggedOut";
import Navbar from "../app/components/common/navbar/Navbar";
import userStore from "../app/stores/UserStore";
import StartPageLoggedIn from "../app/views/startpage/StartPageLoggedIn";
import Footer from "../app/components/common/Footer";
import {observer} from "mobx-react-lite";

const Home = observer(() => {

  return (
    <div className="min-h-screen w-full">
      <Head>
        <title>MyAnimeAPP</title>
        <link rel="icon" href={"/favicon.ico"} />
      </Head>

      <main>
          <Navbar />
          {userStore.isLoggedIn ? (
              <StartPageLoggedIn />
          ): (
              <StartPageLoggedOut />
          )}
          <Footer />
      </main>
    </div>
  )
})

export default Home
