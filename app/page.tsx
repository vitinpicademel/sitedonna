import Header from "@alipes/components/header"
import Hero from "@alipes/components/hero"
import PremiumQuality from "@alipes/components/premium-quality"
import VideoSection from "@alipes/components/video-section"
import BuildingIcons from "@alipes/components/building-icons"
import ApartmentsGallery from "@alipes/components/apartments-gallery"
import ApartmentsPlans from "@alipes/components/apartments-plans"
import ImageGallery from "@alipes/components/image-gallery"
import Testimonials from "@alipes/components/testimonials"
// import LatestNews from "@alipes/components/latest-news"
import ContactSection from "@alipes/components/contact-section"
import Footer from "@alipes/components/footer"
import { WhatsAppButton } from "@/components/layout/whatsapp-button"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1a1410]">
      <Header />
      <Hero />
      <PremiumQuality />
      <VideoSection />
      <BuildingIcons />
      <ApartmentsGallery />
      <ApartmentsPlans />
      <ImageGallery />
      <Testimonials />
      {/* <LatestNews /> */}
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
