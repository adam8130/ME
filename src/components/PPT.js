import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import About from './About';
import Skills from './Skills';
import Portfolio from './Portfolio';

export default function PPT() {
  const [portfolioRef, setPortfolioRef] = useState(null);
  const components = [<About />, <Skills />, <Portfolio ref={(ref) => setPortfolioRef(ref)} />];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isStoppedPPT, setIsStoppedPPT] = useState(false);
  const controls = useAnimation();

  const slideVariants = {
    enter: { opacity: 0, y: 100 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -100 }
  };

  useEffect(() => {
    if (isStoppedPPT) return;

    const timer = setTimeout(() => {
      setCurrentIndex((prevSlide) => (prevSlide + 1) % components.length);
    }, 4000);

    if (currentIndex === 2) clearTimeout(timer);

    return () => clearTimeout(timer);
  }, [currentIndex, isStoppedPPT, components.length]);

  useEffect(() => {
    if (isStoppedPPT) return;
    if (!portfolioRef) return;

    let totalScrolled = 0;
    const pageWrapper = portfolioRef.children[0];
    const paddingTop = getComputedStyle(pageWrapper).getPropertyValue("padding-top");
    const paddingBottom = getComputedStyle(pageWrapper).getPropertyValue("padding-bottom");
    const parentPadding = parseInt(paddingTop) + parseInt(paddingBottom);
    const pageHeight = pageWrapper.getBoundingClientRect().height - parentPadding;

    const lastPage = pageWrapper.children[pageWrapper.children.length - 1];
    const lastPageHeight = lastPage.getBoundingClientRect().height;
    const lastPageBottom = lastPageHeight + lastPage.offsetTop;

    const interval = setInterval(() => {
      pageWrapper.scrollTo({
        top: totalScrolled += pageHeight,
        behavior: 'smooth'
      });

      if (totalScrolled >= lastPageBottom) {
        clearInterval(interval);
        setCurrentIndex((prevSlide) => (prevSlide + 1) % components.length);
      }
    }, 3000)

    return () => clearInterval(interval);
  }, [portfolioRef, isStoppedPPT, components.length])

  return (
    <>
      <AnimatePresence mode='wait' initial={false}>
        <motion.div
          key={currentIndex}
          initial="enter"
          animate="center"
          exit="exit"
          variants={slideVariants}
          className="w-[100%] h-full rounded-lg"
        >
          {components[currentIndex]}
        </motion.div>
      </AnimatePresence>
      <div 
        className={`
          absolute 
          bottom-[1%] md:bottom-[-5%] 
          right-[1%] md:right-0 
          flex gap-[10px]
        `}
      >
        <motion.button
          className="w-[30px] h-[30px] rounded-[15px] border border-gray-500 bg-white"
          whileHover={{ scale: 1.1, boxShadow: '0 0 8px #60c6db', border: '1px solid #60c6db' }}
          onClick={() => {
            setIsStoppedPPT(true)
            controls.stop()
          }}
        >
          <span className="block rotate-90">{'='}</span>
        </motion.button>
        <motion.button
          className="w-[30px] h-[30px] rounded-[15px] border border-gray-500 bg-white"
          whileHover={{ scale: 1.1, boxShadow: '0 0 8px #60c6db', border: '1px solid #60c6db' }}
          onClick={() => setCurrentIndex(prev => (
            Math.max((prev - 1 % components.length), 0)
          ))}
        >
          <span>{'<'}</span>
        </motion.button>
        <motion.button
          className="w-[30px] h-[30px] rounded-[15px] border border-gray-500 bg-white"
          whileHover={{ scale: 1.1, boxShadow: '0 0 8px #60c6db', border: '1px solid #60c6db' }}
          onClick={() => setCurrentIndex(prev => (
            Math.min((prev + 1 % components.length), components.length - 1)
          ))}
        >
          <span>{'>'}</span>
        </motion.button>
      </div>
    </>
  );
};
