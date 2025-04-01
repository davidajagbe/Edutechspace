import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import cybersecurityImage from "../assets/images/88615 (2).jpg";
import machineLearning from "../assets/images/2151110144.jpg";
import frontendDevelopment from "../assets/images/18707.jpg";
import backendDevelopment from "../assets/images/33556.jpg";
import dataAnalysis from "../assets/images/51736.jpg";
import dataSecience from "../assets/images/2150165975.jpg";
import uiUx from "../assets/images/2149930932.jpg";
import aiImage from "../assets/images/aiImage.jpg";


const fadeInVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.5, // Delay each row by 0.2s
      ease: "easeOut",
      duration: 0.5,
    },
  }),
};

const CertificateExam = () => {
  return (
    <section className="bg-neutral-50 py-10">
      
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-3xl py-16 md:py-32 px-4 md:px-10">
          <motion.h2
            className="text-blue-950 text-6xl sm:text-9xl xl:text-11xl font-semibold mb-10 text-center max-w-sm md:max-w-lg lg:max-w-2xl xl:max-w-4xl mx-auto font-heading"
            variants={fadeInVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            You can only choose one exam to take
          </motion.h2>
          
          {/* Description */}
          <motion.p
            className="text-gray-600 text-xl text-center mb-8"
            variants={fadeInVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            Register for the latest certification exams and boost your skills.
          </motion.p>
          <div className="flex flex-wrap -m-5">
            {examData.map((exam, index) => (
              <div key={index} className="w-full md:w-1/2 lg:w-1/3 p-5">
                <motion.div
                  key={exam.id}
                  variants={fadeInVariant}
                  initial="hidden"
                  animate="visible"
                  whileInView="visible"
                  custom={index} // Pass index for stagger effect
                  viewport={{ once: true, amount: 0.5 }}
                >
                  <img className="rounded-3xl mb-10 h-96 w-full object-cover" src={exam.image} alt={exam.title} />
                  <h6 className="text-4xl font-semibold mb-4 tracking-tight font-heading text-slate-900">
                    {exam.title}
                  </h6>
                  <Link
                    className="inline-flex justify-center items-center text-center h-16 p-5 font-semibold tracking-tight text-xl hover:text-white focus:text-white bg-white hover:bg-slate-900 focus:bg-neutral-900 border border-neutral-900 rounded-lg focus:ring-4 focus:ring-neutral-400 transition duration-200"
                    to={exam.link}
                  >
                    Register
                  </Link>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const examData = [
  { title: "Cybersecurity", image: cybersecurityImage, link: "/certification-exam/cybersecurity" },
  { title: "Machine Learning", image: machineLearning, link: "/certification-exam/machine-learning" },
  { title: "Frontend Development", image: frontendDevelopment, link: "/certification-exam/frontend" },
  { title: "Backend Development", image: backendDevelopment, link: "/certification-exam/backend" },
  { title: "Data Analysis", image: dataAnalysis, link: "/certification-exam/frontend" },
  { title: "Data Science", image: dataSecience, link: "/certification-exam/datascience" },
  { title: "UI/UX", image: uiUx, link: "/certification-exam/uiux" },
  { title: "Artificial Intelligence(AI)", image: aiImage, link: "/certification-exam/AI" },
];

export default CertificateExam;
