import { useState } from "react";
import ImageUploader from "react-image-upload";
import "react-image-upload/dist/index.css";
import upload from "../assets/upload.svg";
import times from "../assets/times.svg";
import Form from "./Form.jsx";

export default function AttendeeForm({
  handleNext,
  handlePrevious,
  name,
  setName,
  email,
  setEmail,
  about,
  setAbout,
  profileImage,
  setProfileImage,
}) {
  const [errors, setErrors] = useState({});

  function getImageFileObject(imageFile) {
    console.log("Uploaded Image:", imageFile);
    setProfileImage(imageFile.dataURL); // Store the image as a base64 string
  }

  function runAfterImageDelete() {
    setProfileImage(null); // Remove the image
  }

  function validate() {
    let tempErrors = {};

    if (!name.trim()) tempErrors.name = "Name is required";
    if (!email.trim()) tempErrors.email = "Email is required";
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))
      tempErrors.email = "Invalid email format";
    if (!about.trim()) tempErrors.about = "About section cannot be empty";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  }

  function handleNextStep(e) {
    e.preventDefault();
    if (validate()) {
      handleNext();
    }
  }

  return (
    <div>
      <div className="formContainer">
        <h6>Upload Profile Photo:</h6>
        <div className="image-container">
          <div className="custom-uploader">
            <ImageUploader
              onFileAdded={getImageFileObject}
              onFileRemoved={runAfterImageDelete}
              uploadIcon={
                <img src={upload} alt="Upload" style={{ width: 40, height: 40 }} />
              }
              deleteIcon={
                <img src={times} alt="Delete" style={{ width: 25, height: 25 }} />
              }
              style={{ height: 200, width: 200, background: "#052F35", color: "#197666" }}
            />
            <p className="upload-label">Upload your picture</p>
          </div>
        </div>
      </div>
      <hr className="hr1" />
      <Form
        handleNext={handleNextStep}
        handlePrevious={handlePrevious}
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        about={about}
        setAbout={setAbout}
        errors={errors}
      />
    </div>
  );
}
