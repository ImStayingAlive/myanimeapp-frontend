import Link from "next/link"

const UserBarNotLoggedIn = () => {

    return (
        <div className="mt-4 xl:mt-0">
            <Link href="/login">
                <a className="font-avenir whitespace-nowrap text-base font-medium text-md text-gray-400 hover:text-white">
                    Sign in
                </a>
            </Link>
            <Link href="/register">
                <a className="font-avenir ml-4 whitespace-nowrap text-md inline-flex items-center justify-center px-3 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                    Sign up
                </a>
            </Link>
        </div>
    )
}

export default UserBarNotLoggedIn