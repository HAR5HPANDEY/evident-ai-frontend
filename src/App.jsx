import { useState } from 'react'
import FaqWidget from './FaqWidget'

const API_BASE = 'https://evident-ai-backend.onrender.com'

const VERDICT_LABEL = {
  True: 'TRUE',
  False: 'FALSE',
  Misleading: 'MISLEADING',
  Unverifiable: 'UNCLEAR',
}

const VERDICT_COLOR = {
  True: { text: '#3F7D58', border: '#3F7D58' },
  False: { text: '#B23A2E', border: '#B23A2E' },
  Misleading: { text: '#C9A24B', border: '#C9A24B' },
  Unverifiable: { text: '#5B6472', border: '#5B6472' },
}

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
    const file = e.target.files?.[0]
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
    <div className="min-h-screen bg-[#0D1520] text-[#F1EEE6]">

      {/* Masthead */}
      <header className="border-b border-white/10">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-5 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-1">
          <div className="flex items-baseline gap-3">
            <div className="w-3 h-3 bg-[#C9A24B] rotate-45" />
            <h1 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight">EVIDENT</h1>
          </div>
          <p className="text-xs sm:text-sm text-[#8B93A1] tracking-wide">A desk for checking what's true</p>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-5 sm:px-8 pt-12 sm:pt-16 pb-10">
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium leading-[1.08] max-w-2xl">
          Check it before you forward it.
        </h2>
        <p className="text-[#B7BEC9] mt-5 text-base sm:text-lg max-w-lg leading-relaxed">
          Paste a message or drop in a screenshot. We pull out the claim, check it
          against real sources, and tell you plainly what's true.
        </p>
      </section>

      {/* Working area */}
      <section className="max-w-5xl mx-auto px-5 sm:px-8 pb-16 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">

        {/* Input case card */}
        <div className="case-card rounded-sm p-5 sm:p-6 text-[#0D1520] bg-[#EDE6D3]">
          <p className="text-[10px] tracking-[0.15em] text-[#0D1520]/50 mb-3 font-mono">CASE — NEW SUBMISSION</p>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Paste the claim, or the whole forward..."
            className="w-full h-32 bg-white/40 text-[#0D1520] rounded-sm p-4 outline-none border border-[#0D1520]/15 focus:border-[#0D1520]/40 transition resize-none placeholder:text-[#0D1520]/40 text-sm sm:text-base font-sans"
          />

          <button
            onClick={handleCheckText}
            disabled={loading}
            className="mt-3 w-full bg-[#0D1520] hover:bg-[#1a2740] disabled:opacity-50 disabled:cursor-not-allowed text-[#EDE6D3] font-medium py-3 rounded-sm transition text-sm sm:text-base cursor-pointer"
          >
            {loading ? 'Checking…' : 'Verify This Claim'}
          </button>

          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-[#0D1520]/15" />
            <span className="text-[#0D1520]/40 text-xs font-mono">or</span>
            <div className="flex-1 h-px bg-[#0D1520]/15" />
          </div>

          <label className="w-full flex items-center justify-center gap-2 border border-dashed border-[#0D1520]/30 hover:border-[#0D1520]/60 rounded-sm py-3 cursor-pointer transition text-[#0D1520]/70 text-sm">
            Attach a screenshot
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={loading}
              className="hidden"
            />
          </label>
        </div>

        {/* How it works */}
        <aside className="border border-white/10 rounded-sm p-5 sm:p-6 h-fit">
          <p className="text-[10px] tracking-[0.15em] text-[#8B93A1] mb-4 font-mono">HOW THIS WORKS</p>
          <ol className="space-y-4">
            <li className="flex gap-3">
              <span className="font-serif text-[#C9A24B] text-lg leading-none">1</span>
              <p className="text-sm text-[#B7BEC9] leading-relaxed">We pull out the actual claim, skip the forwarded fluff.</p>
            </li>
            <li className="flex gap-3">
              <span className="font-serif text-[#C9A24B] text-lg leading-none">2</span>
              <p className="text-sm text-[#B7BEC9] leading-relaxed">We check it against live, current sources.</p>
            </li>
            <li className="flex gap-3">
              <span className="font-serif text-[#C9A24B] text-lg leading-none">3</span>
              <p className="text-sm text-[#B7BEC9] leading-relaxed">You get a plain answer — true, false, misleading, or unclear.</p>
            </li>
          </ol>
        </aside>
      </section>

      {/* Extracted OCR text */}
      {extractedText && (
        <section className="max-w-5xl mx-auto px-5 sm:px-8 pb-6">
          <div className="border border-white/10 rounded-sm p-4">
            <p className="text-[10px] tracking-[0.15em] text-[#8B93A1] mb-2 font-mono">READ FROM IMAGE</p>
            <p className="text-[#B7BEC9] text-sm italic">"{extractedText}"</p>
          </div>
        </section>
      )}

      {/* Error */}
      {error && (
        <section className="max-w-5xl mx-auto px-5 sm:px-8 pb-6">
          <div className="border border-[#B23A2E]/40 bg-[#B23A2E]/10 rounded-sm p-4 text-[#e0a49d] text-sm">
            {error}
          </div>
        </section>
      )}

      {/* Results */}
      {result && (
        <section className="max-w-5xl mx-auto px-5 sm:px-8 pb-20 space-y-5">
          {!result.claims_found ? (
            <div className="border border-white/10 rounded-sm p-6 text-center">
              <p className="text-[#F1EEE6] mb-2">No checkable claim found here.</p>
              {result.no_claim_reason && (
                <p className="text-sm text-[#8B93A1] italic">{result.no_claim_reason}</p>
              )}
              <p className="text-xs text-[#5B6472] mt-3">
                This desk only checks factual claims — not questions, opinions, or predictions.
              </p>
            </div>
          ) : (
            result.results?.map((item, index) => (
              <CaseCard key={index} item={item} number={index + 1} />
            ))
          )}
        </section>
      )}

      <FaqWidget />
    </div>
  )
}

function CaseCard({ item, number }) {
  const color = VERDICT_COLOR[item.verdict] || VERDICT_COLOR.Unverifiable
  const label = VERDICT_LABEL[item.verdict] || item.verdict?.toUpperCase() || 'UNCLEAR'

  return (
    <div className="case-card rounded-sm p-5 sm:p-7 text-[#0D1520] bg-[#EDE6D3] relative overflow-hidden">
      <p className="text-[10px] tracking-[0.15em] text-[#0D1520]/45 mb-3 font-mono">
        CASE No. {String(number).padStart(3, '0')}
      </p>

      <p className="italic text-[15px] sm:text-base leading-relaxed pr-6 sm:pr-12">
        "{item.claim}"
      </p>

      <div className="flex items-center gap-3 mt-4 flex-wrap">
        <div
          className="stamp inline-block border-[3px] rounded-sm px-3 py-1 font-mono text-xs sm:text-sm tracking-[0.2em] font-bold"
          style={{ color: color.text, borderColor: color.border }}
        >
          {label}
        </div>

        {item.from_cache && (
          <span className="text-[11px] text-[#0D1520]/45 font-mono">
            — on file already
          </span>
        )}
      </div>

      <p className="text-[#0D1520]/75 mt-4 leading-relaxed text-sm">
        {item.explanation}
      </p>

      {item.sources && item.sources.length > 0 && (
        <div className="mt-5 pt-4 border-t border-dashed border-[#0D1520]/20">
          <p className="text-[10px] tracking-[0.15em] text-[#0D1520]/40 mb-2 font-mono">SOURCES</p>
          <ul className="space-y-1">
            {item.sources.map((url, i) => (
              <li key={i} className="text-xs sm:text-sm">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0D1520]/70 hover:text-[#0D1520] underline break-all"
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