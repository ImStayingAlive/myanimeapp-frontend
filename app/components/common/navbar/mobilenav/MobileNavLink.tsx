import React from "react"
import Link from "next/link";
import navbarStore from "../../../../stores/NavbarStore";

const MobileNavLink = (props) => {

    return (
        <Link href={props.link}>
            <li onClick={() => navbarStore.toggleMobile(false)} className="text-white pt-8 cursor-pointer group">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <p className="text-white font-avenir xl:text-base text-base ml-3 group-hover:text-blue-400">
                            {props.text}
                        </p>
                    </div>
                </div>
            </li>
        </Link>
    )
}

export default MobileNavLink