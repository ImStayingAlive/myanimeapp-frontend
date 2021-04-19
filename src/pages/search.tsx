import Head from 'next/head'
import Navbar from "../layout/common/navbar/Navbar";
import Footer from "../layout/common/Footer";
import {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {showStore, ShowModel, searchShows} from "../app/show/ShowFacade";
import {Player} from "@lottiefiles/react-lottie-player";
import ShowCard from "../layout/common/cards/ShowCard";

const Recommended = observer(() => {

    const [typed, setTyped] = useState("")
    const [searchResult, setSearchResult] = useState([])

    useEffect(() => {
        setSearchResult(searchShows(typed.toLowerCase()))
    }, [typed])

    return (
        <div className="w-full">
            <Head>
                <title>MyAnimeAPP</title>
                <link rel="icon" href={"/favicon.ico"} />
            </Head>

            <main>
                <Navbar />
                <div className="mx-auto px-4 sm:px-6 flex justify-between items-center bg-gray-700 mt-20">
                    <input onChange={(event) => {
                        setTyped(event.target.value)
                    }}
                           id="searchBar"
                           className="w-10/12 mx-auto font-avenir text-3xl py-6 bg-gray-700 text-gray-200 focus:outline-none flex items-center justify-start"
                           type="text" placeholder="Search for title, genre, studio..."/>
                </div>

                <div className="w-10/12 mx-auto relative mt-8" style={{minHeight: "65vh"}}>

                    {searchResult.length === 0 ? (
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
                            {searchResult.splice(0, 20).map((show) =>
                                <ShowCard key={show.displayName} wide={true} show={show}/>
                            )}
                        </div>
                    )}
                </div>

                <Footer />
            </main>
        </div>
    )
})

export default Recommended
