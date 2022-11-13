import React, { useState, useRef } from "react";
import { FiCamera } from "react-icons/fi";
import { AiOutlineCloseCircle, AiOutlineCheckCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import axios from "axios";

export default function EditProfileModal(props) {
    const {
        updateProfilePic,
        closeModal,
        currentPic,
        updateName,
        currentName,
        user,
    } = props;
    const [srcImg, setSrcImg] = useState();
    const cropperRef = useRef(null);
    const inputFile = useRef(null);
    const [croppedImg, setCroppedImg] = useState("");
    const [showFileSelector, setShowFileSelector] = useState(false);
    const [name, setName] = useState(currentName);

    const onCrop = () => {
        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;
        setCroppedImg(cropper.getCroppedCanvas().toDataURL());
    };

    function handlePhotoChange(e) {
        setSrcImg(URL.createObjectURL(e.target.files[0]));
    }

    function openFileSelector() {
        inputFile.current.click();
    }

    function handleNameChange(event) {
        setName(event.target.value);
    }

    async function updateUser() {
        console.log(user);
        const id = user._id;
        const image = croppedImg ? croppedImg : currentPic;
        try {
            const response = await axios.post(
                "http://localhost:4000/user/" + id,
                {
                    name: name,
                    avatar: image,
                }
            );
            const result = response.data;
            updateName(result.name);
            updateProfilePic(result.avatar);
        } catch (error) {
            //We're not handling errors. Just logging into the console.
            console.log(error);
            return false;
        }
    }

    return (
        <div className="modal-screen">
            <div className="modal-header">
                <IconContext.Provider value={{ color: "white", size: "35px" }}>
                    <div
                        className="modal-left-button"
                        onClick={() => closeModal()}
                    >
                        <AiOutlineCloseCircle />
                    </div>
                </IconContext.Provider>
                <div className="modal-center-title">Edit Profile</div>
                <IconContext.Provider value={{ color: "white", size: "35px" }}>
                    <div className="modal-right-button" onClick={updateUser}>
                        <AiOutlineCheckCircle />
                    </div>
                </IconContext.Provider>
            </div>
            <div className="edit-profile-modal-container">
                <div className="edit-profile-modal-preview">
                    <img
                        className="profile-avatar"
                        src={croppedImg ? croppedImg : currentPic}
                        onMouseEnter={() => setShowFileSelector(true)}
                    />
                    <input
                        className="edit-profile-name"
                        name="name"
                        value={name}
                        onChange={handleNameChange}
                        placeholder="Name"
                        maxLength={20}
                    />
                    <div
                        className="edit-profile-modal-overlay"
                        style={
                            showFileSelector
                                ? { visibility: "visible" }
                                : { visibility: "hidden" }
                        }
                        onMouseLeave={() => setShowFileSelector(false)}
                        onClick={() => openFileSelector()}
                    >
                        <IconContext.Provider
                            value={{ color: "white", size: "30px" }}
                        >
                            <div style={{ padding: 5 }}>
                                <FiCamera />
                            </div>
                        </IconContext.Provider>
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        ref={inputFile}
                        onChange={handlePhotoChange}
                        style={{ display: "none" }}
                    />
                </div>
                {srcImg && (
                    <div className="crop-region">
                        <Cropper
                            src={srcImg}
                            style={{ height: 400, width: 400 }}
                            initialAspectRatio={1}
                            aspectRatio={1}
                            guides={false}
                            crop={onCrop}
                            ref={cropperRef}
                            viewMode={1}
                            minCropBoxHeight={100}
                            minCropBoxWidth={100}
                            background={false}
                            responsive={true}
                            autoCropArea={1}
                            checkOrientation={false}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
