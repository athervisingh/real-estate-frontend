import React, { useEffect, useRef } from "react";
import RealEstateHero from "../component/realEstateHero";
import Emirates from "../component/emirates";
import SearchResults from "../component/searchResults";
import { useSelector } from "react-redux";
import RealEstateServices from "../component/realEstateServices";
import ContactForm from "../component/contactForm";
import Footer from "../component/footer";

const HomePage = () => {
  const results = useSelector((state) => state.search.results);
  const resultRef = useRef(null);

  useEffect(() => {
    if (results && results.length > 0 && resultRef.current) {
      const yOffset = -120; // adjust as needed (for padding or fixed header)
      const targetY = resultRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;

      const smoothScroll = (target, duration = 800) => {
        const start = window.pageYOffset;
        const distance = target - start;
        let startTime = null;

        const easeInOutQuad = (t) =>
          t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

        const animation = (currentTime) => {
          if (!startTime) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const progress = Math.min(timeElapsed / duration, 1);
          const ease = easeInOutQuad(progress);

          window.scrollTo(0, start + distance * ease);

          if (timeElapsed < duration) {
            requestAnimationFrame(animation);
          }
        };

        requestAnimationFrame(animation);
      };

      setTimeout(() => {
        smoothScroll(targetY);
      }, 200); // slight delay before starting scroll
    }
  }, [results]);

  return (
    <div className="mt-20">
      <RealEstateHero />
      <Emirates />
      <RealEstateServices/>
      {/* Only render SearchResults if there are results */}
      {results && results.length > 0 && (
        <div ref={resultRef}>
          <SearchResults results={results} />
        </div>
      )}

    <ContactForm/>
  <Footer/>
    </div>
  );
};

export default HomePage;
