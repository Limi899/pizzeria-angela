'use client'

import { motion } from 'framer-motion'
import { Building2, CalendarDays } from 'lucide-react'

interface StoryClientProps {
    dict: {
        story: {
            pageTitle: string
            heading: string
            p1: string
            p2: string
            p3: string
            buildingLabel: string
            buildingYear: string
            restaurantLabel: string
            restaurantYear: string
        }
    }
}

export function StoryClient({ dict }: StoryClientProps) {
    return (
        <main className="relative min-h-screen bg-[#111111] pt-24">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-12">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-transparent to-[#111111]" />
                <div className="relative mx-auto max-w-4xl px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="mb-4 inline-block text-xs tracking-[0.4em] text-[#b87333] uppercase">
                            {dict.story.pageTitle}
                        </span>
                        <h1 className="mb-6 text-5xl font-bold tracking-tight text-[#fdfbf7] md:text-7xl">
                            {dict.story.heading}
                        </h1>
                        <div className="mx-auto h-[2px] w-24 bg-gradient-to-r from-transparent via-[#b87333] to-transparent" />
                    </motion.div>
                </div>
            </section>

            {/* Year Markers */}
            <section className="mx-auto max-w-5xl px-6 py-16">
                <div className="flex flex-col items-center justify-center gap-12 md:flex-row md:justify-around text-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center"
                    >
                        <Building2 className="mb-6 text-[#b87333]" size={36} />
                        <h3 className="mb-2 text-xl font-semibold tracking-wide text-[#fdfbf7]">
                            {dict.story.buildingLabel}
                        </h3>
                        <p className="text-4xl font-script text-[#b87333]">{dict.story.buildingYear}</p>
                    </motion.div>

                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="hidden md:block h-32 w-px bg-gradient-to-b from-transparent via-[#b87333]/40 to-transparent"
                    />

                    <motion.div className="md:hidden h-px w-32 bg-gradient-to-r from-transparent via-[#b87333]/40 to-transparent" />

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center"
                    >
                        <CalendarDays className="mb-6 text-[#b87333]" size={36} />
                        <h3 className="mb-2 text-xl font-semibold tracking-wide text-[#fdfbf7]">
                            {dict.story.restaurantLabel}
                        </h3>
                        <p className="text-4xl font-script text-[#b87333]">{dict.story.restaurantYear}</p>
                    </motion.div>
                </div>
            </section>

            {/* Story Content & Old Photo */}
            <section className="mx-auto max-w-6xl px-6 pb-24">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
                    {/* Story Paragraphs */}
                    <div className="space-y-8">
                        {[dict.story.p1, dict.story.p2, dict.story.p3].map((para, i) => (
                            <motion.p
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.15 }}
                                className="text-lg leading-relaxed text-[#999]"
                            >
                                {para}
                            </motion.p>
                        ))}
                    </div>

                    {/* Old Photo */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative w-full overflow-hidden rounded-2xl border border-[#333] shadow-2xl"
                    >
                        <img
                            src="/images/old photo.jpeg"
                            alt="Historical Photo"
                            className="w-full object-cover grayscale transition-all duration-700 hover:scale-105 hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#111]/80 via-transparent to-transparent" />
                    </motion.div>
                </div>

                {/* Decorative River Line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: 'easeInOut' }}
                    className="mt-16 h-[1px] w-full origin-left bg-gradient-to-r from-[#b87333]/50 via-[#b87333] to-[#b87333]/50"
                />
            </section>
        </main>
    )
}
