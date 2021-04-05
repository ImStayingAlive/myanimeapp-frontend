import {Player} from "@lottiefiles/react-lottie-player";
import LottieLoader from '../../../public/lottiefiles/Loader.json'

const Preloader = () => {

    return (
        <div className="h-screen w-full bg-richBlack relative">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-3/4">
                <Player autoplay style={{width: "150px", height: "150px"}} loop src={LottieLoader} />
            </div>
        </div>
    )

}

export default Preloader