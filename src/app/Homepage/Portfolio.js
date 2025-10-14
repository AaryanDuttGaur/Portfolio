'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PortfolioPage = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef = useRef(null);
  const viewAllRef = useRef(null);

  const portfolioItems = [
    {
      id: 1,
      title: "Neo Cart",
      description: "A modern e-commerce UI design built for seamless product discovery and checkout.",
      image: "/Image/Frame 14-min.jpg",
      link: "/portfolio"
    },
    {
      id: 2,
      title: "Larsen Clarke",
      description: "A refined corporate website design for Larsen Clarke, focused on trust and professionalism.",
      image: "/Image/Frame 19-min.jpg",
      link: "/portfolio"
    },
    {
      id: 3,
      title: "Smart Insight",
      description: "An intuitive interface for real-time analytics and smart business decisions.",
      image: "/Image/Frame 1-min.jpg",
      link: "/portfolio"
    },
    {
      id: 4,
      title: "Velora",
      description: "Velora is a fashion e-commerce store offering curated collections of modern, stylish apparel Focussed on delivering quality, trend-forward pieces with a smooth and reliable shopping experience. ",
      image: "/projects/Velora/thumbnail.png",
      link: "/portfolio"
    },
    {
      id: 5,
      title: "Ananya Portfolio",
      description: "A modern single-page portfolio with smooth GSAP animations, and minimalist black design built with React and Tailwind CSS.",
      image: "/projects/Ananya/thumbnail.png",
      link: "/portfolio"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(headingRef.current, { opacity: 0, y: -50 });
      gsap.set(gridRef.current.children, { opacity: 0, y: 60, scale: 0.9 });
      gsap.set(viewAllRef.current, { opacity: 0, y: 30 });

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

      // Portfolio cards animate in with stagger
      tl.to(gridRef.current.children, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.2)",
      }, "-=0.5");

      // View All button fades up
      tl.to(viewAllRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.4");
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-5 md:px-10 lg:px-20 bg-[#191a1b]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 ref={headingRef} className="font-zen text-4xl md:text-5xl text-white mb-4">
            My Portfolio
          </h2>
        </div>

        {/* Portfolio Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#1e1e1e] rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 w-full max-w-sm"
            >
              {/* Project Image */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover object-top hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>

              {/* Project Info */}
              <div className="p-4 space-y-3">
                <h3 className="font-zen text-xl text-white font-medium">
                  {item.title}
                </h3>
                <p className="montserrat text-sm text-gray-300 leading-relaxed">
                  {item.description}
                </p>
                <Link
                  href={item.link}
                  className="inline-block mt-3 px-5 py-2 bg-[#e50914] text-white text-sm font-medium rounded-full hover:bg-[#ff1e2d] transition-colors duration-300"
                >
                  View More
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div ref={viewAllRef} className="text-center mt-12">
          <Link
            href="/portfolio"
            className="inline-block px-8 py-4 border-2 border-white text-white bg-transparent text-lg font-medium rounded hover:bg-white hover:text-[#151515] transition-all duration-300"
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PortfolioPage;