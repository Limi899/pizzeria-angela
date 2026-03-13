'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Particle {
    id: number
    x: number
    size: number
    duration: number
    delay: number
    type: 'basil' | 'ember' | 'flour'
    opacity: number
}

function generateParticles(count: number): Particle[] {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 12 + 4,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 10,
        type: (['basil', 'ember', 'flour'] as const)[Math.floor(Math.random() * 3)],
        opacity: Math.random() * 0.4 + 0.1,
    }))
}

const particleColors = {
    basil: '#4a7c3f',
    ember: '#d48a47',
    flour: '#fdfbf7',
}

const particleShapes = {
    basil: (size: number) => (
        <svg width={size} height={size * 1.5} viewBox="0 0 10 15">
            <ellipse cx="5" cy="7.5" rx="4" ry="7" fill="currentColor" />
            <line x1="5" y1="1" x2="5" y2="14" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
        </svg>
    ),
    ember: (size: number) => (
        <div
            style={{
                width: size,
                height: size,
                borderRadius: '50%',
                background: `radial-gradient(circle, #f5a623, #d48a47, transparent)`,
                boxShadow: `0 0 ${size}px rgba(212, 138, 71, 0.6)`,
            }}
        />
    ),
    flour: (size: number) => (
        <div
            style={{
                width: size * 0.6,
                height: size * 0.6,
                borderRadius: '50%',
                background: 'rgba(253, 251, 247, 0.5)',
                filter: `blur(${size * 0.3}px)`,
            }}
        />
    ),
}

export function AntiGravityParallax() {
    const [particles, setParticles] = useState<Particle[]>([])

    useEffect(() => {
        setParticles(generateParticles(30))
    }, [])

    return (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute"
                    style={{
                        left: `${p.x}%`,
                        bottom: '-5%',
                        color: particleColors[p.type],
                        opacity: p.opacity,
                    }}
                    animate={{
                        y: [0, -window?.innerHeight * 1.3 || -1500],
                        x: [0, (Math.random() - 0.5) * 80],
                        rotate: [0, Math.random() * 360],
                    }}
                    transition={{
                        duration: p.duration,
                        delay: p.delay,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                >
                    {particleShapes[p.type](p.size)}
                </motion.div>
            ))}
        </div>
    )
}
