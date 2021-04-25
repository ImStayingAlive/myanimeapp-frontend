import Background from "./Background";
import {Splide} from '@splidejs/react-splide';

const AnimatedBackground = () => {

    const options = {
        perPage: 1,
        arrows: false,
        drag: false,
        pagination: false,
        autoplay: true,
        type: 'fade',
        speed: '3000',
        interval: '6000',
        rewind: true,
        keyboard: false,
        pauseOnHover: false,
    }

    return (
        <section className="absolute top-0 left-0 h-screen w-full select-none">
            <Splide options={options} className="h-full w-full">
                <Background link="https://i.imgur.com/O4iLnbg.jpeg" />
                <Background link="https://wallpaperaccess.com/full/1115419.jpg" />
                <Background link="https://i.imgur.com/7jSXzWc.png" />
                <Background link="https://i.pinimg.com/originals/18/e0/6a/18e06ad1d978769c670bfc1cc1be062b.png" />
            </Splide>
        </section>
    )
}

export default AnimatedBackground