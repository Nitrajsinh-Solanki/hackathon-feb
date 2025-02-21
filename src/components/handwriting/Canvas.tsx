// hackathon-feb\src\components\handwriting\Canvas.tsx

'use client'
import { useRef, useEffect, useState } from 'react'

interface CanvasProps {
  setRecognizedText: (text: string) => void
  setIsProcessing: (isProcessing: boolean) => void
}

export default function Canvas({ setRecognizedText, setIsProcessing }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 2
        ctx.lineCap = 'round'
      }
    }
  }, [])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = getCoordinates(e)
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.beginPath()
      ctx.moveTo(offsetX, offsetY)
      setIsDrawing(true)
    }
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const { offsetX, offsetY } = getCoordinates(e)
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.lineTo(offsetX, offsetY)
      ctx.stroke()
    }
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const getCoordinates = (e: any) => {
    const canvas = canvasRef.current
    if (!canvas) return { offsetX: 0, offsetY: 0 }

    if (e.nativeEvent instanceof MouseEvent) {
      return { offsetX: e.nativeEvent.offsetX, offsetY: e.nativeEvent.offsetY }
    } else if (e.touches && e.touches.length > 0) {
      const rect = canvas.getBoundingClientRect()
      const touch = e.touches[0]
      return { offsetX: touch.clientX - rect.left, offsetY: touch.clientY - rect.top }
    }
    return { offsetX: 0, offsetY: 0 }
  }

  const handleRecognize = async () => {
    if (!canvasRef.current) return

    setIsProcessing(true)
    try {
      const canvas = canvasRef.current
      const blob = await new Promise<Blob>((resolve) =>
        canvas.toBlob((blob) => resolve(blob!), 'image/png')
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
      );    } catch (error) {
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
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      setRecognizedText('')
    }
  }

  return (
    <div className="space-y-4">
      <canvas
        ref={canvasRef}
        className="border-2 border-gray-300 rounded-lg w-full h-96 touch-none"
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
