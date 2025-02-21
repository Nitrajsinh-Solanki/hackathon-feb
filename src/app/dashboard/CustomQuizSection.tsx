// hackathon-feb\src\app\dashboard\CustomQuizSection.tsx





'use client'
import { useState } from 'react'

export default function CustomQuizSection() {
  const [topic, setTopic] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Generate quiz for:', topic)
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Custom Quiz Generator
      </h2>
      <p className="text-gray-600 mb-6">
        Enter any mathematics topic and we'll generate a personalized quiz for you.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700">
            Topic
          </label>
          <input
            type="text"
            id="topic"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black outline-none" 
            placeholder="e.g., Quadratic Equations"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>
        
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Generate Quiz
        </button>
      </form>
    </div>
  )
}
