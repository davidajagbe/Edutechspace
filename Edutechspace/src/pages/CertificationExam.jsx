import React from "react";
import { Link } from "react-router-dom";
import cybersecurityImage from "../assets/88615 (2).jpg";
import machineLearning from "../assets/2151110144.jpg";
import frontendDevelopment from "../assets/18707.jpg";
import backendDevelopment from "../assets/33556.jpg";
import dataAnalysis from "../assets/51736.jpg";
import dataSecience from "../assets/2150165975.jpg";
import uiUx from "../assets/2149930932.jpg";

const CertificateExam = () => {
  return (
    <section className="bg-neutral-50 py-10">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-3xl py-16 md:py-32 px-4 md:px-10">
          <h1 className="text-6xl sm:text-9xl xl:text-11xl font-semibold mb-10 text-center max-w-sm md:max-w-lg lg:max-w-2xl xl:max-w-4xl mx-auto font-heading">
            You can only choose one exam to take
          </h1>
          
          <div className="flex flex-wrap -m-5">
            {examData.map((exam, index) => (
              <div key={index} className="w-full md:w-1/2 lg:w-1/3 p-5">
                <img className="rounded-3xl mb-10 h-128 w-full object-cover" src={exam.image} alt={exam.title} />
                <h6 className="text-4xl font-semibold mb-4 tracking-tight font-heading">
                  {exam.title}
                </h6>
                <Link
                  className="inline-flex justify-center items-center text-center h-16 p-5 font-semibold tracking-tight text-xl hover:text-white focus:text-white bg-white hover:bg-neutral-900 focus:bg-neutral-900 border border-neutral-900 rounded-lg focus:ring-4 focus:ring-neutral-400 transition duration-200"
                  to={exam.link}
                >
                  Register
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const examData = [
  { title: "Cybersecurity", image: cybersecurityImage, link: "/" },
  { title: "Machine Learning", image: machineLearning, link: "/" },
  { title: "Frontend Development", image: frontendDevelopment, link: "/" },
  { title: "Backend Development", image: backendDevelopment, link: "/" },
  { title: "Data Analysis", image: dataAnalysis, link: "/" },
  { title: "Data Science", image: dataSecience, link: "/" },
  { title: "UI/UX", image: uiUx, link: "/" },
];

export default CertificateExam;
