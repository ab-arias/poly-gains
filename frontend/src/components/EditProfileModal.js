import React, { useState, useRef } from "react";
import { FiCamera, FiTrash2 } from "react-icons/fi";
import { AiOutlineCloseCircle, AiOutlineCheckCircle } from "react-icons/ai";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import axios from "axios";

export default function EditProfileModal({
    closeModal,
    user,
    setUser,
    stats,
    setStats,
}) {
    const [srcImg, setSrcImg] = useState();
    const cropperRef = useRef(null);
    const inputFile = useRef(null);
    const [croppedImg, setCroppedImg] = useState(
        user?.avatar ? user.avatar : ""
    );
    const [showFileSelector, setShowFileSelector] = useState(false);
    const [name, setName] = useState(user.name);
    const [weight, setWeight] = useState(stats.weight);
    const [calories, setCalories] = useState(stats.calories);
    const [plan, setPlan] = useState(stats.plan);
    const [feet, setFeet] = useState(Math.floor(stats.height / 12));
    const [inches, setInches] = useState(stats.height % 12);

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

    function handleFeetChange(event) {
        setFeet(event.target.value);
        console.log(feet);
    }

    function handleInchesChange(event) {
        setInches(event.target.value);
        console.log(feet);
    }

    function handleWeightChange(event) {
        setWeight(event.target.value);
    }

    function handleCaloriesChange(event) {
        setCalories(event.target.value);
    }

    function handlePlanChange(event) {
        setPlan(event.target.value);
    }

    async function updateUser() {
        const userId = user._id;
        const statsId = stats._id;
        try {
            const userResponse = await axios.post(
                window.$BACKEND_URI + "user/" + userId,
                {
                    name: name,
                    avatar: croppedImg,
                }
            );
            const bodyResponse = await axios.post(
                window.$BACKEND_URI + "bodyStats/" + statsId,
                {
                    height: parseInt(feet) * 12 + parseInt(inches),
                    weight: weight,
                    calories: calories,
                    plan: plan,
                }
            );
            const userResult = userResponse.data;
            const bodyResult = bodyResponse.data;
            setUser(userResult);
            setStats(bodyResult);
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
                    onClick={() => {
                        updateUser();
                        closeModal();
                    }}
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
                    <div className="body-stats-height">
                        <div className="bold-header">Height:</div>
                        <input
                            id="height-input-ft"
                            type="text"
                            className="height-ft"
                            value={feet}
                            onChange={handleFeetChange}
                        ></input>
                        <label htmlFor="height-input-ft" className="label-ft">
                            ft
                        </label>
                        <input
                            id="height-input-in"
                            type="text"
                            className="height-in"
                            value={inches}
                            onChange={handleInchesChange}
                        ></input>
                        <label htmlFor="height-input-in">in</label>
                    </div>
                    <div>
                        <div className="bold-header">Weight:</div>
                        <input
                            id="weight-input-id"
                            type="text"
                            className="weight-lbs"
                            value={weight}
                            onChange={handleWeightChange}
                        ></input>
                        <label htmlFor="weight-input-id">lbs</label>
                    </div>
                    <div>
                        <div className="bold-header">Calories:</div>
                        <input
                            id="calorie-input-in"
                            type="text"
                            clasName="calories-in"
                            value={calories}
                            onChange={handleCaloriesChange}
                        ></input>
                        <label htmlFor="calorie-input-in">cal</label>
                    </div>

                    <div>
                        <div className="bold-header">Plan</div>
                        <input value={plan} onChange={handlePlanChange}></input>
                    </div>
                </div>
            </div>
        </div>
    );
}
