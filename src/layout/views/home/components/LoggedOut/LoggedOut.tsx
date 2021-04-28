import {FaUsers} from "react-icons/fa";
import {RiRemoteControlLine} from "react-icons/ri";
import {CgPlayButtonO} from "react-icons/cg";
import {BiTime} from  "react-icons/bi"
import styles from "../../../../../styles/module/Landingpage.module.css"

import FeatureList from "./FeatureList";
import Link from "next/link"

const StartPageLoggedOut = () => {

    return (
        <div className={styles.landingPage}>
            <div style={{height: "65vh"}}>

                <div className={"overflow-visible " + styles.topSection} style={{height: "55vh"}}>
                    <div className={"bg-cover h-full " + styles.backDrop}
                         style={{backgroundImage: `url('https://images.hdqwalls.com/download/anime-landscape-d5-1366x768.jpg')`}}/>
                </div>

                <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/3 text-center">

                    <h1 className="text-5xl text-white font-avenir">
                        Welcome to MyAnimeApp!
                    </h1>
                    <h2 className="text-2xl text-gray-300 font-avenir mt-3">
                        Begin watching now by searching for an anime or using one of our generated selections!<br />
                        In order to use all of our features please..
                    </h2>

                    <div className="mt-10">
                        <Link href="/login">
                            <a className="bg-blue-500 hover:bg-blue-600 py-4 px-10 font-avenir text-white text-2xl rounded-xl">
                                Login
                            </a>
                        </Link>
                        <Link href="/register">
                            <a className="bg-gray-500 hover:bg-gray-600 py-4 px-10 font-avenir text-white text-2xl rounded-xl ml-4">
                                Signup
                            </a>
                        </Link>
                    </div>

                </div>

            </div>

            <section className="px-6 xl:px-0 text-center">
                <h1 className="text-white text-5xl font-avenir mb-2">
                    What makes us different?
                </h1>
                <div className="4xl:w-1/2 w-3/4 mx-auto mt-8 mb-16">
                    <div className="lg:flex items-center justify-between lg:-mx-5">
                        <FeatureList title="Watch your Anime!"
                                     subtitle="What your favorite anime for free and without ads!"
                                     icon={<CgPlayButtonO size="7.5rem"/>} color="text-red-400"/>

                        <FeatureList title="Use our web player!"
                                     subtitle="Skip the OP or play the next episode afterwards."
                                     icon={<RiRemoteControlLine size="7.5rem"/>} color="text-blue-300"/>

                        <FeatureList title="Watch with friends!"
                                     subtitle="Use our group watch to sync your player with your friends!*"
                                     icon={<FaUsers size="7.5rem"/>} color="text-gray-400"/>

                        <FeatureList title="Track your watch time!"
                                     subtitle=" See what you watch and for how long!*"
                                     icon={<BiTime size="7.5rem"/>} color="text-green-600"/>
                    </div>
                </div>
                <p className="text-gray-400 font-avenir">
                    * Requires a <span className="underline">FREE</span> account or higher!
                </p>
            </section>
        </div>
    )
}

export default StartPageLoggedOut