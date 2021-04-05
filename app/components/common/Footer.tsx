import Link from "next/link"

const Footer = () => {

    return (
        <footer className="w-full bg-richBlack lg:px-0 px-4">
            <div className="w-11/12 mx-auto py-10">
                <div className="lg:flex items-center justify-between">
                    <div className="lg:w-1/4">
                        <h4 className="font-avenir text-lg text-gray-400">
                            Version 1.0
                        </h4>
                        {/*}
                        <h1 className="font-bebas tracking-wider text-5xl pt-1 pl-1 uppercase">
                            <span className="text-red-500">My</span><span
                            className="text-gray-100">anime</span>
                        </h1>
                        {*/}
                    </div>
                    <div className="lg:w-3/4 lg:flex items-center justify-end">
                        <ul className="lg:flex f-m-m justify-end font-avenir">
                            <li className="text-lg font-bold lg:mb-0 mb-6 lg:mt-0 mt-6 text-gray-400 hover:text-gray-200 pr-8">
                                <Link href="/">
                                    Home
                                </Link>
                            </li>
                            <li className="text-lg font-bold lg:mb-0 mb-6 lg:mt-0 mt-6 text-gray-400 hover:text-gray-200 pr-8">
                                <Link href="/release">
                                    Release Schedule
                                </Link>
                            </li>
                            <li className="text-lg font-bold lg:mb-0 mb-6 lg:mt-0 mt-6 text-gray-400 hover:text-gray-200 pr-8">
                                <Link href="/request">
                                    Request an Anime
                                </Link>
                            </li>
                            <li className="text-lg font-bold lg:mb-0 mb-6 lg:mt-0 mt-6 text-gray-400 hover:text-gray-200">
                                <Link href="/about-us">
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer