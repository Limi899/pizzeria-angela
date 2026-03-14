import { getDictionary } from '@/dictionaries/dictionaries'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { StoryClient } from './StoryClient'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const rawLocale = (await params).locale
    const locale = (['en', 'mk', 'sq'].includes(rawLocale) ? rawLocale : 'en') as 'en' | 'mk' | 'sq'
    const dict = await getDictionary(locale)
    return {
        title: `${dict.story.pageTitle} | Pizzeria Angela`,
        description: dict.story.p1,
    }
}

export default async function StoryPage({ params }: { params: Promise<{ locale: string }> }) {
    const rawLocale = (await params).locale
    const locale = (['en', 'mk', 'sq'].includes(rawLocale) ? rawLocale : 'en') as 'en' | 'mk' | 'sq'
    const dict = await getDictionary(locale)

    return (
        <>
            <Navbar locale={locale} dict={dict} />
            <StoryClient dict={dict} />
            <Footer locale={locale} dict={dict} />
        </>
    )
}
