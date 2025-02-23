// hackathon-feb\src\app\quiz\practice\page.tsx






'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import QuizComponent from '@/components/quiz/QuizComponent';

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

  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12">
        <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-xl">
          <h1 className="text-3xl font-bold mb-8 text-indigo-800 text-center">
            Practice Settings
          </h1>

          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              setStarted(true);
            }}
          >
            <div>
              <label className="block mb-2 text-lg font-medium text-gray-900">
                Difficulty
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                required
                value={settings.difficulty}
                onChange={(e) => setSettings({...settings, difficulty: e.target.value})}
              >
                <option value="">Select Difficulty</option>
                <option value="Basic">Basic</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-lg font-medium text-gray-900">
                Number of Questions (1-20)
              </label>
              <input
                type="number"
                min="1"
                max="20"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                required
                value={settings.numberOfQuestions}
                onChange={(e) => setSettings({
                  ...settings,
                  numberOfQuestions: parseInt(e.target.value)
                })}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-semibold rounded-lg shadow-md hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transform transition-all hover:scale-[1.02]"
            >
              Start Practice
            </button>
          </form>
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
}
