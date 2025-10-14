'use client'
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import emailjs from '@emailjs/browser';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('');

    // Your EmailJS credentials
    const SERVICE_ID = 'service_txxfl1w';
    const TEMPLATE_ID = 'template_gfj2eui';
    const PUBLIC_KEY = '1WhFGF6EWQvcOuXmQ';

    // Send email using EmailJS
    emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY)
      .then(() => {
        setStatus('success');
        setFormData({ from_name: '', from_email: '', message: '' });
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Failed to send email:', error);
        setStatus('error');
        setIsLoading(false);
      });
  };

  // Social media data with SVG icons for better reliability
  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://instagram.com',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    {
      name: 'Figma',
      url: 'https://figma.com',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.02-3.019-3.02h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.015-4.49-4.491S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.02s1.354 3.019 3.019 3.019h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148z"/>
        </svg>
      )
    },
    {
      name: 'Contra',
      url: 'https://contra.com',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10zm-1-17v4h2V5h-2zm0 6v8h2v-8h-2z"/>
        </svg>
      )
    },
    {
      name: 'GitHub',
      url: 'https://github.com',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    },
    {
      name: 'Behance',
      url: 'https://behance.net',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.03.34 1.68 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.673 1.49.673 2.5 0 .71-.13 1.31-.41 1.82-.28.51-.67.93-1.18 1.27-.51.34-1.12.6-1.84.78-.72.18-1.54.27-2.48.27H0V4.51h6.938v-.007zM3.495 8.717h2.563c.62 0 1.11-.11 1.48-.35.37-.23.56-.65.56-1.26 0-.3-.05-.56-.15-.78-.1-.22-.25-.4-.44-.54-.19-.14-.42-.24-.69-.31-.27-.067-.56-.1-.87-.1H3.495v3.337zm0 4.32h2.668c.35 0 .68-.04 1-.12.32-.08.6-.2.84-.37.24-.17.43-.39.57-.66.14-.27.21-.6.21-.98 0-.75-.22-1.28-.64-1.59-.43-.31-.99-.46-1.69-.46H3.495v4.18zm13.42-2.36c-.16-.5-.4-.94-.74-1.31-.34-.37-.76-.66-1.27-.85-.51-.19-1.06-.29-1.67-.29-.61 0-1.17.1-1.69.29-.52.19-.96.48-1.32.85-.36.37-.64.81-.84 1.31-.2.5-.3 1.04-.3 1.63 0 .59.1 1.13.3 1.63.2.5.48.94.84 1.31.36.37.8.66 1.32.85.52.19 1.08.29 1.69.29.74 0 1.4-.14 1.98-.42.58-.28 1.05-.7 1.42-1.26l-2.12-1.19c-.21.33-.48.58-.81.74-.33.16-.69.24-1.08.24-.42 0-.8-.09-1.14-.26-.34-.17-.63-.42-.85-.74h5.26c.04-.28.06-.56.06-.84 0-.59-.1-1.13-.3-1.63zm-5.6.87c.2-.32.47-.57.8-.74.33-.17.7-.26 1.1-.26.4 0 .77.09 1.1.26.33.17.6.42.8.74h-3.8zm5.84-5.84v1.26h3.94V5.7h-3.94z"/>
        </svg>
      )
    },
    {
      name: 'Dribbble',
      url: 'https://dribbble.com',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.374 0 0 5.374 0 12s5.374 12 12 12 12-5.374 12-12S18.626 0 12 0zm9.568 7.375c.77 1.423 1.216 3.057 1.216 4.795 0 .278-.012.553-.035.826-.23-.054-2.48-.578-4.75-.578-.266 0-.526.008-.783.022-.034-.085-.07-.172-.108-.26-.122-.287-.254-.573-.394-.857 2.33-.963 3.706-2.474 3.854-2.948zM12 2.147c2.194 0 4.197.85 5.698 2.238-.118.434-1.415 1.897-3.698 2.81-.978-1.794-2.059-3.285-2.228-3.532-.596.129-1.175.31-1.727.545.169.247 1.257 1.738 2.241 3.567C10.29 8.445 8.085 8.65 7.61 8.672c-.023-.192-.037-.387-.037-.587 0-2.194.85-4.197 2.238-5.698.594-.594 1.288-1.063 2.037-1.383.076-.013.152-.026.229-.037C11.944 1.978 11.972 1.986 12 2.147zm-5.938 1.86c.03.004.061.008.092.013 1.413.087 3.68-.246 5.755-1.014 1.05-1.525 2.231-2.782 3.012-3.583C16.122.82 14.124 0 12 0 9.876 0 7.878.82 6.062 2.007zm-2.93 8.188c.023-.47.088-.929.193-1.376 2.088.114 5.24-.033 7.65-.966.159.317.306.643.439.978-.055.018-.109.037-.163.058-2.366.9-4.364 2.713-5.43 4.84-.848-1.564-1.512-3.206-1.689-3.534zm8.808 8.805c-1.423.771-3.057 1.216-4.795 1.216-.278 0-.553-.012-.826-.035.054-.23.578-2.48.578-4.75 0-.266-.008-.526-.022-.783.085-.034.172-.07.26-.108.287-.122.573-.254.857-.394.963 2.33 2.474 3.706 2.948 3.854z"/>
        </svg>
      )
    },
    {
      name: 'Upwork',
      url: 'https://upwork.com',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3.002-2.439-5.453-5.439-5.453z"/>
        </svg>
      )
    },
    {
      name: 'Discord',
      url: 'https://discord.com',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.317 4.369a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37.07.07 0 0 0 3.628 4.4C.533 9.046-.32 13.58.099 17.961a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.029.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.029.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.331c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.210 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.210 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
      )
    },
    {
      name: 'WhatsApp',
      url: 'https://wa.me/your-number',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.46 3.488"/>
        </svg>
      )
    }
  ];

  return (
    <div className="bg-[#191a1b] min-h-screen pt-18">
      {/* Contact Section */}
      <section className="py-20 px-[10%] bg-[#191a1b] text-center">
        <h2 className="font-zen text-2xl mb-2 text-white">Let's Connect</h2>
        <p className="montserrat text-gray-300 text-base mb-8">
          Have a project in mind or want to collaborate? Send a message!
        </p>

        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 text-left max-w-7xl mx-auto">
          
          {/* Contact Form (Left Side) */}
          <div className="flex-1 min-w-[300px]">
            <div className="flex flex-col gap-4">
              <input
                type="text"
                name="from_name"
                placeholder="Your Name"
                required
                value={formData.from_name}
                onChange={handleInputChange}
                className="bg-[#252525] border-none p-3 rounded-md text-white text-base montserrat placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#df1316]"
              />
              <input
                type="email"
                name="from_email"
                placeholder="Your Email"
                required
                value={formData.from_email}
                onChange={handleInputChange}
                className="bg-[#252525] border-none p-3 rounded-md text-white text-base montserrat placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#df1316]"
              />
              <textarea
                name="message"
                rows="5"
                placeholder="Your Message"
                required
                value={formData.message}
                onChange={handleInputChange}
                className="bg-[#252525] border-none p-3 rounded-md text-white text-base montserrat placeholder-gray-400 resize-vertical focus:outline-none focus:ring-2 focus:ring-[#df1316]"
              />
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="bg-[#df1316] text-white border-none p-3 rounded-md font-semibold text-base montserrat cursor-pointer hover:bg-[#b01012] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>

              {/* Success/Error Messages */}
              {status === 'success' && (
                <div className="p-4 bg-green-900/30 border border-green-500/50 rounded-md">
                  <p className="text-green-400 text-center montserrat">
                    Message sent successfully! I'll get back to you soon.
                  </p>
                </div>
              )}

              {status === 'error' && (
                <div className="p-4 bg-red-900/30 border border-red-500/50 rounded-md">
                  <p className="text-red-400 text-center montserrat">
                    Failed to send message. Please try again or email me directly.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Contact Info (Right Side) */}
          <div className="flex-1 min-w-[300px] flex flex-col gap-5 text-gray-300 text-sm">
            
            <div>
              <h4 className="font-zen text-white text-lg mt-4 mb-1">Contact Details</h4>
              <p className="montserrat">
                Email: <Link href="mailto:arushsharma2984@gmail.com" className="text-[#df1316] no-underline hover:underline">
                  freelancebyaryan@gmail.com
                </Link>
              </p>
              {/* <p className="montserrat">
                Phone: <Link href="tel:+917827248360" className="text-[#df1316] no-underline hover:underline">
                  +91 7827248360
                </Link>
              </p> */}
            </div>

            <div>
              {/* <h4 className="font-zen text-white text-lg mt-4 mb-3">Follow Me</h4>
              <div className="flex flex-wrap gap-4 items-center justify-start">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#252525] rounded-full w-12 h-12 flex items-center justify-center text-white hover:bg-[#df1316] hover:scale-110 transition-all duration-300"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </Link>
                ))}
              </div> */}
            </div>

            <div>
              <h4 className="font-zen text-white text-lg mt-4 mb-1">Location</h4>
              <p className="montserrat">
                Based in India, New Delhi<br />
                Available for remote collaborations worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;