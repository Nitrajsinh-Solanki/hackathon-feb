// hackathon-feb\src\app\handwriting\page.tsx

'use client'
import Canvas from '@/components/handwriting/Canvas'
import ToolBar from '@/components/handwriting/ToolBar'
import { useState } from 'react'
import DashboardNavbar from '../dashboard/DashboardNavbar'

export default function HandwritingPage() {
  const [recognizedText, setRecognizedText] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [penSize, setPenSize] = useState(2)
  const [penColor, setPenColor] = useState('#000000')

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Math Handwriting Recognition
            </h1>

            {/* Work in Progress Banner */}
            <div className="mb-8 p-6 bg-indigo-50 rounded-xl border-2 border-indigo-200">
              <h2 className="text-xl font-bold text-indigo-800 mb-4">
                🚀 Handwriting Recognition - Work in Progress!
              </h2>
              <p className="text-indigo-700 mb-4">
                We are working hard to improve handwritten math problem recognition. Due to the limitations of current OCR APIs, including accuracy issues and high costs, this feature is still in development.
              </p>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-indigo-800 mb-2">
                  🔍 What's next?
                </h3>
                <ul className="space-y-2 text-indigo-700">
                  <li className="flex items-center">
                    <span className="mr-2">✅</span> Exploring open-source OCR solutions
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✅</span> Developing a custom AI model
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✅</span> Improving input options (Math Keyboard & Speech-to-Text)
                  </li>
                </ul>
              </div>
              
              <p className="mt-6 text-indigo-700 font-medium">
                We appreciate your patience and support! Stay tuned for updates. 🚀✨
              </p>
            </div>

            <div className="space-y-4">
              <ToolBar 
                penSize={penSize}
                setPenSize={setPenSize}
                penColor={penColor}
                setPenColor={setPenColor}
              />
              <Canvas 
                setRecognizedText={setRecognizedText}
                setIsProcessing={setIsProcessing}
                penSize={penSize}
                penColor={penColor}
              />
              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                <h2 className="text-lg font-medium text-gray-900 mb-2">
                  Recognized Text:
                </h2>
                {isProcessing ? (
                  <div className="text-gray-600">Processing...</div>
                ) : (
                  <div className="text-gray-800 font-mono">{recognizedText}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

