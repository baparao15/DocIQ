import { useState } from 'react'
import { Send, Loader, AlertCircle } from 'lucide-react'
import { analyzeText } from '../services/api'
import type { AnalysisResult } from '../pages/Analysis'

interface TextInputProps {
  onAnalysisComplete: (result: AnalysisResult) => void
  setLoading: (loading: boolean) => void
  loading: boolean
}

function TextInput({ onAnalysisComplete, setLoading, loading }: TextInputProps) {
  const [text, setText] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!text.trim() || text.trim().length < 10) {
      setError('Please enter at least 10 characters of text to analyze')
      return
    }

    setError(null)
    setLoading(true)

    try {
      const result = await analyzeText(text)
      onAnalysisComplete(result)
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Analysis failed. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <form onSubmit={handleSubmit}>
        <label htmlFor="text-input" className="block text-lg font-semibold text-gray-700 mb-3">
          Paste Your Legal Document Text
        </label>
        <textarea
          id="text-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={loading}
          className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none disabled:bg-gray-100"
          placeholder="Paste the text of your legal document here..."
        />
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-500">
            {text.length} characters
          </p>
          <button
            type="submit"
            disabled={loading || text.trim().length < 10}
            className="flex items-center px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-blue-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader className="h-5 w-5 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Send className="h-5 w-5 mr-2" />
                Analyze Text
              </>
            )}
          </button>
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

export default TextInput
