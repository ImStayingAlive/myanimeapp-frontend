import {observer} from "mobx-react-lite";
import { Transition } from "@headlessui/react";
import { registerStore } from "../../../../app/register/RegisterFacade";

const RegisterWelcome = observer(() => {

    return (
        <Transition
            show={registerStore.page == "welcome"}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >

            <div className="text-center">
                <h2 className="text-gray-300 font-avenir text-xl">
                    Welcome to the
                </h2>
                <h1 className="font-bebas tracking-wider navLink text-7xl pt-1 pl-1 uppercase">
                    <span className="text-red-500">My</span>
                    <span className="text-gray-100">Anime</span>
                </h1>


                <div className="text-md text-gray-300 font-avenir mt-3">
                    <p>
                        Our mission is to provide a high quality anime-viewing experience on the level of big streaming sites such as Netflix or Disney+.<br/>
                        If you would like to support our mission a donation would be appreciated! You will also recieve extra features!
                    </p>
                </div>

                <div className="mt-7 text-lg justify-center font-avenir flex space-x-2 text-white">
                    <button onClick={() => registerStore.changePage("freeAccount")} className="bg-gray-700 hover:bg-gray-800 uppercase p-3 rounded focus:outline-none">
                        Free Account
                    </button>
                    <button onClick={() => registerStore.changePage("paidAccount")} className="bg-blue-700 hover:bg-blue-800 uppercase p-3 rounded focus:outline-none">
                        Premium Account
                    </button>
                </div>
            </div>

        </Transition>
    )
})

export default RegisterWelcome