import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import { FileText, Home as HomeIcon, Info, History as HistoryIcon, LogOut, User } from 'lucide-react'
import { AuthProvider, useAuth } from './context/AuthContext'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import AnalysisNew from './pages/AnalysisNew'
import About from './pages/About'
import History from './pages/History'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-neon"></div>
      </div>
    );
  }
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function AppContent() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-dark">
      <nav className="bg-dark-800/50 backdrop-blur-lg border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-primary-500 mr-2" />
              <span className="text-xl font-bold text-white">Legal Document Demystifier</span>
            </div>
            <div className="flex items-center space-x-2">
              <Link to="/" className="flex items-center px-4 py-2 rounded-lg text-dark-300 hover:bg-dark-700 hover:text-white transition">
                <HomeIcon className="h-5 w-5 mr-1" />
                Home
              </Link>
              {isAuthenticated && (
                <>
                  <Link to="/analysis" className="flex items-center px-4 py-2 rounded-lg text-dark-300 hover:bg-dark-700 hover:text-white transition">
                    <FileText className="h-5 w-5 mr-1" />
                    Analysis
                  </Link>
                  <Link to="/history" className="flex items-center px-4 py-2 rounded-lg text-dark-300 hover:bg-dark-700 hover:text-white transition">
                    <HistoryIcon className="h-5 w-5 mr-1" />
                    History
                  </Link>
                  <Link to="/about" className="flex items-center px-4 py-2 rounded-lg text-dark-300 hover:bg-dark-700 hover:text-white transition">
                    <Info className="h-5 w-5 mr-1" />
                    About
                  </Link>
                </>
              )}
              <div className="flex items-center gap-2 ml-4 pl-4 border-l border-dark-700">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center gap-2 px-3 py-2 bg-dark-700/50 rounded-lg">
                      <User className="h-4 w-4 text-primary-400" />
                      <span className="text-sm text-dark-300">{user?.email}</span>
                    </div>
                    <button
                      onClick={logout}
                      className="flex items-center px-3 py-2 rounded-lg text-dark-400 hover:bg-dark-700 hover:text-red-400 transition"
                    >
                      <LogOut className="h-5 w-5" />
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="px-4 py-2 rounded-lg text-dark-300 hover:bg-dark-700 hover:text-white transition">
                      Login
                    </Link>
                    <Link to="/signup" className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition">
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/analysis" element={<ProtectedRoute><AnalysisNew /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
          <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App
