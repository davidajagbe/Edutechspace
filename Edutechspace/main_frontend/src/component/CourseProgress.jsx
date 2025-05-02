import React from "react";
import { Link } from "react-router-dom";

const CourseProgress = ({ progressData }) => {
  // Map course names to route paths (adjust based on your course routes)
  const courseRouteMap = {
    "Frontend Development": "/course/frontendcourse",
    "Cybersecurity": "/course/cybersecuritycourse",
    "Machine Learning": "/course/mlcourse",
    "Backend Development": "/course/backendcourse",
    "Artificial Intelligence": "/course/aicourse",
    "Ui/Ux": "/course/uiuxcourse",
    "Data Science": "/course/datasciencecourse",
    // Add more mappings as needed
  };

  return (
    <div className="max-w-4xl p-6 bg-white shadow rounded my-6">
      <h3 className="text-lg font-bold">📖 Your Course Progress</h3>
      {progressData && progressData.length > 0 ? (
        progressData.map((course, index) => (
          <div key={course.id || index} className="my-4">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-medium">{course.course_name || "Unnamed Course"}</h4>
              {course.completed && (
                <span className="text-green-500 text-sm font-semibold">Completed</span>
              )}
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 h-3 rounded-full mt-1">
              <div
                className={`bg-blue-900 h-3 rounded-full`}
                style={{ width: `${course.progress_percentage || 0}%` }}
              ></div>
            </div>
            {/* Resume Learning Link */}
            <Link
              to={courseRouteMap[course.course_name] || "/course"}
              className="inline-block bg-slate-600 text-white px-3 py-1 rounded-md mt-2 text-sm hover:bg-blue-950 transition"
            >
              {course.completed ? "Review Course" : "Resume Learning"}
            </Link>
          </div>
        ))
      ) : (
        <p className="text-gray-500 mt-4">No course progress available. Start a course today!</p>
      )}
    </div>
  );
};

export default CourseProgress;