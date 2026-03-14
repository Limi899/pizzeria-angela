'use client'

import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

const localeOptions = [
    { code: 'en', label: 'EN' },
    { code: 'mk', label: 'МК' },
    { code: 'sq', label: 'SQ' },
]

export function LanguageToggle({ locale }: { locale: string }) {
    const pathname = usePathname()
    const router = useRouter()

    const switchLocale = (newLocale: string) => {
        const segments = pathname.split('/')
        segments[1] = newLocale
        router.push(segments.join('/'))
        if (typeof window !== 'undefined') {
            localStorage.setItem('preferred-locale', newLocale)
        }
    }

    const activeIndex = localeOptions.findIndex((l) => l.code === locale)
    const pillWidth = 38
    const gap = 2

    return (
        <div className="relative flex items-center gap-0.5 rounded-full border border-[#333] bg-[#1a1a1a] p-1">
            <motion.div
                className="absolute top-1 bottom-1 rounded-full bg-[#b87333]"
                style={{ width: pillWidth }}
                animate={{ x: gap + activeIndex * (pillWidth + gap) }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            />
            {localeOptions.map((opt) => (
                <button
                    key={opt.code}
                    onClick={() => switchLocale(opt.code)}
                    className={`relative z-10 cursor-pointer rounded-full px-2.5 py-1 text-xs font-semibold tracking-wider transition-colors ${locale === opt.code ? 'text-white' : 'text-[#888]'
                        }`}
                >
                    {opt.label}
                </button>
            ))}
        </div>
    )
}
