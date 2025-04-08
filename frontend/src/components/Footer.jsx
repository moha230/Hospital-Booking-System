import React from "react";
import { Link } from "react-router-dom";
import { assets } from "@/assets/assets";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-textMain px-6 md:px-16 py-12 mt-40 mb-10 font-sans rounded-xl shadow-lg">
      <div className="grid gap-10 md:grid-cols-3">
 
        <div>
          <img
            className="mb-5 w-36"
            src={assets.logo}
            alt="Unix-doctors Logo"
          />
          <p className="text-sm text-textLight leading-6 max-w-sm">
            Unix-doctors is a trusted European healthcare platform providing
            seamless doctor discovery and appointment scheduling. Compliant with
            GDPR and focused on patient-first experiences.
          </p>
        </div>

     
        <div>
          <h2 className="text-lg font-semibold mb-4 uppercase">Navigation</h2>
          <ul className="flex flex-col gap-2 text-sm text-textLight">
            <li>
              <Link to="/" className="hover:text-green-800 cursor-pointer">Home</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-green-800 cursor-pointer">About</Link>
            </li>
            <li>
              <Link to="/doctors" className="hover:text-green-800 cursor-pointer">Doctors</Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-green-800 cursor-pointer">Terms & Conditions</Link>
            </li>
            <li>
              <Link to="/gdpr" className="hover:text-green-800 cursor-pointer">Data Protection (GDPR)</Link>
            </li>
          </ul>
        </div>

     
        <div>
          <h2 className="text-lg font-semibold mb-4 uppercase">Contact</h2>
          <ul className="flex flex-col gap-3 text-sm text-textLight">
            <li>+44 20 7946 0958</li>
            <li>contact@unix-doctors.eu</li>
            <li>Berlin, Germany</li>
            <li>VAT ID: EU123456789</li>
          </ul>
        </div>
      </div>

      <hr className="my-8 border-borderSoft" />

      <div className="text-center text-xs text-textLight">
        <p>© {currentYear} Unix-doctors Europe GmbH. All rights reserved.</p>
        <p className="mt-1">Proudly built and hosted in the EU 🇪🇺</p>
      </div>
    </footer>
  );
};

export default Footer;
