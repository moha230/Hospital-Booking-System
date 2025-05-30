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
  const [slotTime, setSlotTime] = useState("");

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
      toast.warning("Login to book appointment");
      return navigate("/login");
    }
    if(!userData || !userData._id) {
      toast.error("User data missing.Please log in again");
      return navigate("/login");
    }

    const userId = userData._id;

    const selectedDate = docSlots[slotIndex][0]?.datetime;
    if (!selectedDate || !slotTime) {
      return toast.error("Please select a date and time slot");
    }

    const slotDate = `${selectedDate.getDate()}_${
      selectedDate.getMonth() + 1
    }_${selectedDate.getFullYear()}`;

    try {
      const { data } = await axios.post(
        `${backendUrl}api/v1/user/book-appointment`,
        { userId, docId, slotDate, slotTime },
        { headers: { Authorization:`Bearer ${userToken}` } }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/UserAppointment");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 py-6">
      <p className="font-medium text-gray-700 mb-4 text-lg">Booking slots</p>

      <div className="overflow-x-auto w-full">
        <div className="flex justify-center">
          <div className="flex gap-4 min-w-max max-w-6xl mx-auto">
            {docSlots.map((slots, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 min-w-[96px] flex-shrink-0"
              >
                {/* Day Header */}
                <div
                  onClick={() => setSlotIndex(index)}
                  className={`w-full text-center py-3 px-2 rounded-xl font-semibold cursor-pointer transition-all duration-200 ${
                    slotIndex === index
                      ? "bg-primary text-white shadow-md"
                      : "bg-white border border-gray-300 text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  <p className="uppercase text-sm">
                    {slots[0] && daysOfWeek[slots[0].datetime.getDay()]}
                  </p>
                  <p className="text-xs">
                    {slots[0] && slots[0].datetime.getDate()}
                  </p>
                </div>

                {/* Time Slots */}
                {slots.map((slot, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSlotIndex(index);
                      setSlotTime(slot.time);
                    }}
                    className={`w-full text-xs py-2 rounded-full transition-all ${
                      slot.time === slotTime && slotIndex === index
                        ? "bg-primary text-white"
                        : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {slot.time.toLowerCase()}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

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
