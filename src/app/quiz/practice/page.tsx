// hackathon-feb\src\app\quiz\practice\page.tsx


'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import QuizComponent from '@/components/quiz/QuizComponent';
import DashboardNavbar from '@/app/dashboard/DashboardNavbar';

export default function PracticePage() {
  const searchParams = useSearchParams();
  const [started, setStarted] = useState(false);
  const [settings, setSettings] = useState({
    topic: searchParams.get('topic') || '',
    subtopic: searchParams.get('subtopic') || '',
    difficulty: '',
    numberOfQuestions: 5
  });

  async function handleQuizComplete(results: any) {
    try {
      const userResponse = await fetch('/api/user/current');
      const userData = await userResponse.json();
      
      if (!userData.userId) {
        throw new Error('User not authenticated');
      }

      await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...results,
          ...settings,
          userId: userData.userId
        })
      });
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  }

  const renderContent = () => {
    if (!started) {
      return (
        <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
          <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-xl">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-black mb-3">
                Practice Quiz
              </h1>
              <p className="text-xl text-black">
                Topic: <span className="font-semibold">{settings.topic}</span>
              </p>
            </div>

            <form
              className="space-y-8"
              onSubmit={(e) => {
                e.preventDefault();
                setStarted(true);
              }}
            >
              <div className="space-y-2">
                <label className="block text-xl font-semibold text-black">
                  Select Difficulty Level
                </label>
                <select
                  className="w-full p-4 text-black text-lg border-2 border-indigo-100 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  required
                  value={settings.difficulty}
                  onChange={(e) => setSettings({...settings, difficulty: e.target.value})}
                >
                  <option value="">Choose difficulty</option>
                  <option value="Basic">Basic</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-xl font-semibold text-black">
                  Number of Questions
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  className="w-full p-4 text-black text-lg border-2 border-indigo-100 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  required
                  value={settings.numberOfQuestions}
                  onChange={(e) => setSettings({
                    ...settings,
                    numberOfQuestions: parseInt(e.target.value)
                  })}
                />
                <p className="text-sm text-black mt-1">Choose between 1 to 20 questions</p>
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xl font-bold rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-all duration-200 hover:scale-[1.02] hover:shadow-xl"
              >
                Start Quiz
              </button>
            </form>

            <div className="mt-8 p-4 bg-blue-50 rounded-xl">
              <h3 className="text-lg font-semibold text-black mb-2">Quiz Information</h3>
              <ul className="text-black space-y-2">
                <li>• Questions are randomly generated based on your topic</li>
                <li>• Take your time to answer each question carefully</li>
                <li>• You'll receive detailed explanations after submission</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    return (
      <QuizComponent
        settings={settings}
        onComplete={handleQuizComplete}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />
      {renderContent()}
    </div>
  );
}
