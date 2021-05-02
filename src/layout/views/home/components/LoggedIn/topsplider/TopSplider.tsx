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
                <TopSpliderPage show={showStore.getShow("jujutsu kaisen")} background="center 20%"/>
                <TopSpliderPage show={showStore.getShow("rezero")} background="center top"/>
                <TopSpliderPage show={showStore.getShow("your name")} background="center"/>
                <TopSpliderPage show={showStore.getShow("tokyo ghoul")} background="center 20%"/>
            </Splide>
        </div>
    )
}

export default TopSlider