'use client'
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const hamburgerRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const menuItemsRef = useRef([]);
    const isInitialized = useRef(false);

    useEffect(() => {
        // Only set initial state once
        if (!isInitialized.current && mobileMenuRef.current) {
            gsap.set(mobileMenuRef.current, {
                height: 0,
                opacity: 0
            });

            gsap.set(menuItemsRef.current, {
                y: -20,
                opacity: 0
            });

            isInitialized.current = true;
        }
    }, []);

    const toggleMenu = () => {
        if (!isMenuOpen) {
            setIsMenuOpen(true);
            
            // Hamburger animation
            gsap.to(hamburgerRef.current.children[0], {
                rotation: 50,
                y: 5,
                duration: 0.3
            });
            gsap.to(hamburgerRef.current.children[1], {
                opacity: 0,
                duration: 0.2
            });
            gsap.to(hamburgerRef.current.children[2], {
                rotation: -50,
                y: -8,
                duration: 0.3
            });

            // Menu dropdown animation
            gsap.to(mobileMenuRef.current, {
                height: "auto",
                opacity: 1,
                duration: 0.4,
                ease: "power2.out"
            });

            // Stagger menu items
            gsap.to(menuItemsRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.3,
                stagger: 0.1,
                delay: 0.2,
                ease: "back.out(1.7)"
            });
        } else {
            closeMenu();
        }
    };

    const closeMenu = () => {
        setIsMenuOpen(false);

        // Reverse hamburger animation
        gsap.to(hamburgerRef.current.children[0], {
            rotation: 0,
            y: 0,
            duration: 0.3
        });
        gsap.to(hamburgerRef.current.children[1], {
            opacity: 1,
            duration: 0.2,
            delay: 0.1
        });
        gsap.to(hamburgerRef.current.children[2], {
            rotation: 0,
            y: 0,
            duration: 0.3
        });

        // Hide menu items first
        gsap.to(menuItemsRef.current, {
            y: -20,
            opacity: 0,
            duration: 0.2
        });

        // Then collapse menu
        gsap.to(mobileMenuRef.current, {
            height: 0,
            opacity: 0,
            duration: 0.3,
            delay: 0.1,
            ease: "power2.in"
        });
    };

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                if (isMenuOpen) closeMenu();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMenuOpen]);

    // Close menu on resize to desktop
    useEffect(() => {
        function handleResize() {
            if (window.innerWidth >= 640 && isMenuOpen) {
                closeMenu();
            }
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMenuOpen]);

    const handleMenuItemClick = () => {
        closeMenu();
    };

    return (
        <header className="bg-[#191a1b] h-20 flex justify-center relative z-50" ref={menuRef}>
            <div className="flex justify-around w-full items-center px-4 max-w-6xl">
                {/* Logo */}
                <div className="w-12 h-12 cursor-pointer">
                    <img 
                        src="/Image/Phoenix3.png" 
                        alt="Logo" 
                        className="w-full h-full object-contain hover:scale-110 transition-transform duration-300"
                    />
                </div>
                
                {/* Desktop Navigation */}
                <nav className="hidden sm:flex sm:gap-1 items-center">
                    <Link 
                        href="/"
                        className="text-white hover:text-[#df1316] hover:bg-white px-4 py-2 rounded-md transition-all duration-300 hover:scale-105"
                    >
                        Home
                    </Link>
                    <Link 
                        href="/about"
                        className="text-white hover:text-[#df1316] hover:bg-white px-4 py-2 rounded-md transition-all duration-300 hover:scale-105"
                    >
                        About
                    </Link>
                    <Link 
                        href="/portfolio"
                        className="text-white hover:text-[#df1316] hover:bg-white px-4 py-2 rounded-md transition-all duration-300 hover:scale-105"
                    >
                        Portfolio
                    </Link>
                    <Link 
                        href="/contact"
                        className="text-white hover:text-[#df1316] hover:bg-white px-4 py-2 rounded-md transition-all duration-300 hover:scale-105"
                    >
                        Contact
                    </Link>
                </nav>

                {/* Mobile Hamburger Button */}
                <button
                    ref={hamburgerRef}
                    onClick={toggleMenu}
                    className="sm:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1 hover:scale-110 active:scale-95 transition-transform duration-200"
                    aria-label="Toggle menu"
                >
                    <span className="block w-6 h-0.5 bg-white transform origin-center"></span>
                    <span className="block w-6 h-0.5 bg-white transform origin-center"></span>
                    <span className="block w-6 h-0.5 bg-white transform origin-center"></span>
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            <div
                ref={mobileMenuRef}
                className="sm:hidden absolute top-full left-0 w-full bg-[#df1316] shadow-2xl overflow-hidden"
                style={{ height: 0, opacity: 0 }}
            >
                <nav className="flex flex-col">
                    <Link
                        ref={el => menuItemsRef.current[0] = el}
                        href="/"
                        onClick={handleMenuItemClick}
                        className="text-white hover:bg-white hover:text-[#df1316] px-6 py-4 text-center font-medium transition-all duration-300 hover:scale-105 border-b border-white/10"
                    >
                        Home
                    </Link>
                    <Link
                        ref={el => menuItemsRef.current[1] = el}
                        href="/about"
                        onClick={handleMenuItemClick}
                        className="text-white hover:bg-white hover:text-[#df1316] px-6 py-4 text-center font-medium transition-all duration-300 hover:scale-105 border-b border-white/10"
                    >
                        About
                    </Link>
                    <Link
                        ref={el => menuItemsRef.current[2] = el}
                        href="/portfolio"
                        onClick={handleMenuItemClick}
                        className="text-white hover:bg-white hover:text-[#df1316] px-6 py-4 text-center font-medium transition-all duration-300 hover:scale-105 border-b border-white/10"
                    >
                        Portfolio
                    </Link>
                    <Link
                        ref={el => menuItemsRef.current[3] = el}
                        href="/contact"
                        onClick={handleMenuItemClick}
                        className="text-white hover:bg-white hover:text-[#df1316] px-6 py-4 text-center font-medium transition-all duration-300 hover:scale-105"
                    >
                        Contact
                    </Link>
                </nav>
            </div>
        </header>
    );
}