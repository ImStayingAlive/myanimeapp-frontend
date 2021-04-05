import NavbarItem from "./NavbarItem";
import userStore from "../../../stores/UserStore";

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