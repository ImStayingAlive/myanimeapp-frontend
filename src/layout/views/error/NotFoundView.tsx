import {Player} from "@lottiefiles/react-lottie-player";
import LottieNotFound from "../../../../public/lottiefiles/notFound.json";
import Link from "next/link"
import {useRouter} from "next/router";

const NotFoundView = () => {

    const router = useRouter()

    return (
        <main className="relative" style={{minHeight: "90vh"}}>
            <div className="absolute top-1/3 left-1/2 transform -translate-y-1/2 -translate-x-1/2">

                <Player autoplay style={{width: "500px", height: "500px"}} loop src={LottieNotFound} />
                <h1 className="text-gray-300 font-avenir text-5xl -mt-20">
                    404: This page was not found!
                </h1>
                <div className="text-center text-white font-avenir mt-5">
                    <Link href="/">
                        <button className="bg-blue-700 hover:bg-blue-800 uppercase py-3 px-5 rounded focus:outline-none">
                            back to home
                        </button>
                    </Link>
                    <button onClick={() => router.back()} className="bg-gray-700 hover:bg-gray-800 uppercase py-3 ml-3 px-5 rounded focus:outline-none">
                        previous page
                    </button>
                </div>
            </div>
        </main>
    )
}

export default NotFoundView