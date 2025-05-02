import React, { useState } from "react";
import { assets } from "@/assets/assets";

const Profile = () => {
  //state to hold user data will be connected to the backend in the future
  const [userData, setUserData] = useState({
    name: "Juma Jana",
    image: assets.profile_pic,
    email: "jumaJuna@gmail.com",
    phone: "+3589464855",
    address: {
      line1: "Pohjoisesplanadi 21",
      line2: "Helsinki, Finland",
    },
    gender: "Male",
    dob: "1986-01-20",
  });

  //state variable to toggle between view and edit mode
  const [isEdit, setIsEdit] = useState(true);

  return (
    // container for profile
    <div className="max-w-lg flex flex-col gap-2 text-sm pt-5">
      {/* Display the user's profile image */}
      <img className="w-56 rounded opacity-75" src={userData.image} />
      {/* Conditionally render name as input (edit mode) or text (view mode) */}
      {isEdit ? (
        <input
          className="bg-gray-50 text-3xl font-medium max-w-60"
          type="text"
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, name: e.target.value }))
          }
          value={userData.name}
        />
      ) : (
        // show name as plain text if not in edit mode
        <p className="font-medium text-3xl text-[#262626] mt-4">
          {userData.name}
        </p>
      )}
      <hr className="bg-[#ADADAD] h-[1px] border-none" />

      {/* Contact section thinking of making this into different components. At the moment need to make a working page  */}
      <div>
        <p className="text-gray-600 underline mt-3">Contact information</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-[#363636]">
          {/* Email section (static display, not editable even in edit mode) may change in future */}
          <p className="font-medium">Email</p>
          <p className="text-green-500">{userData.email}</p>
          {/* Phone number section */}
          <p className="font-medium">Phone number</p>
          {isEdit ? (
            // Input field to edit phone number when in edit mode
            <input
            className='bg-gray-50 max-w-52' 
              type="tel"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
              value={userData.phone}
            />
          ) : (
            // Show phone number as text when not in edit mode
            <p className='text-green-500'>{userData.phone}</p>
          )}
          {/* Address  section maybe moved to component */}
          <p className='font-medium'>Address</p>
          {isEdit ? (
            // Input field to edit address  when in edit mode address line1 and line2
            <p>
              <input
              className='bg-gray-50'
                type="text"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                value={userData.address.line1}
              />
              <br />
              <input
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                value={userData.address.line2}
                type="text"
              />
            </p>
          ) : (
            <p>
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
          )}
        </div>
      </div>
      <div>
        {/* basic information section. maybe turn it to component?  */}
        <p className='text-[#797979] underline mt-3'>Basic information</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-gray-600'>
          <p className='font-medium'>Gender</p>
          {isEdit ? (
            <select
            className='max-w-20 bg-gray-50' 
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
              value={userData.gender}
            >
              <option value="Blanck">Select gender</option>
              <option value="male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
          ) : (
            <p className='text-gray-500'>{userData.gender}</p>
          )}
          <p className='font-medium' >Date of birth</p>
          {isEdit ? (
            <input
            className='max-w-28 bg-gray-50'
              type="date"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
              value={userData.dob}
            />
          ) : (
            <p  className='text-gray-500' >{userData.dob}</p>
          )}
        </div>
        {/*edit button section */}
        <div className='mt-20'>
          {isEdit ? (
            <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={() => setIsEdit(false)}>Save information</button>
          ) : (
            <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={() => setIsEdit(true)}>Edit information</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
