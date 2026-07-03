'use client'
import { useState, useEffect, useRef, ReactNode } from 'react'

interface LazyViewportSectionProps {
  children: ReactNode
  placeholderHeight?: string
  rootMargin?: string
}

export default function LazyViewportSection({
  children,
  placeholderHeight = '200px',
  rootMargin = '150px',
}: LazyViewportSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // If the browser doesn't support IntersectionObserver, fall back immediately.
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        rootMargin, // Start loading slightly before it enters the viewport
      }
    )

    const currentRef = containerRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      observer.disconnect()
    }
  }, [rootMargin])

  return (
    <div
      ref={containerRef}
      style={{
        minHeight: isVisible ? 'auto' : placeholderHeight,
        width: '100%',
      }}
    >
      {isVisible ? children : null}
    </div>
  )
}
