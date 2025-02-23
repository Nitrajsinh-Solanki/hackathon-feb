// hackathon-feb\src\components\quiz\QuizComponent.tsx






import React, { useState, useEffect } from 'react';
import { Question, QuizSettings } from '@/lib/types/quiz';
import ProgressBar from './ProgressBar';
import QuestionDisplay from './QuestionDisplay';
import ScoreCard from './ScoreCard';

interface QuizComponentProps {
  settings: QuizSettings;
  onComplete: (results: any) => void;
}

export default function QuizComponent({ settings, onComplete }: QuizComponentProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<any[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [startTime] = useState(Date.now());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchQuestions();
  }, []);

  async function fetchQuestions() {
    try {
      // Get questions from session storage first
      const storedQuestions = sessionStorage.getItem('quizQuestions');
      if (storedQuestions) {
        const parsedQuestions = JSON.parse(storedQuestions);
        setQuestions(parsedQuestions.slice(0, settings.numberOfQuestions));
        setLoading(false);
        return;
      }
  
      const response = await fetch('/api/quiz/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
  
      if (!response.ok) throw new Error('Failed to fetch questions');
      const data = await response.json();
      
      if (!data.questions || !Array.isArray(data.questions)) {
        throw new Error('Invalid question data received');
      }
  
      // Ensure we only use the specified number of questions
      setQuestions(data.questions.slice(0, settings.numberOfQuestions));
    } catch (error) {
      console.error('Error fetching questions:', error);
      setError('Something went wrong while fetching questions.');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
        <div className="bg-white p-6 rounded-lg shadow-lg text-red-700 text-center border border-red-300">
          <p className="text-xl font-semibold">Oops! Something went wrong.</p>
          <p className="mt-2 text-md">{error}</p>
        </div>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
        <div className="bg-white p-6 rounded-lg shadow-lg text-gray-900 text-center border border-gray-300">
          <p className="text-lg font-semibold">No questions available</p>
          <p className="mt-2 text-md">Try again later or check your settings.</p>
        </div>
      </div>
    );
  }

  async function handleAnswerSubmit() {
    const currentQuestion = questions[currentIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    const answerData = {
      questionId: currentIndex,
      selectedAnswer,
      isCorrect
    };

    setAnswers([...answers, answerData]);
    setShowExplanation(true);

    if (!isCorrect) {
      try {
        const response = await fetch('/api/generateQuestion', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...settings,
            previousQuestion: currentQuestion.question
          })
        });
        const newQuestion = await response.json();
        setQuestions([...questions, newQuestion]);
      } catch (error) {
        console.error('Error generating practice question:', error);
      }
    }
  }

  function handleNext() {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      const timeTaken = Math.floor((Date.now() - startTime) / 1000);
      const validAnswers = answers.filter(answer => answer !== null);
      setQuizComplete(true);
      onComplete({
        questions,
        answers: validAnswers,
        timeTaken
      });
    }
  }
  

  if (quizComplete) {
    return <ScoreCard questions={questions} answers={answers} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 py-10 px-4">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-2xl border border-gray-300">
        <ProgressBar 
          currentQuestion={currentIndex + 1} 
          totalQuestions={questions.length} 
        />
        
        <div className="mt-8">
          {questions[currentIndex] && (
            <QuestionDisplay
              question={questions[currentIndex]}
              selectedAnswer={selectedAnswer}
              onAnswerSelect={setSelectedAnswer}
              showExplanation={showExplanation}
            />
          )}
        </div>

        <div className="mt-8 flex justify-end gap-4">
          {!showExplanation ? (
            <button
              onClick={handleAnswerSubmit}
              disabled={!selectedAnswer}
              className="px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2"
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-8 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-700 transform transition-all hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-offset-2"
            >
              Next Question
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
