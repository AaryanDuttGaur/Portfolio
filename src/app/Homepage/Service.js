'use client'
import { Zen_Dots } from "next/font/google";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const zenDots = Zen_Dots({
  subsets: ["latin"],
  weight: "400",
});

export default function ServicesPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const sliderRef = useRef(null);
  const isAnimating = useRef(false);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const sliderContainerRef = useRef(null);
  const dotsRef = useRef(null);
  const leftArrowRef = useRef(null);
  const rightArrowRef = useRef(null);

  const services = [
    {
      image: "/Image/Leonardo_Phoenix_10_A_sleek_modern_and_minimalist_photography_2.jpg",
      title: "UI/UX DESIGN",
      description: "I design intuitive, user-friendly interfaces for websites, mobile apps, and SaaS platforms with a modern, usable approach."
    },
    {
      image: "/Image/Leonardo_Phoenix_09_A_stylized_illustration_of_a_web_developme_1.jpg",
      title: "Web Dev.",
      description: "I build fast, modern, and responsive websites using cutting-edge technologies. From landing pages to full-stack platforms – I bring ideas to life on the web."
    },
    {
      image: "/Image/AlbedoBase_XL_Generate_an_image_for_Data_Analutics_which_i_cou_1.jpg",
      title: "Data Analytics",
      description: "I turn raw data into actionable insights through dashboards, reports, and analytics systems. Make smarter decisions backed by real-time data."
    },
  ];

  // Update cards per view based on window size
  const updateCardsPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) {
        setCardsPerView(3); // Desktop
      } else if (window.innerWidth >= 768) {
        setCardsPerView(2); // Tablet
      } else {
        setCardsPerView(1); // Mobile
      }
    }
  };

  // Create extended services array for infinite scroll
  const extendedServices = [
    ...services.slice(-cardsPerView), // Clone last few cards at beginning
    ...services,
    ...services.slice(0, cardsPerView) // Clone first few cards at end
  ];

  // GSAP animation function for slider
  const animateSlide = (targetIndex, immediate = false) => {
    if (sliderRef.current) {
      const translateX = -(targetIndex * (100 / cardsPerView));
      
      if (immediate) {
        gsap.set(sliderRef.current, { x: `${translateX}%` });
      } else {
        gsap.to(sliderRef.current, {
          x: `${translateX}%`,
          duration: 0.8,
          ease: "power3.out",
          onComplete: () => {
            isAnimating.current = false;
          }
        });
      }
    }
  };

  // Handle infinite scroll reset
  const handleInfiniteScroll = (newIndex) => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const actualIndex = newIndex + cardsPerView; // Offset for cloned cards at beginning
    animateSlide(actualIndex);

    // Reset position if at boundaries
    setTimeout(() => {
      if (newIndex >= services.length) {
        // Reset to beginning
        setCurrentIndex(newIndex - services.length);
        animateSlide(cardsPerView, true); // Jump to real beginning immediately
      } else if (newIndex < 0) {
        // Reset to end
        setCurrentIndex(services.length + newIndex);
        animateSlide(services.length + cardsPerView - 1, true); // Jump to real end immediately
      }
    }, 800); // Wait for animation to complete
  };

  // ScrollTrigger animation on page load
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(headingRef.current, { opacity: 0, y: -50 });
      gsap.set(sliderContainerRef.current, { opacity: 0, scale: 0.9 });
      gsap.set(dotsRef.current, { opacity: 0, y: 30 });
      gsap.set([leftArrowRef.current, rightArrowRef.current], { opacity: 0, scale: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 30%",
          toggleActions: "play none none none",
        }
      });

      // Heading drops down
      tl.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Slider container scales up
      tl.to(sliderContainerRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "back.out(1.2)",
      }, "-=0.5");

      // Arrows pop in
      tl.to([leftArrowRef.current, rightArrowRef.current], {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(2)",
      }, "-=0.7");

      // Dots fade up
      tl.to(dotsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.5");
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Start at the real first slide (offset by cloned cards)
    animateSlide(currentIndex + cardsPerView, true);

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    
    return () => {
      window.removeEventListener('resize', updateCardsPerView);
    };
  }, []);

  useEffect(() => {
    if (!isAnimating.current) {
      animateSlide(currentIndex + cardsPerView);
    }
  }, [cardsPerView]);

  const nextSlide = () => {
    if (isAnimating.current) return;
    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);
    handleInfiniteScroll(newIndex);
  };

  const prevSlide = () => {
    if (isAnimating.current) return;
    const newIndex = currentIndex - 1;
    setCurrentIndex(newIndex);
    handleInfiniteScroll(newIndex);
  };

  const goToSlide = (index) => {
    if (isAnimating.current) return;
    setCurrentIndex(index);
    handleInfiniteScroll(index);
  };

  // Calculate dots based on original services length
  const totalDots = Math.ceil(services.length / cardsPerView);
  const currentDot = Math.floor((currentIndex % services.length) / cardsPerView);

  return (
    <section ref={sectionRef} className="bg-[#191a1b] text-white py-[15%] px-[10%]">
      {/* Section Heading */}
      <h2 ref={headingRef} className={`text-center text-4xl lg:text-5xl mb-12 text-white ${zenDots.className}`}>
        My Services
      </h2>

      {/* Slider Container */}
      <div ref={sliderContainerRef} className="relative max-w-5xl mx-auto">
        {/* Left Arrow */}
        <button
          ref={leftArrowRef}
          onClick={prevSlide}
          className="absolute -left-12 md:-left-16 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-[#df1316] text-white rounded-full flex items-center justify-center hover:bg-[#b71c1c] transition-all duration-300 hover:scale-110 shadow-lg"
          aria-label="Previous slide"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>

        {/* Right Arrow */}
        <button
          ref={rightArrowRef}
          onClick={nextSlide}
          className="absolute -right-12 md:-right-16 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-[#df1316] text-white rounded-full flex items-center justify-center hover:bg-[#b71c1c] transition-all duration-300 hover:scale-110 shadow-lg"
          aria-label="Next slide"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
          </svg>
        </button>

        {/* Slider Track */}
        <div className="overflow-hidden">
          <div 
            ref={sliderRef}
            className="flex will-change-transform"
          >
            {extendedServices.map((service, index) => (
              <div
                key={index}
                className={`flex-shrink-0 px-2 ${
                  cardsPerView === 1 ? 'w-full' :
                  cardsPerView === 2 ? 'w-1/2' : 'w-1/3'
                }`}
              >
                <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-500 shadow-xl hover:shadow-2xl w-full max-w-[260px] mx-auto flex flex-col h-96 group">
                  {/* Service Image */}
                  <div className="w-full h-40 border-b border-[#333] overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={260}
                      height={160}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      priority={index < 4}
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className={`text-center text-lg mb-2 text-white font-normal ${zenDots.className}`}>
                        {service.title}
                      </h3>
                      <p className="text-sm text-[#ccc] leading-[1.4] text-center">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div ref={dotsRef} className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalDots }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index * cardsPerView)}
              className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                index === currentDot 
                  ? 'bg-[#df1316] shadow-lg' 
                  : 'bg-gray-500 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}