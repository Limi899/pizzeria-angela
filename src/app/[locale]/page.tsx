import { getDictionary } from '@/dictionaries/dictionaries'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { HomeClient } from './HomeClient'

export default async function HomePage({
    params,
}: {
    params: Promise<{ locale: string }>
}) {
    const rawLocale = (await params).locale
    const locale = (['en', 'mk', 'sq'].includes(rawLocale) ? rawLocale : 'en') as 'en' | 'mk' | 'sq'
    const dict = await getDictionary(locale)

    return (
        <>
            <Navbar locale={locale} dict={dict} />
            <HomeClient locale={locale} dict={dict} />
            <Footer locale={locale} dict={dict} />
        </>
    )
}
