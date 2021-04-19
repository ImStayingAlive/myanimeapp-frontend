import Head from "next/head"
import Navbar from "../layout/common/navbar/Navbar";
import Footer from "../layout/common/Footer";
import HomeView from "../layout/views/home/HomeView";

const Home = () => {

  return (
    <div className="min-h-screen w-full">
      <Head>
        <title>MyAnimeAPP</title>
        <link rel="icon" href={"/favicon.ico"} />
      </Head>

      <main>
          <Navbar />
          <HomeView />
          <Footer />
      </main>
    </div>
  )
}

export default Home
