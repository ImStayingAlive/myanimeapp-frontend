import Head from "next/head";
import Navbar from "../../layout/common/navbar/Navbar";
import LoginPage from "../../layout/views/login/LoginPage";

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