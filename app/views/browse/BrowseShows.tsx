import ShowCard from "../../components/common/cards/ShowCard";
import {Player} from "@lottiefiles/react-lottie-player"

const BrowseShows = (props) => {

    return (
        <div className="w-10/12 mx-auto relative lg:-mt-16 mt-8" style={{minHeight: "65vh"}}>
            {props.dataSet.length === 0 ? (
                <div className="text-center pt-9">
                    <Player autoplay loop style={{height: "250px"}}
                            src="https://assets4.lottiefiles.com/packages/lf20_tnrzlN.json"/>
                    <h1 className="text-2xl font-avenir text-gray-400 -mt-8">
                        Well, this is pretty empty...
                    </h1>
                    <h2 className="text-xl font-avenir text-gray-400">
                        There are currently no shows saved here. Please add some of try again later!
                    </h2>
                </div>
            ) : (
                <div className="grid 4xl:grid-cols-5 3xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-10">
                    {props.dataSet.map((show) =>
                        <ShowCard key={show.displayName} wide={true} show={show}/>
                    )}
                </div>
            )}
        </div>
    )
}

export default BrowseShows