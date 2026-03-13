'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { LanguageToggle } from './LanguageToggle'

interface NavbarProps {
    locale: string
    dict: {
        navigation: {
            home: string
            story: string
            gallery: string
            reservations: string
        }
    }
}

const navLinks = [
    { key: 'home', href: '' },
    { key: 'menu', href: '/menu' },
    { key: 'story', href: '/story' },
    { key: 'gallery', href: '/gallery' },
    { key: 'reservations', href: '/reservations' },
]

export function Navbar({ locale, dict }: NavbarProps) {
    const [mobileOpen, setMobileOpen] = useState(false)
    const pathname = usePathname()

    return (
        <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="fixed top-0 right-0 left-0 z-50 border-b border-[#222] bg-[#111111]/80 backdrop-blur-xl"
        >
            <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 py-4">
                {/* Desktop Left: Logo */}
                <div className="hidden md:flex flex-1 items-center justify-start">
                    <Link href={`/${locale}`}>
                        <img
                            src="/images/logo.png"
                            alt="Angela Pizza Restaurant"
                            className="h-14 lg:h-16 w-auto object-contain drop-shadow-[0_2px_15px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-105"
                        />
                    </Link>
                </div>

                {/* Desktop Center: Navigation */}
                <div className="hidden md:flex flex-[2] items-center justify-center xl:gap-8 lg:gap-6 gap-4">
                    {navLinks.map((link) => {
                        const href = `/${locale}${link.href}`
                        const isActive = pathname === href || (link.href === '' && pathname === `/${locale}`)
                        return (
                            <Link
                                key={link.key}
                                href={href}
                                className={`relative cursor-pointer text-xs lg:text-sm font-medium tracking-wider uppercase transition-colors hover:text-[#d48a47] whitespace-nowrap ${isActive ? 'text-[#d48a47]' : 'text-[#aaa]'
                                    }`}
                            >
                                {link.key === 'menu' ? (locale === 'en' ? 'Menu' : 'Мени') : dict.navigation[link.key as keyof typeof dict.navigation]}
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-underline"
                                        className="absolute -bottom-2 left-0 h-[2px] w-full bg-[#b87333]"
                                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                                    />
                                )}
                            </Link>
                        )
                    })}
                </div>

                {/* Desktop Right: Language */}
                <div className="hidden flex-1 items-center justify-end md:flex">
                    <LanguageToggle locale={locale} />
                </div>

                {/* Mobile: Logo Left, Hamburger Right */}
                <div className="flex flex-1 items-center justify-start md:hidden">
                    <Link href={`/${locale}`}>
                        <img
                            src="/images/logo.png"
                            alt="Angela Pizza Restaurant"
                            className="h-12 w-auto object-contain drop-shadow-[0_2px_15px_rgba(0,0,0,0.5)]"
                        />
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-end gap-4 md:hidden">
                    <LanguageToggle locale={locale} />
                    <button onClick={() => setMobileOpen(!mobileOpen)} className="cursor-pointer text-[#aaa]">
                        {mobileOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden border-t border-[#222] bg-[#111111]/95 backdrop-blur-xl md:hidden"
                    >
                        <div className="flex flex-col gap-4 px-6 py-6">
                            {navLinks.map((link) => {
                                const href = `/${locale}${link.href}`
                                const isActive = pathname === href
                                return (
                                    <Link
                                        key={link.key}
                                        href={href}
                                        onClick={() => setMobileOpen(false)}
                                        className={`text-lg tracking-wide transition-colors ${isActive ? 'text-[#d48a47]' : 'text-[#aaa]'
                                            }`}
                                    >
                                        {link.key === 'menu' ? (locale === 'en' ? 'Menu' : 'Мени') : dict.navigation[link.key as keyof typeof dict.navigation]}
                                    </Link>
                                )
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}
