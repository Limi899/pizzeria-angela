import { getDictionary } from '@/dictionaries/dictionaries'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ReservationsClient } from './ReservationsClient'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const locale = ((await params).locale === 'mk' ? 'mk' : 'en') as 'en' | 'mk'
    const dict = await getDictionary(locale)
    return {
        title: `${dict.reservations.pageTitle} | Pizzeria Angela`,
        description: dict.reservations.subheading,
    }
}

export default async function ReservationsPage({ params }: { params: Promise<{ locale: string }> }) {
    const locale = ((await params).locale === 'mk' ? 'mk' : 'en') as 'en' | 'mk'
    const dict = await getDictionary(locale)

    return (
        <>
            <Navbar locale={locale} dict={dict} />
            <ReservationsClient dict={dict} />
            <Footer locale={locale} dict={dict} />
        </>
    )
}
