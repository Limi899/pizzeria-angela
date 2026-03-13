import { getDictionary } from '@/dictionaries/dictionaries'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { StoryClient } from './StoryClient'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const locale = ((await params).locale === 'mk' ? 'mk' : 'en') as 'en' | 'mk'
    const dict = await getDictionary(locale)
    return {
        title: `${dict.story.pageTitle} | Pizzeria Angela`,
        description: dict.story.p1,
    }
}

export default async function StoryPage({ params }: { params: Promise<{ locale: string }> }) {
    const locale = ((await params).locale === 'mk' ? 'mk' : 'en') as 'en' | 'mk'
    const dict = await getDictionary(locale)

    return (
        <>
            <Navbar locale={locale} dict={dict} />
            <StoryClient dict={dict} />
            <Footer locale={locale} dict={dict} />
        </>
    )
}
