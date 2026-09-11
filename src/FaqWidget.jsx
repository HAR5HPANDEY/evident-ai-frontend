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
      {/* Hint tag — looks like a pinned note corner */}
      {showHint && !isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 max-w-[190px] sm:max-w-[210px] bg-[#EDE6D3] text-[#0D1520] rounded-sm px-4 py-3 shadow-xl z-50 border-l-4 border-[#C9A24B]">
          <button
            onClick={() => setShowHint(false)}
            className="absolute -top-2 -right-2 w-5 h-5 bg-[#0D1520] text-[#EDE6D3] rounded-full text-xs flex items-center justify-center"
            aria-label="Dismiss"
          >
            ✕
          </button>
          <p className="text-[10px] tracking-[0.15em] text-[#0D1520]/45 mb-1">NOTE</p>
          <p className="text-sm leading-snug">Questions about how this works? Open the case notes.</p>
        </div>
      )}

      {/* Floating tab — styled like a filing tab, not a chat bubble */}
      <button
        onClick={handleButtonClick}
        className="fixed bottom-6 right-6 h-14 px-5 bg-[#C9A24B] text-[#0D1520] rounded-sm shadow-xl flex items-center gap-2 font-serif font-semibold text-sm tracking-wide transition hover:bg-[#d9b566] z-50"
        aria-label="Help"
      >
        {isOpen ? '✕ Close' : '? Notes'}
      </button>

      {/* Panel — a memo pad, not a chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 max-w-[calc(100vw-3rem)] max-h-[70vh] bg-[#EDE6D3] text-[#0D1520] rounded-sm shadow-2xl flex flex-col z-50 overflow-hidden border-t-4 border-[#C9A24B]">

          <div className="px-4 pt-4 pb-3 border-b border-dashed border-[#0D1520]/20">
            <p className="text-[10px] tracking-[0.15em] text-[#0D1520]/45">CASE NOTES</p>
            <h3 className="font-serif text-lg leading-tight">How this works</h3>
          </div>

          <div className="overflow-y-auto flex-1 px-4 py-3 space-y-1">
            {faqData.map((item, index) => (
              <div
                key={index}
                className={`border-b border-dashed border-[#0D1520]/15 last:border-b-0 ${
                  activeIndex === index ? 'pb-3' : ''
                }`}
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full text-left py-3 flex justify-between items-start gap-3 group"
                >
                  <span className="text-sm font-medium leading-snug">{item.question}</span>
                  <span className="text-[#0D1520]/40 font-serif text-lg leading-none shrink-0 group-hover:text-[#0D1520]/70">
                    {activeIndex === index ? '−' : '+'}
                  </span>
                </button>

                {activeIndex === index && (
                  <p className="text-sm text-[#0D1520]/70 leading-relaxed pr-2">
                    {item.answer}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="px-4 py-2 border-t border-dashed border-[#0D1520]/20">
            <p className="text-[10px] tracking-[0.15em] text-[#0D1520]/35">END OF FILE</p>
          </div>
        </div>
      )}
    </>
  )
}

export default FaqWidget