/**
 * Slider Component
 * 
 * This component renders a full-screen hero section with an auto-rotating image slider,
 * a news section that fetches announcements from an API, and an organizational logo section.
 */

import { useEffect, useState, useRef } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import getEnvironment from "../getenvironment";
import { motion, AnimatePresence } from 'framer-motion';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

// -----------------------------------------------------------------------------
// CONFIGURATION DATA
// -----------------------------------------------------------------------------

/**
 * Static slider data for the hero section
 */
const heroImages = [
  '/heroImages/hero1.jpg',
  '/heroImages/hero2.jpg',
  '/heroImages/hero3.jpg',
  '/heroImages/hero4.jpg',
  '/heroImages/hero5.jpg'
];

/**
 * Color constants for styling
 */
// const COLOR_BG_NEWS = "#f0f7f4";  // Light green background
// const COLOR_BORDER_R = "#0f5132";  // Dark green border
// const COLOR_LOGO_BG = "#0c3823";  // Darker green background

// -----------------------------------------------------------------------------
// MAIN COMPONENT
// -----------------------------------------------------------------------------

function Slider(props) {
  // Props and state
  const confid = props.confid;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [apiUrl, setApiUrl] = useState(null);
  const [newsData, setNewsData] = useState([]);
  const scrollRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // -----------------------------------------------------------------------------
  // EFFECTS
  // -----------------------------------------------------------------------------

  /**
   * Auto-rotate slider images every 4 seconds
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  /**
   * Initialize API URL from environment
   */
  useEffect(() => {
    getEnvironment().then((url) => setApiUrl(url));
  }, []);

  /**
   * Fetch news announcements from API when apiUrl is available
   */
  useEffect(() => {
    if (!confid || !apiUrl) {
      console.warn("Missing confid or apiUrl", { confid, apiUrl });
      return;
    }
    console.log("Sending GET request to:", `${apiUrl}/conferencemodule/announcements/conf/${confid}`);
    
    axios
      .get(`${apiUrl}/conferencemodule/announcements/conf/${confid}`, {
        withCredentials: true,
      })
      .then((res) => {
        const sortedData = res.data.sort((a, b) => a.sequence - b.sequence);
        setNewsData(sortedData);
        console.log("Fetched news data:", sortedData);
      })
      .catch((err) => {
        console.error("API error:", err);
        setNewsData([]); // Clear on error
      });
  }, [apiUrl, confid]);

  /**
   * Auto-scroll news items when news data is loaded
   */
  useEffect(() => {
    if (!newsData.length) return;
    
    const container = scrollRef.current;
    let reqId;
    const scrollAmount = 0.5;

    function animate() {
      if (container) {
        container.scrollLeft += scrollAmount;
        if (
          container.scrollLeft + container.offsetWidth >=
          container.scrollWidth
        ) {
          container.scrollLeft = 0;
        }
      }
      reqId = requestAnimationFrame(animate);
    }

    reqId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(reqId);
  }, [newsData]);

  // Preload images
  useEffect(() => {
    const loadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = reject;
      });
    };

    Promise.all(heroImages.map(loadImage))
      .then(() => setImagesLoaded(true))
      .catch(console.error);
  }, []);

  // Navigation functions for slider
  const nextSlide = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevSlide = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? heroImages.length - 1 : prevIndex - 1
    );
  };

  // -----------------------------------------------------------------------------
  // RENDER
  // -----------------------------------------------------------------------------
  
  return (
    <div className="w-full  sm:min-h-screen flex flex-col relative">
      {/* Hero Section with Image Slider */}
      <section className="relative  overflow-hidden h-[50vh] sm:h-[80vh] md:h-[90vh] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row h-full w-full max-w-7xl mx-auto">
          {/* Left Content - 40% (hidden on mobile) */}
          <div className="hidden lg:flex w-1/5 pt-28 pb-16 px-8 lg:px-16 flex-col justify-center">
            {/* Decorative dots */}
            <div className="absolute top-[5%] left-[8%] mb-16 w-36">
              <div className="grid grid-cols-6 gap-2">
                {[...Array(36)].map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-teal-800/60"></div>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Hero Text Box (hidden on mobile) */}
          <div
            className="hidden lg:block absolute top-[50%] left-[20%] transform -translate-x-1/2 -translate-y-1/2 w-[450px] max-w-xl h-[330px] backdrop-blur-md rounded-lg z-10 border border-white/10"
            style={{
              background: "rgba(20, 184, 165, 0.17)", // teal-500 with 18% opacity
            }}
          >
            <div className="absolute inset-0 flex flex-col justify-center items-center px-12 text-center">
              <span className="text-4xl font-serif text-teal-900 font-medium mb-6 text-left w-full block">
                International Conference on Intelligent Processing
              </span>
              <p className="text-gray-900 font-sans text-lg max-w-md text-left w-full">
                Hardware, Electronics, and Radio Systems | February 13-15, 2026 | NIT Jalandhar
              </p>
              <div className="mt-6 flex items-center justify-start w-full">
                <a
                  href="/6863b4da7b0acf10390f6b41"
                  className="inline-block bg-white hover:bg-teal-50 text-teal-900 text-base font-semibold px-8 py-2 rounded-sm shadow-md transition duration-200 border border-teal-900/20"
                  style={{
                    fontWeight: 500,
                    borderRadius: "10px",
                    letterSpacing: "0.02em",
                    textDecoration: "none",
                  }}
                >
                  Register
                </a>
              </div>
            </div>
          </div>

          {/* Mobile Hero Text Box (hidden on desktop) */}
          <div className="block lg:hidden absolute top-[45%] xs:top-[30%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] xs:w-[85%] sm:w-[80%] md:w-[70%] max-w-md h-auto bg-white/30 backdrop-blur-sm rounded-lg z-10 border border-white/10 px-4 xs:px-5 sm:px-6 py-5 xs:py-6 sm:py-8">
            <div className="flex flex-col justify-center items-center text-center">
              <span className="text-xl xs:text-2xl sm:text-3xl font-serif text-teal-900 font-medium mb-2 xs:mb-3 sm:mb-4 text-center w-full block">
                International Conference on Intelligent Processing
              </span>
              <p className="text-gray-900 font-sans text-xs xs:text-sm sm:text-base max-w-xs text-center w-full">
                Hardware, Electronics, and Radio Systems | February 13-15, 2026 | NIT Jalandhar
              </p>
              <div className="mt-3 sm:mt-4 flex items-center justify-center w-full">
                <a
                  href="/6863b4da7b0acf10390f6b41"
                  className="inline-block bg-white hover:bg-teal-50 text-teal-900 text-xs xs:text-sm sm:text-base font-semibold px-4 xs:px-5 sm:px-6 py-1.5 xs:py-2 rounded-sm shadow-md transition duration-200 border border-teal-900/20"
                  style={{
                    fontWeight: 500,
                    borderRadius: "10px",
                    letterSpacing: "0.02em",
                    textDecoration: "none",
                  }}
                >
                  Register
                </a>
              </div>
            </div>
          </div>
        
          {/* Right Image Section - 60% */}
          <div className="w-full md:relative h-[350px] xs:h-[400px] sm:h-[450px] md:h-[500px] m-0 p-0 rounded-none overflow-hidden lg:ml-auto lg:w-4/5 lg:h-[90%] lg:mt-[2vh] lg:rounded-lg">
            {imagesLoaded && (
              <AnimatePresence >
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ 
                    duration: 0.3,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0"
                >
                  <img 
                    src={heroImages[currentImageIndex]}
                    alt={`Conference image ${currentImageIndex + 1}`}
                    className="h-full w-full object-cover"
                    style={{ opacity: imagesLoaded ? 1 : 0 }}
                  />
                </motion.div>
              </AnimatePresence>
            )}
            
            {/* Navigation Arrows */}
            <div className="absolute bottom-2 xs:bottom-3 sm:bottom-4 right-2 xs:right-3 sm:right-4 z-10 flex flex-row gap-2 xs:gap-3 sm:gap-4 lg:bottom-10 lg:right-10">
              <button 
                onClick={prevSlide}
                className="p-1 sm:p-2 focus:outline-none rotate-[270deg] bg-black/20 hover:bg-black/30 rounded-full transition-colors" 
                aria-label="Previous slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </button>
              <button 
                onClick={nextSlide}
                className="p-1 sm:p-2 focus:outline-none rotate-90 bg-black/20 hover:bg-black/30 rounded-full transition-colors" 
                aria-label="Next slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </button>
            </div>

            {/* Progress dots */}
            <div className="absolute bottom-2 xs:bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex space-x-1 sm:space-x-2 lg:bottom-10">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                    index === currentImageIndex ? 'bg-teal-300' : 'bg-teal-100/40'
                  } transition-all duration-300`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By / Organized By Section - New Design */}
      <div className="w-full shadow-lg bg-gray-50 py-4 sm:py-6" style={{ zIndex: 30 }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4 sm:mb-6">
            <p className="text-gray-600 text-xs xs:text-sm sm:text-md font-medium px-2">ORGANIZED BY DEPARTMENT OF ELECTRONICS AND COMMUNICATION ENGINEERING, NIT JALANDHAR</p>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-3 xs:gap-4 sm:gap-8 md:gap-12">
            {/* Three featured buttons/logos */}
            <a 
              href="/submit-paper" 
              className="flex items-center justify-center bg-white py-2 sm:py-3 px-4 sm:px-6 md:px-8 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-all duration-200"
            >
              <span className="text-teal-800 text-xs xs:text-sm sm:text-base font-semibold">Submit Paper</span>
            </a>

            <a 
              href="/registration" 
              className="flex items-center justify-center bg-white py-2 sm:py-3 px-4 sm:px-6 md:px-8 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-all duration-200"
            >
              <span className="text-teal-800 text-xs xs:text-sm sm:text-base font-semibold">Register Now</span>
            </a>

            <a 
              href="/contact" 
              className="flex items-center justify-center bg-white py-2 sm:py-3 px-4 sm:px-6 md:px-8 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-all duration-200"
            >
              <span className="text-teal-800 text-xs xs:text-sm sm:text-base font-semibold">Contact Us</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Slider;
