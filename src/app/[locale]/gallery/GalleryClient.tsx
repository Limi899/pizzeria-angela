'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { X } from 'lucide-react'

interface GalleryClientProps {
    dict: {
        gallery: {
            pageTitle: string
            heading: string
            subheading: string
        }
    }
}

// Actual gallery images with bespoke layout classes for a 12-column grid
const galleryItems = [
    { id: 1, label: 'Interior Ambiance', src: '/images/interior 1 and hero photo.jpeg', className: 'md:col-span-5 md:row-span-2' },
    { id: 2, label: 'Exterior Perspective', src: '/images/exterior 1.jpeg', className: 'md:col-span-7 md:row-span-1' },
    { id: 3, label: 'Our Heritage', src: '/images/old photo.jpeg', className: 'md:col-span-4 md:row-span-1' },
    { id: 4, label: 'Dining Area', src: '/images/interior 2.jpeg', className: 'md:col-span-3 md:row-span-1' },
    { id: 8, label: 'Angela Restaurant', src: '/images/restaurant.jpeg', className: 'md:col-span-6 md:row-span-2' },
    { id: 5, label: 'Outside Setup', src: '/images/exterior 2.jpeg', className: 'md:col-span-6 md:row-span-1' },
    { id: 7, label: 'Fireplace', src: '/images/IMG_2610.jpeg', className: 'md:col-span-6 md:row-span-1' },
    { id: 6, label: 'Crn Drim River', src: '/images/drim river.jpeg', className: 'md:col-span-12 md:row-span-2' },
]

export function GalleryClient({ dict }: GalleryClientProps) {
    const [lightbox, setLightbox] = useState<number | null>(null)

    return (
        <main className="min-h-screen bg-[#111111] pt-24">
            {/* Header */}
            <section className="py-12 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="mb-4 inline-block text-xs tracking-[0.4em] text-[#b87333] uppercase">
                        {dict.gallery.pageTitle}
                    </span>
                    <h1 className="mb-4 text-5xl font-bold tracking-tight text-[#fdfbf7] md:text-7xl">
                        {dict.gallery.heading}
                    </h1>
                    <p className="text-lg text-[#888]">{dict.gallery.subheading}</p>
                    <div className="mx-auto mt-4 h-[2px] w-24 bg-gradient-to-r from-transparent via-[#b87333] to-transparent" />
                </motion.div>
            </section>

            {/* Asymmetrical Magazine Grid */}
            <section className="mx-auto max-w-7xl px-6 pb-24">
                <div className="grid auto-rows-[250px] grid-cols-1 gap-4 md:grid-cols-12 md:auto-rows-[300px]">
                    {galleryItems.map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-[#222] bg-[#111] transition-all duration-500 hover:border-[#b87333]/40 hover:shadow-[0_0_40px_rgba(184,115,51,0.2)] hover:z-10 ${item.className || ''}`}
                            onClick={() => setLightbox(item.id)}
                        >
                            {/* Actual image */}
                            <img
                                src={item.src}
                                alt={item.label}
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            
                            {/* Overlay info on hover */}
                            <div className="absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-[#111111]/90 via-[#111111]/20 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                <span className="text-sm font-medium tracking-wider text-[#b87333] translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    {item.label}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Lightbox */}
            {lightbox && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-[#000]/90 backdrop-blur-sm"
                    onClick={() => setLightbox(null)}
                >
                    <button
                        className="absolute top-6 right-6 cursor-pointer text-[#888] transition-colors hover:text-white"
                        onClick={() => setLightbox(null)}
                    >
                        <X size={32} />
                    </button>
                    <div className="relative flex max-h-[90vh] w-[90vw] max-w-5xl items-center justify-center rounded-2xl border border-[#333] bg-[#111] overflow-hidden">
                        <img
                            src={galleryItems.find((g) => g.id === lightbox)?.src}
                            alt="Gallery Fullscreen"
                            className="max-h-[90vh] w-full object-contain"
                        />
                        <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                            <p className="text-xl font-medium text-white text-center tracking-wider">
                                {galleryItems.find((g) => g.id === lightbox)?.label}
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}
        </main>
    )
}
