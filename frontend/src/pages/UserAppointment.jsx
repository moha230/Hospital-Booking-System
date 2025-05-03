import React, { useContext } from "react";
import { AppContext } from "@/context/AppContext";

const UserAppointment = () => {
  const { doctors } = useContext(AppContext);
  return (
    <div>
      <p>Hello this is the User Appointment page</p>
      <div>
        {doctors.slice(0, 2).map((item, index) => (
          <div key={index}>
            <div>
              <img src="{item.image}" alt="" />
            </div>
            <div>
              <p></p>
              <p></p>
              <p></p>
              <p></p>
              <p></p>
              <p></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserAppointment;
