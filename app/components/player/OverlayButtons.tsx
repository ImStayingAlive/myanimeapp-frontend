import playerStore from "../../stores/player/PlayerStore";

const OverlayButtons = () => {

    const nextEpisode = playerStore.getNextEpisode()

    return (
        <div className="absolute bottom-24 right-8 z-10">

            <a id="skipIntro" className="cursor-pointer text-2xl bg-red-500 py-3 px-7 shadow-2xl rounded-lg font-poppins hidden">Skip Intro</a>

            <div id="nextEpisode" className="hidden">
                {nextEpisode ? (
                    <div className="flex items-end flex-col max-w-2xl relative">
                        <div className="relative">
                            <img className="rounded-lg shadow" src={nextEpisode.thumbnail} alt=""/>

                            <div className="font-poppins absolute bottom-0 h-full w-full">
                                <div
                                    className="bg-gradient-to-b from-transparent to-black opacity-100 rounded-lg h-full w-full bottom-0"/>

                                <div className="absolute bottom-4 left-4">
                                    <h2 className="text-3xl text-white font-semibold">
                                        {playerStore.show.displayName}
                                    </h2>
                                    <h3 className="text-xl text-gray-300">
                                        {nextEpisode.name}
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className="flex-row mt-7">
                            <a className="cursor-pointer text-2xl bg-gray-600 hover:bg-gray-500 py-3 px-7 shadow-2xl rounded-lg font-poppins">
                                Watch credits
                            </a>

                            <a className="cursor-pointer text-2xl py-3 px-7 shadow-2xl rounded-lg font-poppins ml-3 animation-next-episode">
                                Next episode
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-end flex-col max-w-2xl relative">
                        <div className="flex-row mt-7">
                            <a id="closeButton"
                               className="cursor-pointer text-2xl bg-gray-600 hover:bg-gray-500 py-3 px-7 shadow-2xl rounded-lg font-poppins">
                                Back to home
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default OverlayButtons