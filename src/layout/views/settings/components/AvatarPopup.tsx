import React, {useCallback, useState} from "react";
import {Transition} from "@headlessui/react";
import {userStore} from "../../../../app/auth/AuthFacade";
import getCroppedImg from "../../../../app/utils/cropper/GetCroppedImage";
import Cropper from "react-easy-crop";

const dogImg =
    'https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000'

const AvatarPopup = (props) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [rotation, setRotation] = useState(0)
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])

    const [preview, setPreview] = useState(null);

    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(
                dogImg,
                croppedAreaPixels
            )
            setPreview(croppedImage)
        } catch (e) {
            console.error(e)
        }
    }, [croppedAreaPixels, rotation])

    const onClose = useCallback(() => {
        setPreview(null)
    }, [])

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
                            <div className="h-96 w-96 relative">
                                <Cropper
                                    image={dogImg}
                                    crop={crop}
                                    rotation={rotation}
                                    zoom={zoom}
                                    aspect={4 / 4}
                                    onCropChange={setCrop}
                                    onRotationChange={setRotation}
                                    onCropComplete={onCropComplete}
                                    onZoomChange={setZoom}
                                />
                            </div>
                            <button
                                onClick={() => close()}
                                className="bg-red-500 px-6 mt-4 py-3 rounded-md font-avenir text-white focus:outline-none">
                                Cancel
                            </button>
                                <button
                                    onClick={() => showCroppedImage()}
                                    className="bg-blue-500 ml-2 px-6 mt-4 py-3 rounded-md font-avenir text-white focus:outline-none">
                                    Set as Avatar
                                </button>


                            <img src={preview} />
                        </div>
                    </Transition.Child>

                </div>
            </div>
        </Transition>
    )
}

export default AvatarPopup