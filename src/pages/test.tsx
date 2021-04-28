import React, {useState} from 'react'
import dynamic from 'next/dynamic';

const AvatarNoSSR = dynamic(
    () => import("react-avatar-edit"),
    {ssr: false}
)

const test = () => {
    const [preview, setPreview] = useState(null);

    function onClose() {
        setPreview(null);
    }

    function onCrop(pv) {
        setPreview(pv);
    }

    function onBeforeFileLoad(elem) {
        if (elem.target.files[0].size > 200000) {
            alert("File is too big!");
            elem.target.value = "";
        }
    }

    return (
        <div className="mt-10">
            <AvatarNoSSR
                width={600}
                height={300}
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
            <br/>
            {preview && (
                <>
                    <img src={preview} alt="Preview"/>
                    <a href={preview} download="avatar">
                        Download image
                    </a>
                </>
            )}
        </div>
    )
}

export default test