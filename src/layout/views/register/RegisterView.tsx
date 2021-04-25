import AnimatedBackground from "./components/AnimatedBackground";
import styles from "../../../../styles/module/Register.module.css"
import RegisterWelcome from "./components/RegisterWelcome";
import RegisterFree from "./components/RegisterFree";
import Navbar from "../../common/navbar/Navbar";

const RegisterView = () => {

    return (
        <main>
            <Navbar />
            <div className={styles.register}>
                <AnimatedBackground />

                <div className="w-96 z-20 rounded absolute top-1/3 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                    <RegisterWelcome />
                    <RegisterFree />
                </div>
            </div>
        </main>
    )
}

export default RegisterView