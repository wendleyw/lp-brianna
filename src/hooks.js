import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * useInView - Custom hook for Intersection Observer
 * Triggers when element enters viewport
 */
export function useInView(options = {}) {
    const [isInView, setIsInView] = useState(false)
    const ref = useRef(null)

    useEffect(() => {
        const element = ref.current
        if (!element) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true)
                    observer.unobserve(element)
                }
            },
            { threshold: 0.2, ...options }
        )

        observer.observe(element)
        return () => observer.disconnect()
    }, [])

    return [ref, isInView]
}

/**
 * useCountUp - Animated counter hook (Ghost Plugins style)
 * Animates a number from 0 to target value when triggered
 */
export function useCountUp(target, duration = 2000, shouldStart = false) {
    const [count, setCount] = useState(0)
    const frameRef = useRef(null)
    const startTimeRef = useRef(null)

    const animate = useCallback((timestamp) => {
        if (!startTimeRef.current) startTimeRef.current = timestamp
        const progress = Math.min((timestamp - startTimeRef.current) / duration, 1)

        // Ease out cubic for smooth deceleration
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.floor(eased * target))

        if (progress < 1) {
            frameRef.current = requestAnimationFrame(animate)
        } else {
            setCount(target)
        }
    }, [target, duration])

    useEffect(() => {
        if (shouldStart) {
            startTimeRef.current = null
            frameRef.current = requestAnimationFrame(animate)
        }
        return () => {
            if (frameRef.current) cancelAnimationFrame(frameRef.current)
        }
    }, [shouldStart, animate])

    return count
}

/**
 * Stagger animation variants for Framer Motion
 */
export const staggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
        },
    },
}

export const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
    },
}

export const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
    },
}

export const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
    },
}

/* ================================
   SPARK-STYLE SCROLL ANIMATION VARIANTS
   Inspired by sparkplugin.com/scroll-animations
   ================================ */

// Fade + scale up (focus effect)
export const scrollFocus = {
    hidden: { opacity: 0, scale: 0.85, filter: 'blur(8px)' },
    visible: {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
}

// Rotate in from angle
export const scrollRotate = {
    hidden: { opacity: 0, rotate: -8, y: 60 },
    visible: {
        opacity: 1,
        rotate: 0,
        y: 0,
        transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
}

// Slide in from right
export const scrollRight = {
    hidden: { opacity: 0, x: 80 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
}

// Slide in from left
export const scrollLeft = {
    hidden: { opacity: 0, x: -80 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
}

// Scale up from small
export const scrollScaleUp = {
    hidden: { opacity: 0, scale: 0.6 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
}

// Scale down from large
export const scrollScaleDown = {
    hidden: { opacity: 0, scale: 1.3 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
}

// 3D perspective tilt
export const scroll3D = {
    hidden: { opacity: 0, rotateX: 35, y: 50, transformPerspective: 1000 },
    visible: {
        opacity: 1,
        rotateX: 0,
        y: 0,
        transformPerspective: 1000,
        transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
}

// Flip in
export const scrollFlip = {
    hidden: { opacity: 0, rotateY: 90, transformPerspective: 1200 },
    visible: {
        opacity: 1,
        rotateY: 0,
        transformPerspective: 1200,
        transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
}

// Slide down
export const scrollSlideDown = {
    hidden: { opacity: 0, y: -60 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
}
