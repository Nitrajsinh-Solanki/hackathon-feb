// hackathon-feb\src\app\quiz\page.tsx
'use client';
import React from 'react';
import Link from 'next/link';
import DashboardNavbar from '../dashboard/DashboardNavbar';

export default function QuizPage() {
  return (
    <div>
      <DashboardNavbar />
      <div className="max-w-4xl mx-auto p-6 mt-8">
        <h1 className="text-3xl font-bold mb-8 text-indigo-600">Mathematics Quiz</h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/quiz/practice">
            <div className="border rounded-lg p-6 hover:shadow-lg transition-all transform hover:scale-105 cursor-pointer bg-white">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">Practice Mode</h2>
              <p className="text-gray-600">
                Practice questions with immediate feedback and explanations.
                Choose your topic and difficulty level.
              </p>
              <div className="mt-4 text-indigo-600">
                Start Practice →
              </div>
            </div>
          </Link>

          <Link href="/quiz/history">
            <div className="border rounded-lg p-6 hover:shadow-lg transition-all transform hover:scale-105 cursor-pointer bg-white">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">Quiz History</h2>
              <p className="text-gray-600">
                View your past quiz attempts and track your progress over time.
              </p>
              <div className="mt-4 text-indigo-600">
                View History →
              </div>
            </div>
          </Link>
        </div>

        {/* Additional Features Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="font-semibold text-lg mb-2">Personalized Learning</h3>
              <p className="text-gray-600">Adaptive questions based on your performance</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="font-semibold text-lg mb-2">Instant Feedback</h3>
              <p className="text-gray-600">Detailed explanations for every question</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="font-semibold text-lg mb-2">Progress Tracking</h3>
              <p className="text-gray-600">Monitor your improvement over time</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
