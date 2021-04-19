import { userStore } from "../../../app/auth/AuthFacade";
import NavbarItem from "./NavbarItem";

const NavbarList = () => {
    return (
        <div>
            <NavbarItem text="Home" link="/"/>
            <NavbarItem text="New & Popular" link="/recently-added"/>
            <NavbarItem text="New Seasons" link="/new-seasons"/>
            {userStore.isLoggedIn && (
                <NavbarItem text="Your List" link="/watch-list"/>
            )}
        </div>
    )
}

export default NavbarList