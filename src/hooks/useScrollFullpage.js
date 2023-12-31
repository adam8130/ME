import { useRef, useState, useEffect } from 'react';

export function useScrollFullpage() {

  const ref = useRef(null);
  const _currentPage = useRef(0)
  const isScrolling = useRef(false);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const parentNode = ref.current;
    const totalPages = Array.from(parentNode.children);
    const parentPaddingTop = parseInt(getComputedStyle(parentNode).getPropertyValue("padding-top"));

    const scrollAnimationFrame = (targetPosition, speed) => {

      const scrollAnimate = () => {
        const diff = targetPosition - parentNode.scrollTop;
        if (Math.abs(diff) <= speed) {
          parentNode.scrollTop = targetPosition;
          return;
        }
        parentNode.scrollTop += Math.sign(diff) * speed;
        requestAnimationFrame(scrollAnimate);
      };
      requestAnimationFrame(scrollAnimate);
    };

    const wheelEndAnimationFrame = () => {
      let lastScrollTime = Date.now();

      const wheelEndAnimate = () => {
        const currentTime = Date.now();
        if (lastScrollTime && (currentTime - lastScrollTime > 1300)) {
          cancelAnimationFrame(wheelEndAnimate);
          isScrolling.current = false;
          return;
        }
        requestAnimationFrame(wheelEndAnimate);
      }
      requestAnimationFrame(wheelEndAnimate);
    }

    const scrollFullpage = (e) => {
      e.preventDefault();

      if (isScrolling.current) return;
      isScrolling.current = true;

      if (e.deltaY > 0 && _currentPage.current < totalPages.length - 1) {
        _currentPage.current++
        setCurrentPage(_currentPage.current)
      }
      if (e.deltaY < 0 && _currentPage.current > 0) {
        _currentPage.current--
        setCurrentPage(_currentPage.current)
      }

      const targetPosition = totalPages[_currentPage.current].offsetTop - parentPaddingTop;
      scrollAnimationFrame(targetPosition, 35)
      wheelEndAnimationFrame()
    }

    parentNode.addEventListener('wheel', scrollFullpage);
    return () => {
      parentNode.removeEventListener('wheel', scrollFullpage);
    }
  }, []);

  return { ref, currentPage }
}