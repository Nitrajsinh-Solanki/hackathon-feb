// hackathon-feb\src\app\page.tsx

import Navbar from '@/components/common/Navbar'
import HeroSection from '@/components/home/HeroSection'
import FeatureSection from '@/components/home/FeatureSection'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <HeroSection />
      <FeatureSection />
    </main>
  )
}
