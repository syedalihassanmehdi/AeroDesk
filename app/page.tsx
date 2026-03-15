import { getSiteConfig } from '@/lib/site-config'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ToursSection from './components/ToursSection'
import WhyUs from './components/WhyUs'
import TravelMoments from './components/TravelMoments'
import Testimonials from './components/Testimonials'
import CTABanner from './components/CTABanner'
import Journal from './components/Journal'
import Footer from './components/Footer'

export const revalidate = 0

export default async function HomePage() {
  const config = await getSiteConfig()

  return (
    <main style={{ background: config.tours_bg, minHeight: '100vh' }}>
      <Navbar config={config} />
      <Hero config={config} />
      <ToursSection config={config} />
      <WhyUs config={config} />
      <TravelMoments config={config} />
      <Testimonials config={config} />
      <CTABanner config={config} />
      <Journal config={config} />
      <Footer config={config} />
    </main>
  )
}

