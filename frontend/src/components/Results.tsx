import { AlertTriangle, CheckCircle, FileText, RotateCcw, ArrowRight } from 'lucide-react'
import type { AnalysisResult, Risk } from '../pages/Analysis'

interface ResultsProps {
  result: AnalysisResult
  onNewAnalysis: () => void
}

function Results({ result, onNewAnalysis }: ResultsProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-300'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high':
      case 'medium':
        return <AlertTriangle className="h-5 w-5" />
      default:
        return <AlertTriangle className="h-5 w-5" />
    }
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Analysis Results</h1>
          <button
            onClick={onNewAnalysis}
            className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            New Analysis
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-start">
            <FileText className="h-6 w-6 text-primary mr-3 mt-1" />
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-2">{result.document_name}</h2>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Document Length:</span>
                  <span className="ml-2 font-semibold">{result.text_length.toLocaleString()} characters</span>
                </div>
                <div>
                  <span className="text-gray-600">Risks Found:</span>
                  <span className={`ml-2 font-semibold ${result.risks_found > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {result.risks_found}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Analysis ID:</span>
                  <span className="ml-2 font-mono text-xs">#{result.analysis_id}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {result.risks_found === 0 ? (
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Great News!</h3>
            <p className="text-gray-700">
              No risky clauses were detected in this document. However, this doesn't replace professional legal advice.
            </p>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Detected Risks ({result.risks_found})
            </h2>
            <div className="space-y-6">
              {result.risks.map((risk: Risk, index: number) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className={`px-6 py-4 border-l-4 ${getSeverityColor(risk.severity)}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start flex-1">
                        <div className="mr-3 mt-1">
                          {getSeverityIcon(risk.severity)}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-1">{risk.risk_type}</h3>
                          <p className="text-sm mb-3">{risk.explanation}</p>
                          <div className="bg-white bg-opacity-50 rounded p-3 text-sm">
                            <span className="font-semibold">Detected Clause: </span>
                            <span className="italic">"{risk.clause}"</span>
                          </div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ml-4 ${getSeverityColor(risk.severity)}`}>
                        {risk.severity}
                      </span>
                    </div>
                  </div>
                  
                  {risk.suggested_rewrite && (
                    <div className="px-6 py-4 bg-gray-50 border-t">
                      <div className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                            AI-Suggested Safer Alternative
                            <span className="ml-2 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full">
                              AI Generated
                            </span>
                          </h4>
                          <p className="text-gray-700 bg-white p-3 rounded border border-gray-200">
                            {risk.suggested_rewrite}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
        <p className="text-sm text-gray-700">
          <strong>Disclaimer:</strong> This analysis is for informational purposes only and does not constitute
          legal advice. Always consult with a qualified attorney before making important legal decisions.
        </p>
      </div>
    </div>
  )
}

export default Results
