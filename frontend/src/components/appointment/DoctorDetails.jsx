import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "@/context/AppContext";
import { assets } from "@/assets/assets";

const DoctorDetails = () => {
  const { docId } = useParams();
  const { doctors, currencySymbols } = useContext(AppContext);

  const [docInfo, setDocInfo] = useState(null);

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
    console.log("Loaded Doctor Info:", docInfo);
  };

  useEffect(() => {
    if (doctors.length > 0) {
      fetchDocInfo();
    }
  }, [doctors, docId]);

  return (
    docInfo && (
      <div className="p-4">
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Doctor Image */}
          <div className="w-full sm:w-72 h-72 flex-shrink-0">
            <img
              className="w-full h-full object-cover rounded-xl border"
              src={docInfo.image}
              alt={`${docInfo.name} profile`}
            />
          </div>

          {/* Doctor Info */}
          <div className="flex-1 border border-gray-300 rounded-xl p-6 bg-white shadow-sm">
            <p className="flex items-center gap-2 text-3xl font-semibold text-gray-800">
              {docInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="Verified" />
            </p>

            <div className="flex items-center gap-2 mt-2 text-gray-600">
              <p className="text-base">
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-1 px-3 text-xs border border-gray-400 rounded-full">
                {docInfo.experience}
              </button>
            </div>

            {/* About section */}
            <div className="mt-4">
              <p className="flex items-center gap-2 text-sm font-medium text-gray-700">
                About
                <img className="w-4" src={assets.info_icon} alt="Info" />
              </p>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed max-w-[700px]">
                {docInfo.about}
              </p>
            </div>

            {/* Fees */}
            <p className="mt-4 text-sm font-medium text-gray-700">
              Starting at:{" "}
              <span className="text-gray-900 font-semibold">
                {currencySymbols}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorDetails;
