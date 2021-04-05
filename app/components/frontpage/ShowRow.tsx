import ShowCard from "../common/cards/ShowCard";
import React from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';

const ShowRow = (props) => {

    const options = {
        type: 'slide',
        perMove: 1,
        autoWidth: true,
        arrows: true,
        drag: true,
        rewind: true,
        pagination: false,
        cover: true,
        lazyLoad: 'sequential',
    }

    if (props.loop) {
        options.type = 'loop'
    }

    return (
        <div className="w-11/12 mx-auto mt-10 relative">
            <h1 className="text-gray-400 text-3xl font-avenir ml-6 group">
                {props.title}
            </h1>
            <Splide options={options}>
                {props.dataSet.map((show) =>
                    <SplideSlide key={show.displayName} className="my-4">
                        <ShowCard show={show}/>
                    </SplideSlide>
                )}
            </Splide>
        </div>
    )
}

export default ShowRow