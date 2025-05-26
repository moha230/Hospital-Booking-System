import React, { useContext, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const {
    userToken,
    backendUrl,
    userData,
    setUserData,
    getUserProfileData,
  } = useContext(AppContext);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);

      if (image) {
        formData.append("image", image);
      }

      const { data } = await axios.post(
        `${backendUrl}api/v1/user/update-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        await getUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  if (!userData) return null;

  const { name, email, phone, address = {}, gender, dob, image: profileImg } = userData;

  return (
    <div className="max-w-xl mx-auto bg-white shadow p-6 rounded-lg text-sm space-y-6 mt-10">
      {/* Profile header */}
      <div className="flex items-center gap-6">
        {isEdit ? (
          <label htmlFor="image" className="cursor-pointer relative">
            <img
              className="w-28 h-28 rounded-full object-cover border-2 border-gray-300"
              src={image ? URL.createObjectURL(image) : profileImg}
              alt="Profile"
            />
            <input
              type="file"
              id="image"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
            <div className="absolute bottom-0 right-0 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
              Change
            </div>
          </label>
        ) : (
          <img
            className="w-28 h-28 rounded-full object-cover border-2 border-gray-300"
            src={profileImg}
            alt="Profile"
          />
        )}

        <div>
          {isEdit ? (
            <input
              className="text-2xl font-semibold bg-gray-100 p-2 rounded w-full"
              type="text"
              value={name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
          ) : (
            <h2 className="text-2xl font-semibold">{name}</h2>
          )}
          <p className="text-gray-500">{email}</p>
        </div>
      </div>

      {/* Contact information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-700">Contact Information</h3>

        <div>
          <label className="block text-gray-600 text-sm mb-1">Phone</label>
          {isEdit ? (
            <input
              className="bg-gray-50 border p-2 w-full rounded"
              type="tel"
              value={phone}
              onChange={(e) =>
                setUserData({ ...userData, phone: e.target.value })
              }
            />
          ) : (
            <p>{phone}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-600 text-sm mb-1">Street</label>
          {isEdit ? (
            <input
              className="bg-gray-50 border p-2 w-full rounded"
              type="text"
              value={address.street || ""}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  address: { ...address, street: e.target.value },
                })
              }
            />
          ) : (
            <p>{address.street}</p>
          )}
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-gray-600 text-sm mb-1">City</label>
            {isEdit ? (
              <input
                className="bg-gray-50 border p-2 w-full rounded"
                type="text"
                value={address.city || ""}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    address: { ...address, city: e.target.value },
                  })
                }
              />
            ) : (
              <p>{address.city}</p>
            )}
          </div>
          <div className="w-1/2">
            <label className="block text-gray-600 text-sm mb-1">Country</label>
            {isEdit ? (
              <input
                className="bg-gray-50 border p-2 w-full rounded"
                type="text"
                value={address.country || ""}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    address: { ...address, country: e.target.value },
                  })
                }
              />
            ) : (
              <p>{address.country}</p>
            )}
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-700">Basic Information</h3>

        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-gray-600 text-sm mb-1">Gender</label>
            {isEdit ? (
              <select
                className="bg-gray-50 border p-2 w-full rounded"
                value={gender}
                onChange={(e) =>
                  setUserData({ ...userData, gender: e.target.value })
                }
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
            ) : (
              <p>{gender}</p>
            )}
          </div>

          <div className="w-1/2">
            <label className="block text-gray-600 text-sm mb-1">Date of Birth</label>
            {isEdit ? (
              <input
                className="bg-gray-50 border p-2 w-full rounded"
                type="date"
                value={dob?.split("T")[0] || ""}
                onChange={(e) =>
                  setUserData({ ...userData, dob: e.target.value })
                }
              />
            ) : (
              <p>{dob?.split("T")[0]}</p>
            )}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="text-center pt-6">
        {isEdit ? (
          <button
            className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
            onClick={updateUserProfileData}
          >
            Save Changes
          </button>
        ) : (
          <button
            className="border border-green-600 text-green-600 px-6 py-2 rounded-full hover:bg-red-600 hover:text-white transition"
            onClick={() => setIsEdit(true)}
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
