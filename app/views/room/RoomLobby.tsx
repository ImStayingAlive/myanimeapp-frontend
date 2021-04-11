import Navbar from "../../components/common/navbar/Navbar";
import Footer from "../../components/common/Footer";
import roomStore from "../../stores/room/RoomStore";
import userStore from "../../stores/UserStore";
import UserAvatar from "../../components/room/UserAvatar";
import InviteOthers from "../../components/room/InviteOthers";
import Link from "next/link"
import {observer} from "mobx-react-lite";

const RoomLobby = observer(() => {

    return (
        <div>
            <div style={{minHeight: "90.8vh"}}>
                <Navbar/>
                <div className="relative">
                    <div className="lobby-bg absolute">
                        <div className="bg-cover backDrop h-full"
                             style={{backgroundImage: `url(${roomStore.getShowInfo().background})`}}/>
                    </div>
                    <div className="w-9/12 mx-auto pt-44 relative">
                        <h1 className="text-6xl text-white font-avenir">
                            {roomStore.getOwner().name}'s room <sup
                            className="text-2xl bg-red-400 px-3 py-1 rounded-2xl">BETA</sup>
                        </h1>
                        <div className="text-3xl text-gray-400 mb-5">

                                <h3>
                                    Waiting for host to start <span className="text-red-400">playback</span>...
                                </h3>

                        </div>

                        <div className="xl:flex justify-between w-full items-center">

                            <div className="max-w-xl">
                                <div className="w-80 h-48 mt-6 rounded bg-cover episodeSelector relative"
                                     style={{backgroundImage: `url(${roomStore.getCurrentEpisode().thumbnail})`}}>
                                </div>

                                <h2 className="text-5xl font-bold font-avenir text-white pt-5">
                                    {roomStore.getShowInfo().displayName}
                                </h2>
                                {roomStore.getCurrentSeason().name !== "Movie" ? (
                                    <div>
                                        <h4 className="text-3xl text-white font-avenir pt-5">
                                            S{roomStore.getCurrentSeason().seasonNumber} E{roomStore.room.roomShow.episodeIndex + 1}: {roomStore.getCurrentEpisode().name}
                                        </h4>
                                        <h5 className="text-lg text-gray-100 font-avenir">
                                            {roomStore.getCurrentEpisode().shortDescription}
                                        </h5>
                                        {roomStore.getOwner().name === userStore.user.name && (
                                            <button className="font-avenir text-md text-blue-400 hover:text-blue-300 cursor-pointer focus:outline-none">
                                                Change Episode
                                            </button>
                                        )}
                                    </div>
                                ) : (
                                    <div className="max-h-40 scrollbar-thin -ml-3 scrollbar-thumb-red-400 overflow-y-scroll overflow-x-hidden" style={{direction: "rtl"}}>
                                        <h5 className="text-lg text-gray-100 font-avenir pl-4" style={{direction: "ltr"}}>
                                            {roomStore.getShowInfo().description}
                                        </h5>
                                    </div>
                                )}

                                <div className="mt-10">
                                    {roomStore.getOwner().name === userStore.user.name && !roomStore.playing && (
                                        <button className="bg-red-700 mr-4 hover:bg-red-600 p-4 text-white rounded font-avenir text-lg focus:outline-none">
                                            Start Stream
                                        </button>
                                    )}

                                    {roomStore.room.running && roomStore.getOwner().name !== userStore.user.name && (
                                        <button className="bg-red-700 mr-4 hover:bg-red-600 p-4 text-white rounded font-avenir text-lg focus:outline-none">
                                            Join Stream
                                        </button>
                                    )}

                                    <Link href="/">
                                        <a className="bg-gray-900 hover:bg-gray-700 p-4 rounded text-white font-avenir text-lg focus:outline-none">
                                            Leave room
                                        </a>
                                    </Link>
                                </div>
                            </div>

                            <div className="flex mt-8 xl:mt-0 items-center">
                                <div className="sm:-space-x-4">

                                    {roomStore.room.ownerConnected && (
                                        <UserAvatar user={roomStore.getOwner()} owner={true}/>
                                    )}

                                    {roomStore.room.users.map((user, index) =>
                                        <UserAvatar key={index} user={user.user} owner={false}/>
                                    )}

                                </div>

                                <InviteOthers roomId={roomStore.room.name}/>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
})

export default RoomLobby