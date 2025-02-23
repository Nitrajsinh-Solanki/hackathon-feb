// hackathon-feb\src\components\quiz\QuestionDisplay.tsx



import React from 'react';
import { Question } from '@/lib/types/quiz';

interface QuestionDisplayProps {
  question: Question;
  selectedAnswer: string | null;
  onAnswerSelect: (answer: string) => void;
  showExplanation: boolean;
}

export default function QuestionDisplay({
  question,
  selectedAnswer,
  onAnswerSelect,
  showExplanation
}: QuestionDisplayProps) {
  return (
    <div className="space-y-6">
      {/* Question text in dark black */}
      <div className="text-xl font-semibold text-gray-900">{question.question}</div>
      
      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(option)}
            className={`w-full p-4 text-left rounded-lg border transition-all text-gray-900
              ${selectedAnswer === option 
                ? 'bg-blue-100 border-blue-500' 
                : 'hover:bg-gray-50 border-gray-200'
              }`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg border border-gray-300">
          <h3 className="font-semibold text-gray-900 mb-2">Explanation:</h3>
          <p className="text-gray-900">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
