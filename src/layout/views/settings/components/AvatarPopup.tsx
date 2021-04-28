import React, {useCallback, useState} from "react";
import {Transition} from "@headlessui/react";
import {userStore} from "../../../../app/auth/AuthFacade";
import getCroppedImg from "../../../../app/utils/cropper/GetCroppedImage";
import Cropper from "react-easy-crop";
import {useDropzone} from 'react-dropzone'
import {FiUpload} from "react-icons/fi"
import {ImSpinner2} from "react-icons/im";

const AvatarPopup = (props) => {
    // States
    const [image, setImage] = useState(null)
    const [crop, setCrop] = useState({x: 0, y: 0})
    const [rotation, setRotation] = useState(0)
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])
    const [loading, setLoading] = useState(false)

    // On Drop Function to temporally upload files to client
    const onDrop = useCallback(acceptedFiles => {
        let reader = new FileReader();
        const file = acceptedFiles[0];
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImage(reader.result as string)
        };
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    // Close the Popup
    const close = () => {
        props.close()
        setImage(null)
    }

    // Change the Avatar
    // Renders the cropped image in Base64 and sends them to the API
    const changeAvatar = useCallback(async () => {
        setLoading(true)
        try {
            const croppedImage = await getCroppedImg(
                image,
                croppedAreaPixels
            )
            userStore.changeAvatar(croppedImage, () => {
                setLoading(false)
                props.close()
                setImage(null)
            })
        } catch (e) {
            console.error(e)
        }
    }, [croppedAreaPixels, rotation])

    return (
        <Transition show={props.isOpen}>

            <div
                className="fixed z-40 inset-0 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-600">
                <div className="flex items-end justify-center pt-4 px-4 text-center sm:block sm:p-0">
                    <div onClick={() => close()} className="fixed inset-0 transition-opacity"
                         aria-hidden="true">
                        <div className="absolute inset-0 bg-gray-900 opacity-75">
                        </div>
                    </div>

                    <Transition.Child
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="scale-100"
                        leaveTo="scale-0">

                        <div
                            className="bg-gray-700 text-right mt-10 p-6 inline-block align-bottom rounded-lg shadow-xl transform transition-all">

                            {image ? (
                                <div className="h-96 w-96 relative">
                                    <Cropper
                                        image={image}
                                        crop={crop}
                                        rotation={rotation}
                                        zoom={zoom}
                                        minZoom={0.75}
                                        zoomSpeed={0.25}
                                        showGrid={false}
                                        aspect={4 / 4}
                                        cropSize={{
                                            width: 256,
                                            height: 256
                                        }}
                                        onCropChange={setCrop}
                                        onRotationChange={setRotation}
                                        onCropComplete={onCropComplete}
                                        onZoomChange={setZoom}
                                    />
                                </div>
                            ) : (
                                <div className="h-40 w-96 group relative border-dashed border-2 rounded border-gray-600 cursor-pointer" {...getRootProps()}>
                                    <input {...getInputProps()} />

                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-300 group-hover:text-white">
                                        <div className="flex items-center">
                                            <FiUpload size="2rem"/>
                                            <span className="ml-2 font-poppins">
                                                {isDragActive ? "Drop here" : "Upload Files"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="mt-4">
                                {image && (
                                    <>
                                        <button onClick={() => setImage(null)} className="px-4 pb-2 pt-1 ml-2 transition-colors duration-300 bg-gray-500 rounded-md shadow hover:bg-gray-600 cursor-pointer select-none focus:outline-none">
                                            <span className="font-semibold text-lg text-white">
                                                Reset
                                            </span>
                                        </button>

                                        <button onClick={() => changeAvatar()} className="px-4 pb-2 pt-1 ml-2 transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 cursor-pointer select-none focus:outline-none">
                                            <div className="flex items-center">
                                             <span className="font-semibold text-lg text-white">
                                                Set Avatar
                                             </span>
                                                {loading && (
                                                    <ImSpinner2 size="1.2rem" className="text-white ml-2 animate-spin"/>
                                                )}
                                            </div>
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </Transition.Child>

                </div>
            </div>
        </Transition>
    )
}

export default AvatarPopup