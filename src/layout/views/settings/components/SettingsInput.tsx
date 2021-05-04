import {FaTimesCircle} from "react-icons/fa";
import React, {useState} from "react";
import {FiEye, FiEyeOff} from "react-icons/fi";

const SettingsInput = (props) => {
    const [showInput, setShowInput] = useState(true)
    const [type, setType] = useState(props.type)

    const toggleInput = () => {
        setShowInput(!showInput)
        if (showInput) {
            setType("text")
        } else {
            setType("password")
        }
    }

    return (
        <div className="flex items-center my-8">
            <label htmlFor={props.label} className="text-lg w-28 font-semibold text-gray-200 font-avenir">
                {props.label}:
            </label>
            <div className="relative w-full ml-4">
                {!props.check && (
                    <span className="absolute right-0 text-red-400 flex items-center pr-3 h-full cursor-pointer">
                        <FaTimesCircle />
                    </span>
                )}

                {props.type == "password" && (
                    <span onClick={() => toggleInput()} className="absolute right-0 text-gray-400 hover:text-white flex items-center pr-3 h-full cursor-pointer">
                         {!showInput ? (
                             <FiEyeOff />
                         ): (
                             <FiEye />
                         )}
                    </span>
                )}

                <input
                    disabled={props.disabled}
                    type={type}
                    id={props.label}
                    defaultValue={props.default}
                    className="font-avenir w-full px-3 text-xl py-2 text-white bg-gray-600 transition duration-300 border border-gray-600 rounded focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-500"
                    onChange={(event) => {
                        props.function(event.target.value)
                    }}
                />
            </div>
        </div>
    )
}

export default SettingsInput