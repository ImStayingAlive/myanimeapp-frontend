import React, { useState } from "react";
import { Switch } from "@headlessui/react";

const SettingsSwitch = (props) => {
    const [enabled, setEnabled] = useState(props.default);

    const toggleInput = () => {
        props.function(!enabled)
        setEnabled(!enabled)
    }

    return (
        <div className="flex items-center my-3">
            <label className="text-lg font-semibold text-gray-200 font-avenir">
                {props.label}:
            </label>
            <div className="pt-1 ml-5">
                <Switch
                    checked={enabled}
                    onChange={toggleInput}
                    className={`${enabled ? "bg-blue-500" : "bg-gray-800"} relative inline-flex flex-shrink-0 h-[28px] w-[56px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}>
                    <span className="sr-only">Use setting</span>
                    <span
                        aria-hidden="true"
                        className={`${enabled ? "translate-x-7" : "translate-x-0"}
            pointer-events-none inline-block h-[24px] w-[24px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
                    />
                </Switch>
            </div>
        </div>
    )
}

export default SettingsSwitch