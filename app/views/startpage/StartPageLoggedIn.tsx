import React, {useEffect} from "react";
import ShowRow from "../../components/frontpage/ShowRow";
import { showState } from "../../stores/shows/ShowStore";
import userStore from "../../stores/UserStore";
import {observer} from "mobx-react-lite";

const StartPageLoggedIn = observer(({}) => {

    useEffect(() => {
    }, [userStore.watchLater])

    return (
        <div>
            <div>
                <div className="relative" style={{height: "45vh"}}>
                    <div className="overlay-top absolute" style={{height: "55vh"}}>
                        <div className="bg-cover backDrop h-full" style={{backgroundImage: `url('https://cdn.necrocloud.eu/shows/Tokyo-Ghoul/media/background.jpg')`}}/>
                    </div>

                    <div className="absolute bottom-16 transform w-full hidden sm:block">
                        <div className="w-11/12 mx-auto">

                            <img className="max-w-lg" alt="logo"
                                 src="https://cdn.necrocloud.eu/shows/Tokyo-Ghoul/media/logo.png"/>

                            <div className="mt-8 text-center max-w-lg">
                                <button className="bg-red-500 hover:bg-red-400 focus:outline-none text-2xl rounded text-white px-10 py-3 mx-2 font-avenir">
                                    Play
                                </button>
                                <button className="bg-gray-500 hover:bg-gray-400 focus:outline-none text-2xl rounded text-white px-10 py-3 mx-2 font-avenir">
                                    Information
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {userStore.watchLater && userStore.watchLater.length > 0 && (
                    <ShowRow title={userStore.user.name + "'s list"} dataSet={userStore.watchLater} loop={false}/>
                )}

                <ShowRow title="Recommended" dataSet={showState.shows} loop={true}/>

            </div>
        </div>
    )
})

export default StartPageLoggedIn