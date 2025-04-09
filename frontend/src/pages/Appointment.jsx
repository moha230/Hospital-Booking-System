import DoctorDetails from "@/components/appointment/DoctorDetails";

const Appointment = () => {




  // //state to hold the selected doctors info
 
  // const [docSlots, setDocSlots] = useState([]);
  // const [docIndex, setDocIndex] = useState(0);
  // const [slotTime,setSlotTime]  = useState('');
  



  //function to calculate slots for time 

  // const getAvailableSlots = async () => {
  //   if (!docInfo) return;
  
  //   const today = new Date();
  //   const slotsPerDay = [];
  
  //   // utility to format a date into slotDate 
  //   const formatSlotDate = (date) =>
  //     `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`;
  
  //   for (let i = 0; i < 7; i++) {
  //     const dayDate = new Date(today);
  //     dayDate.setDate(today.getDate() + i);
  
  //     const currentDate = new Date(dayDate);
  //     const endTime = new Date(dayDate);
  //     endTime.setHours(21, 0, 0, 0); // slots until 9 PM
  
  //     // set starting time
  //     if (i === 0) {
  //       currentDate.setHours(Math.max(currentDate.getHours() + 1, 10));
  //       currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
  //     } else {
  //       currentDate.setHours(10, 0, 0, 0);
  //     }
  
  //     const slotDateKey = formatSlotDate(currentDate);
  //     const bookedSlots = docInfo.slots_booked?.[slotDateKey] || [];
  
  //     const daySlots = [];
  
  //     while (currentDate < endTime) {
  //       const formattedTime = currentDate.toLocaleTimeString([], {
  //         hour: "2-digit",
  //         minute: "2-digit",
  //       });
  
  //       if (!bookedSlots.includes(formattedTime)) {
  //         daySlots.push({
  //           datetime: new Date(currentDate),
  //           time: formattedTime,
  //         });
  //       }
  
  //       currentDate.setMinutes(currentDate.getMinutes() + 30);
  //     }
  
  //     slotsPerDay.push(daySlots);
  //   }
  
  //   setDocSlots(slotsPerDay);
  // };
  



  // useEffect(() => {
  //   if (docInfo) {
  //     getAvailableSlots();
  //   }
  // }, [docInfo]);

  return (
   
    <DoctorDetails/>

  );
};

export default Appointment;
