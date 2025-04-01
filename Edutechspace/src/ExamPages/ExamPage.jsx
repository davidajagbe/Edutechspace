import React, { useState, useEffect } from 'react';
import { ClockIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
// import {frontendExam} from './Data/FrontendExam';
const getShuffledQuestions = (questions) => {
  if (!Array.isArray(questions)) return [];
  return [...questions].sort(() => Math.random() - 0.5);
};

const ExamPage = ({title, questionsData, instructions, passingScore, timeLimit, onSuccessLink }) => {
  const [started, setStarted] = useState(() => {
    return localStorage.getItem(`${title}-started`) === 'true';
  });
  const [questions, setQuestions] = useState(() => {
    const stored = localStorage.getItem(`${title}-questions`);
    return stored ? JSON.parse(stored) : getShuffledQuestions(questionsData);
  });
  const [currentIndex, setCurrentIndex] = useState(() => parseInt(localStorage.getItem(`${title}-currentIndex`)) || 0);
  const [score, setScore] = useState(() => parseInt(localStorage.getItem(`${title}-score`)) || 0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(() => localStorage.getItem(`${title}-showResult`) === 'true');
  const [timeLeft, setTimeLeft] = useState(() => parseInt(localStorage.getItem(`${title}-timeLeft`)) || timeLimit);

  useEffect(() => {
    localStorage.setItem(`${title}-started`, started);
    localStorage.setItem(`${title}-questions`, JSON.stringify(questions));
    localStorage.setItem(`${title}-currentIndex`, currentIndex);
    localStorage.setItem(`${title}-score`, score);
    localStorage.setItem(`${title}-timeLeft`, timeLeft);
    localStorage.setItem(`${title}-showResult`, showResult);
  }, [started, questions, currentIndex, score, timeLeft, showResult, title]);

  useEffect(() => {
    if (started && !showResult) {
      const interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            setShowResult(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [started, showResult]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (option === questions[currentIndex].answer) {
      setScore(prev => prev + 1);
    }
    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(prev => prev + 1);
        setSelectedOption(null);
      } else {
        setShowResult(true);
        localStorage.setItem(`${title}-finalScore`, score + (option === questions[currentIndex].answer ? 1 : 0));
      }
    }, 1000);//1000ms delay (1 second)
  };

  const handleRetry = () => {
    const newQuestions = getShuffledQuestions(questionsData);
    setQuestions(newQuestions);
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);
    setShowResult(false);
    setTimeLeft(timeLimit);
    setStarted(false);
    localStorage.removeItem(`${title}-started`);
    localStorage.removeItem(`${title}-questions`);
    localStorage.removeItem(`${title}-currentIndex`);
    localStorage.removeItem(`${title}-score`);
    localStorage.removeItem(`${title}-timeLeft`);
    localStorage.removeItem(`${title}-showResult`);
    localStorage.removeItem(`${title}-finalScore`);
  };

  if (!started) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-white text-blue-950 text-center space-y-6">
        <h1 className="text-3xl sm:text-4xl font-bold">{title}</h1>
        <p className="text-base sm:text-lg max-w-xl">{instructions}</p>
        <ul className="text-left list-disc text-sm sm:text-base text-neutral-700 max-w-lg space-y-2">
          <li>Total time: {timeLimit / 60} minutes</li>
          <li>Multiple choice format</li>
          <li>Each correct answer gives you 1 point</li>
          <li>You need at least {passingScore} correct answers to pass</li>
        </ul>
        <button onClick={() => setStarted(true)} className="bg-slate-900 text-white px-8 py-3 rounded-lg text-base sm:text-lg hover:bg-blue-950 transition">Start Exam</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-white text-blue-950">
      {showResult ? (
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold">
            {score >= passingScore ? '🎉 Congratulations!' : 'Keep Practicing!'}
          </h2>
          <p className="text-xl">You scored {score} out of {questions.length}</p>
          {score >= passingScore ? (
            <a href={onSuccessLink} target="_blank" rel="noopener noreferrer" className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-700 transition">
              Join the Runtech Community
            </a>
          ) : (
            <p className="text-lg">Don't worry, you can try again soon!</p>
          )}
          <button onClick={handleRetry} className="mt-4 bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-blue-950 transition">
            Retry Quiz
          </button>
        </div>
      ) : (
        <div className="w-full max-w-2xl space-y-6">
          <div className="w-full bg-gray-200 h-3 rounded">
            <div
              className="h-full bg-blue-900 rounded transition-all duration-300"
              style={{ width: `${(currentIndex / questions.length) * 100}%` }}
            ></div>
          </div>
          <div className="text-right text-blue-950 font-semibold flex items-center justify-end gap-2">
            <ClockIcon className="w-5 h-5 text-blue-800" />
            <span>Time Left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</span>
          </div>
          <h2 className="text-2xl font-bold">{questions[currentIndex].question}</h2>
          <div className="space-y-4">
            {questions[currentIndex].options.map((option, idx) => {
              const isCorrect = selectedOption && option === questions[currentIndex].answer;
              const isIncorrect = selectedOption && option === selectedOption && option !== questions[currentIndex].answer;
              return (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(option)}
                  className={`w-full text-left px-4 py-3 rounded-lg border text-lg transition flex justify-between items-center
                    ${selectedOption
                      ? isCorrect
                        ? 'bg-green-100 border-green-500'
                        : isIncorrect
                        ? 'bg-red-100 border-red-500'
                        : 'border-gray-300'
                      : 'hover:bg-blue-100 border-gray-300'}`}
                >
                  {option}
                  {isCorrect && <CheckCircleIcon className="w-5 h-5 text-green-600" />}
                  {isIncorrect && <XCircleIcon className="w-5 h-5 text-red-600" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamPage;
