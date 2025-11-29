import { Navigation } from '@/components/Navigation'
import { Hero } from '@/components/Hero'
import { HowItWorks } from '@/components/HowItWorks'
import { Features } from '@/components/Features'
import { ForVendors } from '@/components/ForVendors'
import { ForOrganizers } from '@/components/ForOrganizers'
import { CTA } from '@/components/CTA'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <HowItWorks />
      <Features />
      <ForOrganizers />
      <ForVendors />
      <CTA />
      <Footer />
    </main>
  )
}

