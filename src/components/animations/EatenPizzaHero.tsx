'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

interface EatenPizzaProps {
    title: string
    subtitle: string
}

export function EatenPizzaHero({ title, subtitle }: EatenPizzaProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    })

    // Each slice disappears at staggered thresholds
    const sliceOpacities = [
        useTransform(scrollYProgress, [0.05, 0.15], [1, 0]),
        useTransform(scrollYProgress, [0.12, 0.22], [1, 0]),
        useTransform(scrollYProgress, [0.19, 0.29], [1, 0]),
        useTransform(scrollYProgress, [0.26, 0.36], [1, 0]),
        useTransform(scrollYProgress, [0.33, 0.43], [1, 0]),
        useTransform(scrollYProgress, [0.40, 0.50], [1, 0]),
        useTransform(scrollYProgress, [0.47, 0.57], [1, 0]),
        useTransform(scrollYProgress, [0.54, 0.64], [1, 0]),
    ]

    const titleOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])
    const titleY = useTransform(scrollYProgress, [0, 0.25], [0, -50])
    const pizzaScale = useTransform(scrollYProgress, [0, 0.1], [1, 1.05])

    return (
        <div ref={containerRef} className="relative h-[250vh]">
            <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
                {/* Title overlay */}
                <motion.div
                    className="absolute z-20 text-center px-4"
                    style={{ opacity: titleOpacity, y: titleY }}
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="mb-4 text-5xl font-bold tracking-tight text-[#fdfbf7] md:text-7xl lg:text-8xl"
                        style={{ textShadow: '0 4px 40px rgba(0,0,0,0.9), 0 2px 10px rgba(0,0,0,0.8)' }}
                    >
                        {title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="text-base tracking-wide text-[#d48a47] md:text-lg"
                        style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}
                    >
                        {subtitle}
                    </motion.p>
                </motion.div>

                {/* Pizza */}
                <motion.div
                    className="relative"
                    style={{ scale: pizzaScale }}
                >
                    <div className="relative h-[300px] w-[300px] sm:h-[380px] sm:w-[380px] md:h-[460px] md:w-[460px]">
                        {/* Outer shadow glow */}
                        <div
                            className="absolute inset-[-10px] rounded-full"
                            style={{
                                boxShadow: '0 25px 80px rgba(0,0,0,0.7), 0 0 60px rgba(184,115,51,0.12)',
                            }}
                        />

                        {/* Crust ring (always visible) */}
                        <div
                            className="absolute inset-0 rounded-full"
                            style={{
                                background: 'radial-gradient(circle, transparent 65%, #c8956c 67%, #a0724a 78%, #8b5e3c 88%, #6d4a2e 100%)',
                                boxShadow: 'inset 0 -4px 12px rgba(0,0,0,0.4), inset 0 4px 8px rgba(255,220,180,0.15)',
                            }}
                        />

                        {/* 8 pizza slices */}
                        {sliceOpacities.map((opacity, i) => {
                            const startAngle = i * 45 - 90
                            const endAngle = startAngle + 45

                            // Convert to clip-path points
                            const toRad = (deg: number) => (deg * Math.PI) / 180
                            // Create a wider arc with multiple points
                            const arcPoints = []
                            for (let a = startAngle; a <= endAngle; a += 5) {
                                arcPoints.push(
                                    `${50 + 48 * Math.cos(toRad(a))}% ${50 + 48 * Math.sin(toRad(a))}%`
                                )
                            }

                            // Topping positions (relative to slice center)
                            const midAngle = toRad(startAngle + 22.5)
                            const toppingAngle1 = toRad(startAngle + 12)
                            const toppingAngle2 = toRad(startAngle + 33)
                            const toppingAngle3 = toRad(startAngle + 22)

                            return (
                                <motion.div
                                    key={i}
                                    className="absolute inset-0"
                                    style={{
                                        opacity,
                                        clipPath: `polygon(50% 50%, ${arcPoints.join(', ')})`,
                                    }}
                                >
                                    {/* Sauce base */}
                                    <div
                                        className="absolute inset-[4%] rounded-full"
                                        style={{
                                            background: `radial-gradient(circle at ${50 + 15 * Math.cos(midAngle)}% ${50 + 15 * Math.sin(midAngle)}%, #c0392b 0%, #a93226 30%, #922b21 60%, #7b241c 100%)`,
                                        }}
                                    />
                                    {/* Cheese layer */}
                                    <div
                                        className="absolute inset-[4%] rounded-full"
                                        style={{
                                            background: `radial-gradient(ellipse at ${50 + 12 * Math.cos(midAngle)}% ${50 + 12 * Math.sin(midAngle)}%, rgba(255,235,180,0.85) 0%, rgba(245,220,150,0.7) 20%, rgba(230,200,120,0.4) 40%, transparent 60%)`,
                                        }}
                                    />
                                    {/* Mozzarella stretch marks */}
                                    <div
                                        className="absolute rounded-full"
                                        style={{
                                            width: '8%',
                                            height: '8%',
                                            top: `${48 + 22 * Math.sin(toppingAngle1)}%`,
                                            left: `${48 + 22 * Math.cos(toppingAngle1)}%`,
                                            background: 'radial-gradient(circle, rgba(255,248,220,0.9), rgba(245,235,190,0.5))',
                                            boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                                        }}
                                    />
                                    {/* Pepperoni */}
                                    <div
                                        className="absolute rounded-full"
                                        style={{
                                            width: '7%',
                                            height: '7%',
                                            top: `${46 + 28 * Math.sin(toppingAngle2)}%`,
                                            left: `${46 + 28 * Math.cos(toppingAngle2)}%`,
                                            background: 'radial-gradient(circle at 35% 35%, #d35400, #c0392b, #8b2500)',
                                            boxShadow: 'inset 0 -1px 2px rgba(0,0,0,0.4), 0 1px 3px rgba(0,0,0,0.4)',
                                        }}
                                    />
                                    {/* Basil leaf */}
                                    <div
                                        className="absolute"
                                        style={{
                                            width: '6%',
                                            height: '9%',
                                            top: `${47 + 16 * Math.sin(toppingAngle3)}%`,
                                            left: `${47 + 16 * Math.cos(toppingAngle3)}%`,
                                            background: '#2d8a4e',
                                            borderRadius: '50% 50% 50% 0',
                                            transform: `rotate(${startAngle + 60}deg)`,
                                            boxShadow: 'inset 0 -1px 2px rgba(0,0,0,0.3)',
                                            opacity: i % 2 === 0 ? 1 : 0, // only on alternate slices
                                        }}
                                    />
                                    {/* Olive */}
                                    <div
                                        className="absolute rounded-full"
                                        style={{
                                            width: '5%',
                                            height: '5%',
                                            top: `${46 + 18 * Math.sin(toppingAngle1 + 0.2)}%`,
                                            left: `${46 + 18 * Math.cos(toppingAngle1 + 0.2)}%`,
                                            background: 'radial-gradient(circle at 30% 30%, #444, #222, #111)',
                                            boxShadow: '0 1px 2px rgba(0,0,0,0.5)',
                                            opacity: i % 3 === 0 ? 1 : 0,
                                        }}
                                    />
                                    {/* Slight slice divider line */}
                                    <div
                                        className="absolute"
                                        style={{
                                            width: '1px',
                                            height: '46%',
                                            top: '4%',
                                            left: '50%',
                                            background: 'rgba(0,0,0,0.15)',
                                            transformOrigin: 'bottom center',
                                            transform: `rotate(${startAngle + 90}deg)`,
                                        }}
                                    />
                                </motion.div>
                            )
                        })}

                        {/* Center circle (where slices meet) */}
                        <div
                            className="absolute top-1/2 left-1/2 z-10 h-[10%] w-[10%] -translate-x-1/2 -translate-y-1/2 rounded-full"
                            style={{
                                background: 'radial-gradient(circle, #e8c87a, #d4a574, #c8956c)',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
                            }}
                        />

                        {/* Subtle shine / gloss overlay */}
                        <div
                            className="absolute inset-0 rounded-full"
                            style={{
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)',
                                pointerEvents: 'none',
                            }}
                        />
                    </div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-8 flex flex-col items-center gap-2"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ opacity: titleOpacity }}
                >
                    <span className="text-[10px] tracking-[0.3em] text-[#555] uppercase">Scroll</span>
                    <div className="h-6 w-[1px] bg-gradient-to-b from-[#b87333] to-transparent" />
                </motion.div>
            </div>
        </div>
    )
}
