'use client'

import { useState } from 'react'
import { Upload } from 'lucide-react'

export function AnalizadorVideo() {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files)
    if (files && files.length > 0) {
      const videoFile = files.find(file => file.type.startsWith('video/'))
      if (videoFile) {
        setFile(videoFile)
      } else {
        alert('Por favor, arrastra un archivo de video.')
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Arrastra un video para analizar la calidad</h1>
      <div
        className={`w-full max-w-2xl aspect-video flex flex-col items-center justify-center border-4 border-dashed rounded-lg transition-colors ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {file ? (
          <div className="text-center">
            <p className="text-lg font-semibold mb-2">{file.name}</p>
            <p className="text-sm text-gray-500">Archivo listo para analizar</p>
          </div>
        ) : (
          <>
            <Upload className="w-16 h-16 text-gray-400 mb-4" />
            <p className="text-lg text-gray-500">Arrastra y suelta tu video aquí</p>
            <p className="text-sm text-gray-400 mt-2">Soporta archivos MP4, AVI, MOV</p>
          </>
        )}
      </div>
      {file && (
        <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
          Analizar Video
        </button>
      )}
    </div>
  )
}