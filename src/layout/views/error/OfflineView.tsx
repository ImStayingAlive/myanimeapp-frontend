import styles from "../../../styles/module/Register.module.css";
import AnimatedBackground from "../register/components/AnimatedBackground";
import {Player} from "@lottiefiles/react-lottie-player";
import LottieOffline from "../../../../public/lottiefiles/offline.json";

const OfflineView = () => {

    return (
        <main>
            <div className={styles.register}>
                <AnimatedBackground />

                <div className="rounded absolute top-1/3 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                    <div className="xl:flex items-center">
                        <Player className="hidden xl:block mr-5" autoplay style={{width: "300px", height: "300px"}} loop src={LottieOffline} />

                        <div className="ml-5">
                            <h1 className="font-bebas tracking-wider navLink text-7xl pt-1 uppercase">
                                <span className="text-red-500">My</span>
                                <span className="text-gray-100">anime</span>
                            </h1>
                            <h2 className="text-3xl text-red-400 font-avenir mt-3">
                                Oh no! We are currently under maintenance!
                            </h2>

                            <div className="text-md text-gray-300 font-avenir mt-1">
                                <p>
                                    Our servers are under maintenance. We will be online again as soon as possible.<br />
                                    For more information concerning this outage please visit our server status page.
                                </p>
                            </div>

                            <div className="mt-7 text-lg font-avenir flex space-x-2 text-white">
                                <a rel="noopener noreferrer" href="https://stats.uptimerobot.com/yk9JVTNQ5z" target="_blank" className="bg-gray-700 hover:bg-gray-800 uppercase py-3 px-5 rounded focus:outline-none">
                                    View our status page
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default OfflineView