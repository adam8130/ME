import { useRef, useState, useEffect } from 'react';

// throttle function
function throttle(callback, delay) {
  let lastTime = 0;
  return function (...arg) {
    const now = new Date().getTime();
    if (now - lastTime > delay) {
      callback.apply(this, arg);
      lastTime = now;
    }
  };
}

export function useScrollFullpage() {
  const ref = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const _currentPage = useRef(0)

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

    const throttledScrollFullpage = throttle((e) => {
      e.preventDefault();
      if (e.deltaY > 0 && _currentPage.current < totalPages.length - 1) {
        _currentPage.current++;
        setCurrentPage(_currentPage.current)
      }
      if (e.deltaY < 0 && _currentPage.current > 0) {
        _currentPage.current--;
        setCurrentPage(_currentPage.current)
      }

      const targetPosition = totalPages[_currentPage.current].offsetTop - parentPaddingTop;
      scrollAnimationFrame(targetPosition, 20)
    }, 1000)


    parentNode.addEventListener('wheel', throttledScrollFullpage, { passive: false });
    return () => parentNode.removeEventListener('wheel', throttledScrollFullpage);

  }, []);

  return { ref, currentPage };
}