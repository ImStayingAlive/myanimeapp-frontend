import { observer } from "mobx-react-lite"
import showPopupStore from "../../../../../stores/shows/ShowPopupStore";
import {FaTimes, FaVolumeMute, FaVolumeUp} from "react-icons/fa"
import ActionBar from "./ActionBar";

const TopBar = observer(() => {

    let show = showPopupStore.show

    return (
        <div className="show-popup-background">

            {show.animatedBackground !== "" && (
                <video preload="none" controls={false} className="backDrop hidden lg:block" muted={showPopupStore.muted} id="bannerVideo" autoPlay loop height="500" poster={show.background}>
                    <source src={show.animatedBackground} type="video/mp4"/>
                </video>
            )}

            <img className="backDrop" src={show.background} alt=""/>

            <span onClick={() => showPopupStore.close()}>
                <span className="close bg-gray-700 rounded-3xl p-3 transform duration-500 ease-in-out hover:scale-110 hover:rotate-180">
                    <FaTimes size="1.2rem"/>
                </span>
            </span>

            {show.animatedBackground !== "" && (
                <div className="hidden lg:block">
                    {showPopupStore.muted ? (
                        <span onClick={() => showPopupStore.setMuted(false)}>
                        <span className="mute bg-gray-500 rounded-3xl p-3 transform duration-500 ease-in-out hover:scale-110">
                            <FaVolumeMute size="1.2rem"/>
                        </span>
                    </span>
                    ): (
                        <span onClick={() => showPopupStore.setMuted(true)}>
                        <span className="mute bg-gray-500 rounded-3xl p-3 transform duration-500 ease-in-out hover:scale-110">
                            <FaVolumeUp size="1.2rem"/>
                        </span>
                    </span>
                    )}
                </div>
            )}


            <ActionBar />

        </div>
    )
})
export default TopBar