import { userStore } from "../../../app/auth/AuthFacade";
import LoggedIn from "./components/LoggedIn/LoggedIn";
import LoggedOut from "./components/LoggedOut/LoggedOut";
import {observer} from "mobx-react-lite";

const HomeView = observer(() => {

    if (userStore.isLoggedIn) {
        return <LoggedIn />
    }

    return <LoggedOut />
})

export default HomeView