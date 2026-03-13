import type { Metadata } from 'next'
import { Montserrat, Geist, Geist_Mono } from 'next/font/google'
import '@/app/globals.css'
import { getDictionary } from '@/dictionaries/dictionaries'
import { IntroScreen } from '@/components/animations/IntroScreen'

const montserrat = Montserrat({
    variable: '--font-montserrat',
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
})



const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale } = await params
    const dict = await getDictionary(locale as 'en' | 'mk')
    return {
        title: `Pizzeria Angela | ${dict.hero.title}`,
        description: dict.hero.subtitle,
    }
}

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode
    params: Promise<{ locale: string }>
}>) {
    const { locale } = await params
    const safeLocale = (locale === 'mk' ? 'mk' : 'en') as 'en' | 'mk'

    return (
        <html lang={safeLocale}>
            <body
                className={`${montserrat.variable} ${geistSans.variable} ${geistMono.variable} antialiased selection:bg-copper selection:text-white`}
            >
                <IntroScreen />
                {children}
            </body>
        </html>
    )
}
