import React from "react";
import {GiQueenCrown} from "react-icons/gi"

const UserAvatar = (props) => {

    return (
        <div className="relative h-28 select-none w-28 inline-block w-auto transform hover:scale-110 transition duration-500 ease-in-out group">
            <img className="h-28 w-28 relative z-10 rounded-full ring-4 ring-gray-800" src={props.user.avatar} alt=""/>
            {props.owner && (
                <div className="absolute z-0 transform left-1/2 -top-10 -translate-x-1/2 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100 ">
                    <GiQueenCrown color="#d4af37" size="3.5rem"/>
                </div>
            )}
            <div
                className="absolute transform left-1/2 -translate-x-1/2 -bottom-10 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100 ">
                <span className="text-white font-avenir text-2xl">
                    {props.user.name}
                </span>
            </div>
        </div>
    )
}

export default UserAvatar