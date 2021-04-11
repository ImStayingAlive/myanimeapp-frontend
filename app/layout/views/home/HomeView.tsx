import {userStore} from "../../../auth/AuthFacade";
import LoggedIn from "./components/LoggedIn/LoggedIn";
import LoggedOut from "./components/LoggedOut/LoggedOut";

const HomeView = () => {

    if (userStore.isLoggedIn) {
        return <LoggedIn />
    }

    return <LoggedOut />
}

export default HomeView