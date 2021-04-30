import TopSpliderPage from "./TopSpliderPage";
import {Splide} from '@splidejs/react-splide';
import {showStore} from "../../../../../../app/show/ShowFacade";

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
        keyboard: false,
    }

    return (
        <div style={{height: "35rem"}}>
            <Splide options={options} className="h-full">
                <TopSpliderPage show={showStore.getShow("attack on titan")}/>
                <TopSpliderPage show={showStore.getShow("tokyo ghoul")}/>
                <TopSpliderPage show={showStore.getShow("no game no life")}/>
            </Splide>
        </div>
    )
}

export default TopSlider