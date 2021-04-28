import React, {useState} from "react";
import AvatarPopup from "./AvatarPopup";
import {userStore} from "../../../../app/auth/AuthFacade";
import {FiUpload} from "react-icons/fi"
import {observer} from "mobx-react-lite";

const AvatarInput = observer(() => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="mb-6">
            <div className="flex items-center">
                <label className="text-lg w-28 font-semibold text-gray-200 font-avenir">
                    Avatar:
                </label>
                <div
                    onClick={() => setIsOpen(true)}
                    className="relative h-28 w-28 bg-gray-800 rounded-full overflow-hidden group cursor-pointer">
                    <img
                        src={userStore.user.avatar} alt=""
                    />

                    <div className="bg-gray-900 h-full w-full absolute top-0 opacity-0 group-hover:opacity-75">
                        <FiUpload className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" size="2rem" color="white" />
                    </div>
                </div>
            </div>

            <AvatarPopup isOpen={isOpen} close={() => setIsOpen(false)} />
        </div>
    )
})

export default AvatarInput