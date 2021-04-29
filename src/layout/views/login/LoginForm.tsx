import {FiEye, FiEyeOff} from "react-icons/fi";
import {ImSpinner2} from "react-icons/im";
import {useState} from "react";
import {loginService, loginStore} from "../../../app/auth/AuthFacade";
import {toast} from "react-toastify";
import {observer} from "mobx-react-lite";

const LoginForm = observer(() => {
    const [showPassword, setShowPassword] = useState(false)

    const login = () => {
        loginStore.loading = true
        loginService.login(loginStore.userName, loginStore.password, loginStore.rememberMe, (result) => {
            loginStore.loading = false
            if (!result.success) {
                toast.error("Error: " + result.message)
            }
        })
    }

    return (
        <>
            <h3 className="text-center text-2xl text-gray-300 font-avenir">
                Welcome back to
            </h3>
            <h1 className="font-bebas tracking-wider navLink text-7xl -mt-2 pl-1 uppercase text-center">
                <span className="text-red-500">My</span>
                <span className="text-gray-100">anime</span>
            </h1>
            <div className="bg-gray-700 p-4 w-full rounded mt-7">
                <form action="#" className="flex flex-col space-y-5">
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="email" className="text-sm font-semibold text-gray-200 font-avenir">
                            Username
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                id="email"
                                autoFocus
                                className="font-avenir w-full px-4 py-2 text-white bg-gray-800 transition duration-300 border border-gray-800 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-gray-900"
                                onChange={(event) => {
                                    loginStore.userName = event.target.value
                                }}
                            />
                        </div>
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
                                    loginStore.password = event.target.value
                                }}
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <label className="flex justify-start items-start">
                            <div
                                className="bg-gray-800 border-2 rounded border-gray-800 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2">
                                <input
                                    type="checkbox"
                                    defaultChecked={true}
                                    className="opacity-0 absolute"
                                    id="remember"
                                    onChange={(event) => {
                                        loginStore.rememberMe = event.target.checked
                                    }}
                                />
                                    <svg className="block fill-current hidden w-4 h-4 text-gray-200 pointer-events-none"
                                         viewBox="0 0 20 20">
                                        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/>
                                    </svg>
                            </div>
                            <div className="text-sm font-semibold text-gray-200">
                                Stay logged in?
                            </div>
                        </label>
                    </div>

                    <div className="flex">
                        <a onClick={() => login()} className="px-4 py-2 flex items-center transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 cursor-pointer select-none">
                                    <span className="font-semibold text-lg text-white">
                                        Login
                                    </span>
                            {loginStore.loading && (
                                <ImSpinner2 size="1.2rem" className="text-white ml-2 animate-spin"/>
                            )}
                        </a>
                    </div>
                </form>
            </div>
        </>
    )
})

export default LoginForm