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
        <div className="fixed bottom-24 right-6 max-w-[220px] bg-slate-800 border border-slate-700 rounded-xl rounded-br-none px-4 py-3 shadow-lg z-50 animate-bounce">
          <button
            onClick={() => setShowHint(false)}
            className="absolute -top-2 -right-2 w-5 h-5 bg-slate-700 rounded-full text-xs text-slate-300 flex items-center justify-center hover:bg-slate-600"
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
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-lg flex items-center justify-center text-2xl transition z-50"
        aria-label="Help"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 max-w-[calc(100vw-3rem)] max-h-[70vh] bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-3">
            <h3 className="text-white font-semibold">Help & FAQ</h3>
            <p className="text-purple-100 text-xs">Common questions about this tool</p>
          </div>

          <div className="overflow-y-auto flex-1 p-3 space-y-2">
            {faqData.map((item, index) => (
              <div key={index} className="bg-slate-900/50 rounded-xl overflow-hidden border border-slate-700">
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full text-left px-4 py-3 text-slate-200 text-sm font-medium flex justify-between items-center hover:bg-slate-800/50 transition"
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