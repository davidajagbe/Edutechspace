import React, { useState } from 'react';
import { Dialog,DialogPanel,DialogTitle } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { XMarkIcon } from "@heroicons/react/24/outline";


const quizData = [
  {
    question: 'What is Cybersecurity?',
    options: [
      'The practice of protecting systems, networks, and programs from digital attacks.',
      'A type of web development language.',
      'A method for creating mobile apps.',
      'None of the above.'
    ],
    correctAnswer: 'The practice of protecting systems, networks, and programs from digital attacks.'
  },
  {
    question: 'Which protocol is used for secure communication on the web?',
    options: ['HTTP', 'FTP', 'HTTPS', 'SMTP'],
    correctAnswer: 'HTTPS'
  },
  {
    question: 'What is Machine Learning?',
    options: [
      'A method to teach computers to learn from data.',
      'A new programming language.',
      'A hardware component.',
      'None of the above'
    ],
    correctAnswer: 'A method to teach computers to learn from data.'
  },
  {
    question: 'Which framework is used for Frontend Development in your app?',
    options: ['React.js', 'Node.js', 'Express.js', 'Django'],
    correctAnswer: 'React.js'
  },
  {
    question: 'What is Backend Development primarily concerned with?',
    options: [
      'Building user interfaces',
      'Managing servers and databases',
      'Designing logos',
      'None of the above'
    ],
    correctAnswer: 'Managing servers and databases'
  },
  {
    question: 'Which language is most commonly used in Data Analysis?',
    options: ['JavaScript', 'Python', 'C++', 'Ruby'],
    correctAnswer: 'Python'
  },
  {
    question: 'UI/UX stands for?',
    options: [
      'User Interface and User Experience',
      'Unique Integration of X and Y',
      'User Intern and User Exit',
      'None of the above'
    ],
    correctAnswer: 'User Interface and User Experience'
  },
  {
    question: 'Which of these is a key principle of good UI/UX design?',
    options: [
      'Complex navigation',
      'Consistency in design',
      'Overwhelming color schemes',
      'Excessive text'
    ],
    correctAnswer: 'Consistency in design'
  },
  {
    question: 'Which one of these is NOT typically a part of a full-stack developer’s skill set?',
    options: [
      'Frontend Development',
      'Backend Development',
      'Graphic Design',
      'Database Management'
    ],
    correctAnswer: 'Graphic Design'
  },
  {
    question: 'What does API stand for?',
    options: [
      'Application Programming Interface',
      'Advanced Programming Integration',
      'Automatic Process Input',
      'None of the above'
    ],
    correctAnswer: 'Application Programming Interface'
  },
  {
    question: 'In cybersecurity, what is a firewall used for?',
    options: [
      'To store data',
      'To monitor and control incoming and outgoing network traffic',
      'To design web pages',
      'To manage databases'
    ],
    correctAnswer: 'To monitor and control incoming and outgoing network traffic'
  },
  {
    question: 'Which of the following is a common type of machine learning algorithm?',
    options: ['Regression', 'Encryption', 'Styling', 'Compilation'],
    correctAnswer: 'Regression'
  },
  {
    question: 'What is responsive design?',
    options: [
      'Designing interfaces that work on all devices',
      'A type of network security',
      'A backend framework',
      'None of the above'
    ],
    correctAnswer: 'Designing interfaces that work on all devices'
  },
  {
    question: 'What is a RESTful API?',
    options: [
      'An API that follows REST principles',
      'A graphic design tool',
      'A type of database',
      'None of the above'
    ],
    correctAnswer: 'An API that follows REST principles'
  },
  {
    question: 'Which of these tools is used for version control?',
    options: ['Git', 'Docker', 'AWS', 'Jenkins'],
    correctAnswer: 'Git'
  }
];

const QuizModal = ({ isOpen, onClose }) => {
  const [quizAnswers, setQuizAnswers] = useState(Array(quizData.length).fill(''));
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const handleOptionChange = (index, selectedOption) => {
    const newAnswers = [...quizAnswers];
    newAnswers[index] = selectedOption;
    setQuizAnswers(newAnswers);
  };

  const handleQuizSubmit = (e) => {
    e.preventDefault();
    let score = 0;
    quizData.forEach((question, index) => {
      if (quizAnswers[index] === question.correctAnswer) {
        score++;
      }
    });
    setQuizScore(score);
    setQuizSubmitted(true);
  };

  const passed = quizScore >= 10;
  const whatsappLink = "https://chat.whatsapp.com/example"; // Replace with your actual link

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[10000]">
      <DialogPanel className="bg-white p-8 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
            <DialogTitle className="text-4xl font-bold text-center  pr-4">Runtech Space Quiz</DialogTitle>
            <XMarkIcon className="w-6 h-6 text-black hover:h-9 hover:w-9 transition cursor-pointer" onClick={onClose} />
        </div>
        {!quizSubmitted ? (
          <form onSubmit={handleQuizSubmit} className="space-y-6">
            {quizData.map((q, idx) => (
              <div key={idx} className="p-4 border rounded-xl shadow-sm">
                <p className="text-2xl font-medium text-neutral-900 mb-2">{idx + 1}. {q.question}</p>
                <div className="space-y-3">
                  {q.options.map((option, oIdx) => (
                    <label key={oIdx} className="block text-2xl text-neutral-700">
                      <input
                        type="radio"
                        name={`question-${idx}`}
                        value={option}
                        checked={quizAnswers[idx] === option}
                        onChange={() => handleOptionChange(idx, option)}
                        className="mr-2"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <div className="text-center">
              <button type="submit" className="w-full bg-blue-950 text-white px-10 py-5 rounded-xl text-2xl hover:bg-blue-800 transition">
                Submit Quiz
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center space-y-6">
            {passed ? (
              <div className="text-3xl font-bold text-green-700">
                Congratulations! 🎉 You passed the quiz.
                <Link to={whatsappLink} className="mt-4 inline-block bg-green-700 text-white px-10 py-5 rounded-xl text-2xl hover:bg-green-800 transition">
                  Join Runtech Space on WhatsApp
                </Link>
              </div>
            ) : (
              <div className="text-3xl font-bold text-red-700">
                Don't worry if you failed. More opportunities are coming soon!
              </div>
            )}
            <button onClick={onClose} className="inline-block bg-slate-600 text-slate-100 px-10 py-5 rounded-xl text-2xl hover:bg-slate-800 transition">
              Close
            </button>
          </div>
        )}
      </DialogPanel>
    </Dialog>
  );
};

export default QuizModal;
