import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "@/context/AppContext";
import { assets } from "@/assets/assets";

const Appointment = () => {
  // use the param hook extract the 'docId' form the Url
  const { docId } = useParams();

  // useContext hook get global data
  const { doctors , currencySymbols } = useContext(AppContext);

  //state to hold the selected doctors info
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [docIndex, setDocIndex] = useState(0);
  const [slotTime,setSlotTime]  = useState('');
  

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
    console.log(docInfo);
  };

  //function to calculate slots for time 

  const getAvailableSlots = async () => {
    if (!docInfo) return;
  
    const today = new Date();
    const slotsPerDay = [];
  
    // utility to format a date into slotDate 
    const formatSlotDate = (date) =>
      `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`;
  
    for (let i = 0; i < 7; i++) {
      const dayDate = new Date(today);
      dayDate.setDate(today.getDate() + i);
  
      const currentDate = new Date(dayDate);
      const endTime = new Date(dayDate);
      endTime.setHours(21, 0, 0, 0); // slots until 9 PM
  
      // set starting time
      if (i === 0) {
        currentDate.setHours(Math.max(currentDate.getHours() + 1, 10));
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }
  
      const slotDateKey = formatSlotDate(currentDate);
      const bookedSlots = docInfo.slots_booked?.[slotDateKey] || [];
  
      const daySlots = [];
  
      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
  
        if (!bookedSlots.includes(formattedTime)) {
          daySlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }
  
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
  
      slotsPerDay.push(daySlots);
    }
  
    setDocSlots(slotsPerDay);
  };
  

  useEffect(() => {
    if (doctors.length > 0) {
      fetchDocInfo();
    }
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

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
