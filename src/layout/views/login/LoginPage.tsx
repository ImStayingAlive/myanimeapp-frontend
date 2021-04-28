import {observer} from "mobx-react-lite";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {userStore } from "../../../app/auth/AuthFacade";
import styles from "../../../styles/module/Register.module.css";
import AnimatedBackground from "../register/components/AnimatedBackground";
import LoginForm from "./LoginForm";
import PreloaderComponent from "../../common/PreloaderComponent";


const LoginPage = observer(() => {

    const router = useRouter()

    useEffect(() => {
        if (userStore.isLoggedIn) {
            router.push('/').then(() => {})
        }
    }, [userStore.isLoggedIn])

    return (
        <div className={styles.register}>
            <AnimatedBackground />

            {!userStore.isLoggedIn ? (
                <div className="w-96 rounded absolute top-1/3 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                    <LoginForm />
                </div>
            ): (
                <PreloaderComponent />
            )}
        </div>
    )
})

export default LoginPage