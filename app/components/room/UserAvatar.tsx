import React from "react";

const UserAvatar = (props) => {

    return (
        <div className="relative h-28 select-none w-28 inline-block w-auto transform hover:scale-110 transition duration-500 ease-in-out group">
            <img className="h-28 w-28 rounded-full ring-4 ring-gray-800" src={props.user.avatar} alt=""/>
            <div
                className="opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100 absolute transform left-1/2 -translate-x-1/2 -bottom-10">
                <span className="text-white font-avenir text-2xl">
                    {props.user.name}
                </span>
            </div>
        </div>
    )
}

export default UserAvatar