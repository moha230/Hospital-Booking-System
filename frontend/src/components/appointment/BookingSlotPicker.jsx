import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext.jsx";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const BookingSlotPicker = () => {
  const { docId } = useParams();
  const { userData, doctors, userToken, backendUrl, getDoctorsData } =
    useContext(AppContext);

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotDateTime, setSlotDateTime] = useState(null);

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const navigate = useNavigate();

  useEffect(() => {
    const foundDoc = doctors.find((doc) => doc._id === docId);
    setDocInfo(foundDoc);
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) getAvailableSlots();
  }, [docInfo]);

  const getAvailableSlots = () => {
    const today = new Date();
    const now = new Date();
    const allSlots = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        currentDate.setHours(currentHour);
        currentDate.setMinutes(currentMinute > 30 ? 0 : 30);
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }

      const slotDate = `${currentDate.getDate()}_${
        currentDate.getMonth() + 1
      }_${currentDate.getFullYear()}`;
      const booked = docInfo.slots_booked?.[slotDate] || [];

      const daySlots = [];

      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        if (!booked.includes(formattedTime)) {
          daySlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      allSlots.push(daySlots);
    }

    setDocSlots(allSlots);
  };

  const bookAppointment = async () => {
    if (!userToken) {
      toast.warning("Please login to book appointment");
      return navigate("/login");
    }

    if (!userData || !userData._id || !slotDateTime) {
      return toast.error("Missing info");
    }

    const userId = userData._id;

    // Format the slotDate as date-only
    const slotDate = new Date(
      slotDateTime.getFullYear(),
      slotDateTime.getMonth(),
      slotDateTime.getDate()
    ).toISOString();

    // Use full  datetime as slotTime in order for less confusion
    const slotTime = slotDateTime.toISOString();

    try {
      const { data } = await axios.post(
        `${backendUrl}api/v1/user/book-appointment`,
        {
          userId,
          docId,
          slotDate,
          slotTime,
        },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        // navigate("/UserAppointments");
        setTimeout(() => getAvailableSlots(), 100);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message || "Something went wrong");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 py-6">
      <p className="font-medium text-gray-700 mb-4 text-lg">Booking Slots</p>

      {/* Date selector */}
      <div className="w-full overflow-x-auto ">
        <div className="flex justify-center">
          <div className="flex gap-4 min-w-max max-w-6xl mx-auto pb-2 border-b border-gray-200">
            {docSlots.map((slots, index) => (
              <div
                key={index}
                onClick={() => setSlotIndex(index)}
                className={`text-center min-w-[80px] px-3 py-2 rounded-xl cursor-pointer transition-all ${
                  slotIndex === index
                    ? "bg-primary text-white shadow"
                    : "bg-white border border-gray-300 text-gray-800 hover:bg-gray-100"
                }`}
              >
                <p className="uppercase text-xs font-semibold">
                  {slots[0] && daysOfWeek[slots[0].datetime.getDay()]}
                </p>
                <p className="text-sm">
                  {slots[0] && slots[0].datetime.getDate()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full mt-4 overflow-x-auto">
        <div className="flex gap-3 min-w-max px-4 py-2">
          {docSlots[slotIndex]?.map((slot, i) => (
            <button
              key={i}
              onClick={() => setSlotDateTime(slot.datetime)}
              className={`text-sm px-4 py-2 rounded-full transition-all flex-shrink-0 whitespace-nowrap ${
                slot.datetime.getTime() === slotDateTime?.getTime()
                  ? "bg-primary text-white"
                  : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-100"
              }`}
            >
              {slot.time.toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Book button */}
      <button
        onClick={bookAppointment}
        className="mt-6 bg-primary text-white text-sm font-light px-6 py-2 rounded-full shadow hover:bg-green-600 transition"
      >
        Book an appointment
      </button>
    </div>
  );
};

export default BookingSlotPicker;
