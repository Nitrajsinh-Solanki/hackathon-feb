// hackathon-feb\src\components\quiz\QuizSettingsModal.tsx
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface QuizSettingsModalProps {
  topic: string
  subtopic: string 
  onClose: () => void
}

export default function QuizSettingsModal({ topic, subtopic, onClose }: QuizSettingsModalProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [settings, setSettings] = useState({
    numberOfQuestions: 5,
    difficulty: 'Basic'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // First generate questions using Gemini
      const response = await fetch('/api/quiz/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          subtopic,
          numberOfQuestions: settings.numberOfQuestions,
          difficulty: settings.difficulty
        })
      })

      if (!response.ok) {
        throw new Error('Failed to generate questions')
      }

      const data = await response.json()
      
      // Store generated questions in session storage for practice page
      sessionStorage.setItem('quizQuestions', JSON.stringify(data.questions))

      // Navigate to practice page with settings
      router.push(`/quiz/practice?topic=${topic}&subtopic=${subtopic}&questions=${settings.numberOfQuestions}&difficulty=${settings.difficulty}`)

    } catch (error) {
      console.error('Error generating quiz:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Quiz Settings</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Number of Questions</label>
            <input
              type="number"
              min="1"
              max="20"
              value={settings.numberOfQuestions}
              onChange={(e) => setSettings({...settings, numberOfQuestions: parseInt(e.target.value)})}
              className="w-full p-2 border rounded"
              disabled={loading}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Difficulty</label>
            <select
              value={settings.difficulty}
              onChange={(e) => setSettings({...settings, difficulty: e.target.value})}
              className="w-full p-2 border rounded"
              disabled={loading}
            >
              <option value="Basic">Basic</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded flex items-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Generating...
                </>
              ) : (
                'Start Quiz'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
