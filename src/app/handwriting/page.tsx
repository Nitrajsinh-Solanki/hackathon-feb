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
