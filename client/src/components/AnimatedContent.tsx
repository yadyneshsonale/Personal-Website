import React, { useEffect, useRef, ReactNode } from 'react'
import { gsap } from 'gsap'

interface AnimatedContentProps {
  children: ReactNode
  duration?: number
  delay?: number
  className?: string
}

export default function AnimatedContent({
  children,
  duration = 1.1,
  delay = 0,
  className = '',
}: AnimatedContentProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        {
          opacity: 0,
          y: 30,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration,
          delay,
          ease: 'power3.out',
        }
      )
    }, contentRef)

    return () => ctx.revert()
  }, [duration, delay])

  return (
    <div ref={contentRef} className={className}>
      {children}
    </div>
  )
}
