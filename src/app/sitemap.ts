import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://pizzaangela.mk'
    const locales = ['en', 'mk']
    const pages = ['', '/story', '/gallery', '/reservations', '/menu']
    const lastModified = new Date()

    const entries: MetadataRoute.Sitemap = []

    for (const locale of locales) {
        for (const page of pages) {
            entries.push({
                url: `${baseUrl}/${locale}${page}`,
                lastModified,
                changeFrequency: page === '' ? 'weekly' : 'monthly',
                priority: page === '' ? 1.0 : 0.8,
            })
        }
    }

    return entries
}
