import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext.jsx";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";

const BookingSlotPicker = () => {
  const { docId } = useParams();
  const { userData, doctors, userToken, backendUrl, getDoctorsData } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const navigate = useNavigate();

  const fetchDocInfo = () => {
    const foundDoc = doctors.find((doc) => doc._id === docId);
    setDocInfo(foundDoc);
  };

  const getAvailableSlots = () => {
    if (!docInfo) return;

    const today = new Date();
    const allSlots = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const endTime = new Date(currentDate);
      endTime.setHours(22, 0, 0, 0);

      if (i === 0) {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        currentDate.setHours(currentHour);
        currentDate.setMinutes(currentMinute > 30 ? 0 : 30);
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }

      const daySlots = [];

      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        const slotDateKey = `${currentDate.getDate()}_${currentDate.getMonth() + 1}_${currentDate.getFullYear()}`;
        const isBooked = docInfo.slots_booked?.[slotDateKey]?.includes(formattedTime);

        if (!isBooked) {
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

    if (!userData || !userData._id || !slotTime || !docSlots[slotIndex]?.[0]) {
      return toast.error("Missing booking information");
    }

    const selectedDate = docSlots[slotIndex][0].datetime;
    const slotDate = `${selectedDate.getDate()}_${selectedDate.getMonth() + 1}_${selectedDate.getFullYear()}`;

    try {
      const { data } = await axios.post(
        `${backendUrl}api/v1/user/book-appointment`,
        {
          userId: userData._id,
          docId,
          slotDate,
          slotTime,
        },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        setSlotTime("");
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

  useEffect(() => {
    if (doctors.length > 0) fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) getAvailableSlots();
  }, [docInfo]);

  return (
    <div className="flex flex-col items-center justify-center px-4 py-6">
      <p className="font-medium text-gray-700 mb-4 text-lg">Booking Slots</p>

      {docSlots.length === 0 && (
        <p className="text-sm text-gray-500">No slots available</p>
      )}

      <div className="w-full overflow-x-auto">
        <div className="flex justify-center">
          <div className="flex gap-4 min-w-max max-w-6xl mx-auto pb-2 border-b border-gray-200">
            {docSlots.map((slots, index) => (
              <div
                key={index}
                onClick={() => {
                  setSlotIndex(index);
                  setSlotTime("");
                }}
                className={`text-center min-w-[80px] px-3 py-2 rounded-xl cursor-pointer transition-all ${
                  slotIndex === index
                    ? "bg-primary text-white shadow"
                    : "bg-white border border-gray-300 text-gray-800 hover:bg-gray-100"
                }`}
              >
                {slots[0] ? (
                  <>
                    <p className="uppercase text-xs font-semibold">
                      {moment(slots[0].datetime).format("ddd").toUpperCase()}
                    </p>
                    <p className="text-sm">
                      {moment(slots[0].datetime).format("D MMM")}
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-gray-400">No slots</p>
                )}
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
              onClick={() => setSlotTime(slot.time)}
              className={`text-sm px-4 py-2 rounded-full transition-all flex-shrink-0 whitespace-nowrap ${
                slot.time === slotTime
                  ? "bg-primary text-white"
                  : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-100"
              }`}
            >
              {slot.time.toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={bookAppointment}
        className={`mt-6 px-6 py-2 rounded-full shadow text-white text-sm font-light ${
          !slotTime
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-primary hover:bg-green-600"
        }`}
        disabled={!slotTime}
      >
        Book an appointment
      </button>
    </div>
  );
};

export default BookingSlotPicker;
