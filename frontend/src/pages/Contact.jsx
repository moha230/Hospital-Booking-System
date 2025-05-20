import React from "react";
import { assets } from "../assets";

const Contact = () => {
  return (
    <div className="px-6 md:px-16 lg:px-32 py-16 bg-white">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Get <span className="text-primary">in Touch</span>
        </h2>
        <p className="text-gray-500 text-sm">
          We'd love to hear from you. Reach out with questions or business
          inquiries.
        </p>
      </div>

      <div className="mt-14 flex flex-col md:flex-row gap-12 items-center">
        <img
          className="w-full md:max-w-[400px] rounded-xl shadow-md"
          src={assets.contact_image}
          alt="Contact"
        />

        <div className="flex-1 flex flex-col gap-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">Office</h3>
            <p className="text-gray-600">
              Berlin, Germany
              <br />
              VAT ID: EU123456789
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              Contact Information
            </h3>
            <p className="text-gray-600">
              Phone: +44 20 7946 0958
              <br />
              Email: contact.unix-doctors.eu
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              Careers at Unix Doctors
            </h3>
            <p className="text-gray-600 mb-4">
              Interested in working with us? Explore current job openings and
              join our team.
            </p>
            <button className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition">
              View Job Openings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
