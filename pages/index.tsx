import Head from 'next/head'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Categories } from '@/components/Categories'
import { FeaturedProducts } from '@/components/FeaturedProducts'
import { Newsletter } from '@/components/Newsletter'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>SmartTech - Modern Electronics Store</title>
        <meta name="description" content="Discover the latest in electronics and technology at SmartTech" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Newsletter />
      <Footer />
    </>
  )
}
