import AnimatedBackground from "./components/AnimatedBackground";
import styles from "../../../styles/module/Register.module.css"
import RegisterWelcome from "./components/RegisterWelcome";
import RegisterFree from "./components/RegisterFree";
import RegisterPremium from "./components/RegisterPremium";
import userStore from "../../../app/auth/user/store/UserStore";
import Router from "next/router";

const RegisterView = () => {

    if (userStore.isLoggedIn) {
        Router.push({
            pathname: '/',
        }).then(() => {})
    }

    return (
        <main>
            <div className={styles.register}>
                <AnimatedBackground />

                <div className="w-96 rounded absolute top-1/3 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                    <RegisterWelcome />
                    <RegisterFree />
                    <RegisterPremium />
                </div>
            </div>
        </main>
    )
}

export default RegisterView