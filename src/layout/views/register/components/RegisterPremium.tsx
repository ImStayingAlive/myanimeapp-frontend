import {observer} from "mobx-react-lite";
import { Transition } from "@headlessui/react";
import { registerStore } from "../../../../app/register/RegisterFacade";

const RegisterPremium = observer(() => {

    return (
        <Transition
            show={registerStore.page == "paidAccount"}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >

            <div className="text-center">
                <h1 className="font-bebas tracking-wider navLink text-7xl pt-1 pl-1 uppercase">
                    <span className="text-red-500">My</span>
                    <span className="text-gray-100">Anime</span>
                </h1>


                <div className="text-md text-gray-300 font-avenir mt-3">
                    <p>
                        Thank you for your intrest in supporting us! <br />
                        We will soon add paid features. You can create a free account and upgrade later!
                    </p>
                </div>

                <div className="mt-7 text-lg justify-center font-avenir flex space-x-2 text-white">
                    <button onClick={() => registerStore.changePage("freeAccount")} className="bg-gray-700 hover:bg-gray-800 uppercase p-3 rounded focus:outline-none">
                        Create Free account
                    </button>
                </div>
            </div>

        </Transition>
    )
})

export default RegisterPremium