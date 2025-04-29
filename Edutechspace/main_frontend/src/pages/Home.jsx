import React from 'react';
import Hero from '../component/Hero';

const Home = () => {
  return (
    <div>
      <Hero/>
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-semibold text-neutral-900 text-center">
          Why Choose RUNTechSpace?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-semibold text-neutral-900">Expert Instructors</h3>
            <p className="text-neutral-600 mt-2">Learn from industry professionals with hands-on experience.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-semibold text-neutral-900">Comprehensive Courses</h3>
            <p className="text-neutral-600 mt-2">Covering all major tech fields from beginner to advanced levels.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-semibold text-neutral-900">Globally Recognized Certificates</h3>
            <p className="text-neutral-600 mt-2">Earn industry-standard certificates that boost your career.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
