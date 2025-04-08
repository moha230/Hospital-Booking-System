import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const Appointment = () => {
  // use the param hook extract the 'docId' form the Url
  const { docId } = useParams();

  // useContext hook get global data
  const { doctors , currencySymbols } = useContext(AppContext);

  //state to hold the selected doctors info
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [docIndex, setDocIndex] = useState([]);

  const fetchDocinfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
    console.log(docInfo);
  };

  useEffect(() => {
    fetchDocinfo();
  }, [doctors,docId]);

  return (
    docInfo && (
      <div>
        {/*doctors details  */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/*doctors image right sides */}
          <div>
            <img
              className="bg-primary w-full sm:max-w-72 rounded-lg"
              src={docInfo.image}
              alt=""
            />
          </div>
          <div className="flex-1 border border-[#ADADAD] rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            {/* Doc infromation left side */}
            <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
              {docInfo.name} <img className="w-5" src={assets.verified_icon} alt="" />
            </p>
            <div className="flex items-center gap-2 mt-1 text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {docInfo.experience}
              </button>
            </div>
            {/* Doctors about*/}
            <div>
              <div>
                <p className="flex items-center gap-1 text-sm font-large text-[#262626] mt-3">
                  About <img className="w-5" src={assets.info_icon} alt="" />
                </p>
                <p className="text-sm text-gray-600 max-w-[700px] mt-1">
                  {docInfo.about}
                </p>
              </div>
              <p className="text-gray-50 font-medium">Starting <span>{docInfo.fees} {currencySymbols}</span> </p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Appointment;
