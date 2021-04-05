import Header from "../../components/common/Header";
import Link from "next/link"
import loginStore from "../../stores/LoginStore";
import {observer} from "mobx-react-lite";
import loginService from "../../service/LoginService";
import {ImSpinner2} from "react-icons/im"
import {toast} from "react-toastify";
import {useRouter} from "next/router";
import {useEffect} from "react";
import userStore from "../../stores/UserStore";

const LoginPage = observer(() => {

    const router = useRouter()

    useEffect(() => {
        if (userStore.isLoggedIn) {
            router.push('/')
        }
    }, [userStore.isLoggedIn])

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
        <div>
            <Header title="Welcome Back!"
                    subtitle="Dont have an account? No issue! Create your own FREE account in minutes."/>

            <div className="items-center p-4 -mt-5 md:-mt-20 relative max-w-full md:max-w-4xl mx-auto">
                <div
                    className="flex flex-1 flex-col overflow-hidden rounded-md shadow-lg max md:flex-row md:flex-1 ">
                    <div
                        className="text-white bg-gray-600 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
                        <img className="h-60 md:h-auto" alt=""
                             src="https://i.kym-cdn.com/photos/images/newsfeed/001/185/389/caa.png"/>
                    </div>
                    <div className="p-5 bg-gray-700 md:flex-1">
                        <h3 className="my-4 text-2xl font-semibold text-gray-100 font-avenir">Account Login</h3>
                        <form action="#" className="flex flex-col space-y-5">
                            <div className="flex flex-col space-y-1">
                                <label htmlFor="email" className="text-sm font-semibold text-gray-200 font-avenir">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id="email"
                                    autoFocus
                                    className="font-avenir px-4 py-2 text-white bg-gray-800 transition duration-300 border border-gray-800 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-gray-900"
                                    onChange={(event) => {
                                        loginStore.userName = event.target.value
                                    }}
                                />
                            </div>
                            <div className="flex flex-col space-y-1">
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password"
                                           className="text-sm font-semibold text-gray-200 font-avenir">Password</label>
                                    <Link href="/reset-password">
                                        <a className="text-sm text-blue-400 hover:underline focus:text-blue-300 font-avenir">
                                            Forgot Password?
                                        </a>
                                    </Link>
                                </div>
                                <input
                                    type="password"
                                    id="password"
                                    className="font-avenir px-4 py-2 text-white bg-gray-800 transition duration-300 border border-gray-800 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-gray-900"
                                    onChange={(event) => {
                                        loginStore.password = event.target.value
                                    }}
                                />
                            </div>

                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    className="form-checkbox h-4 w-4 text-red-600"
                                    onChange={(event) => {
                                        loginStore.rememberMe = event.target.checked
                                    }}
                                />
                                <label htmlFor="remember" className="text-sm font-semibold text-gray-200 ">
                                    Stay logged in?
                                </label>
                            </div>

                            <div className="flex">
                                <a onClick={() => login()}
                                   className="px-4 py-2 flex items-center transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 cursor-pointer select-none">
                                    <span className="font-semibold text-lg text-white">
                                        Login
                                    </span>
                                    {loginStore.loading && (
                                        <ImSpinner2 size="1.2rem" className="text-white ml-2 animate-spin"/>
                                    )}
                                </a>

                                <Link href="/register">
                                    <a className="px-4 py-2 ml-3 flex items-center transition-colors duration-300 bg-gray-500 rounded-md shadow hover:bg-gray-400 cursor-pointer select-none">
                                        <span className="font-semibold text-lg text-white">
                                            Register
                                        </span>
                                    </a>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default LoginPage