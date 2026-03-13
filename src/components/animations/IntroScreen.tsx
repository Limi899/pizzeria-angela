'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export function IntroScreen() {
    const [show, setShow] = useState(true)

    useEffect(() => {
        // Prevent scrolling while the animation is running
        document.body.style.overflow = 'hidden'

        // Wait for the animation sequence to finish before unmounting
        const timer = setTimeout(() => {
            setShow(false)
            document.body.style.overflow = ''
        }, 1600) // 1.6 seconds total duration

        return () => {
            clearTimeout(timer)
            document.body.style.overflow = ''
        }
    }, [])

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    key="intro-screen"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: '-10%', filter: 'blur(10px)' }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, filter: 'blur(5px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                        transition={{
                            duration: 0.8, // Logo fades in faster
                            ease: 'easeOut',
                        }}
                        className="flex flex-col items-center justify-center"
                    >
                        <img
                            src="/images/logo.png"
                            alt="Angela Pizza Restaurant"
                            className="h-auto w-[280px] object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] sm:w-[380px] md:w-[480px]"
                        />

                        {/* Subtle loading line under logo */}
                        <motion.div
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{ scaleX: 1, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.8, ease: 'circOut' }}
                            className="mt-8 h-[2px] w-24 bg-gradient-to-r from-transparent via-[#b87333] to-transparent"
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
