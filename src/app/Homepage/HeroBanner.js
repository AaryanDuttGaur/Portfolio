'use client'
import { Zen_Dots } from "next/font/google";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const zenDots = Zen_Dots({
  subsets: ["latin"],
  weight: "400",
});

export default function BannerPage() {
  const headingRef = useRef(null);
  const paraRef = useRef(null);
  const buttonsRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // Only animate if it hasn't been animated yet in this session
    if (hasAnimated.current) {
      // Show content immediately without animation
      gsap.set([headingRef.current.children, paraRef.current, buttonsRef.current], {
        opacity: 1,
        y: 0,
      });
      return;
    }

    // Mark as animated
    hasAnimated.current = true;

    // Set initial state immediately
    gsap.set([headingRef.current.children, paraRef.current, buttonsRef.current], {
      opacity: 0,
      y: 30,
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Heading animation - fade in from bottom with stagger on words
      tl.to(headingRef.current.children, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });

      // Paragraph animation - fade in from bottom
      tl.to(paraRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      }, "-=0.4");

      // Buttons animation - fade in from bottom
      tl.to(buttonsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.6");
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full h-screen bg-[#191a1b] flex items-center justify-center text-left px-[10%] max-sm:text-center max-sm:px-[5%] max-sm:py-10">
      <div className="max-w-[1000px] flex flex-col gap-6 max-sm:items-center max-sm:text-center">
        <h2 
          ref={headingRef}
          className={`text-5xl leading-[1.2] text-white font-light max-sm:text-2xl ${zenDots.className}`}
        >
          <span className="inline-block">
            <span className="text-[#df1316]">Transforming</span> Ideas Into
          </span>{" "}
          <br />
          <span className="inline-block">
            Stunning <span className="text-[#df1316]">Designs & Reality</span>
          </span>
        </h2>
        
        <p 
          ref={paraRef}
          className="text-base text-[#ccc] font-['Montserrat'] leading-[1.6] max-sm:text-[0.95rem]"
        >
          Welcome to my creative space where innovation meets design. Let's collaborate to bring your vision to life!
        </p>
        
        <div 
          ref={buttonsRef}
          className="flex gap-4 flex-wrap max-sm:flex-col max-sm:items-center max-sm:w-full"
        >
          <a 
            href="/portfolio" 
            className="bg-[#df1316] text-white py-3 px-6 rounded-[25px] text-decoration-none font-['Montserrat'] transition-all duration-300 hover:bg-white hover:text-[#df1316] max-sm:w-[90%] max-sm:text-center"
          >
            See Portfolio
          </a>
          <a 
            href="/about" 
            className="border border-white text-white py-3 px-6 rounded-[25px] text-decoration-none font-['Montserrat'] transition-all duration-300 hover:bg-[#df1316] hover:text-white max-sm:w-[90%] max-sm:text-center"
          >
            Know More
          </a>
        </div>
      </div>
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
        
        body {
          font-family: 'Montserrat', sans-serif;
        }
        
        @media (max-width: 600px) {
          .banner-section {
            padding: 40px 5% !important;
            text-align: center !important;
          }
          
          .banner-content {
            align-items: center !important;
            text-align: center !important;
          }
          
          .banner-heading {
            font-size: 2rem !important;
          }
          
          .banner-para {
            font-size: 0.95rem !important;
          }
          
          .button-container {
            flex-direction: column !important;
            align-items: center !important;
            width: 100% !important;
          }
          
          .banner-btn {
            width: 90% !important;
            text-align: center !important;
          }
        }
      `}</style>
    </section>
  );
}