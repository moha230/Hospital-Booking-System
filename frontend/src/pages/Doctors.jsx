import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  // Get the speciality parameter from the route
  const { speciality } = useParams();

  // Local state to store filtered doctors
  const [filterDoc, setFilterDoc] = useState([]);

  // Get all doctors from global context
  const { doctors } = useContext(AppContext);

  // React Router navigate function
  const navigate = useNavigate();

  // Filter doctors based on the speciality from URL
  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  // Run the filter function when doctors or speciality changes
  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div>
      <p className="text-gray-600 font-bold flex justify-center">
        Look for a specialist
      </p>

      {/* Horizontal list of specialities Use Slugs?? */   }  
      <div className="sm:flex-row items-start gap-5 mt-5">
        <div className="flex justify-center items-center gap-5 mt-5 whitespace-nowrap">
          <p onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className="w-[94vw] sm:w-auto px-6 py-2 border border-gray-300 rounded-full cursor-pointer transition-all bg-white hover:bg-primary flex justify-center items-center text-center">
            Dermatologist
          </p>
          <p onClick={() => speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} className="w-[94vw] sm:w-auto px-6 py-2 border border-gray-300 rounded-full cursor-pointer transition-all bg-white hover:bg-primary flex justify-center items-center text-center">
            Gastroenterologist
          </p>
          <p onClick={() => speciality === 'General Physician' ? navigate('/doctors') : navigate('/doctors/General physician')} className="w-[94vw] sm:w-auto px-6 py-2 border border-gray-300 rounded-full cursor-pointer transition-all bg-white hover:bg-primary flex justify-center items-center text-center">
            General Physician
          </p>
          <p onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className="w-[94vw] sm:w-auto px-6 py-2 border border-gray-300 rounded-full cursor-pointer transition-all bg-white hover:bg-primary flex justify-center items-center text-center">
            Gynecologist
          </p>
        </div>

        {/* Displaying doctors based on speciality */}
        <div
           className="w-full max-w-7xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-items-center pt-5 px-4"

        >
          {filterDoc.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                navigate(`/appointment/${item._id}`);
                scrollTo(0, 0);
              }}
              className="w-[280px] border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
            >
              <img
                className="bg-[#EAEFFF] w-full object-cover"
                src={item.image}
                alt={item.name}
              />
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-green-500">
                  <p className="w-2 h-2 rounded-full bg-green-500"> </p>
                  <p>Available</p>
                </div>
                <p className="text-[#262626] text-lg font-medium">
                  {item.name}
                </p>
                <p className="text-[#5C5C5C] text-sm">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
