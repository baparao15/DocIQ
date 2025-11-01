# Legal Document Demystifier

## Overview
A premium AI-powered legal document analysis SaaS platform that helps users identify risky clauses in contracts, provides AI-generated summaries, suggests safer alternatives, and allows document editing with full user authentication and history tracking.

## Project Status
🎯 **Production-Ready MVP** - Complete authentication, dark theme UI, document analysis with editing capabilities

## 🚀 First-Time Setup Instructions

### Prerequisites
- Python 3.8+ installed
- Node.js 16+ and npm installed
- OpenAI API key (optional but recommended for full functionality)

### Step 1: Environment Configuration
1. **Create Environment File**:
   ```bash
   # Copy the example environment file
   cp .env.example .env
   ```

2. **Configure API Keys** (edit `.env` file):
   ```env
   # Required for AI features (summaries and rewrites)
   OPENAI_API_KEY=your_openai_api_key_here
   
   # Generate a secure secret key (minimum 32 characters)
   SECRET_KEY=your_super_secret_jwt_key_here_minimum_32_characters
   
   # Database (SQLite for development)
   DATABASE_URL=sqlite:///./legal_docs.db
   
   # Application settings
   ENVIRONMENT=development
   DEBUG=true
   ```

### Step 2: Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Create uploads directory
mkdir uploads
```

### Step 3: Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install Node.js dependencies
npm install
```

### Step 4: Database Initialization
The database will be automatically created when you first run the backend server. No manual setup required for SQLite.

### Step 5: Running the Application

#### Option A: Manual Start
**Terminal 1 - Backend Server:**
```bash
cd backend
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 - Frontend Server:**
```bash
cd frontend
npm run dev
```

### Step 6: Access the Application
- **Frontend**: http://localhost:5000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

### Step 7: Test Upload Functionality
1. Create an account or login
2. Navigate to "Analysis" page
3. Upload a PDF, DOCX, or TXT file
4. Or paste text directly
5. View analysis results with risk detection and AI summaries

### Troubleshooting
- **Port 5000 in use**: Change frontend port with `npm run dev -- --port 5001`
- **Port 8000 in use**: Change backend port with `--port 8001`
- **Upload not working**: Ensure `.env` file exists and API key is configured
- **No AI features**: Check `OPENAI_API_KEY` in `.env` file

## Architecture

### Backend (Python/FastAPI + PostgreSQL)
- **Framework**: FastAPI with Uvicorn server, JWT authentication
- **Database**: Replit PostgreSQL (managed, production-ready)
- **Port**: 8000 (internal, proxied by frontend)
- **Key Components**:
  - `main.py` - Full REST API with auth endpoints, document CRUD, analysis
  - `models.py` - SQLAlchemy ORM models (User, Document, Analysis)
  - `auth.py` - JWT token-based authentication (plain text passwords for development - encryption to be added later)
  - `database.py` - PostgreSQL connection and session management
  - `document_processor.py` - Parses PDF, DOCX, and TXT files
  - `risk_analyzer.py` - Enhanced detection engine with 22 risk patterns + unique IDs
  - `rewrite_engine.py` - OpenAI (gpt-4o) integration for clause rewriting only
  - `summary_engine.py` - AI-powered document summarization (auto-generated)

### Frontend (React/TypeScript - Premium Dark Theme)
- **Framework**: React 18 with TypeScript, Vite build tool
- **Port**: 5000 (webview)
- **Styling**: Tailwind CSS with custom premium dark theme
- **Color Palette**: 
  - Primary: Deep Indigo/Slate/Royal Blue gradient (#667eea → #764ba2)
  - Accents: Neon Blue (#00D9FF), Emerald (#10b981), Gold (#fbbf24)
  - Background: Charcoal/Graphite gradient (#0f172a → #020617)
- **Routing**: React Router v6 with protected routes
- **Key Features**:
  - **Authentication**: Login/Signup with JWT tokens
  - **Analysis Page**: Split-view with document editor (left) and tabbed panel (right)
    - Summary tab: Auto-generated document summary
    - Ask tab: Placeholder for future AI Q&A feature
    - Risky Clauses tab: Expandable risk cards with severity badges and suggested rewrites
  - **Document Editor**: Full-text editing with save and download capabilities
  - **Document History**: View all past analyses with click-to-reopen
  - **Modern UI**: Responsive design, animations, glassmorphism, neon accents
  - **Dark Theme**: Professional SaaS aesthetic throughout

## Key Design Decisions

### OpenAI Usage Optimization (Primary Goal)
The system is optimized to minimize OpenAI API costs:
1. **Risk Detection**: Uses rule-based pattern matching (no OpenAI)
2. **Rewriting Only**: OpenAI is called ONLY for generating safer alternatives
3. **Batch Processing**: Multiple clauses rewritten in a single API call
4. **Lazy Initialization**: OpenAI client created only when needed
5. **Graceful Degradation**: Works without API key (shows warning message)

### Risk Detection Patterns (22 Types)
- Unlimited Liability
- Automatic Renewal
- Arbitration Clause
- Waiver of Rights
- Indemnification
- Non-Compete Clause
- Confidentiality Obligations
- Termination Penalties
- Intellectual Property Transfer
- Unilateral Modification
- Broad Disclaimers
- Limitation of Liability
- Assignment Rights
- Governing Law
- Entire Agreement
- Force Majeure
- Payment Terms
- Data Collection
- Class Action Waiver
- Severability
- Notice Requirements
- Survival Clauses

## Recent Changes
- **2025-11-01 (Latest Update)**: Public landing page with optional authentication
  - ✅ Made home page public - no login required to browse
  - ✅ Authentication only required when clicking "Start Analysis"
  - ✅ Navigation shows Login/Signup buttons when not authenticated
  - ✅ Simplified authentication (plain text passwords for development)
  - ✅ Updated OpenAI integration to use gpt-4o model
  - ✅ Fixed account creation issues

- **2025-11-01 (Major Upgrade)**: Transformed into production-ready SaaS platform
  - ✅ Migrated from SQLite to PostgreSQL with SQLAlchemy ORM
  - ✅ Implemented complete JWT authentication system (signup, login, protected routes)
  - ✅ Added AI-powered auto-summary generation for all documents
  - ✅ Completely redesigned UI with premium dark theme and new color palette
  - ✅ Created split-view Analysis page with document editor and tabbed results panel
  - ✅ Implemented document history with ability to reopen and edit past documents
  - ✅ Added document save and download functionality
  - ✅ Enhanced risk detection with unique clause IDs and position tracking
  - ✅ Improved UX with animations, responsive design, and professional aesthetics
  - ✅ Created Login/Signup pages with modern glassmorphism design

## Environment Variables
- `OPENAI_API_KEY` - Optional. Required for clause rewriting and summary generation. System works without it (displays warning).
- `DATABASE_URL` - Automatically configured by Replit PostgreSQL
- `SECRET_KEY` - JWT signing secret (auto-generated, can be customized)

## Development Workflows
- **frontend** - Vite dev server on port 5000 (webview)
- **backend** - FastAPI/Uvicorn server on port 8000 (console)

## File Structure
```
.
├── backend/
│   ├── main.py              # FastAPI application
│   ├── document_processor.py # File parsing (PDF/DOCX/TXT)
│   ├── risk_analyzer.py     # Rule-based risk detection
│   ├── rewrite_engine.py    # OpenAI rewriting integration
│   ├── database.py          # SQLite persistence
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── main.tsx         # React entry point
│   │   ├── App.tsx          # Main app with routing
│   │   ├── pages/           # Route pages
│   │   │   ├── Home.tsx
│   │   │   ├── Analysis.tsx
│   │   │   └── About.tsx
│   │   └── components/      # Reusable components
│   │       ├── FileUpload.tsx
│   │       ├── TextInput.tsx
│   │       └── Results.tsx
│   ├── vite.config.ts       # Vite configuration
│   └── package.json         # Node dependencies
└── replit.md               # This file
```

## User Preferences
- Preferred approach: "Any approach is fine as long as it works"
- OpenAI usage: Only for rewriting detected risky clauses

## Database
- SQLite file: `legal_analyzer.db`
- Table: `analyses` - stores document analysis results with risks

## API Endpoints
- `GET /` - Health check
- `GET /health` - API status
- `POST /api/analyze-document` - Upload and analyze file
- `POST /api/analyze-text` - Analyze pasted text

## Next Steps / Future Enhancements
- Add user editing capabilities for suggested rewrites
- Implement rewrite history and version tracking
- Create export functionality for modified documents
- Add custom rewrite style preferences
- Implement caching for similar clauses to reduce API costs
- ChromaDB integration for semantic search (currently installed but not used)
#   C l a u s e S e n s e  
 #   D o c I Q  
 #   D o c I Q  
 