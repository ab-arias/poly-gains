import React, { useState, useRef } from "react";
import { FiCamera, FiTrash2 } from "react-icons/fi";
import { AiOutlineCloseCircle, AiOutlineCheckCircle } from "react-icons/ai";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import axios from "axios";

export default function EditProfileModal({ closeModal, user, setUser }) {
    const [srcImg, setSrcImg] = useState();
    const cropperRef = useRef(null);
    const inputFile = useRef(null);
    const [croppedImg, setCroppedImg] = useState(
        user?.avatar ? user.avatar : ""
    );
    const [showFileSelector, setShowFileSelector] = useState(false);
    const [name, setName] = useState(user.name);

    const onCrop = () => {
        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;
        setCroppedImg(cropper.getCroppedCanvas().toDataURL());
    };

    function handlePhotoChange(e) {
        if (e.target.files[0]) {
            setSrcImg(URL.createObjectURL(e.target.files[0]));
        }
    }

    function openFileSelector() {
        inputFile.current.click();
    }

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleImageDelete() {
        setSrcImg(null);
        inputFile.current.value = "";
        setCroppedImg("");
    }

    async function updateUser() {
        const id = user._id;
        try {
            const response = await axios.post(
                window.$BACKEND_URI + "user/" + id,
                {
                    name: name,
                    avatar: croppedImg,
                }
            );
            const result = response.data;
            setUser(result);
        } catch (error) {
            //We're not handling errors. Just logging into the console.
            console.log(error);
            return false;
        }
    }

    return (
        <div className="modal-screen">
            <div className="modal-header">
                <AiOutlineCloseCircle
                    className="modal-left-button"
                    size={35}
                    onClick={() => closeModal()}
                />
                <div className="modal-center-title">Edit Profile</div>
                <AiOutlineCheckCircle
                    className="modal-right-button"
                    size={35}
                    onClick={updateUser}
                />
            </div>
            <div className="modal-container">
                <div className="edit-profile-modal-preview">
                    <img
                        className="profile-avatar"
                        src={
                            croppedImg
                                ? croppedImg
                                : require("../assets/img/DefaultProfilePic.jpeg")
                        }
                        onMouseEnter={() => setShowFileSelector(true)}
                        alt="Avatar"
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
                    >
                        <FiCamera
                            className="edit-profile-modal-cam"
                            size={30}
                            onClick={openFileSelector}
                        />
                        <FiTrash2
                            className="edit-profile-modal-trash"
                            size={30}
                            onClick={handleImageDelete}
                        />
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

                    <div className="body-stats-main">
                        <div className="body-stats-table">
                            <h3 className="sub-header" style={{'font-size': '20px'}}>Body Stats</h3>
                                <div className="body-stats-height">
                                    <div className="bold-header">Height:</div>
                                        <input
                                            id="height-input-ft"
                                            type="text"
                                            className="height-ft"
                                        ></input>
                                        <label
                                            htmlFor="height-input-ft"
                                            className="label-ft"
                                        >
                                            ft
                                        </label>
                                        <input
                                        id="height-input-in"
                                        type="text"
                                        className="height-in"
                                        ></input>
                                        <label htmlFor="height-input-in">in</label>
                                </div>
                                <div>
                                    <div className="bold-header">Weight:</div>
                                        <input
                                            id="weight-input-id"
                                            type="text"
                                            className="weight-lbs"
                                        ></input>
                                        <label htmlFor="weight-input-id">lbs</label>
                                    </div>
                                <div>
                                    <div className="bold-header">Calories:</div>
                                        <input
                                        id="calorie-input-in"
                                        type="text"
                                        clasName="calories-in"
                                        ></input>
                                        <label htmlFor="calorie-input-in">cal</label>
                                </div>

                                <div>
                                    <div className="bold-header">Plan</div>
                                    <input>
                                    </input>
                                </div>

                                <button
                                className="body-stats-submit"
                                style={{'margin-top': '30px'}}
                            >
                                Submit
                            </button>
                        </div> 
                    </div>
            </div>
        </div>

        
    );
}
