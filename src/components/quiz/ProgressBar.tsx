// hackathon-feb\src\components\quiz\ProgressBar.tsx

import React from 'react';

interface ProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
  timeRemaining?: number;
}

export default function ProgressBar({ 
  currentQuestion, 
  totalQuestions,
  timeRemaining 
}: ProgressBarProps) {
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium">
          Question {currentQuestion} of {totalQuestions}
        </span>
        {timeRemaining !== undefined && (
          <span className="text-sm font-medium">
            Time: {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
          </span>
        )}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
