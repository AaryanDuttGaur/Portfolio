"use client"
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedCase, setSelectedCase] = useState(null)
  const [portfolioItems, setPortfolioItems] = useState([])
  const portfolioRef = useRef(null)
  const gridRef = useRef(null)
  const filterRef = useRef(null)
  const caseStudyRef = useRef(null)

  // Load projects on component mount
  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => setPortfolioItems(data))
      .catch(err => console.error('Error loading projects:', err))
  }, [])

  const filters = [
    { id: 'all', name: 'All' },
    { id: 'Web Dev', name: 'Web Dev' },
    { id: 'uiux', name: 'UI/UX' },
    { id: 'Data Analytics', name: 'Data Analysis' },
    // { id: 'graphic', name: 'Graphic' },
  ]

  // Filter portfolio items
  const filteredItems = activeFilter === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeFilter)

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial page load animation
      gsap.fromTo(portfolioRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      )

      gsap.fromTo(filterRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, delay: 0.3, ease: "power2.out" }
      )

      gsap.fromTo(gridRef.current.children,
        { opacity: 0, scale: 0.8, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.1, delay: 0.5, ease: "back.out(1.7)" }
      )
    })

    return () => ctx.revert()
  }, [portfolioItems])

  // Filter animation
  useEffect(() => {
    if (gridRef.current) {
      gsap.fromTo(gridRef.current.children,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.4, stagger: 0.05, ease: "power2.out" }
      )
    }
  }, [filteredItems])

  const handleFilterClick = (filterId) => {
    setActiveFilter(filterId)
  }

  const openCaseStudy = (item) => {
    setSelectedCase(item)
    document.body.style.overflow = 'hidden'

    // Case study animation
    if (caseStudyRef.current) {
      gsap.fromTo(caseStudyRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }
      )
    }
  }

  const closeCaseStudy = () => {
    if (caseStudyRef.current) {
      gsap.to(caseStudyRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setSelectedCase(null)
          document.body.style.overflow = 'auto'
        }
      })
    }
  }

  // Image zoom functionality
  const zoomImage = (imageSrc) => {
    const zoomOverlay = document.createElement('div')
    zoomOverlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      cursor: zoom-out;
    `

    const zoomedImg = document.createElement('img')
    zoomedImg.src = imageSrc
    zoomedImg.style.cssText = `
      max-width: 90%;
      max-height: 90%;
      border-radius: 10px;
      object-fit: contain;
    `

    zoomOverlay.appendChild(zoomedImg)
    document.body.appendChild(zoomOverlay)

    // Animate zoom in
    gsap.fromTo(zoomOverlay,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" }
    )
    gsap.fromTo(zoomedImg,
      { scale: 0.8 },
      { scale: 1, duration: 0.3, ease: "back.out(1.7)" }
    )

    // Close on click
    zoomOverlay.addEventListener('click', () => {
      gsap.to(zoomOverlay, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          zoomOverlay.remove()
        }
      })
    })
  }

  return (
    <>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Zen+Dots&display=swap"
        rel="stylesheet"
      />

      <div className="bg-[#121212] min-h-screen text-white">
        {/* Portfolio Section */}
        <section ref={portfolioRef} className="py-20 px-[10%] text-center">
          <h2 className="text-white font-['Zen_Dots',sans-serif] text-3xl md:text-4xl mb-4">
            My Portfolio
          </h2>
          <p className="font-['Montserrat',sans-serif] text-[#ccc] text-base md:text-lg mb-8 max-w-4xl mx-auto">
            A curated selection of my work across design, development, and hardware systems. Each
            project reflects practical solutions, thoughtful execution, and real-world impact
          </p>

          {/* Filter Buttons */}
          <div ref={filterRef} className="flex justify-center gap-4 mb-10 flex-wrap">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => handleFilterClick(filter.id)}
                className={`px-6 py-2 border border-[#df1316] rounded-full cursor-pointer transition-all duration-300 font-['Montserrat',sans-serif] ${activeFilter === filter.id
                    ? 'bg-[#df1316] text-white'
                    : 'bg-transparent text-[#df1316] hover:bg-[#df1316] hover:text-white'
                  }`}
              >
                {filter.name}
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div
            ref={gridRef}
            className="flex flex-wrap justify-center gap-8 max-w-[1100px] mx-auto"
          >
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => openCaseStudy(item)}
                  className="bg-[#252525] rounded-xl overflow-hidden transition-transform duration-300 w-[280px] flex flex-col justify-start cursor-pointer pb-4 hover:scale-105"
                >
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    width={280}
                    height={180}
                    className="w-full h-[180px] object-cover object-top"
                  />
                  <h4 className="font-['Zen_Dots',sans-serif] text-base mx-4 mt-3 mb-1 text-center text-white">
                    {item.title}
                  </h4>
                  <p className="font-['Montserrat',sans-serif] text-sm text-[#bbb] mx-4 px-1 text-center leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-lg">No projects found. Add projects to /src/projects/ folder.</p>
            )}
          </div>
        </section>

        {/* Case Study Modal */}
        {selectedCase && (
          <div
            ref={caseStudyRef}
            className="fixed top-0 left-0 w-full h-screen bg-[rgba(25,26,27,0.7)] backdrop-blur-[10px] z-[9999] overflow-y-auto"
          >
            {/* Close Button */}
            <span
              onClick={closeCaseStudy}
              className="absolute top-5 right-8 text-3xl cursor-pointer text-white z-[10000] hover:text-[#df1316] transition-colors"
            >
              ×
            </span>

            {/* Case Study Banner */}
            <div className="w-full">
              <Image
                src={selectedCase.thumbnail}
                alt={selectedCase.title}
                width={1200}
                height={340}
                className="w-full h-[340px] md:h-[400px] object-cover object-top cursor-zoom-in"
                onClick={() => zoomImage(selectedCase.thumbnail)}
              />
            </div>

            {/* Case Study Body */}
            <div className="py-16 px-[5%] md:px-[10%] flex flex-col lg:flex-row flex-wrap gap-8">
              {/* Text Content */}
              <div className="flex-1 lg:min-w-[60%] text-left">
                <h3 className="font-['Zen_Dots',sans-serif] text-2xl md:text-3xl mb-6 text-white">
                  {selectedCase.title}
                </h3>

                <h4 className="text-lg mt-6 mb-2 text-[#df1316] font-['Montserrat',sans-serif] font-medium">
                  Client Brief
                </h4>
                <p className="text-[#ccc] text-sm md:text-base leading-relaxed mb-6 font-['Montserrat',sans-serif]">
                  {selectedCase.clientBrief}
                </p>

                <h4 className="text-lg mt-6 mb-2 text-[#df1316] font-['Montserrat',sans-serif] font-medium">
                  Case Study
                </h4>
                <p className="text-[#ccc] text-sm md:text-base leading-relaxed mb-6 font-['Montserrat',sans-serif]">
                  {selectedCase.caseStudy}
                </p>

                {/* Live Link Button - Only show if liveLink exists */}
                {selectedCase.liveLink && (
                  <div className="mt-8">
                    <a
                      href={selectedCase.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 bg-[#df1316] text-white px-8 py-3 rounded-lg font-['Montserrat',sans-serif] font-semibold text-base hover:bg-[#c01013] transition-all duration-300 hover:shadow-lg hover:shadow-[#df1316]/30 hover:-translate-y-1"
                    >
                      <span>View Live Project</span>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </a>
                  </div>
                )}
              </div>

              {/* Mockups */}
              <div className="flex-1 lg:min-w-[35%] flex flex-col gap-4 items-center justify-center">
                {selectedCase.mockups && selectedCase.mockups.map((mockup, index) => (
                  <Image
                    key={index}
                    src={mockup}
                    alt={`${selectedCase.title} mockup ${index + 1}`}
                    width={300}
                    height={200}
                    className="w-full max-w-[300px] h-[200px] md:h-[250px] rounded-lg object-cover object-top cursor-zoom-in hover:shadow-lg transition-shadow duration-300"
                    onClick={() => zoomImage(mockup)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Portfolio