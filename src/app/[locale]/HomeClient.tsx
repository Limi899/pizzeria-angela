'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { AntiGravityParallax } from '@/components/animations/AntiGravityParallax'
import { Building2, Camera, CalendarCheck, ArrowRight, MapPin, Clock } from 'lucide-react'
import Link from 'next/link'

interface HomeClientProps {
    locale: string
    dict: {
        hero: { title: string; subtitle: string }
        menuPreview: {
            heading: string
            subheading: string
            cta: string
            items: { name: string; desc: string; price: string }[]
        }
        homePreview: {
            storyHeading: string
            storyText: string
            storyCta: string
            galleryHeading: string
            galleryText: string
            galleryCta: string
            reserveHeading: string
            reserveText: string
            reserveCta: string
        }
        findUs: {
            badge: string
            heading: string
            text: string
            addressLabel: string
            addressValue: string
            phoneLabel: string
            phoneValue: string
            hoursLabel: string
            hoursValue1: string
            hoursValue2: string
        }
    }
}

const TypewriterText = ({ text, delay = 0, className = '', once = true }: { text: string; delay?: number; className?: string; once?: boolean }) => {
    // Split into characters but preserve spaces as entities to prevent word-break issues
    const letters = Array.from(text)

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.03, delayChildren: delay * i },
        }),
    }

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring' as const,
                damping: 12,
                stiffness: 200,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                type: 'spring' as const,
                damping: 12,
                stiffness: 200,
            },
        },
    }

    return (
        <motion.span
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: once, margin: "-100px" }}
            className={`flex flex-wrap lg:flex-nowrap ${className}`}
        >
            {letters.map((letter, index) => (
                <motion.span
                    variants={child}
                    key={index}
                    className="inline-block"
                    style={{ whiteSpace: letter === ' ' ? 'pre' : 'normal' }}
                >
                    {letter}
                </motion.span>
            ))}
        </motion.span>
    )
}

export function HomeClient({ locale, dict }: HomeClientProps) {
    return (
        <main className="relative">
            <AntiGravityParallax />

            {/* === HERO SECTION === */}
            <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/interior 1 and hero photo.jpeg"
                        alt="Restaurant Interior"
                        className="h-full w-full object-cover object-center"
                    />
                </div>

                {/* Lightened Background gradient overlay */}
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0a0a0a]/50 via-[#111111]/30 to-[#0f0f0f]/90" />

                {/* Subtle radial glow to draw focus to the text */}
                <div
                    className="absolute top-1/2 left-1/2 z-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
                    style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.6), transparent 80%)' }}
                />

                <div className="relative z-10 flex flex-col items-center px-6 text-center w-full max-w-6xl">
                    {/* Logo Removed for a cleaner look */}

                    {/* Title */}
                    <h1 className={`mb-6 flex w-full justify-center font-heading leading-tight text-[#fdfbf7] lg:whitespace-nowrap ${locale === 'mk' ? 'text-2xl sm:text-4xl md:text-4xl lg:text-[3.5rem] xl:text-[4.5rem]' : 'text-3xl sm:text-4xl md:text-5xl md:leading-[1.1] lg:text-6xl'}`}>
                        <TypewriterText text={dict.hero.title} delay={0.2} className="justify-center" />
                    </h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="mb-12 max-w-2xl text-lg tracking-wide text-[#e8e8e8] md:text-xl drop-shadow-xl font-medium"
                        style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
                    >
                        {dict.hero.subtitle}
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        className="flex flex-col gap-4 sm:flex-row"
                    >
                        <Link
                            href={`/${locale}/reservations`}
                            className="group inline-flex cursor-pointer items-center gap-2 rounded-3xl border border-[#b87333] bg-gradient-to-r from-[#b87333] to-[#d48a47] px-8 py-3.5 text-sm font-semibold tracking-wider text-white shadow-[0_0_25px_rgba(184,115,51,0.3)] transition-all duration-300 hover:scale-105 hover:rounded-3xl hover:shadow-[0_0_40px_rgba(184,115,51,0.5)]"
                        >
                            <CalendarCheck size={16} />
                            {dict.homePreview.reserveCta}
                        </Link>
                        <Link
                            href={`/${locale}/menu`}
                            className="group inline-flex cursor-pointer items-center gap-2 rounded-3xl border border-[#b87333] bg-[#b87333]/15 px-8 py-3.5 text-sm font-medium text-[#fdfbf7] shadow-[0_0_15px_rgba(184,115,51,0.2)] transition-all duration-300 hover:scale-105 hover:bg-[#b87333]/30 hover:border-[#d48a47]"
                        >
                            {dict.menuPreview.cta}
                            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                        </Link>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-8 flex flex-col items-center gap-2"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <span className="text-[10px] tracking-[0.3em] text-[#555] uppercase">Scroll</span>
                    <div className="h-6 w-[1px] bg-gradient-to-b from-[#b87333] to-transparent" />
                </motion.div>
            </section>

            {/* === OUR STORY PREVIEW === */}
            <section className="relative z-10 border-t border-[#1a1a1a] bg-[#0f0f0f] py-24">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
                        {/* Left: Text */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.7 }}
                        >
                            <div className="mb-4 flex items-center gap-3">
                                <Building2 size={20} className="text-[#b87333]" />
                                <span className="text-xs tracking-[0.3em] text-[#b87333] uppercase">Since 1926</span>
                            </div>
                            <h2 className="mb-4 font-script text-3xl text-[#fdfbf7] md:text-4xl">
                                <TypewriterText text={dict.homePreview.storyHeading} />
                            </h2>
                            <p className="mb-6 leading-relaxed text-[#888]">
                                {dict.homePreview.storyText}
                            </p>
                            <Link
                                href={`/${locale}/story`}
                                className="group inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[#b87333]/30 px-6 py-3 text-sm font-medium text-[#d48a47] transition-all duration-300 hover:scale-105 hover:border-[#b87333] hover:bg-[#b87333]/5 hover:shadow-[0_0_20px_rgba(184,115,51,0.1)]"
                            >
                                {dict.homePreview.storyCta}
                                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                            </Link>
                        </motion.div>

                        {/* Right: Year cards */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="flex flex-col items-center justify-center pt-8 md:pt-0"
                        >
                            <div className="flex w-full items-center justify-between gap-4 max-w-sm">
                                <div className="flex-1 text-center">
                                    <p className="mb-2 font-script text-5xl text-[#b87333] drop-shadow-md">1926</p>
                                    <p className="text-[10px] md:text-xs tracking-[0.2em] text-[#888] uppercase whitespace-nowrap">{locale === 'en' ? 'Historic Building' : 'Историски објект'}</p>
                                </div>
                                <div className="h-16 w-px bg-gradient-to-b from-transparent via-[#b87333]/40 to-transparent"></div>
                                <div className="flex-1 text-center">
                                    <p className="mb-2 font-script text-5xl text-[#b87333] drop-shadow-md">2002</p>
                                    <p className="text-[10px] md:text-xs tracking-[0.2em] text-[#888] uppercase whitespace-nowrap">{locale === 'en' ? 'Est. Pizzeria' : 'Осн. Пицерија'}</p>
                                </div>
                            </div>
                            <div className="my-8 h-px w-full max-w-xs bg-gradient-to-r from-transparent via-[#b87333]/30 to-transparent"></div>
                            <div className="text-center">
                                <p className="text-sm tracking-[0.2em] text-[#aaaaaa] uppercase">{locale === 'en' ? 'Crn Drim River Quay, Struga' : 'Кеј на реката Црн Дрим, Струга'}</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* === MENU PREVIEW — 6 PRODUCTS WITH PHOTOS === */}
            <section className="relative z-10 bg-[#111111] py-24">
                <div className="mx-auto max-w-6xl px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.8 }}
                        className="mb-16 text-center"
                    >
                        <h2 className="mb-3 font-script text-4xl text-[#fdfbf7] md:text-5xl">
                            <TypewriterText text={dict.menuPreview.heading} className="justify-center" />
                        </h2>
                        <p className="text-lg text-[#888]">{dict.menuPreview.subheading}</p>
                        <div className="mx-auto mt-4 h-[2px] w-16 bg-gradient-to-r from-transparent via-[#b87333] to-transparent" />
                    </motion.div>

                    {/* 6 Product Text Items */}
                    <div className="mx-auto grid max-w-4xl grid-cols-1 gap-x-16 gap-y-10 sm:grid-cols-2">
                        {dict.menuPreview.items.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.08 }}
                                className="group relative"
                            >
                                <div className="mb-2 flex items-baseline justify-between">
                                    <h3 className="text-lg tracking-wide text-[#fdfbf7] transition-colors group-hover:text-[#d48a47]">
                                        {item.name}
                                    </h3>
                                    <div className="mx-4 relative top-[-6px] flex-grow border-b border-dashed border-[#333] transition-colors group-hover:border-[#b87333]/40"></div>
                                    <span className="text-lg font-medium text-[#d48a47]">{item.price}</span>
                                </div>
                                <p className="pr-12 text-sm leading-relaxed text-[#777]">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Full Menu CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mt-12 flex justify-center"
                    >
                        <Link
                            href={`/${locale}/menu`}
                            className="group inline-flex cursor-pointer items-center gap-3 rounded-full border border-[#b87333] bg-gradient-to-r from-[#b87333] to-[#d48a47] px-10 py-4 text-sm font-semibold tracking-wider text-white shadow-[0_0_25px_rgba(184,115,51,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(184,115,51,0.5)]"
                        >
                            {dict.menuPreview.cta}
                            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* === GALLERY PREVIEW === */}
            <section className="relative z-10 border-t border-[#1a1a1a] bg-[#0d0d0d] py-24">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
                        {/* Left: Overlapping Photo Collage */}
                        <div className="relative h-[450px] w-full lg:h-[600px]">
                            {/* Main large image */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: '-80px' }}
                                transition={{ duration: 0.9, ease: "easeOut" }}
                                className="absolute top-0 right-0 h-[80%] w-[75%] overflow-hidden rounded-2xl border border-[#222] shadow-2xl group cursor-pointer"
                            >
                                <img
                                    src="/images/restaurant.jpeg"
                                    alt="Ambiance"
                                    className="h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                                />
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5">
                                    <span className="text-xs font-medium tracking-[0.2em] text-[#fdfbf7] uppercase drop-shadow-md">Ambiance</span>
                                </div>
                            </motion.div>

                            {/* Secondary overlapping image (Bottom Left) */}
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-80px' }}
                                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                                className="absolute bottom-0 left-0 z-10 h-[50%] w-[55%] overflow-hidden rounded-2xl border-[6px] border-[#0d0d0d] shadow-2xl group cursor-pointer"
                            >
                                <img
                                    src="/images/exterior 1.jpeg"
                                    alt="Exterior"
                                    className="h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-105 filter group-hover:brightness-110"
                                />
                            </motion.div>

                            {/* Small decorative image (Top Left) */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: '-80px' }}
                                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                                className="absolute top-10 left-4 z-20 h-[35%] w-[40%] overflow-hidden rounded-2xl border border-[#333] shadow-xl group cursor-pointer"
                            >
                                <img
                                    src="/images/interior 2.jpeg"
                                    alt="Dining Area"
                                    className="h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                                />
                            </motion.div>
                        </div>

                        {/* Right: Text */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                        >
                            <div className="mb-4 flex items-center gap-3">
                                <Camera size={20} className="text-[#b87333]" />
                                <span className="text-xs tracking-[0.3em] text-[#b87333] uppercase">{locale === 'en' ? 'Gallery' : 'Галерија'}</span>
                            </div>
                            <h2 className="mb-4 font-script text-3xl text-[#fdfbf7] md:text-4xl">
                                <TypewriterText text={dict.homePreview.galleryHeading} />
                            </h2>
                            <p className="mb-6 leading-relaxed text-[#888]">
                                {dict.homePreview.galleryText}
                            </p>
                            <Link
                                href={`/${locale}/gallery`}
                                className="group inline-flex cursor-pointer items-center gap-2 rounded-3xl border border-[#b87333]/40 px-6 py-3 text-sm font-medium text-[#d48a47] transition-all duration-300 hover:scale-105 hover:rounded-3xl hover:border-[#b87333] hover:bg-[#b87333]/10 hover:shadow-[0_0_20px_rgba(184,115,51,0.15)]"
                            >
                                {dict.homePreview.galleryCta}
                                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* === FIND US SECTION === */}
            <section className="relative z-10 border-t border-[#1a1a1a] bg-[#0d0d0d] py-24">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                        {/* Left: Map */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.7 }}
                            className="relative aspect-square w-full overflow-hidden rounded-3xl border border-[#222] transition-all duration-300 hover:border-[#b87333]/40 hover:rounded-3xl"
                        >
                            <Link href="https://maps.app.goo.gl/yTXvnspipypszLPZ9" target="_blank" rel="noopener noreferrer">
                                <iframe
                                    src="https://maps.google.com/maps?q=Pizza%20Angela,%20Struga&t=&z=16&ie=UTF8&iwloc=&output=embed"
                                    className="absolute inset-0 h-full w-full border-0 filter grayscale invert-[0.9] contrast-[1.2] pointer-events-none"
                                    loading="lazy"
                                    title="Pizzeria Angela Location"
                                />
                                <div className="absolute inset-0 bg-transparent flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                    <div className="bg-[#b87333] text-white px-6 py-3 rounded-full text-sm font-semibold tracking-wider">
                                        View on Google Maps
                                    </div>
                                </div>
                            </Link>
                        </motion.div>

                        {/* Right: Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="flex flex-col justify-center"
                        >
                            <div className="mb-4 flex items-center gap-3">
                                <MapPin size={20} className="text-[#b87333]" />
                                <span className="text-xs tracking-[0.3em] text-[#b87333] uppercase">{dict.findUs.badge}</span>
                            </div>
                            <h2 className="mb-4 font-script text-3xl text-[#fdfbf7] md:text-4xl">
                                <TypewriterText text={dict.findUs.heading} />
                            </h2>
                            <p className="mb-6 text-lg leading-relaxed text-[#888]">
                                {dict.findUs.text}
                            </p>

                            {/* Google Reviews Badge */}
                            <a href="https://maps.app.goo.gl/yTXvnspipypszLPZ9" target="_blank" rel="noopener noreferrer" className="mb-10 inline-flex items-center gap-2 w-fit group">
                                <div className="flex gap-1 text-[#fbbc04]">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <svg key={star} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-sm font-medium text-[#ddd] group-hover:text-[#fff] transition-colors">4.8 on Google Maps</span>
                            </a>

                            <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2 mt-4">
                                {/* Address */}
                                <div className="group flex flex-col justify-start">
                                    <div className="mb-3 text-xs font-semibold tracking-widest text-[#b87333] uppercase">{dict.findUs.addressLabel}</div>
                                    <div className="text-sm leading-relaxed text-[#ddd]">{dict.findUs.addressValue}</div>
                                </div>

                                {/* Phone & Email */}
                                <div className="group flex flex-col justify-start">
                                    <div className="mb-3 text-xs font-semibold tracking-widest text-[#b87333] uppercase">{dict.findUs.phoneLabel}</div>
                                    <div className="text-sm text-[#ddd] mb-4">{dict.findUs.phoneValue}</div>

                                    <div className="text-sm text-[#ddd] mb-4">{dict.findUs.phoneValue}</div>
                                </div>

                                {/* Working Hours */}
                                <div className="col-span-1 sm:col-span-2 group flex flex-col justify-start pt-6 border-t border-[#333]/40">
                                    <div className="mb-4 flex items-center gap-2 text-xs font-semibold tracking-widest text-[#b87333] uppercase">
                                        <Clock size={16} />
                                        {dict.findUs.hoursLabel}
                                    </div>
                                    <div className="grid gap-6 sm:grid-cols-2 text-sm text-[#ddd]">
                                        <div>{dict.findUs.hoursValue1}</div>
                                        <div>{dict.findUs.hoursValue2}</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* === RESERVATION CTA === */}
            <section className="relative z-10 bg-[#111111] py-24">
                <div className="mx-auto max-w-3xl px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="mb-4 flex items-center justify-center gap-3">
                            <CalendarCheck size={20} className="text-[#b87333]" />
                            <span className="text-xs tracking-[0.3em] text-[#b87333] uppercase">{locale === 'en' ? 'Reservations' : 'Резервации'}</span>
                        </div>
                        <h2 className="mb-4 font-script text-3xl text-[#fdfbf7] md:text-5xl">
                            <TypewriterText text={dict.homePreview.reserveHeading} className="justify-center" />
                        </h2>
                        <p className="mb-8 text-lg leading-relaxed text-[#888]">
                            {dict.homePreview.reserveText}
                        </p>
                        <Link
                            href={`/${locale}/reservations`}
                            className="group inline-flex cursor-pointer items-center gap-3 rounded-full border border-[#b87333] bg-gradient-to-r from-[#b87333] to-[#d48a47] px-10 py-4 text-sm font-semibold tracking-wider text-white shadow-[0_0_25px_rgba(184,115,51,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(184,115,51,0.5)]"
                        >
                            <CalendarCheck size={16} />
                            {dict.homePreview.reserveCta}
                            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </main>
    )
}
