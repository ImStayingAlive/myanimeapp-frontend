import Link from 'next/link';

const NavbarItem = (props) => {

    return (
        <Link href={props.link}>
            <a className="font-avenir font-light navLink cursor-pointer transition duration-150 ease-in-outflex mx-4 text-xl text-gray-400 hover:text-white">
                {props.text}
            </a>
        </Link>
    )
}

export default NavbarItem