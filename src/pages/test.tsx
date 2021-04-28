import React, { useState, useCallback } from 'react'
import dynamic from 'next/dynamic';
import Cropper from 'react-easy-crop'
import getCroppedImg from "../app/utils/cropper/GetCroppedImage";

const AvatarNoSSR = dynamic(
    () => import("react-avatar-edit"),
    {ssr: false}
)
const dogImg =
    'https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000'


const test = () => {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [rotation, setRotation] = useState(0)
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [croppedImage, setCroppedImage] = useState(null)
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])

    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(
                dogImg,
                croppedAreaPixels
            )
            setCroppedImage(croppedImage)
        } catch (e) {
            console.error(e)
        }
    }, [croppedAreaPixels, rotation])

    const onClose = useCallback(() => {
        setCroppedImage(null)
    }, [])

    return (
        <div>
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
            <div>
                <a
                    onClick={showCroppedImage}
                    color="primary"
                >
                    Show Result
                </a>
            </div>
            <img src={croppedImage}  alt=""/>
        </div>
    )
}

export default test