// hackathon-feb\src\components\quiz\QuizHistory.tsx


import React from 'react';
import Link from 'next/link';

interface QuizHistoryProps {
  history: {
    _id: string;
    topic: string;
    subtopic: string;
    difficulty: string;
    score: number;
    totalQuestions: number;
    percentage: number;
    completedAt: string;
  }[];
}

export default function QuizHistory({ history }: QuizHistoryProps) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Quiz History</h2>
      
      <div className="space-y-4">
        {history.map((quiz) => (
          <div 
            key={quiz._id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{quiz.topic} - {quiz.subtopic}</h3>
                <p className="text-sm text-gray-600">
                  Difficulty: {quiz.difficulty}
                </p>
                <p className="text-sm text-gray-600">
                  Completed: {new Date(quiz.completedAt).toLocaleDateString()}
                </p>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">
                  {quiz.percentage}%
                </div>
                <p className="text-sm text-gray-600">
                  {quiz.score}/{quiz.totalQuestions} correct
                </p>
              </div>
            </div>
            
            <Link 
              href={`/quiz/history/${quiz._id}`}
              className="mt-3 inline-block text-sm text-blue-600 hover:underline"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
