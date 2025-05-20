import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import DoctorDetails from "../components/appointment/DoctorDetails.jsx";
import BookingSlotPicker from "../components/appointment/BookingSlotPicker.jsx";
import RelatedDoctors from "../components/appointment/RelatedDoctors.jsx";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors } = useContext(AppContext);

  const [docInfo, setDocInfo] = useState(null);

  useEffect(() => {
    const found = doctors.find((doc) => doc._id === docId);
    setDocInfo(found);
  }, [doctors, docId]);

  return (
    docInfo && (
      <div>
        <DoctorDetails />
        <BookingSlotPicker />
        <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
      </div>
    )
  );
};

export default Appointment;
