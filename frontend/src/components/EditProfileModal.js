import React, { useState, useRef } from "react";
import { FiCamera } from "react-icons/fi";
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

  function handleSubmission() {
    updateProfilePic(croppedImg);
    updateName(name);
  }

  async function updateUser() {
    const id = user[0]._id;
    try {
      const response = await axios.post("http://localhost:4000/user/" + id, {
        name: name,
        avatar: croppedImg,
      });
      const result = response.data;
      console.log(result);
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
      <div className="edit-profile-modal-header">
        <button
          className="edit-profile-modal-close"
          onClick={() => closeModal()}
        >
          X
        </button>
        <button className="edit-profile-modal-save" onClick={updateUser}>
          Save
        </button>
      </div>
      <div className="edit-profile-modal-container">
        <div
          className="edit-profile-modal-preview"
          onMouseEnter={() => setShowFileSelector(true)}
          onMouseLeave={() => setShowFileSelector(false)}
        >
          <img
            className="profile-avatar"
            src={croppedImg ? croppedImg : currentPic}
          />
          <input
            className="edit-profile-name"
            name="name"
            value={name}
            onChange={handleNameChange}
            placeholder="Name"
            maxLength={20}
          />
          {showFileSelector && (
            <div
              className="edit-profile-modal-overlay"
              onClick={() => openFileSelector()}
            >
              <IconContext.Provider value={{ color: "white", size: "30px" }}>
                <div style={{ padding: 5 }}>
                  <FiCamera />
                </div>
              </IconContext.Provider>
            </div>
          )}
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
