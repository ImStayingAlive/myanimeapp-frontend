import TopSpliderPage from "./TopSpliderPage";
import {Splide} from '@splidejs/react-splide';
import { showState } from "../../../stores/shows/ShowStore";

const TopSlider = () => {

    const options = {
        perPage: 1,
        arrows: false,
        drag: false,
        pagination: false,
        autoplay: true,
        type: 'fade',
        speed: '1000',
        interval: '7000',
        rewind: true,
    }

    return (
        <div style={{height: "35rem"}}>
            <Splide options={options} className="h-full">
                <TopSpliderPage show={showState.getShow("tokyo ghoul")}/>
                <TopSpliderPage show={showState.getShow("no game no life")}/>
            </Splide>
        </div>
    )
}

export default TopSlider