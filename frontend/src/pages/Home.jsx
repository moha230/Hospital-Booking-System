import React from "react";
import Header from '../components/Header'
import Speciality from "../components/Speciality";
import HomeDoctors from "../components/HomeDoctors";
const Home = () => {
  return (
    <div>
      <Header />
      <Speciality/>
      <HomeDoctors/>
    </div>
  );
};

export default Home;
