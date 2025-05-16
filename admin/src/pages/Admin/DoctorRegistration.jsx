import React from "react";
import { assets } from "../../assets/assets";

const  AddDoctor = () => {
  return (
    <form className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-8 space-y-8">
      <h2 className="text-3xl font-bold text-gray-800 text-center">Doctor Registration Form</h2>

      {/* Profile picture upload */}
      <div className="flex flex-col items-center">
        <label htmlFor="doc-img" className="cursor-pointer hover:opacity-90">
          <img
            src={assets.upload_area}
            alt="Upload Area"
            className="w-32 h-32 object-cover rounded-full border-2 border-gray-300"
          />
        </label>
        <input type="file" id="doc-img" hidden />
        <p className="text-sm text-gray-600 mt-2 text-center">
          {/* Put an icon its better do it later when i come back from work  */}
          Click to change profile picture
        </p>
      </div>

      {/* Personal information */}
      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="John Doe"
              required
              className="w-full mt-1 border rounded-md p-2"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="john@example.com"
              required
              className="w-full mt-1 border rounded-md p-2"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="********"
              required
              className="w-full mt-1 border rounded-md p-2"
            />
          </div>
          <div>
            <label
              htmlFor="degree"
              className="block text-sm font-medium text-gray-700"
            >
              Degree
            </label>
            <input
              type="text"
              id="degree"
              placeholder="MBBS, MD"
              className="w-full mt-1 border rounded-md p-2"
            />
          </div>
        </div>
      </div>

      {/* Professional details */}
      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Professional Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="experience"
              className="block text-sm font-medium text-gray-700"
            >
              Experience
            </label>
            <select
              id="experience"
              className="w-full mt-1 border rounded-md p-2"
              required
            >
              <option value="">Select experience</option>
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={`${i + 1} Year`}>
                  {i + 1} {i + 1 === 1 ? "Year" : "Years"}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="cost"
              className="block text-sm font-medium text-gray-700"
            >
              Consultation Cost ($)
            </label>
            <input
              type="number"
              id="cost"
              placeholder="100"
              required
              className="w-full mt-1 border rounded-md p-2"
            />
          </div>
          <div>
            <label
              htmlFor="speciality"
              className="block text-sm font-medium text-gray-700"
            >
              Speciality
            </label>
            <select
              id="speciality"
              className="w-full mt-1 border rounded-md p-2"
              required
            >
              <option value="">Select speciality</option>
              <option value="General physician">General physician</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
            </select>
          </div>
        </div>
      </div>

      {/* Address section */}
      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label
              htmlFor="street"
              className="block text-sm font-medium text-gray-700"
            >
              Street
            </label>
            <input
              type="text"
              id="street"
              placeholder="123 Main St"
              className="w-full mt-1 border rounded-md p-2"
            />
          </div>
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              placeholder="Dar es Salaam"
              className="w-full mt-1 border rounded-md p-2"
            />
          </div>
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Country
            </label>
            <input
              type="text"
              id="country"
              placeholder="Tanzania"
              className="w-full mt-1 border rounded-md p-2"
            />
          </div>
        </div>
      </div>

      {/* About area */}
      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">About</h3>
        <textarea
          id="about"
          placeholder="Information about doctor"
          className="w-full h-32 border rounded-md p-2"
        />
      </div>

      {/* Submit button */}
      <div className="text-center">
        <button
          type="submit"
          className="bg-red-500 hover:bg-green-600 text-white font-semibold py-2 px-8 rounded-full transition duration-200 shadow"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
}

export default AddDoctor;
