import React from "react";
import { assets } from "@/assets/assets";

const CompanyIntro = () => (
  <div className="my-10 flex flex-col md:flex-row gap-12">
    <img
      className="w-full md:max-w-[360px]"
      src={assets.about_image}
      alt="about Unix Doctors"
    />
    <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
      <p>
        Welcome to{" "}
        <span className="font-semibold text-gray-800">Unix Doctors</span>, your
        trusted partner in managing your healthcare needs conveniently and
        efficiently. We are redefining the patient experience by providing
        smart, digital solutions that connect patients with certified medical
        professionals across various specialties.
      </p>
      <p>
        At Unix Doctors, we believe that access to healthcare should be simple,
        fast, and stress-free. Whether you're booking an appointment, checking a
        doctor’s availability, or browsing medical profiles, our platform is
        designed to make your journey smooth from start to finish.
      </p>
      <p>
        we are a community driven by
        innovation, reliability, and care. Our growing network includes
        experienced dermatologists, general physicians, gastroenterologists, and
        gynecologists, all ready to support your health journey.
      </p>
      <b className="text-gray-800">Our Vision</b>
      <p>
        Our vision at Unix Doctors is to create a seamless healthcare experience
        where technology bridges the gap between patients and healthcare
        providers. We aim to empower individuals with tools that make health
        management accessible, transparent, and personalized for every user.
      </p>
      <p>
        Join us as we shape the future of healthcare — one click, one
        appointment, one patient at a time.
      </p>
    </div>
  </div>
);

export default CompanyIntro;
