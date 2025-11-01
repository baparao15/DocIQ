import { useNavigate } from 'react-router-dom'
import { Shield, FileSearch, AlertTriangle, Sparkles } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

function Home() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  const handleStartAnalysis = () => {
    if (isAuthenticated) {
      navigate('/analysis')
    } else {
      navigate('/login')
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Understand Your Legal Documents
        </h1>
        <p className="text-xl text-dark-300 max-w-3xl mx-auto">
          Upload any legal document and get instant AI-powered analysis with risky clauses identified and safer alternatives suggested.
        </p>
        <button
          onClick={handleStartAnalysis}
          className="mt-8 px-8 py-4 bg-primary-500 text-white rounded-lg text-lg font-semibold hover:bg-primary-600 transition shadow-lg"
        >
          Start Analysis
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
        <div className="bg-dark-800 p-6 rounded-lg shadow-md border border-dark-700">
          <div className="bg-primary-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <FileSearch className="h-6 w-6 text-primary-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-white">Smart Analysis</h3>
          <p className="text-dark-300">
            Our rule-based engine scans documents for 20+ risk patterns using proven legal frameworks.
          </p>
        </div>

        <div className="bg-dark-800 p-6 rounded-lg shadow-md border border-dark-700">
          <div className="bg-danger-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <AlertTriangle className="h-6 w-6 text-danger-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-white">Risk Detection</h3>
          <p className="text-dark-300">
            Automatically identifies unlimited liability, non-compete clauses, and other risky terms.
          </p>
        </div>

        <div className="bg-dark-800 p-6 rounded-lg shadow-md border border-dark-700">
          <div className="bg-secondary-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Sparkles className="h-6 w-6 text-secondary-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-white">AI Rewrites</h3>
          <p className="text-dark-300">
            Get AI-generated safer alternatives for every risky clause detected in your document.
          </p>
        </div>

        <div className="bg-dark-800 p-6 rounded-lg shadow-md border border-dark-700">
          <div className="bg-success-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Shield className="h-6 w-6 text-success-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-white">Protect Yourself</h3>
          <p className="text-dark-300">
            Make informed decisions with clear explanations of potential risks and balanced alternatives.
          </p>
        </div>
      </div>

      <div className="mt-16 bg-dark-800 rounded-lg shadow-md p-8 border border-dark-700">
        <h2 className="text-2xl font-bold mb-4 text-white">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-primary-500 text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold">
              1
            </div>
            <h4 className="font-semibold mb-2 text-white">Upload Document</h4>
            <p className="text-dark-300 text-sm">
              Upload your PDF, DOCX, or TXT file, or paste text directly.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-primary-500 text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold">
              2
            </div>
            <h4 className="font-semibold mb-2 text-white">AI Analysis</h4>
            <p className="text-dark-300 text-sm">
              Our system detects risky clauses and generates safer rewrites using AI.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-primary-500 text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold">
              3
            </div>
            <h4 className="font-semibold mb-2 text-white">Review Results</h4>
            <p className="text-dark-300 text-sm">
              See detected risks with severity levels and AI-suggested alternatives.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
