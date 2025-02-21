// hackathon-feb\src\components\handwriting\ToolBar.tsx

'use client'
import { useState } from 'react'

export default function ToolBar() {
  const [penSize, setPenSize] = useState(2)
  const [penColor, setPenColor] = useState('#000000')

  return (
    <div className="flex items-center space-x-4 p-2 bg-gray-100 rounded-md">
      <div className="flex items-center">
        <label htmlFor="penSize" className="mr-2 text-sm font-medium text-gray-700">
          Pen Size:
        </label>
        <input
          type="range"
          id="penSize"
          min="1"
          max="10"
          value={penSize}
          onChange={(e) => setPenSize(Number(e.target.value))}
          className="w-24"
        />
        <span className="ml-2 text-sm text-gray-600">{penSize}px</span>
      </div>

      <div className="flex items-center">
        <label htmlFor="penColor" className="mr-2 text-sm font-medium text-gray-700">
          Color:
        </label>
        <input
          type="color"
          id="penColor"
          value={penColor}
          onChange={(e) => setPenColor(e.target.value)}
          className="w-8 h-8 p-0 border-0 rounded-md cursor-pointer"
        />
      </div>
    </div>
  )
}
