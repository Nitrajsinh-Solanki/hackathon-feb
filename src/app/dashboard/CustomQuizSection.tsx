// hackathon-feb\src\app\dashboard\CustomQuizSection.tsx

'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CustomQuizSection() {
  const [topic, setTopic] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const quizSettings = {
      topic: topic,
      subtopic: topic, 
      numberOfQuestions: 5,
      difficulty: 'Basic'
    }

    try {
      const response = await fetch('/api/quiz/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quizSettings)
      })

      const data = await response.json()
      sessionStorage.setItem('quizQuestions', JSON.stringify(data.questions))
      router.push(`/quiz/practice?topic=${topic}&subtopic=${topic}&questions=5&difficulty=Basic`)

    } catch (error) {
      console.error('Error generating quiz:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl shadow-xl">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Custom Quiz Generator
          </h2>
          <p className="mt-3 text-gray-600">
            Enter any mathematics topic and let AI create a personalized quiz just for you
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
              Topic
            </label>
            <input
              type="text"
              id="topic"
              className="w-full px-4 py-3 rounded-lg border-2 border-indigo-100 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 text-gray-900 placeholder-gray-400"
              placeholder="e.g., Quadratic Equations"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !topic.trim()}
            className={`w-full py-3 px-6 rounded-lg text-white font-medium 
              ${loading ? 'bg-gray-400' : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'} 
              transform transition-all duration-200 hover:scale-[1.02] disabled:hover:scale-100
              flex items-center justify-center space-x-2`}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Generating Quiz...</span>
              </>
            ) : (
              <>
                <span>Generate Quiz</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Our AI will generate  questions to test your knowledge</p>
        </div>
      </div>
    </div>
  )
}
