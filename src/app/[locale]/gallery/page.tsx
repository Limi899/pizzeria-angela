import { getDictionary } from '@/dictionaries/dictionaries'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { GalleryClient } from './GalleryClient'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const locale = ((await params).locale === 'mk' ? 'mk' : 'en') as 'en' | 'mk'
    const dict = await getDictionary(locale)
    return {
        title: `${dict.gallery.pageTitle} | Pizzeria Angela`,
        description: dict.gallery.subheading,
    }
}

export default async function GalleryPage({ params }: { params: Promise<{ locale: string }> }) {
    const locale = ((await params).locale === 'mk' ? 'mk' : 'en') as 'en' | 'mk'
    const dict = await getDictionary(locale)

    return (
        <>
            <Navbar locale={locale} dict={dict} />
            <GalleryClient dict={dict} />
            <Footer locale={locale} dict={dict} />
        </>
    )
}
