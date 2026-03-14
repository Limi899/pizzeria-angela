import { getDictionary } from '@/dictionaries/dictionaries'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ReservationsClient } from './ReservationsClient'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const rawLocale = (await params).locale
    const locale = (['en', 'mk', 'sq'].includes(rawLocale) ? rawLocale : 'en') as 'en' | 'mk' | 'sq'
    const dict = await getDictionary(locale)
    return {
        title: `${dict.reservations.pageTitle} | Pizzeria Angela`,
        description: dict.reservations.subheading,
    }
}

export default async function ReservationsPage({ params }: { params: Promise<{ locale: string }> }) {
    const rawLocale = (await params).locale
    const locale = (['en', 'mk', 'sq'].includes(rawLocale) ? rawLocale : 'en') as 'en' | 'mk' | 'sq'
    const dict = await getDictionary(locale)

    return (
        <>
            <Navbar locale={locale} dict={dict} />
            <ReservationsClient dict={dict} />
            <Footer locale={locale} dict={dict} />
        </>
    )
}
