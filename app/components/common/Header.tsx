const Header = (props) => {

    return (
        <section className="bg-gray-900 h-72 lg:h-96 w-full bg-contain relative" style={{backgroundImage: `url(${props.background})`}}>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/3 lg:-translate-y-2/3 text-center">
                <h1 className="text-gray-200 font-avenir text-5xl">
                    {props.title}
                </h1>
                <h2 className="text-gray-400 font-avenir text-2xl">
                    {props.subtitle}
                </h2>
            </div>
        </section>
    )
}

export default Header