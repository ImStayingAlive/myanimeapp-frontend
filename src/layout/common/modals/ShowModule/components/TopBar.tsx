import {observer} from "mobx-react-lite";
import {FaTimes, FaVolumeMute, FaVolumeUp} from "react-icons/fa"
import { showPopupStore } from "../../../../../app/show/ShowFacade";
import ActionBar from "./ActionBar";
import styles from "../../../../../../styles/module/ShowPopup.module.css"

const TopBar = observer(() => {

    let show = showPopupStore.show

    return (
        <div className={styles.background}>

            {show.animatedBackground !== "" && (
                <video preload="none" controls={false} className={"hidden lg:block " + styles.backDrop} muted={showPopupStore.muted} id="bannerVideo" autoPlay loop height="500" poster={show.background}>
                    <source src={show.animatedBackground} type="video/mp4"/>
                </video>
            )}

            <img className={styles.backDrop} src={show.background} alt=""/>

            <span onClick={() => showPopupStore.close()}>
                <span className={"bg-gray-700 rounded-3xl p-3 transform duration-500 ease-in-out hover:scale-110 hover:rotate-180 " + styles.closeBTN}>
                    <FaTimes size="1.2rem"/>
                </span>
            </span>

            {show.animatedBackground !== "" && (
                <div className="hidden lg:block">
                    {showPopupStore.muted ? (
                        <span onClick={() => showPopupStore.setMuted(false)}>
                        <span className={"bg-gray-500 rounded-3xl p-3 transform duration-500 ease-in-out hover:scale-110 " + styles.muteBTN}>
                            <FaVolumeMute size="1.2rem"/>
                        </span>
                    </span>
                    ): (
                        <span onClick={() => showPopupStore.setMuted(true)}>
                        <span className={"bg-gray-500 rounded-3xl p-3 transform duration-500 ease-in-out hover:scale-110 " + styles.muteBTN}>
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