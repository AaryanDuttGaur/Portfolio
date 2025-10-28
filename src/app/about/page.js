'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import image1 from '@/PrivateImg/image.png'
import image2 from '@/PrivateImg/image2.png'
import image3 from '@/PrivateImg/image3.png'
import image4 from '@/PrivateImg/image4.png'
import image5 from '@/PrivateImg/image5.png'
import image6 from '@/PrivateImg/2.png'
gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  
  // Refs for animations
  const heroSectionRef = useRef(null);
  const heroHeadingRef = useRef(null);
  const heroParagraphRef = useRef(null);
  const heroImageRef = useRef(null);
  
  const skillsSectionRef = useRef(null);
  const skillsHeadingRef = useRef(null);
  const skillsGridRef = useRef(null);
  
  const certSectionRef = useRef(null);
  const certHeadingRef = useRef(null);
  const certGridRef = useRef(null);
  
  const whySectionRef = useRef(null);
  const whyHeadingRef = useRef(null);
  const whyGridRef = useRef(null);
  
  const ctaSectionRef = useRef(null);
  const ctaContentRef = useRef(null);

  // Skills data
  const skills = [
    { name: 'Figma', icon: '🎯' },
    { name: 'Next.js', icon: '▲' },
    { name: 'Python', icon: '🐍' },
    { name: 'Django', icon: '🎸' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'MySQL', icon: '🗄️' },
    { name: 'GSAP', icon: '✨' },
    { name: 'Three.js', icon: '🎲' },
    { name: 'R3F', icon: '🎭' },
    // { name: 'NumPy', icon: '🔢' },
    // { name: 'Scikit', icon: '🤖' },
    { name: 'Git', icon: '📦' }
  ];

  // Certificate data
  const certificates = [
    {
      id: 1,
      title: 'Certificate 1',
      image: image1,
      fullImage: image1
    },
    {
      id: 2,
      title: 'Certificate 2',
      image: image2,
      fullImage: image2
    },
    {
      id: 3,
      title: 'Certificate 3',
      image: image3,
      fullImage: image3
    },
    {
      id: 4,
      title: 'Certificate 4',
      image: image4,
      fullImage: image4
    },
    {
      id: 5,
      title: 'Certificate 5',
      image: image5,
      fullImage: image5
    }
  ];

  // Why work with me data
  const whyWorkReasons = [
    {
      icon: '💡',
      title: 'Innovative UI/UX Solutions',
      description: 'I design intuitive interfaces based on user empathy, usability, and modern trends.'
    },
    {
      icon: '🎨',
      title: 'Impactful Graphic Design',
      description: 'Clean, creative visuals that tell your brand story and build trust.'
    },
    {
      icon: '🎯',
      title: 'Strategic Branding',
      description: 'I build consistent visual identities across logos, colors, and communication touchpoints.'
    },
    {
      icon: '🔄',
      title: 'Unlimited Revisions for Design',
      description: 'I revise until you\'re satisfied. No extra charge.'
    },
    {
      icon: '⭐',
      title: 'Quality You Can Trust',
      description: 'Whether it\'s design, code, or hardware – every detail is carefully crafted, tested, and delivered with long-term quality in mind.'
    },
    {
      icon: '🚀',
      title: 'One Person, Full Stack',
      description: 'From interface design and web development – I manage it all, so you don\'t need multiple freelancers or agencies.'
    },
    {
      icon: '🤝',
      title: 'Client-First Approach',
      description: 'Smooth, friendly collaboration and quick replies.'
    },
    {
      icon: '⏰',
      title: 'On-Time Delivery',
      description: 'Committed to meeting deadlines without sacrificing quality.'
    },
    {
      icon: '💰',
      title: 'Value-Based Pricing',
      description: 'Transparent pricing based on effort, creativity, and results – not just hours.'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Section Animation
      gsap.set([heroHeadingRef.current, heroParagraphRef.current], { opacity: 0, x: -100 });
      gsap.set(heroImageRef.current, { opacity: 0, x: 100, rotationY: -25 });

      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: "top 70%",
          end: "top 20%",
          toggleActions: "play none none none",
        }
      });

      heroTl.to(heroHeadingRef.current, {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: "power3.out",
      })
      .to(heroParagraphRef.current, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
      }, "-=0.8")
      .to(heroImageRef.current, {
        opacity: 1,
        x: 0,
        rotationY: 0,
        duration: 1.3,
        ease: "back.out(1.2)",
      }, "-=1.2");

      // Skills Section Animation
      gsap.set(skillsHeadingRef.current, { opacity: 0, scale: 0.5, rotationX: -45 });
      gsap.set(skillsGridRef.current.children, { opacity: 0, scale: 0, rotation: -180 });

      const skillsTl = gsap.timeline({
        scrollTrigger: {
          trigger: skillsSectionRef.current,
          start: "top 70%",
          end: "top 20%",
          toggleActions: "play none none none",
        }
      });

      skillsTl.to(skillsHeadingRef.current, {
        opacity: 1,
        scale: 1,
        rotationX: 0,
        duration: 1,
        ease: "back.out(1.5)",
      })
      .to(skillsGridRef.current.children, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        stagger: {
          each: 0.08,
          from: "random",
        },
        ease: "back.out(2)",
      }, "-=0.5");

      // Certificates Section Animation
      gsap.set(certHeadingRef.current, { opacity: 0, y: -60, rotationZ: -5 });
      gsap.set(certGridRef.current.children, { opacity: 0, y: 100, rotationY: 45, scale: 0.7 });

      const certTl = gsap.timeline({
        scrollTrigger: {
          trigger: certSectionRef.current,
          start: "top 70%",
          end: "top 20%",
          toggleActions: "play none none none",
        }
      });

      certTl.to(certHeadingRef.current, {
        opacity: 1,
        y: 0,
        rotationZ: 0,
        duration: 1,
        ease: "power3.out",
      })
      .to(certGridRef.current.children, {
        opacity: 1,
        y: 0,
        rotationY: 0,
        scale: 1,
        duration: 1,
        stagger: 0.12,
        ease: "back.out(1.5)",
      }, "-=0.5");

      // Why Work With Me Section Animation
      gsap.set(whyHeadingRef.current, { opacity: 0, scale: 0.8, y: -40 });
      gsap.set(whyGridRef.current.children, { opacity: 0, x: -60, rotationX: -30, scale: 0.9 });

      const whyTl = gsap.timeline({
        scrollTrigger: {
          trigger: whySectionRef.current,
          start: "top 70%",
          end: "top 20%",
          toggleActions: "play none none none",
        }
      });

      whyTl.to(whyHeadingRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: "back.out(1.3)",
      })
      .to(whyGridRef.current.children, {
        opacity: 1,
        x: 0,
        rotationX: 0,
        scale: 1,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
      }, "-=0.6");

      // CTA Section Animation
      gsap.set(ctaContentRef.current.children, { opacity: 0, y: 50, scale: 0.9 });

      const ctaTl = gsap.timeline({
        scrollTrigger: {
          trigger: ctaSectionRef.current,
          start: "top 75%",
          end: "top 25%",
          toggleActions: "play none none none",
        }
      });

      ctaTl.to(ctaContentRef.current.children, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.5)",
      });

      // Add parallax effect to hero image
      gsap.to(heroImageRef.current, {
        y: -50,
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        }
      });

      // Add floating animation to skills on hover
      const skillItems = skillsGridRef.current.children;
      Array.from(skillItems).forEach((item) => {
        item.addEventListener('mouseenter', () => {
          gsap.to(item, {
            y: -10,
            scale: 1.1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
        item.addEventListener('mouseleave', () => {
          gsap.to(item, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });

    });

    return () => ctx.revert();
  }, []);

  // Modal animation
  useEffect(() => {
    if (selectedCertificate) {
      gsap.fromTo('.modal-overlay', 
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo('.modal-content', 
        { scale: 0.8, opacity: 0, rotationY: 45 },
        { scale: 1, opacity: 1, rotationY: 0, duration: 0.5, ease: "back.out(1.5)" }
      );
    }
  }, [selectedCertificate]);

  const openModal = (certificate) => {
    setSelectedCertificate(certificate);
  };

  const closeModal = () => {
    gsap.to('.modal-content', {
      scale: 0.8,
      opacity: 0,
      rotationY: -45,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => setSelectedCertificate(null)
    });
  };

  return (
    <div className="bg-[#121212] min-h-screen">
      {/* Main About Section */}
      <section ref={heroSectionRef} className="flex items-center justify-between min-h-screen px-[10%] py-20 bg-[#121212] flex-wrap gap-12">
        {/* Left Content */}
        <div className="flex-1 min-w-[280px] max-w-[600px]">
          <h2 ref={heroHeadingRef} className="font-zen text-4xl font-bold text-white leading-tight mb-6 bg-gradient-to-r from-[#df1316] to-[#0b0b0b] bg-clip-text text-transparent">
            Discover My<br />Journey and Expertise
          </h2>
          <p ref={heroParagraphRef} className="text-sm montserrat text-gray-300 leading-relaxed mb-8">
            I'm Aaryan – a full-stack developer and UI/UX designer specializing in building modern, high-impact portfolio
            websites that help individuals and brands showcase their work with clarity and style. My focus is on creating
            clean, responsive designs that highlight your story and make a lasting impression.
            <br /><br />
            Alongside portfolio sites, I also design and develop e-commerce websites and custom web solutions – blending
            user-focused design with solid technical execution to deliver products that perform well and scale easily.
            <br /><br />
            If you're looking for someone who can design and build a professional online presence that both looks
            great and works seamlessly, my portfolio demonstrates the value I can bring to your project.
          </p>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center">
          <div ref={heroImageRef} className="w-[300px] aspect-square rounded-2xl overflow-hidden shadow-2xl" style={{ perspective: '1000px' }}>
            <Image
              src= {image6}
              alt="About Image"
              width={300}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={skillsSectionRef} className="bg-[#191a1b] py-12 px-[10%] text-center text-white">
        <h2 ref={skillsHeadingRef} className="text-2xl font-zen mb-8" style={{ perspective: '1000px' }}>My Skills</h2>
        <div ref={skillsGridRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-8 justify-items-center">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="w-16 h-16 rounded-full bg-[#252525] border border-gray-600 shadow-lg flex flex-col items-center justify-center hover:bg-[#df1316] transition-colors duration-300 text-white cursor-pointer"
            >
              <span className="text-lg">{skill.icon}</span>
              <span className="text-[0.65rem] montserrat mt-1">{skill.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Certificates Section */}
      <section ref={certSectionRef} className="bg-[#191a1b] py-16 px-[10%] text-white text-center">
        <h2 ref={certHeadingRef} className="text-2xl font-zen mb-8">My Certificates</h2>
        <div ref={certGridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 justify-items-center">
          {certificates.map((certificate) => (
            <div
              key={certificate.id}
              className="w-full max-w-[300px] aspect-[4/3] overflow-hidden rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
              style={{ perspective: '1000px' }}
              onClick={() => openModal(certificate)}
            >
              <Image
                src={certificate.image}
                alt={certificate.title}
                width={300}
                height={225}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Certificate Modal */}
      {selectedCertificate && (
        <div
          className="modal-overlay fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[9999] p-4"
          onClick={closeModal}
        >
          <div className="modal-content relative max-w-[90%] max-h-[90%]" style={{ perspective: '1000px' }}>
            <button
              onClick={closeModal}
              className="absolute top-5 right-8 text-white text-3xl montserrat cursor-pointer hover:text-gray-300"
            >
              ×
            </button>
            <Image
              src={selectedCertificate.fullImage}
              alt={selectedCertificate.title}
              width={800}
              height={600}
              className="max-w-full max-h-full rounded-xl shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* Why Work With Me Section */}
      <section ref={whySectionRef} className="bg-[#191a1b] py-16 px-[10%] text-white text-center">
        <h2 ref={whyHeadingRef} className="text-2xl font-zen mb-8">Why Work With Me</h2>
        <div ref={whyGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1100px] mx-auto">
          {whyWorkReasons.map((reason, index) => (
            <div
              key={index}
              className="bg-[#252525] rounded-xl p-4 min-h-[100px] flex flex-col items-center justify-center text-center hover:bg-[#2e2e2e] transition-colors duration-300"
              style={{ perspective: '1000px' }}
            >
              <span className="text-xl text-[#df1316] mb-2">{reason.icon}</span>
              <strong className="block mb-1 text-sm text-white leading-tight montserrat">
                {reason.title}
              </strong>
              <span className="text-gray-300 text-sm montserrat leading-relaxed">
                {reason.description}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaSectionRef} className="bg-[#191a1b] py-20 px-[10%] text-center text-white">
        <div ref={ctaContentRef} className="max-w-4xl mx-auto">
          <h2 className="font-zen text-2xl mb-4">Let's Build Something Extraordinary</h2>
          <p className="montserrat text-gray-300 text-base mb-8 leading-relaxed">
            Whether you're launching a new brand, refining your website, or upgrading your visuals – I'm ready to help.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/contact"
              className="bg-[#df1316] text-white px-7 py-3 rounded-[30px] montserrat text-sm hover:bg-white hover:text-[#df1316] transition-colors duration-300"
            >
              Let's Talk
            </Link>
            <Link
              href="/portfolio"
              className="border border-white text-white px-7 py-3 rounded-[30px] montserrat text-sm hover:bg-[#df1316] hover:text-white transition-all duration-300"
            >
              View Portfolio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;