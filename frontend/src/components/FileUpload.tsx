import { useState, useCallback } from 'react'
import { Upload, FileText, Loader, AlertCircle } from 'lucide-react'
import { analyzeDocument } from '../services/api'
import type { AnalysisResult } from '../pages/Analysis'

interface FileUploadProps {
  onAnalysisComplete: (result: AnalysisResult) => void
  setLoading: (loading: boolean) => void
  loading: boolean
}

function FileUpload({ onAnalysisComplete, setLoading, loading }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFile = async (file: File) => {
    if (!file) return

    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
    if (!validTypes.includes(file.type)) {
      setError('Please upload a PDF, DOCX, or TXT file')
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB')
      return
    }

    setError(null)
    setLoading(true)

    try {
      const result = await analyzeDocument(file)
      onAnalysisComplete(result)
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Analysis failed. Please try again.')
      setLoading(false)
    }
  }

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <form onDragEnter={handleDrag}>
        <div
          className={`border-2 border-dashed rounded-lg p-12 text-center transition ${
            dragActive ? 'border-primary bg-blue-50' : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {loading ? (
            <div className="flex flex-col items-center">
              <Loader className="h-16 w-16 text-primary animate-spin mb-4" />
              <p className="text-gray-700 font-semibold">Analyzing document...</p>
              <p className="text-gray-500 text-sm mt-2">This may take a few moments</p>
            </div>
          ) : (
            <>
              <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-xl font-semibold text-gray-700 mb-2">
                Drop your file here or click to browse
              </p>
              <p className="text-gray-500 mb-6">
                Supported formats: PDF, DOCX, TXT (Max 10MB)
              </p>
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".pdf,.docx,.txt"
                onChange={handleChange}
                disabled={loading}
              />
              <label
                htmlFor="file-upload"
                className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-blue-600 transition cursor-pointer"
              >
                <FileText className="h-5 w-5 mr-2" />
                Select File
              </label>
            </>
          )}
        </div>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
          <AlertCircle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-red-700">{error}</p>
        </div>
      )}
    </div>
  )
}

export default FileUpload
