import dynamic from 'next/dynamic';
import React, {useState} from "react";
import {Transition} from "@headlessui/react";
import {toast} from "react-toastify";
import {userStore} from "../../../../app/auth/AuthFacade";

const AvatarNoSSR = dynamic(
    () => import("react-avatar-edit"),
    {ssr: false}
)

const AvatarPopup = (props) => {
    const [preview, setPreview] = useState(null);

    function onClose() {
        setPreview(null);
    }

    function onCrop(pv) {
        setPreview(pv);
    }

    function onBeforeFileLoad(elem) {
        if (elem.target.files[0].size > 20000000) {
            toast.error("Your file is too big!")
            elem.target.value = "";
        }
    }

    function close() {
        props.close()
        setPreview(null);
    }

    function changeAvatar() {
        userStore.changeAvatar(preview, () => {
            props.close()
            setPreview(null);
        })
    }

    return (
        <Transition show={props.isOpen}
                    enter="transition-opacity ease-linear duration-100"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">

            <div
                className="fixed z-40 inset-0 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-600">
                <div className="flex items-end justify-center pt-4 px-4 text-center sm:block sm:p-0">
                    <div onClick={() => props.close()} className="fixed inset-0 transition-opacity"
                         aria-hidden="true">
                        <div className="absolute inset-0 bg-gray-900 opacity-75">
                        </div>
                    </div>

                    <Transition.Child
                        enter="transition ease-in-out duration-300 transform delay-100"
                        enterFrom="scale-0"
                        enterTo="scale-100"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="scale-100"
                        leaveTo="scale-0">

                        <div className="bg-gray-700 text-right mt-10 p-6 inline-block align-bottom rounded-lg shadow-xl transform transition-all">
                            <div style={{minHeight: "200px"}}>
                                <AvatarNoSSR
                                    width={600}
                                    height={200}
                                    imageHeight={256}
                                    imageWidth={256}
                                    exportAsSquare={true}
                                    label="Choose an Avatar."
                                    labelStyle={{
                                        fontSize: "1.25em",
                                        fontWeight: 700,
                                        color: "white",
                                        display: "inline-block",
                                        fontFamily: "Avenir Heavy, sans-serif",
                                        cursor: "pointer",
                                        lineHeight: "300px",
                                    }}
                                    exportSize={256}
                                    onCrop={onCrop}
                                    onClose={onClose}
                                    exportQuality={1}
                                    exportMimeType="image/jpeg"
                                    onBeforeFileLoad={onBeforeFileLoad}
                                    src={null}
                                />
                            </div>
                            <button
                                onClick={() => close()}
                                className="bg-red-500 px-6 mt-4 py-3 rounded-md font-avenir text-white focus:outline-none">
                                Cancel
                            </button>
                            {preview && (
                                <button
                                    onClick={() => changeAvatar()}
                                    className="bg-blue-500 ml-2 px-6 mt-4 py-3 rounded-md font-avenir text-white focus:outline-none">
                                    Set as Avatar
                                </button>
                            )}
                        </div>
                    </Transition.Child>

                </div>
            </div>
        </Transition>
    )
}

export default AvatarPopup