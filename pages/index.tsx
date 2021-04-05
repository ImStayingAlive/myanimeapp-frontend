import Head from 'next/head'
import StartPageLoggedOut from "../app/views/startpage/StartPageLoggedOut";
import Navbar from "../app/components/common/navbar/Navbar";

export default function Home() {

  return (
    <div className="min-h-screen w-full">
      <Head>
        <title>MyAnimeAPP</title>
        <link rel="icon" href={"/favicon.ico"} />
      </Head>

      <main>
          <Navbar />s
          <StartPageLoggedOut />
      </main>
    </div>
  )
}
