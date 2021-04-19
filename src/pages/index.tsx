import Navbar from "../layout/common/navbar/Navbar";
import Footer from "../layout/common/Footer";
import HomeView from "../layout/views/home/HomeView";
import {NextSeo} from "next-seo";

const Home = () => {

  return (
    <div className="min-h-screen w-full">
        <NextSeo
            title="MyAnimeApp"
            description="Watch Anime for free!"
            canonical="https://anime.necrocloud.eu"
            openGraph={{
                type: 'website',
                url: 'https://anime.necrocloud.eu',
                title: "MyAnimeApp",
                description: "Watch Anime for free!",
                images: [
                    {
                        url: "https://i.imgur.com/qpA9l44.jpg",
                        alt: 'Show background image',
                    }
                ],
                site_name: 'MyAnimeApp',
            }}
            twitter={{
                handle: '@Home',
                site: '@MyAnimeApp',
                cardType: 'summary_large_image',
            }}
        />

      <main>
          <Navbar />
          <HomeView />
          <Footer />
      </main>
    </div>
  )
}

export default Home
