// hackathon-feb\src\app\quiz\page.tsx

import React from 'react';
import Link from 'next/link';

export default function QuizPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Mathematics Quiz</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Link href="/quiz/practice">
          <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <h2 className="text-xl font-semibold mb-2">Practice Mode</h2>
            <p className="text-gray-600">
              Practice questions with immediate feedback and explanations.
              Choose your topic and difficulty level.
            </p>
          </div>
        </Link>

        <Link href="/quiz/history">
          <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <h2 className="text-xl font-semibold mb-2">Quiz History</h2>
            <p className="text-gray-600">
              View your past quiz attempts and track your progress over time.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}

