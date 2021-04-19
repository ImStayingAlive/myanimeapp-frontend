import Head from "next/head";
import {observer} from "mobx-react-lite";
import Player from "../../layout/views/player/Player";

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