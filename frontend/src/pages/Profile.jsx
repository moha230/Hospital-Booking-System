import React, { useState } from "react";
import { assets } from "@/assets/assets";

const Profile = () => {
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

  //state variable
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div>
      <img src={userData.image} />
      Hello this is the Profile page
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
        <p className="font-medium text-3xl text-[#262626] mt-4">
          {userData.name}
        </p>
      )}
      
      
    </div>
    
  );
};

export default Profile;
