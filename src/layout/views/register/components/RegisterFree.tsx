import {observer} from "mobx-react-lite";
import {Transition} from "@headlessui/react";
import {registerStore} from "../../../../app/register/RegisterFacade";
import {FaTimesCircle} from "react-icons/fa"
import {ImSpinner2} from "react-icons/im";
import {FiEye, FiEyeOff} from "react-icons/fi"
import {useState} from "react";

const RegisterFree = observer(() => {

    const [showPassword, setShowPassword] = useState(false)

    return (
        <Transition
            show={registerStore.page == "freeAccount"}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <h1 className="font-bebas tracking-wider navLink text-7xl pt-1 pl-1 uppercase text-center">
                <span className="text-red-500">My</span>
                <span className="text-gray-100">anime</span>
            </h1>
            <h3 className="text-center text-2xl text-gray-300 -mt-3 font-avenir">
                Free Account
            </h3>
            <div className="bg-gray-700 p-4 w-full rounded mt-7">
                <form action="#" className="flex flex-col space-y-5">
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="email" className="text-sm font-semibold text-gray-200 font-avenir">
                            Username
                        </label>
                        <div className="relative">
                            {registerStore.usernameTaken && (
                                <div className="absolute right-0 text-red-400 flex items-center pr-3 h-full cursor-pointer">
                                    <FaTimesCircle />
                                </div>
                            )}
                            <input
                                type="text"
                                id="email"
                                autoFocus
                                className="font-avenir w-full px-4 py-2 text-white bg-gray-800 transition duration-300 border border-gray-800 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-gray-900"
                                onChange={(event) => {
                                    registerStore.setUsername(event.target.value)
                                }}
                            />
                        </div>

                        {registerStore.usernameTaken && (
                            <label className="font-avenir text-red-400">
                                That username is taken.
                            </label>
                        )}
                    </div>
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="email" className="text-sm font-semibold text-gray-200 font-avenir">
                            Email (Optional)
                        </label>

                        <div className="relative">
                            {!registerStore.emailCorrect && (
                                <div className="absolute right-0 text-red-400 flex items-center pr-3 h-full cursor-pointer">
                                    <FaTimesCircle />
                                </div>
                            )}
                            <input
                                type="email"
                                id="email"
                                className="font-avenir w-full px-4 py-2 text-white bg-gray-800 transition duration-300 border border-gray-800 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-gray-900"
                                onChange={(event) => {
                                    registerStore.setEmail(event.target.value)
                                }}
                            />
                        </div>
                        {!registerStore.emailCorrect && (
                            <label className="font-avenir text-red-400">
                                Please enter a correct Email.
                            </label>
                        )}
                    </div>
                    <div className="flex flex-col space-y-1">
                        <div className="flex items-center justify-between">
                            <label htmlFor="password"
                                   className="text-sm font-semibold text-gray-200 font-avenir">Password</label>
                        </div>

                        <div className="relative">
                            <div onClick={() => setShowPassword(!showPassword)} className="absolute right-0 text-gray-400 hover:text-gray-200 flex items-center pr-3 h-full cursor-pointer">
                                {showPassword ? (
                                    <FiEyeOff />
                                ): (
                                    <FiEye />
                                )}
                            </div>
                            <input
                                type={showPassword ? "text": "password"}
                                id="password"
                                className="font-avenir w-full px-4 py-2 text-white bg-gray-800 transition duration-300 border border-gray-800 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-gray-900"
                                onChange={(event) => {
                                    registerStore.setPassword(event.target.value)
                                }}
                            />
                        </div>
                        {!registerStore.passwordOkay && (
                            <label className="font-avenir text-red-400">
                                The password must be longer.
                            </label>
                        )}
                    </div>

                    <div className="flex">
                        <a onClick={() => registerStore.register()} className="px-4 py-2 flex items-center transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 cursor-pointer select-none">
                                    <span className="font-semibold text-lg text-white">
                                        Register
                                    </span>
                            {registerStore.loading && (
                                <ImSpinner2 size="1.2rem" className="text-white ml-2 animate-spin"/>
                            )}
                        </a>


                        <a onClick={() => registerStore.changePage("welcome")} className="px-4 ml-2 py-2 flex items-center transition-colors duration-300 bg-gray-500 rounded-md shadow hover:bg-gray-400 cursor-pointer select-none">
                            <span className="font-semibold text-lg text-white">
                             Back
                            </span>
                        </a>
                    </div>
                </form>
            </div>
        </Transition>
    )
})

export default RegisterFree