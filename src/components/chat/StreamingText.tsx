import { useState, useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'

interface StreamingTextProps {
  text: string
  speed?: number
  onComplete?: () => void
}

export default function StreamingText({
  text,
  speed = 12,
  onComplete,
}: StreamingTextProps) {
  const [displayed, setDisplayed] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const indexRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const lastTimeRef = useRef(0)

  // Restart animation whenever text changes
  useEffect(() => {
    // Cancel any existing animation
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }

    // If text is empty, don't animate
    if (!text) {
      setDisplayed('')
      setIsComplete(false)
      return
    }

    indexRef.current = 0
    lastTimeRef.current = 0
    setDisplayed('')
    setIsComplete(false)

    const animate = (time: number) => {
      if (time - lastTimeRef.current >= speed) {
        lastTimeRef.current = time
        // Stream multiple chars per frame for long texts
        const charsPerTick = text.length > 500 ? 3 : text.length > 200 ? 2 : 1
        indexRef.current = Math.min(indexRef.current + charsPerTick, text.length)
        setDisplayed(text.slice(0, indexRef.current))

        if (indexRef.current >= text.length) {
          setIsComplete(true)
          onComplete?.()
          return
        }
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
  }, [text, speed, onComplete])

  // If no text at all, show nothing
  if (!text) return null

  return (
    <div className={`typing-effect ${isComplete ? 'done' : ''}`}>
      <ReactMarkdown>{displayed}</ReactMarkdown>
    </div>
  )
}
