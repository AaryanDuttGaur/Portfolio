import Image from "next/image";
import BannerPage from "./Homepage/HeroBanner";
import AboutPage from "./Homepage/AboutPage";
import ServicesPage from "./Homepage/Service";
import PortfolioPage from "./Homepage/Portfolio";
import CTASection from "./Homepage/Cta";
export default function Home() {
  return (
    <>
      {/* Banner Section */}
    <BannerPage/>
    <AboutPage/>
    <ServicesPage/>
    <PortfolioPage/>
    <CTASection/>
    </>
  );
}