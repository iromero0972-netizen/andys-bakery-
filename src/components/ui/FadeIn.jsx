import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function FadeIn({ children, delay = 0, direction = 'up', className = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [fallbackVisible, setFallbackVisible] = useState(false)

  // Fallback: if IntersectionObserver doesn't fire within 2s, show content
  useEffect(() => {
    const timer = setTimeout(() => setFallbackVisible(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  const visible = isInView || fallbackVisible

  const directions = {
    up: { y: 30 },
    down: { y: -30 },
    left: { x: 30 },
    right: { x: -30 },
    none: {},
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directions[direction] }}
      animate={visible ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...directions[direction] }}
      transition={{ duration: 0.6, delay: visible && !fallbackVisible ? delay : 0, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
