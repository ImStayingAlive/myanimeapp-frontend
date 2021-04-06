import ShowCard from "../common/cards/ShowCard";
import React from "react";
import {useKeenSlider} from 'keen-slider/react'

const ShowRow = (props) => {
    const [currentSlide, setCurrentSlide] = React.useState(0)

    const [sliderRef, slider] = useKeenSlider({
        slidesPerView: 1.35,
        centered: false,
        loop: false,
        mode: "snap",
        initial: 0,
        slideChanged(s) {
            setCurrentSlide(s.details().relativeSlide)
        },
        breakpoints: {
            "(min-width: 415px)": {
                slidesPerView: 1.5,
            },
            "(min-width: 500px)": {
                slidesPerView: 1.8,
            },
            "(min-width: 615px)": {
                slidesPerView: 2.2,
            },
            "(min-width: 640px)": {
                slidesPerView: 1.4,
            },
            "(min-width: 828px)": {
                slidesPerView: 1.8,
            },
            "(min-width: 921px)": {
                slidesPerView: 2,
            },
            "(min-width: 1152px)": {
                slidesPerView: 2.5,
            },
            "(min-width: 1389px)": {
                slidesPerView: 3,
            },
            "(min-width: 1581px)": {
                slidesPerView: 3.5,
            },
            "(min-width: 1920px)": {
                slidesPerView: 4.2,
            },
            "(min-width: 2078px)": {
                slidesPerView: 4.5,
            },
            "(min-width: 2289px)": {
                slidesPerView: 5,
            },
            "(min-width: 2375px)": {
                slidesPerView: 5.6,
            },
        },
    })

    return (
        <div className="w-11/12 mx-auto mt-10 relative">
                <h1 className="text-gray-400 text-3xl font-avenir ml-6 group">
                    {props.title}
                </h1>
            <div className="navigation-wrapper">
                {/* @ts-ignore */}
                <div ref={sliderRef} className="keen-slider">
                    {props.dataSet.map((show, index) =>
                        <div key={index} className="keen-slider__slide py-4">
                            <ShowCard show={show}/>
                        </div>
                    )}
                </div>
                {slider && (
                    <>
                        <ArrowLeft
                            onClick={(e) => e.stopPropagation() || slider.prev()}
                            disabled={currentSlide === 0}
                        />
                        <ArrowRight
                            onClick={(e) => e.stopPropagation() || slider.next()}
                            disabled={currentSlide === slider.details().size - 1}
                        />
                    </>
                )}
            </div>
        </div>
    )
}

function ArrowLeft(props) {
    const disabled = props.disabled ? " arrow--disabled" : ""

    return (
        <svg
            onClick={props.onClick}
            className={"arrow arrow--left" + disabled}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/>
        </svg>
    )
}

function ArrowRight(props) {
    const disabled = props.disabled ? " arrow--disabled" : ""

    return (
        <svg
            onClick={props.onClick}
            className={"arrow arrow--right" + disabled}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/>
        </svg>
    )
}


export default ShowRow