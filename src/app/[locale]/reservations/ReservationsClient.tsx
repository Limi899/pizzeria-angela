'use client'

import { motion } from 'framer-motion'
import { useState, useMemo } from 'react'
import { CheckCircle, AlertCircle, Send, Mail } from 'lucide-react'

interface ReservationsClientProps {
    dict: {
        reservations: {
            pageTitle: string
            heading: string
            subheading: string
            form: {
                name: string
                email: string
                phone: string
                date: string
                time: string
                guests: string
                requests: string
                submit: string
                sending: string
                success: string
                error: string
            }
        }
    }
}

function generateTimeSlots(startHour: number, endHour: number): string[] {
    const slots: string[] = []
    if (endHour <= startHour) {
        // Wraps past midnight (e.g. 10:00 - 01:00)
        for (let h = startHour; h < 24; h++) {
            slots.push(`${String(h).padStart(2, '0')}:00`)
            slots.push(`${String(h).padStart(2, '0')}:30`)
        }
        for (let h = 0; h < endHour; h++) {
            slots.push(`${String(h).padStart(2, '0')}:00`)
            slots.push(`${String(h).padStart(2, '0')}:30`)
        }
    } else {
        for (let h = startHour; h < endHour; h++) {
            slots.push(`${String(h).padStart(2, '0')}:00`)
            slots.push(`${String(h).padStart(2, '0')}:30`)
        }
    }
    return slots
}

export function ReservationsClient({ dict }: ReservationsClientProps) {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [selectedDate, setSelectedDate] = useState('')

    const timeSlots = useMemo(() => {
        if (!selectedDate) {
            // Default: Sun-Thu hours (10:00 – 00:00)
            return generateTimeSlots(10, 0)
        }
        const date = new Date(selectedDate + 'T12:00:00')
        const day = date.getDay() // 0=Sun, 5=Fri, 6=Sat
        if (day === 5 || day === 6) {
            // Fri-Sat: 10:00 – 01:00
            return generateTimeSlots(10, 1)
        }
        // Sun-Thu: 10:00 – 00:00
        return generateTimeSlots(10, 0)
    }, [selectedDate])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setStatus('loading')
        const form = e.currentTarget
        const formData = new FormData(form)

        try {
            const res = await fetch('/api/reservation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.get('name'),
                    email: formData.get('email'),
                    phone: formData.get('phone'),
                    date: formData.get('date'),
                    time: formData.get('time'),
                    guests: formData.get('guests'),
                    requests: formData.get('requests') || 'None',
                }),
            })

            if (!res.ok) throw new Error('Failed')

            setStatus('success')
            form.reset()
            setSelectedDate('')
        } catch {
            setStatus('error')
        }
    }

    const { form: f } = dict.reservations

    const inputClass =
        'w-full rounded-xl border border-[#333] bg-[#1a1a1a] px-4 py-3 text-sm text-[#fdfbf7] placeholder-[#555] outline-none transition-all focus:border-[#b87333] focus:shadow-[0_0_15px_rgba(184,115,51,0.15)]'

    // Get today's date in YYYY-MM-DD format for min attribute
    const today = new Date().toISOString().split('T')[0]

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
                        {dict.reservations.pageTitle}
                    </span>
                    <h1 className="mb-4 text-5xl font-bold tracking-tight text-[#fdfbf7] md:text-7xl">
                        {dict.reservations.heading}
                    </h1>
                    <p className="text-lg text-[#888]">{dict.reservations.subheading}</p>
                    <div className="mx-auto mt-4 h-[2px] w-24 bg-gradient-to-r from-transparent via-[#b87333] to-transparent" />
                </motion.div>
            </section>

            <section className="mx-auto max-w-3xl px-6 pb-24">
                {/* Form */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <input name="name" required placeholder={f.name} className={inputClass} />
                            <div className="relative">
                                <Mail size={16} className="absolute top-1/2 left-4 -translate-y-1/2 text-[#fdfbf7] pointer-events-none" />
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    placeholder={f.email}
                                    className={`${inputClass} pl-10`}
                                />
                            </div>
                            <input name="phone" type="tel" required placeholder={f.phone} className={inputClass} />
                            <input
                                name="date"
                                type="date"
                                required
                                min={today}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className={`${inputClass} cursor-pointer`}
                                style={{ colorScheme: 'dark' }}
                            />
                            <select
                                name="time"
                                required
                                className={`${inputClass} cursor-pointer appearance-none`}
                                style={{ colorScheme: 'dark' }}
                            >
                                <option value="" disabled selected>{f.time}</option>
                                {timeSlots.map((slot) => (
                                    <option key={slot} value={slot}>{slot}</option>
                                ))}
                            </select>
                            <input
                                name="guests"
                                type="number"
                                min="1"
                                max="20"
                                required
                                placeholder={f.guests}
                                className={inputClass}
                            />
                        </div>

                        <textarea
                            name="requests"
                            rows={4}
                            placeholder={f.requests}
                            className={`${inputClass} resize-none`}
                        />

                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="group flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-[#b87333] bg-gradient-to-r from-[#b87333] to-[#d48a47] px-8 py-4 text-sm font-semibold tracking-wider text-white shadow-[0_0_20px_rgba(184,115,51,0.3)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(184,115,51,0.5)] disabled:opacity-50"
                        >
                            <Send size={16} className="transition-transform group-hover:translate-x-1" />
                            {status === 'loading' ? f.sending : f.submit}
                        </button>

                        {/* Status Messages */}
                        {status === 'success' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-2 rounded-xl border border-green-800/30 bg-green-900/20 px-4 py-3 text-sm text-green-400"
                            >
                                <CheckCircle size={16} />
                                {f.success}
                            </motion.div>
                        )}
                        {status === 'error' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-2 rounded-xl border border-red-800/30 bg-red-900/20 px-4 py-3 text-sm text-red-400"
                            >
                                <AlertCircle size={16} />
                                {f.error}
                            </motion.div>
                        )}
                    </form>
                </motion.div>
            </section>
        </main>
    )
}
