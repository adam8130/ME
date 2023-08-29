import { useRef, useEffect } from 'react';

// 設置節流函數
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

  useEffect(() => {
    if (!ref.current) return;
    const currentNode = ref.current;

    let currentPage = 0
    const throttledScrollFullpage = throttle((e) => {
      e.preventDefault();
      const totalPages = Array.from(currentNode.children);
      const parentPaddingTop = getComputedStyle(currentNode).getPropertyValue("padding-top");
      const parentPaddingBottom = getComputedStyle(currentNode).getPropertyValue("padding-bottom");
      const parentTotalPadding = parseInt(parentPaddingTop) + parseInt(parentPaddingBottom);

      if (e.deltaY > 0 && currentPage < totalPages.length - 1) {
        currentPage++;
      }
      if (e.deltaY < 0 && currentPage > 0) {
        currentPage--;
      }

      const targetPosition = totalPages[currentPage].offsetTop - parentTotalPadding;
      animationFrameScroll(targetPosition, 20)
    }, 1000)

    const animationFrameScroll = (targetPosition, speed) => {
      const animateScroll = () => {
        const diff = targetPosition - currentNode.scrollTop;
        if (Math.abs(diff) <= speed) {
          currentNode.scrollTop = targetPosition;
          return;
        }
        currentNode.scrollTop += Math.sign(diff) * speed;
        requestAnimationFrame(animateScroll);
      };
      requestAnimationFrame(animateScroll);
    };

    currentNode.addEventListener('wheel', throttledScrollFullpage, { passive: false });

    return () => {
      currentNode.removeEventListener('wheel', throttledScrollFullpage);
    };
  }, []);

  return { ref };
}
