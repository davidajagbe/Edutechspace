import React, { useState, useEffect } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
const videoresource = "/videos/jsxvideo.mp4";

const videoData = [
  {
    id: 1,
    title: "What is Artificial Intelligence?",
    src: videoresource,
    requirement: "No prior knowledge needed.",
    description: "An introduction to the concepts and scope of Artificial Intelligence."
  },
  {
    id: 2,
    title: "Machine Learning vs AI",
    src: videoresource,
    requirement: "Watch the intro video first.",
    description: "Understand how Machine Learning fits into the broader AI landscape."
  },
  {
    id: 3,
    title: "AI Applications in Real Life",
    src: videoresource,
    requirement: "Familiarity with AI basics recommended.",
    description: "Explore real-world use cases of AI across industries."
  }
];

const pdfData = [
  {
    id: 1,
    title: "AI Overview PDF",
    src: "https://example.com/ai-overview"
  }
];

const AIVideoPdfModal = ({ type, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isVideo = type === 'video';
  const data = isVideo ? videoData : pdfData;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  useEffect(() => {
    const savedIndex = localStorage.getItem(`current-${type}-index`);
    if (savedIndex) setCurrentIndex(parseInt(savedIndex));
  }, [type]);

  useEffect(() => {
    localStorage.setItem(`current-${type}-index`, currentIndex);
  }, [currentIndex, type]);

  const next = () => {
    if (currentIndex < data.length - 1) setCurrentIndex(currentIndex + 1);
  };
  const prev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  return (
    <Dialog open={true} onClose={onClose} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 p-4">
      <DialogPanel className="bg-white p-6 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl">
        <DialogTitle className="text-xl sm:text-2xl font-bold mb-4 text-center">{data[currentIndex].title}</DialogTitle>
        <div className="flex justify-between items-center flex-wrap gap-4">
          <button onClick={prev} disabled={currentIndex === 0} className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50">Previous</button>
          <span className="text-sm sm:text-base">{currentIndex + 1} / {data.length}</span>
          <button onClick={next} disabled={currentIndex === data.length - 1} className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50">Next</button>
        </div>

        {isVideo ? (
          <video controls className="w-full h-[200px] sm:h-[350px] md:h-[450px] lg:h-[500px] rounded mb-4" src={data[currentIndex].src}></video>
        ) : (
          <iframe
            title={data[currentIndex].title}
            src={data[currentIndex].src}
            className="w-full h-[400px] sm:h-[500px] rounded mb-4"
          ></iframe>
        )}
        
        <div className="flex justify-center gap-2 my-4">
          {data.map((_, idx) => (
            <span
              onClick={() => setCurrentIndex(idx)}
              key={idx}
              className={`h-2 w-2 rounded-full cursor-pointer transition-all duration-300 ${idx === currentIndex ? 'bg-blue-900 scale-125' : 'bg-gray-300'}`}
            />
          ))}
        </div>

        <div className="bg-gray-100 p-4 rounded-md mb-4">
            <h3 className="text-lg font-semibold mb-2">Requirement</h3>
            <p className="text-sm text-gray-700 mb-3">{data[currentIndex].requirement}</p>

            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-sm text-gray-700">{data[currentIndex].description}</p>
        </div>

        <button onClick={onClose} className="mt-6 w-full bg-blue-950 text-white py-3 rounded-lg text-lg hover:bg-blue-800 transition">Close</button>
      </DialogPanel>
    </Dialog>
  );
};

export default AIVideoPdfModal;
