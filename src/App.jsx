import { useState } from 'react'
import FaqWidget from './FaqWidget'

function App() {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [extractedText, setExtractedText] = useState(null)

  const API_BASE = 'https://evident-ai-backend.onrender.com'

  const handleCheckText = async () => {
    if (!message.trim()) return
    setLoading(true)
    setError(null)
    setResult(null)
    setExtractedText(null)
    try {
      const response = await fetch(`${API_BASE}/check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      })
      if (!response.ok) throw new Error('Something went wrong. Please try again.')
      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setLoading(true)
    setError(null)
    setResult(null)
    setExtractedText(null)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const response = await fetch(`${API_BASE}/check-image`, {
        method: 'POST',
        body: formData,
      })
      if (!response.ok) throw new Error('Something went wrong processing the image.')
      const data = await response.json()
      setResult(data)
      setExtractedText(data.extracted_text || null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

 return (
    <div className="min-h-screen bg-[#0a0a12] text-white overflow-hidden">

      {/* Soft glowing gradient header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-700/40 via-purple-900/20 to-transparent pointer-events-none" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -top-20 left-1/4 w-[400px] h-[400px] bg-pink-500/20 rounded-full blur-[100px] pointer-events-none" />

        {/* Nav */}
        <nav className="relative flex items-center justify-between px-6 md:px-12 py-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-purple-400 to-pink-400" />
            <span className="font-semibold text-lg">EVIDENT AI</span>
          </div>
          <span className="text-sm text-purple-200/70 hidden sm:block px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
            AI Fact-Check Agent
          </span>
        </nav>

        {/* Hero */}
        <div className="relative max-w-3xl mx-auto text-center px-6 pt-8 pb-14">
          <span className="inline-block text-xs font-medium px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-purple-200 mb-6 backdrop-blur-sm">
            ✦ AI-Powered Fact Checking
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight">
            Know What's True
            <br />
            Before You Share
          </h1>

          <p className="text-purple-100/60 mt-5 text-base sm:text-lg max-w-xl mx-auto">
            Paste any message or upload a screenshot. Get an evidence-backed verdict in seconds — no guesswork, just sources.
          </p>
        </div>
      </div>

      
      {/* Main tool card */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-16">
        <div className="bg-[#12121c] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">

          {/* Fake "browser bar" like the reference image, ties into the dashboard-preview aesthetic */}
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
            <span className="ml-3 text-xs text-slate-500">evident-ai.app</span>
          </div>

          <div className="p-5 sm:p-6">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Paste the message you want to fact-check..."
              className="w-full h-28 bg-black/30 text-white rounded-xl p-4 outline-none border border-white/10 focus:border-purple-500 transition resize-none placeholder:text-slate-500 text-sm sm:text-base"
            />

            <button
              onClick={handleCheckText}
              disabled={loading}
              className="mt-3 w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition text-sm sm:text-base"
            >
              {loading ? 'Checking...' : 'Check This Claim'}
            </button>

            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-slate-600 text-xs">OR</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            <label className="w-full flex items-center justify-center gap-2 border border-dashed border-white/15 hover:border-purple-500 rounded-xl py-3 cursor-pointer transition text-slate-300 text-sm">
              📷 Upload a Screenshot
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={loading}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {extractedText && (
          <div className="mt-4 bg-[#12121c] border border-white/10 rounded-xl p-4">
            <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Extracted from image</p>
            <p className="text-slate-400 text-sm">{extractedText}</p>
          </div>
        )}

        {error && (
          <div className="mt-4 bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-300 text-sm">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-4 space-y-3">
            {!result.claims_found && (
              <div className="bg-[#12121c] border border-white/10 rounded-xl p-4 text-slate-400 text-center text-sm">
                <p className="mb-2">No checkable factual claim was found.</p>
                {result.no_claim_reason && (
                  <p className="text-xs text-slate-500 italic">{result.no_claim_reason}</p>
                )}
                <p className="text-xs text-slate-600 mt-3">
                  This tool only fact-checks factual claims — not questions, opinions, or predictions.
                </p>
              </div>
            )}

            {result.claims_found && result.results.map((item, index) => (
              <VerdictCard key={index} item={item} />
            ))}
          </div>
        )}
      </div>

      {/* Trust strip, mirrors reference's "trusted by" section, adapted to feature highlights */}
      <div className="border-t border-white/5 py-10">
        <p className="text-center text-xs text-slate-600 uppercase tracking-wide mb-6">
          Built with
        </p>
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-3 px-6 text-slate-500 text-sm">
          <span>FastAPI</span>
          <span>LangGraph</span>
          <span>Groq</span>
          <span>Tavily</span>
          <span>Supabase</span>
          <span>React</span>
        </div>
      </div>

      <FaqWidget />
    </div>
  )
}

function VerdictCard({ item }) {
  const verdictStyles = {
    True: 'bg-green-500/10 border-green-500/30 text-green-300',
    False: 'bg-red-500/10 border-red-500/30 text-red-300',
    Misleading: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-300',
    Unverifiable: 'bg-slate-500/10 border-slate-500/30 text-slate-300',
  }
  const badgeStyle = verdictStyles[item.verdict] || verdictStyles.Unverifiable

  return (
    <div className="bg-[#12121c] border border-white/10 rounded-xl p-5 sm:p-6">
      <p className="text-slate-300 italic mb-3 text-sm sm:text-base">"{item.claim}"</p>

      <div className="flex items-center gap-2 flex-wrap">
        <span className={`inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-semibold border ${badgeStyle}`}>
          {item.verdict}
        </span>
        {item.from_cache && (
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 border border-blue-500/30 text-blue-300">
            ⚡ Instant result
          </span>
        )}
      </div>

      <p className="text-slate-400 mt-3 leading-relaxed text-sm">
        {item.explanation}
      </p>

      {item.sources.length > 0 && (
        <div className="mt-4 pt-4 border-t border-white/5">
          <p className="text-xs text-slate-600 mb-2 uppercase tracking-wide">Sources</p>
          <ul className="space-y-1">
            {item.sources.map((url, i) => (
              <li key={i}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 text-xs sm:text-sm underline break-all"
                >
                  {url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default App