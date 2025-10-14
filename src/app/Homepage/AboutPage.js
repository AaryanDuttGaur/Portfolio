'use client'
import { Zen_Dots } from "next/font/google";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const zenDots = Zen_Dots({
  subsets: ["latin"],
  weight: "400",
});

export default function AboutPage() {
  const sectionRef = useRef(null);
  const textContentRef = useRef(null);
  const imageRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([headingRef.current, paragraphRef.current, imageRef.current], {
        opacity: 0,
      });

      gsap.set(headingRef.current, { x: -80 });
      gsap.set(paragraphRef.current, { x: -60 });
      gsap.set(buttonsRef.current.children, { opacity: 0, y: 30 });
      gsap.set(imageRef.current, { x: 80 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 30%",
          toggleActions: "play none none none",
        }
      });

      // Heading slides in from left
      tl.to(headingRef.current, {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      // Paragraph slides in from left
      tl.to(paragraphRef.current, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
      }, "-=0.6");

      // Buttons pop up one by one
      tl.to(buttonsRef.current.children, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.3,
        ease: "back.out(1.7)",
      }, "-=0.5");

      // Image slides in from right
      tl.to(imageRef.current, {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: "power3.out",
      }, "-=1.5");
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="flex justify-center items-center py-[5%] px-[10%] bg-[#191a1b] text-white gap-12 flex-wrap md:flex-nowrap">
      {/* Text Content */}
      <div ref={textContentRef} className="flex-1 min-w-[280px] text-center md:text-left">
        <h2 ref={headingRef} className={`text-3xl md:text-4xl leading-[1.3] mb-4 ${zenDots.className}`}>
          Meet Your Creative<br />
          Partner in Success
        </h2>

        <p ref={paragraphRef} className="text-sm font-['Montserrat'] text-[#ccc] mb-8 leading-[1.7]">
          I'm Aryan, a developer and designer focused on creating impactful digital experiences.
          I specialize in modern portfolio websites that help individuals and brands showcase their work effectively.
          I also build responsive e-commerce platforms and custom web solutions tailored to business needs.
          My approach combines clean design with reliable code to deliver seamless, user-friendly products.
          Every project is built with purpose – to help ideas stand out and succeed online.
        </p>

        {/* Buttons */}
        <div ref={buttonsRef} className="flex gap-4 flex-wrap justify-center md:justify-start">
          <button className="py-3 px-6 border border-white text-white rounded-[30px] font-['Montserrat'] text-[10px] transition-all duration-300 hover:bg-white hover:text-[#df1316] cursor-pointer">
            Know More
          </button>
          <button className="py-3 px-6 bg-transparent text-white font-['Montserrat'] text-[10px] font-medium transition-all duration-300 hover:text-[#df1316] cursor-pointer">
            Let's Discuss →
          </button>
        </div>
      </div>

      {/* Image Section */}
      <div ref={imageRef} className="flex-1 flex justify-center">
        <div className="w-full min-w-[250px] max-w-[300px] md:min-w-[300px] md:max-w-[400px] aspect-square rounded-[30px] overflow-hidden flex items-center justify-center">
          <Image
            src="/Image/New Project.png"
            alt="Designer Photo"
            width={400}
            height={400}
            className="w-full h-full object-cover rounded-[20px]"
            priority
          />
        </div>
      </div>
    </section>
  );
}