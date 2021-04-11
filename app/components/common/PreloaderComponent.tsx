import {Player} from "@lottiefiles/react-lottie-player";
import LottieLoader from '../../../public/lottiefiles/Loader3.json'

const Preloader = () => {

    return (
        <div className="h-screen w-full bg-richBlack relative">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-3/4">
                <Player autoplay style={{width: "150px", height: "150px"}} loop src={LottieLoader} />
                <div className="relative">
                    <h1 className="text-center text-white tracking-wider relative z-10 text-5xl font-bebas">
                        MY<span className="text-red-500">ANIME</span>
                    </h1>
                </div>
            </div>
        </div>
    )

}

export default Preloader