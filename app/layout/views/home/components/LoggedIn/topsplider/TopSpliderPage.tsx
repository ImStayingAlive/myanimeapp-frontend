import {SplideSlide} from '@splidejs/react-splide';
import showPopupStore from '../../../../../../show/popup/ShowPopupStore';
import {ShowModel} from "../../../../../../show/ShowFacade"

const TopSpliderPage = (props) => {

    const show: ShowModel = props.show;

    return (
        <SplideSlide className="h-full">
            <div className="relative" style={{height: "40rem"}}>
                <div className="overlay-top absolute" style={{height: "40rem"}}>
                    <div className="bg-cover backDrop h-full" style={{backgroundImage: `url(${show.background})`}}/>
                </div>

                <div className="absolute w-full bottom-1/2 transform translate-y-1/2">
                    <div className="w-11/12 mx-auto">
                        <div className="w-max">

                            <img className="transform transition ease-in-out select-none scale-100 hover:scale-110 cursor-pointer" onClick={() => showPopupStore.open(show)} style={{height: "12rem"}}
                                 src={show.logo} alt=""/>
                            {/*}
                            <div className="mt-8 w-max mx-auto">
                                <button className="bg-red-500 hover:bg-red-400 focus:outline-none text-2xl rounded text-white px-10 py-3 mx-4 font-avenir">
                                    Play
                                </button>
                                <button onClick={() => showPopupStore.open(show)} className="bg-gray-500 hover:bg-gray-400 focus:outline-none text-2xl rounded text-white px-10 py-3 mx-4 font-avenir">
                                    Information
                                </button>
                            </div>
                            {*/}
                        </div>
                    </div>
                </div>
            </div>
        </SplideSlide>
    )
}

export default TopSpliderPage