import React, { useState } from "react";
import BottomNav from "../../components/BottomNav";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "Vivek Obroi",
    age: 40,
    aadhar: "7345-8234-1234",
    address: {
      street: "123 Rice fields",
      city: "Antarctica",
      postalCode: "999999",
    },
    land_owned: 10, // acres
    crops: ["Rice", "Wheat", "Corn"],
    livestock: [
      { name: "Cows", quantity: 12 },
      { name: "Goats", quantity: 12 },
      { name: "Sheeps", quantity: 12 },
      { name: "Chickens", quantity: 9 },
    ],
    profilePicture: "https://via.placeholder.com/100", // Default profile picture
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("address")) {
      const addressField = name.split(".")[1];
      setProfile((prevProfile) => ({
        ...prevProfile,
        address: {
          ...prevProfile.address,
          [addressField]: value,
        },
      }));
    } else {
      setProfile((prevProfile) => ({
        ...prevProfile,
        [name]: value,
      }));
    }
  };

  const handleCropChange = (e, index) => {
    const updatedCrops = [...profile.crops];
    updatedCrops[index] = e.target.value;
    setProfile((prevProfile) => ({
      ...prevProfile,
      crops: updatedCrops,
    }));
  };

  const handleLivestockChange = (e, index, field) => {
    const updatedLivestock = [...profile.livestock];
    updatedLivestock[index][field] = e.target.value;
    setProfile((prevProfile) => ({
      ...prevProfile,
      livestock: updatedLivestock,
    }));
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prevProfile) => ({
          ...prevProfile,
          profilePicture: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    setIsEditing(false);
    alert("Profile updated!");
  };

  const { name, age, aadhar, address, crops, livestock, profilePicture } = profile;

  return (
    <section className="flex flex-col min-h-4xl ">
      <div className="flex-grow max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-10">
        {/* Profile Header */}
        <div className="flex justify-center items-center bg-gray-100 p-6 relative">
          {/* Profile Image */}
          <img
            src={profilePicture}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
          />
          {isEditing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
              className="absolute bottom-2 left-2"
            />
          )}
          <div className="absolute top-2 right-2 cursor-pointer" onClick={handleEditToggle}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.232 5.232a3 3 0 014.243 4.243l-10 10a4.5 4.5 0 01-1.802 1.131l-3.671 1.028 1.028-3.67a4.5 4.5 0 011.13-1.803l10-10z"
              />
            </svg>
          </div>
        </div>

        {/* Profile Name and Age */}
        <div className="flex flex-col items-center mt-4">
          {isEditing ? (
            <>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                className="text-center border rounded mb-2"
              />
              <input
                type="number"
                name="age"
                value={age}
                onChange={handleChange}
                className="text-center border rounded"
              />
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold">{name}</h1>
              {age && <p className="text-gray-500">Age: {age}</p>}
            </>
          )}
        </div>

        {/* Profile Content */}
        <div className="p-6">
          {/* Address */}
          <div className="text-center mb-4">
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="address.street"
                  value={address.street}
                  onChange={handleChange}
                  className="border rounded mb-1 w-full"
                />
                <input
                  type="text"
                  name="address.city"
                  value={address.city}
                  onChange={handleChange}
                  className="border rounded mb-1 w-full"
                />
                <input
                  type="text"
                  name="address.postalCode"
                  value={address.postalCode}
                  onChange={handleChange}
                  className="border rounded w-full"
                />
              </>
            ) : (
              <p>
                {address.street}, {address.city} - {address.postalCode}
              </p>
            )}
          </div>

          {/* Aadhaar */}
          <div className="text-center mb-4">
            <p>Farmer ID: {aadhar}</p>
          </div>

          {/* Crops */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Crops:</h2>
            <ul className="list-disc list-inside">
              {crops.map((crop, index) => (
                <li key={index}>
                  {isEditing ? (
                    <input
                      type="text"
                      value={crop}
                      onChange={(e) => handleCropChange(e, index)}
                      className="border rounded mb-1 w-full"
                    />
                  ) : (
                    crop
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Livestock */}
          <div>
            <h2 className="text-xl font-semibold">Livestock:</h2>
            <ul className="list-disc list-inside">
              {livestock.map((animal, index) => (
                <li key={index} className="flex justify-between">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={animal.name}
                        onChange={(e) => handleLivestockChange(e, index, "name")}
                        className="border rounded mb-1"
                      />
                      <input
                        type="number"
                        value={animal.quantity}
                        onChange={(e) => handleLivestockChange(e, index, "quantity")}
                        className="border rounded mb-1 w-16 text-center"
                      />
                    </>
                  ) : (
                    <>
                      <span>{animal.name}</span>
                      <span>{animal.quantity}</span>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Edit Button */}
          {isEditing && (
            <div className="mt-6 text-center">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
      <BottomNav />
    </section>
  );
};

export default Profile;
