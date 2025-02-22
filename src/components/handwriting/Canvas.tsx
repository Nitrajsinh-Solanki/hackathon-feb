// hackathon-feb\src\components\handwriting\Canvas.tsx







'use client'
import { useRef, useEffect, useState } from 'react'

interface CanvasProps {
  setRecognizedText: (text: string) => void
  setIsProcessing: (isProcessing: boolean) => void
  penSize: number
  penColor: string
}

export default function Canvas({ setRecognizedText, setIsProcessing, penSize, penColor }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.scale(dpr, dpr)
        ctx.strokeStyle = penColor
        ctx.lineWidth = penSize
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
      }
    }
  }, [penSize, penColor])

  const getCoordinates = (e: any) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }

    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1

    if (e.type.startsWith('mouse')) {
      return {
        x: (e.clientX - rect.left) * (canvas.width / (rect.width * dpr)),
        y: (e.clientY - rect.top) * (canvas.height / (rect.height * dpr))
      }
    } else if (e.type.startsWith('touch')) {
      const touch = e.touches[0]
      return {
        x: (touch.clientX - rect.left) * (canvas.width / (rect.width * dpr)),
        y: (touch.clientY - rect.top) * (canvas.height / (rect.height * dpr))
      }
    }
    return { x: 0, y: 0 }
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    const { x, y } = getCoordinates(e.nativeEvent)
    const ctx = canvasRef.current?.getContext('2d')
    
    if (ctx) {
      ctx.beginPath()
      ctx.moveTo(x, y)
      setIsDrawing(true)
    }
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    if (!isDrawing) return

    const { x, y } = getCoordinates(e.nativeEvent)
    const ctx = canvasRef.current?.getContext('2d')
    
    if (ctx) {
      ctx.lineTo(x, y)
      ctx.stroke()
    }
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const handleRecognize = async () => {
    if (!canvasRef.current) return

    setIsProcessing(true)
    try {
      const canvas = canvasRef.current
      const blob = await new Promise<Blob>((resolve) =>
        canvas.toBlob((blob) => resolve(blob!), 'image/png', 1.0)
      )

      const formData = new FormData()
      formData.append('image', blob)

      const response = await fetch('/api/recognition', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      setRecognizedText(
        `Expression: ${data.recognized}\n\nSolution: ${data.solution}`
      )
    } catch (error) {
      console.error('Recognition failed:', error)
      setRecognizedText('Recognition failed')
    } finally {
      setIsProcessing(false)
    }
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (ctx) {
      const dpr = window.devicePixelRatio || 1
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr)
      setRecognizedText('')
    }
  }

  return (
    <div className="space-y-4">
      <canvas
        ref={canvasRef}
        className="border-2 border-gray-300 rounded-lg w-full h-96 touch-none"
        style={{ touchAction: 'none' }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />
      <div className="flex space-x-4">
        <button
          onClick={handleRecognize}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Recognize
        </button>
        <button
          onClick={clearCanvas}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          Clear
        </button>
      </div>
    </div>
  )
}
