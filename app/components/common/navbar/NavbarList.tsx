import NavbarItem from "./NavbarItem";

const NavbarList = () => {
    return (
        <div>
            <NavbarItem text="Home" link="/"/>
            <NavbarItem text="New & Popular" link="/recently-added"/>
            <NavbarItem text="New Seasons" link="/new-seasons"/>
        </div>
    )
}

export default NavbarList