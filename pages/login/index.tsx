import Head from "next/head";
import Navbar from "../../app/components/common/navbar/Navbar";
import LoginPage from "../../app/views/authentication/LoginPage";

const Login = () => {

    return (
        <div className="min-h-screen w-full">
            <Head>
                <title>MyAnimeAPP</title>
                <link rel="icon" href={"/favicon.ico"}/>
            </Head>

            <main>
                <Navbar/>
                <LoginPage/>
            </main>
        </div>
    );
}

export default Login