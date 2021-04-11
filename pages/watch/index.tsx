import Head from "next/head";
import Player from "../../app/layout/views/player/Player";
import {observer} from "mobx-react-lite";

const Watch = observer(() => {


    console.log()

    return (
        <div className="min-h-screen w-full">
            <Head>
                <title>MyAnimeAPP</title>
                <link rel="icon" href={"/favicon.ico"}/>
            </Head>

            <main>
                <Player />
            </main>
        </div>
    );
})

export default Watch