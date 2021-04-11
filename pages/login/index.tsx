import Head from "next/head";
import Navbar from "../../app/layout/common/navbar/Navbar";
import LoginPage from "../../app/layout/views/login/LoginPage";

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