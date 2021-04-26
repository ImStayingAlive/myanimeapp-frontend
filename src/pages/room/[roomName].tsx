import RoomView from "../../layout/views/room/RoomView";
import Head from "next/head"

const Room = () => {

    return (
        <div>
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
                <meta property="og:image" content="https://i.imgur.com/O4iLnbg.jpeg" />
            </Head>
            <div className="min-h-screen w-full">
                <main>
                    <RoomView />
                </main>
            </div>
        </div>
    )
}

export default Room