import React from "react";

const Profile = () => {
  // Dummy data
  const profile = {
    name: "Hritesh Saha",
    age: 45,
    aadhar: "1234-5678-9012",
    address: {
      street: "123 Farmer Street",
      city: "Kolkata",
      state: "West Bengal",
      postalCode: "700001",
    },
    land_owned: 5, // acres
    crops: ["Rice", "Wheat", "Corn"],
    livestock: ["Cows", "Goats", "Chickens"],
  };

  const { name, age, aadhar, address, land_owned, crops, livestock } = profile;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-10">
      {/* Profile Header */}
      <div className="bg-green-600 p-6">
        <h1 className="text-3xl font-bold text-white">{name}</h1>
        {age && <p className="text-white">Age: {age}</p>}
      </div>

      {/* Profile Content */}
      <div className="p-6">
        {/* Aadhaar and Land Owned */}
        <div className="flex flex-wrap justify-between items-center mb-4">
          <div className="text-lg">
            <strong>Aadhaar Number:</strong> {aadhar}
          </div>
          {land_owned && (
            <div className="text-lg">
              <strong>Land Owned:</strong> {land_owned} acres
            </div>
          )}
        </div>

        {/* Address Section */}
        {address && (
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Address</h2>
            <p>
              {address.street}, {address.city}, {address.state} -{" "}
              {address.postalCode}
            </p>
          </div>
        )}

        {/* Crops Section */}
        {crops && crops.length > 0 && (
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Crops</h2>
            <ul className="list-disc list-inside">
              {crops.map((crop, index) => (
                <li key={index}>{crop}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Livestock Section */}
        {livestock && livestock.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold">Livestock</h2>
            <ul className="list-disc list-inside">
              {livestock.map((animal, index) => (
                <li key={index}>{animal}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
