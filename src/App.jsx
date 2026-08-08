import { useState } from 'react'
import FaqWidget from './FaqWidget'

function App() {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [extractedText, setExtractedText] = useState(null)

  const handleCheckText = async () => {
    if (!message.trim()) return

    setLoading(true)
    setError(null)
    setResult(null)
    setExtractedText(null)

    try {
      const response = await fetch('https://evident-ai-backend.onrender.com/check', {
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

      const response = await fetch('https://evident-ai-backend.onrender.com/check-image', {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white flex flex-col items-center px-4 py-12">

 <div className="text-center mb-10">
  <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
    EVIDENT AI
  </h1>
 <p className="text-slate-300 text-sm mt-1 tracking-wide">
  Your AI fact-check agent
</p>
  <p className="text-slate-400 mt-3">
    Paste a message or upload a screenshot — get an AI-powered verdict in seconds.
  </p>
</div>
      <div className="w-full max-w-2xl bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-slate-700">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Paste the message you want to fact-check..."
          className="w-full h-32 bg-slate-900/50 text-white rounded-xl p-4 outline-none border border-slate-700 focus:border-purple-500 transition resize-none placeholder:text-slate-500"
        />

        <button
          onClick={handleCheckText}
          disabled={loading}
          className="mt-4 w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition"
        >
          {loading ? 'Checking...' : 'Check This Claim'}
        </button>

        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-slate-700" />
          <span className="text-slate-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-slate-700" />
        </div>

        <label className="w-full flex items-center justify-center gap-2 border border-dashed border-slate-600 hover:border-purple-500 rounded-xl py-3 cursor-pointer transition text-slate-300">
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

      {extractedText && (
        <div className="w-full max-w-2xl mt-6 bg-slate-800/30 border border-slate-700 rounded-xl p-4">
          <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Extracted from image</p>
          <p className="text-slate-400 text-sm">{extractedText}</p>
        </div>
      )}

      {error && (
        <div className="w-full max-w-2xl mt-6 bg-red-900/30 border border-red-700 rounded-xl p-4 text-red-300">
          {error}
        </div>
      )}

      {result && (
        <div className="w-full max-w-2xl mt-6 space-y-4">
          {!result.claims_found && (
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-slate-400 text-center">
              <p className="mb-2">No checkable factual claim was found.</p>
              {result.no_claim_reason && (
                <p className="text-sm text-slate-500 italic">{result.no_claim_reason}</p>
              )}
              <p className="text-xs text-slate-600 mt-3">
                This tool only fact-checks factual claims found in messages or forwards — not questions, opinions, or predictions.
              </p>
            </div>
          )}

          {result.claims_found && result.results.map((item, index) => (
            <VerdictCard key={index} item={item} />
          ))}

        </div>
      )}
      <FaqWidget />
    </div>
  )
}

function VerdictCard({ item }) {
  const verdictStyles = {
    True: 'bg-green-900/30 border-green-600 text-green-300',
    False: 'bg-red-900/30 border-red-600 text-red-300',
    Misleading: 'bg-yellow-900/30 border-yellow-600 text-yellow-300',
    Unverifiable: 'bg-slate-700/30 border-slate-500 text-slate-300',
  }

  const badgeStyle = verdictStyles[item.verdict] || verdictStyles.Unverifiable

  return (
    <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-slate-700">
      <p className="text-slate-300 italic mb-3">"{item.claim}"</p>

      <div className="flex items-center gap-2 flex-wrap">
        <span className={`inline-block px-4 py-1 rounded-full text-sm font-semibold border ${badgeStyle}`}>
          {item.verdict}
        </span>

        {item.from_cache && (
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-900/30 border border-blue-600 text-blue-300">
            ⚡ Instant result (cached)
          </span>
        )}
      </div>

      <p className="text-slate-300 mt-4 leading-relaxed">
        {item.explanation}
      </p>

      {item.sources.length > 0 && (
        <div className="mt-4 pt-4 border-t border-slate-700">
          <p className="text-xs text-slate-500 mb-2 uppercase tracking-wide">Sources</p>
          <ul className="space-y-1">
            {item.sources.map((url, i) => (
              <li key={i}>
                
                 <a href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 text-sm underline break-all"
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