import React from "react";

const CourseProgress = () => {
  const progressData = [
    { title: "Frontend Development", progress: 60 },
    { title: "Cybersecurity Basics", progress: 100 },
    { title: "UI/UX Fundamentals", progress: 40 },
  ];

  return (
    <div className="max-w-4xl p-6 bg-white shadow rounded my-6">
      <h3 className="text-lg font-bold">📖 Your Course Progress</h3>
      {progressData.map((course, index) => (
        <div key={index} className="my-4">
          <h4 className="text-sm font-medium">{course.title}</h4>
          {/* progress Bar */}
          <div className="w-full bg-gray-200 h-3 rounded-full mt-1">
            <div className={`bg-blue-900 h-3 rounded-full`} style={{ width: `${course.progress}%` }}></div>
          </div>
        </div>
      ))}
        <button className="bg-slate-600 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-950 ">
            Resume Learning
        </button>
    </div>
  );
};

export default CourseProgress;
