import React, { useState, useEffect } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import videoresource from "../assets/videos/Chill Guy.mp4";
import pdfresource from "../assets/pdf/Exiat Letter.pdf";

const videoData = [
  {
    id: 1,
    title: "Getting Started With HTML",
    src: videoresource
  },
  {
    id: 2,
    title: "Introduction to CSS",
    src: videoresource
  }
];

const pdfData = [
  {
    id: 1,
    title: "HTML Guide",
    src: pdfresource
  },
  {
    id: 2,
    title: "CSS Basics",
    src: pdfresource
  }
];

const VideoPdfModal = ({ type, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isVideo = type === 'video';
  const data = isVideo ? videoData : pdfData;

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

        {isVideo ? (
          <video controls className="w-full h-[200px] sm:h-[350px] md:h-[450px] lg:h-[500px] rounded mb-4" src={data[currentIndex].src}></video>
        ) : (
          <iframe
            title={data[currentIndex].title}
            src={data[currentIndex].src}
            className="w-full h-[400px] sm:h-[500px] rounded mb-4"
          ></iframe>
        )}

        <div className="flex justify-between items-center flex-wrap gap-4">
          <button onClick={prev} disabled={currentIndex === 0} className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50">Previous</button>
          <span className="text-sm sm:text-base">{currentIndex + 1} / {data.length}</span>
          <button onClick={next} disabled={currentIndex === data.length - 1} className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50">Next</button>
        </div>

        <button onClick={onClose} className="mt-6 w-full bg-blue-950 text-white py-3 rounded-lg text-lg hover:bg-blue-800 transition">Close</button>
      </DialogPanel>
    </Dialog>
  );
};

export default VideoPdfModal;
