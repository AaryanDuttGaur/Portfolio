'use client'
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
  const sectionRef = useRef(null);
  const ctaBoxRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(ctaBoxRef.current, { opacity: 0, scale: 0.8, rotationX: -15 });
      gsap.set(headingRef.current, { opacity: 0, y: -30 });
      gsap.set(descriptionRef.current, { opacity: 0, y: -20 });
      gsap.set(buttonsRef.current.children, { opacity: 0, y: 40, scale: 0.8 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "top 30%",
          toggleActions: "play none none none",
        }
      });

      // CTA box scales up with 3D rotation effect
      tl.to(ctaBoxRef.current, {
        opacity: 1,
        scale: 1,
        rotationX: 0,
        duration: 1.2,
        ease: "back.out(1.3)",
      });

      // Heading fades down
      tl.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.7");

      // Description fades down
      tl.to(descriptionRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.5");

      // Buttons pop up with stagger
      tl.to(buttonsRef.current.children, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.2,
        ease: "back.out(2)",
      }, "-=0.4");
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-5 md:px-10 lg:px-20 bg-[#191a1b]">
      <div className="max-w-4xl mx-auto">
        <div 
          ref={ctaBoxRef}
          className="bg-[#7a0f0f] rounded-[100px] px-5 py-12 md:py-12 text-center text-white"
          style={{ perspective: '1000px' }}
        >
          <div className="max-w-full mx-auto">
            {/* Heading */}
            <h2 ref={headingRef} className="font-zen text-base md:text-lg font-medium mb-2">
              Have a Project in Mind? Let's Talk
            </h2>
            
            {/* Description */}
            <p ref={descriptionRef} className="montserrat text-xs md:text-sm text-gray-100 mb-5 leading-relaxed">
              Looking to create a website, app, or SaaS platform? I'm here to collaborate and deliver exceptional results.
            </p>
            
            {/* CTA Buttons */}
            <div ref={buttonsRef} className="flex flex-col sm:flex-row justify-center items-center gap-5 flex-wrap">
              {/* Primary Button - Contact */}
              <Link
                href="/contact"
                className="bg-[#db4a4a] text-white px-8 py-4 rounded-[40px] text-base font-medium montserrat hover:bg-[#b23636] transition-colors duration-300"
              >
                Contact us
              </Link>
              
              {/* Secondary Button - Portfolio */}
              <Link
                href="/portfolio"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-[40px] text-base font-medium montserrat hover:bg-white hover:text-[#7a0f0f] transition-all duration-300"
              >
                See Portfolio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;