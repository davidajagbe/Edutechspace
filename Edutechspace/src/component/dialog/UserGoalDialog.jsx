import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

const UserGoalDialog = ({ isOpen, onClose }) => {
  const [selectedDays, setSelectedDays] = useState([]);

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 p-4">
      <DialogPanel className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
        <DialogTitle className="text-xl font-bold text-center mb-4">
          Set Your Weekly Goal
        </DialogTitle>
        <p className="text-sm text-gray-600 text-center mb-4">
          Stay Committed, Stay Ahead! Select your learning days to get personalized course completion estimates and assignment schedules.
        </p>

        {/* Learning Days Selection */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {daysOfWeek.map((day) => (
            <label key={day} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedDays.includes(day)}
                onChange={() => toggleDay(day)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700">{day}</span>
            </label>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button onClick={onClose} className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 transition">
            Cancel
          </button>
          <button
            onClick={() => {
              console.log("Selected Learning Days:", selectedDays);
              onClose();
            }}
            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>
      </DialogPanel>
    </Dialog>
  );
};

export default UserGoalDialog;
