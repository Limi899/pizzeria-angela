'use client'

import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

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

    return (
        <div className="relative flex items-center gap-1 rounded-full border border-[#333] bg-[#1a1a1a] p-1">
            <motion.div
                className="absolute top-1 bottom-1 w-[42px] rounded-full bg-[#b87333]"
                animate={{ x: locale === 'en' ? 2 : 46 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            />
            <button
                onClick={() => switchLocale('en')}
                className={`relative z-10 cursor-pointer rounded-full px-3 py-1 text-xs font-semibold tracking-wider transition-colors ${locale === 'en' ? 'text-white' : 'text-[#888]'
                    }`}
            >
                EN
            </button>
            <button
                onClick={() => switchLocale('mk')}
                className={`relative z-10 cursor-pointer rounded-full px-3 py-1 text-xs font-semibold tracking-wider transition-colors ${locale === 'mk' ? 'text-white' : 'text-[#888]'
                    }`}
            >
                МК
            </button>
        </div>
    )
}
