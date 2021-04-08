import ShowCard from "../common/cards/ShowCard";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import {IoIosArrowForward} from "react-icons/io"

const ShowRow = (props) => {

    const options = {
        perMove: 1,
        autoWidth: true,
        arrows: true,
        drag: true,
        pagination: false,
        cover: true,
        lazyLoad: 'sequential',
    }

    return (
        <div className="w-11/12 mx-auto relative mb-10 show-category">
            <div className="flex items-center group w-auto">
                <h1 className="text-gray-400 text-3xl pl-6 font-avenir group">
                    {props.title}
                </h1>
                {props.link && (
                    <h2 className="text-gray-400 cursor-pointer pl-4 font-avenir text-xl flex items-center opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-500">
                        Explore All
                        <span className="pl-1">
                        <IoIosArrowForward />
                    </span>
                    </h2>
                )}
            </div>

            <Splide options={options}>
                {props.dataSet.map((show, index) =>
                    <SplideSlide key={show.displayName} className="my-3">
                        <ShowCard key={index} show={show}/>
                    </SplideSlide>
                    )}
            </Splide>
        </div>
    )

    /*
    return (
        <div className="w-11/12 mx-auto relative mb-10">
                <h1 className="text-gray-400 text-3xl font-avenir group">
                    {props.title}
                </h1>
                <div className="grid 4xl:grid-cols-5 3xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 gap-7 grid-cols-1">
                    {props.dataSet.splice(0, 4).map((show, index) => <ShowCard key={index} show={show}/>)}
                    <div className="mx-2 h-44 sm:w-96 sm:h-56 shadow bg-gray-800 rounded-md bg-cover bg-center relative shadow showCard">
                        <div className="h-full w-full bg-gray-900 rounded-md relative">
                            <div className="absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 text-center flex flex-col items-center">

                                <MdAddCircleOutline color="white" size="3rem"/>

                                <h1 className="text-white mt-2 text-2xl font-avenir">
                                    View More..
                                </h1>

                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
    */
}


export default ShowRow