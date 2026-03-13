import { getDictionary } from '@/dictionaries/dictionaries'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { HomeClient } from './HomeClient'

export default async function HomePage({
    params,
}: {
    params: Promise<{ locale: string }>
}) {
    const locale = ((await params).locale === 'mk' ? 'mk' : 'en') as 'en' | 'mk'
    const dict = await getDictionary(locale)

    return (
        <>
            <Navbar locale={locale} dict={dict} />
            <HomeClient locale={locale} dict={dict} />
            <Footer locale={locale} dict={dict} />
        </>
    )
}
