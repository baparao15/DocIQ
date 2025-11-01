import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Upload, Type, FileText, AlertTriangle, Download, Save, X } from 'lucide-react';
import { analyzeDocument, analyzeText, getDocument, updateDocument } from '../services/api';

interface Risk {
  id: string;
  clause: string;
  risk_type: string;
  severity: string;
  explanation: string;
  original_text: string;
  suggested_rewrite?: string;
  start_position?: number;
  end_position?: number;
}

const AnalysisNew = () => {
  const [searchParams] = useSearchParams();
  const [tab, setTab] = useState<'summary' | 'ask' | 'risks'>('summary');
  const [mode, setMode] = useState<'upload' | 'text'>('upload');
  const [documentText, setDocumentText] = useState('');
  const [editedText, setEditedText] = useState('');
  const [summary, setSummary] = useState('');
  const [risks, setRisks] = useState<Risk[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasAnalysis, setHasAnalysis] = useState(false);
  const [currentDocId, setCurrentDocId] = useState<number | null>(null);
  const [selectedRisk, setSelectedRisk] = useState<Risk | null>(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const docId = searchParams.get('doc');
    if (docId) {
      loadDocument(parseInt(docId));
    }
  }, [searchParams]);

  const loadDocument = async (docId: number) => {
    setIsLoading(true);
    try {
      const data = await getDocument(docId);
      setDocumentText(data.original_text);
      setEditedText(data.edited_text || data.original_text);
      setSummary(data.summary || '');
      setRisks(data.risks || []);
      setHasAnalysis(true);
      setCurrentDocId(docId);
    } catch (err) {
      setError('Failed to load document');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError('');
    
    try {
      const result = await analyzeDocument(file);
      setDocumentText(result.text);
      setEditedText(result.text);
      setSummary(result.summary || '');
      setRisks(result.risks || []);
      setHasAnalysis(true);
      setCurrentDocId(result.document_id);
      setTab('summary');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to analyze document');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTextAnalyze = async () => {
    if (!documentText.trim()) {
      setError('Please enter some text to analyze');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const result = await analyzeText(documentText);
      setEditedText(documentText);
      setSummary(result.summary || '');
      setRisks(result.risks || []);
      setHasAnalysis(true);
      setCurrentDocId(result.document_id);
      setTab('summary');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to analyze text');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!currentDocId) return;
    
    try {
      await updateDocument(currentDocId, editedText);
      alert('Document saved successfully!');
    } catch (err) {
      alert('Failed to save document');
    }
  };

  const handleDownload = () => {
    const blob = new Blob([editedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'edited-document.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'low': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  if (!hasAnalysis) {
    return (
      <div className="min-h-screen bg-gradient-dark">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-white mb-4">Analyze Your Document</h1>
            <p className="text-dark-400">Upload a document or paste text to detect risky clauses</p>
          </div>

          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setMode('upload')}
              className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all ${
                mode === 'upload'
                  ? 'bg-gradient-primary text-white shadow-neon'
                  : 'bg-dark-800/50 text-dark-300 hover:bg-dark-700/50'
              }`}
            >
              <Upload className="w-5 h-5 mr-2" />
              Upload File
            </button>
            <button
              onClick={() => setMode('text')}
              className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all ${
                mode === 'text'
                  ? 'bg-gradient-primary text-white shadow-neon'
                  : 'bg-dark-800/50 text-dark-300 hover:bg-dark-700/50'
              }`}
            >
              <Type className="w-5 h-5 mr-2" />
              Paste Text
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-300">
              {error}
            </div>
          )}

          <div className="bg-dark-800/50 backdrop-blur-lg rounded-2xl shadow-premium p-8 border border-dark-700">
            {mode === 'upload' ? (
              <div className="text-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileUpload}
                  accept=".pdf,.docx,.txt"
                  className="hidden"
                  disabled={isLoading}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading}
                  className="w-full py-16 border-2 border-dashed border-dark-600 rounded-xl hover:border-primary-500 transition-colors group"
                >
                  <FileText className="w-16 h-16 text-dark-600 group-hover:text-primary-500 mx-auto mb-4 transition-colors" />
                  <p className="text-lg font-semibold text-white mb-2">
                    {isLoading ? 'Analyzing...' : 'Click to upload document'}
                  </p>
                  <p className="text-dark-400">Supports PDF, DOCX, and TXT files</p>
                </button>
              </div>
            ) : (
              <div>
                <textarea
                  value={documentText}
                  onChange={(e) => setDocumentText(e.target.value)}
                  placeholder="Paste your legal document text here..."
                  className="w-full h-64 px-4 py-3 bg-dark-900/50 border border-dark-700 rounded-lg text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  disabled={isLoading}
                />
                <button
                  onClick={handleTextAnalyze}
                  disabled={isLoading || !documentText.trim()}
                  className="mt-4 w-full py-3 bg-gradient-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Analyzing...' : 'Analyze Text'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-dark">
      <div className="h-screen flex flex-col">
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Document Editor */}
          <div className="w-1/2 border-r border-dark-700 flex flex-col">
            <div className="bg-dark-800/50 border-b border-dark-700 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-primary-500" />
                <h2 className="text-lg font-semibold text-white">Document</h2>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-accent-emerald/20 text-accent-emerald rounded-lg hover:bg-accent-emerald/30 transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save
                </button>
                <button
                  onClick={handleDownload}
                  className="px-4 py-2 bg-primary-600/20 text-primary-400 rounded-lg hover:bg-primary-600/30 transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button
                  onClick={() => {
                    setHasAnalysis(false);
                    setDocumentText('');
                    setEditedText('');
                    setSummary('');
                    setRisks([]);
                    setCurrentDocId(null);
                  }}
                  className="px-4 py-2 bg-dark-700/50 text-dark-400 rounded-lg hover:bg-dark-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto p-6">
              <textarea
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                className="w-full h-full bg-dark-900/30 border border-dark-700 rounded-lg p-4 text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none font-mono text-sm leading-relaxed"
              />
            </div>
          </div>

          {/* Right Panel - Tabs */}
          <div className="w-1/2 flex flex-col">
            <div className="bg-dark-800/50 border-b border-dark-700 px-6 py-2 flex items-center gap-1">
              <button
                onClick={() => setTab('summary')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  tab === 'summary'
                    ? 'bg-primary-600/20 text-primary-400 border-b-2 border-primary-500'
                    : 'text-dark-400 hover:text-white'
                }`}
              >
                Summary
              </button>
              <button
                onClick={() => setTab('ask')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  tab === 'ask'
                    ? 'bg-primary-600/20 text-primary-400 border-b-2 border-primary-500'
                    : 'text-dark-400 hover:text-white'
                }`}
              >
                Ask
              </button>
              <button
                onClick={() => setTab('risks')}
                className={`px-6 py-3 rounded-lg font-medium transition-all relative ${
                  tab === 'risks'
                    ? 'bg-primary-600/20 text-primary-400 border-b-2 border-primary-500'
                    : 'text-dark-400 hover:text-white'
                }`}
              >
                Risky Clauses
                {risks.length > 0 && (
                  <span className="ml-2 px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                    {risks.length}
                  </span>
                )}
              </button>
            </div>

            <div className="flex-1 overflow-auto p-6">
              {tab === 'summary' && (
                <div className="animate-fade-in">
                  <h3 className="text-xl font-bold text-white mb-4">Document Summary</h3>
                  <div className="bg-dark-900/30 border border-dark-700 rounded-lg p-6">
                    <p className="text-dark-200 leading-relaxed whitespace-pre-wrap">
                      {summary || 'No summary available'}
                    </p>
                  </div>
                </div>
              )}

              {tab === 'ask' && (
                <div className="animate-fade-in">
                  <h3 className="text-xl font-bold text-white mb-4">Ask Questions</h3>
                  <div className="bg-dark-900/30 border border-dark-700 rounded-lg p-6 text-center">
                    <p className="text-dark-400">AI question answering coming soon...</p>
                  </div>
                </div>
              )}

              {tab === 'risks' && (
                <div className="animate-fade-in space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">Risky Clauses Detected</h3>
                    <span className="text-dark-400">{risks.length} risks found</span>
                  </div>
                  
                  {risks.length === 0 ? (
                    <div className="bg-accent-emerald/10 border border-accent-emerald/30 rounded-lg p-6 text-center">
                      <p className="text-accent-emerald">No significant risks detected in this document</p>
                    </div>
                  ) : (
                    risks.map((risk) => (
                      <div
                        key={risk.id}
                        className="bg-dark-900/30 border border-dark-700 rounded-lg overflow-hidden hover:border-primary-500 transition-all cursor-pointer"
                        onClick={() => setSelectedRisk(selectedRisk?.id === risk.id ? null : risk)}
                      >
                        <div className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <AlertTriangle className={`w-5 h-5 ${
                                risk.severity === 'high' ? 'text-red-400' :
                                risk.severity === 'medium' ? 'text-yellow-400' :
                                'text-blue-400'
                              }`} />
                              <h4 className="font-semibold text-white">{risk.risk_type}</h4>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs border ${getSeverityColor(risk.severity)}`}>
                              {risk.severity}
                            </span>
                          </div>
                          <p className="text-dark-300 text-sm mb-3">{risk.explanation}</p>
                          <div className="bg-dark-950/50 rounded p-3 mb-3">
                            <p className="text-dark-200 text-sm italic">"{risk.clause.substring(0, 150)}..."</p>
                          </div>
                          
                          {selectedRisk?.id === risk.id && risk.suggested_rewrite && (
                            <div className="mt-4 pt-4 border-t border-dark-700 animate-slide-down">
                              <h5 className="text-sm font-semibold text-accent-neon mb-2">Suggested Alternative:</h5>
                              <div className="bg-accent-emerald/10 border border-accent-emerald/30 rounded p-3">
                                <p className="text-dark-200 text-sm">{risk.suggested_rewrite}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisNew;
