import { useState } from 'react'
import { faqData } from './faqData'

function FaqWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(null)
  const [showHint, setShowHint] = useState(true)

  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  const handleButtonClick = () => {
    setIsOpen(!isOpen)
    setShowHint(false)
  }

  return (
    <>
      {/* Hint bubble */}
      {showHint && !isOpen && (
<div className="fixed bottom-24 right-4 sm:right-6 max-w-[180px] sm:max-w-[220px] bg-white/[0.06] backdrop-blur-2xl border border-white/10 rounded-xl rounded-br-none px-3 sm:px-4 py-2.5 sm:py-3 shadow-2xl z-50 animate-bounce text-xs sm:text-sm">   <button
            onClick={() => setShowHint(false)}
            className="absolute -top-2 -right-2 w-5 h-5 bg-[#1e1e28] border border-white/10 rounded-full text-xs text-slate-300 flex items-center justify-center hover:bg-[#2a2a36]"
            aria-label="Dismiss"
          >
            ✕
          </button>
          <p className="text-slate-200 text-sm">
            👋 Got a question or facing an issue? Click here for help!
          </p>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={handleButtonClick}
className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-white/[0.06] backdrop-blur-2xl border border-white/10 shadow-[0_0_30px_rgba(168,85,247,0.25)] flex items-center justify-center text-2xl transition hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] z-50"        aria-label="Help"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chat panel */}
      {isOpen && (
<div className="fixed bottom-24 right-6 w-80 max-w-[calc(100vw-3rem)] max-h-[70vh] bg-white/[0.06] backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl shadow-purple-900/20 flex flex-col z-50 overflow-hidden">          <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/30 border-b border-white/10 px-4 py-3">
            <h3 className="text-white font-semibold">Help & FAQ</h3>
            <p className="text-purple-200/60 text-xs">Common questions about this tool</p>
          </div>

          <div className="overflow-y-auto flex-1 p-3 space-y-2">
            {faqData.map((item, index) => (
              <div key={index} className="bg-white/[0.03] rounded-xl overflow-hidden border border-white/5">
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full text-left px-4 py-3 text-slate-200 text-sm font-medium flex justify-between items-center hover:bg-white/[0.04] transition"
                >
                  {item.question}
                  <span className="text-slate-500 ml-2">
                    {activeIndex === index ? '−' : '+'}
                  </span>
                </button>

                {activeIndex === index && (
                  <div className="px-4 pb-3 text-slate-400 text-sm leading-relaxed">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default FaqWidget