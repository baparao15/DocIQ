import { Shield, Brain, Zap, Lock } from 'lucide-react'

function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">About Legal Document Demystifier</h1>
      
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <p className="text-lg text-gray-700 mb-4">
          Legal Document Demystifier is an AI-powered tool designed to help you understand complex legal documents
          and identify potentially risky clauses before signing.
        </p>
        <p className="text-gray-700 mb-4">
          Our system uses a combination of rule-based pattern matching and advanced AI to analyze your documents,
          detect risky clauses, and automatically generate safer alternatives.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
      
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-start mb-4">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Smart Risk Detection</h3>
              <p className="text-gray-600">
                Our system scans for 20+ types of risky clauses including unlimited liability, non-compete agreements,
                and automatic renewals.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-start mb-4">
            <div className="bg-purple-100 p-3 rounded-lg mr-4">
              <Zap className="h-6 w-6 text-secondary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">AI-Powered Rewrites</h3>
              <p className="text-gray-600">
                For every risky clause detected, we use OpenAI to generate balanced, consumer-friendly alternatives
                that protect both parties.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-start mb-4">
            <div className="bg-green-100 p-3 rounded-lg mr-4">
              <Shield className="h-6 w-6 text-success" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Protect Your Rights</h3>
              <p className="text-gray-600">
                Get clear explanations of potential risks and understand what you're agreeing to before signing
                any document.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-start mb-4">
            <div className="bg-yellow-100 p-3 rounded-lg mr-4">
              <Lock className="h-6 w-6 text-warning" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Secure & Private</h3>
              <p className="text-gray-600">
                Your documents are processed securely and temporarily. We don't store your uploaded files
                after analysis.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h2>
        <ol className="space-y-4 text-gray-700">
          <li className="flex">
            <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">1</span>
            <div>
              <strong>Upload or Paste:</strong> Provide your document by uploading a PDF, DOCX, or TXT file,
              or paste the text directly.
            </div>
          </li>
          <li className="flex">
            <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">2</span>
            <div>
              <strong>Rule-Based Analysis:</strong> Our engine scans the text using 20+ proven legal risk patterns
              to identify potentially problematic clauses.
            </div>
          </li>
          <li className="flex">
            <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">3</span>
            <div>
              <strong>AI Rewriting:</strong> For each detected risk, OpenAI generates a safer, more balanced
              alternative clause.
            </div>
          </li>
          <li className="flex">
            <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">4</span>
            <div>
              <strong>Review Results:</strong> See all detected risks with severity levels, explanations,
              and suggested rewrites side-by-side.
            </div>
          </li>
        </ol>
      </div>

      <div className="bg-yellow-50 border-l-4 border-warning rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Important Disclaimer</h3>
        <p className="text-gray-700">
          This tool is for informational purposes only and does not constitute legal advice. Always consult
          with a qualified attorney before making important legal decisions.
        </p>
      </div>
    </div>
  )
}

export default About
