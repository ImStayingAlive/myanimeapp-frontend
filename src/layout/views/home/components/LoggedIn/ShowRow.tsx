import {Splide, SplideSlide} from '@splidejs/react-splide';
import Link from "next/link"

import ShowCard from "../../../../common/cards/ShowCard";
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
        keyboard: false,
    }

    if (props.dataSet.length > 0) {
        return (
            <div className="w-11/12 mx-auto relative mb-10 show-category">
                <div className="flex items-center group w-auto">
                    <h1 className="text-gray-400 text-3xl pl-6 font-avenir group">
                        {props.title}
                    </h1>
                    {props.link && (
                        <Link href={props.link}>
                            <h2 className="text-gray-400 cursor-pointer pl-4 font-avenir text-xl flex items-center opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-500">
                                Explore All
                                <span className="pl-1">
                                <IoIosArrowForward/>
                            </span>
                            </h2>
                        </Link>
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
    }

    return (
        <div/>
    )
}


export default ShowRow