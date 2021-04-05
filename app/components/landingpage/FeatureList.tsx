const FeatureList = (props) => {

    return (
        <div className="lg:w-1/4 px-5 mt-4">
            <div className="flex justify-center items-center flex-col">
                <span className={props.color}>
                    {props.icon}
                </span>
                <h1 className="text-white mt-5 font-bold text-2xl font-avenir text-center">
                    {props.title}
                </h1>
                <p className="text-gray-400 text-lg font-avenir text-center">
                    {props.subtitle}
                </p>
            </div>
        </div>
    )
}

export default FeatureList