'use client'

import Link from 'next/link'
import { MapPin, Clock, Phone } from 'lucide-react'

interface FooterProps {
    locale: string
    dict: {
        footer: {
            established: string
            building: string
            address: string
            rights: string
            tagline: string
        }
        navigation: {
            home: string
            story: string
            gallery: string
            reservations: string
        }
    }
}

export function Footer({ locale, dict }: FooterProps) {
    return (
        <footer className="relative border-t border-[#222] bg-[#0d0d0d]">
            {/* SVG Distortion Filter */}
            <svg className="absolute h-0 w-0">
                <defs>
                    <filter id="displacementFilter">
                        <feTurbulence
                            type="turbulence"
                            baseFrequency="0.015"
                            numOctaves="3"
                            result="turbulence"
                            seed="2"
                        >
                            <animate
                                attributeName="baseFrequency"
                                values="0.015;0.025;0.015"
                                dur="8s"
                                repeatCount="indefinite"
                            />
                        </feTurbulence>
                        <feDisplacementMap
                            in2="turbulence"
                            in="SourceGraphic"
                            scale="6"
                            xChannelSelector="R"
                            yChannelSelector="G"
                        />
                    </filter>
                </defs>
            </svg>

            <div className="mx-auto max-w-7xl px-6 py-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {/* Branding */}
                    <div className="space-y-2">
                        <Link href={`/${locale}`}>
                            <img
                                src="/images/logo.png"
                                alt="Angela Pizza Restaurant"
                                className="h-16 w-auto object-contain opacity-90 transition-opacity hover:opacity-100"
                            />
                        </Link>
                        <p className="river-distortion text-sm leading-relaxed text-[#666]">
                            {dict.footer.tagline}
                        </p>
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-4 text-xs font-semibold tracking-wider text-[#b87333]">
                                <span>{dict.footer.established}</span>
                                <span>•</span>
                                <span>{dict.footer.building}</span>
                            </div>
                            <div className="text-xs text-[#555]">
                                © {new Date().getFullYear()} Pizzeria Angela. {dict.footer.rights}
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-2">
                        <h4 className="text-sm font-semibold tracking-widest text-[#b87333] uppercase">
                            {locale === 'en' ? 'Quick Links' : locale === 'mk' ? 'Брзи Линкови' : 'Lidhje të Shpejta'}
                        </h4>
                        <nav className="flex flex-col gap-2">
                            {[
                                { key: 'home', href: `/${locale}` },
                                { key: 'story', href: `/${locale}/story` },
                                { key: 'gallery', href: `/${locale}/gallery` },
                                { key: 'reservations', href: `/${locale}/reservations` },
                            ].map((link) => (
                                <Link
                                    key={link.key}
                                    href={link.href}
                                    className="cursor-pointer text-sm text-[#888] transition-colors hover:text-[#d48a47]"
                                >
                                    {dict.navigation[link.key as keyof typeof dict.navigation]}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-2">
                        <h4 className="text-sm font-semibold tracking-widest text-[#b87333] uppercase">
                            {locale === 'en' ? 'Contact' : locale === 'mk' ? 'Контакт' : 'Kontakt'}
                        </h4>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-sm text-[#888]">
                                <MapPin size={14} className="text-[#b87333]" />
                                <span>{dict.footer.address}</span>
                            </div>
                             <div className="flex items-center gap-3 text-sm text-[#888]">
                                <Phone size={14} className="text-[#b87333]" />
                                <div className="flex flex-col">
                                    <span>+389 70 603 705</span>
                                    <span>+389 77 877 712</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-[#888]">
                                <Clock size={14} className="text-[#b87333]" />
                                <span>10:00 – 23:00</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar: Powered By */}
                <div className="mt-6 flex items-center justify-center border-t border-[#1a1a1a] pt-4">
                    <div className="flex items-center gap-3 text-sm tracking-widest text-[#555] opacity-80 transition-opacity duration-300 hover:opacity-100">
                        <span>Powered by</span>
                        <img
                            src="/images/doXweb-logo.png"
                            alt="doXweb logo"
                            className="h-10 w-auto object-contain filter brightness-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]"
                        />
                    </div>
                </div>
            </div>
        </footer>
    )
}
