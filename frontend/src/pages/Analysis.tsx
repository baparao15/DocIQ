import { useState } from 'react'
import FileUpload from '../components/FileUpload'
import TextInput from '../components/TextInput'
import Results from '../components/Results'
import { Upload, Type } from 'lucide-react'

export interface Risk {
  clause: string
  risk_type: string
  severity: string
  explanation: string
  original_text: string
  suggested_rewrite?: string
}

export interface AnalysisResult {
  analysis_id: number
  document_name: string
  text_length: number
  risks_found: number
  risks: Risk[]
}

function Analysis() {
  const [mode, setMode] = useState<'upload' | 'text'>('upload')
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [loading, setLoading] = useState(false)

  const handleAnalysisComplete = (analysisResult: AnalysisResult) => {
    setResult(analysisResult)
    setLoading(false)
  }

  const handleNewAnalysis = () => {
    setResult(null)
    setLoading(false)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {!result ? (
        <>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Analyze Your Document</h1>
            <p className="text-gray-600">
              Choose how you'd like to provide your legal document for analysis
            </p>
          </div>

          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={() => setMode('upload')}
              className={`flex items-center px-6 py-3 rounded-lg font-semibold transition ${
                mode === 'upload'
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Upload className="h-5 w-5 mr-2" />
              Upload File
            </button>
            <button
              onClick={() => setMode('text')}
              className={`flex items-center px-6 py-3 rounded-lg font-semibold transition ${
                mode === 'text'
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Type className="h-5 w-5 mr-2" />
              Paste Text
            </button>
          </div>

          <div className="max-w-3xl mx-auto">
            {mode === 'upload' ? (
              <FileUpload onAnalysisComplete={handleAnalysisComplete} setLoading={setLoading} loading={loading} />
            ) : (
              <TextInput onAnalysisComplete={handleAnalysisComplete} setLoading={setLoading} loading={loading} />
            )}
          </div>
        </>
      ) : (
        <Results result={result} onNewAnalysis={handleNewAnalysis} />
      )}
    </div>
  )
}

export default Analysis
