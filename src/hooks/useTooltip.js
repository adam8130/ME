import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

export const useTooltip = (
  text,
  {
    delay = 3000,
    offsetX = 0,
    offsetY = 0,
    disable
  } = {}
) => {
  const ref = useRef(null);
  const [unMount, setUnMount] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    if (disable) return;

    const targetElement = ref.current;
    const targetRect = targetElement.getBoundingClientRect();
    const targetRectWidth = targetRect.width;
    const targetRectHeight = targetRect.height;

    setPosition({
      top: targetRect.bottom + window.scrollY - targetRectHeight,
      left: targetRect.left + window.scrollX + targetRectWidth,
    });
    const time1 = setTimeout(() => setVisible(true), delay);
    const time2 = setTimeout(() => setVisible(false), delay + 5000);

    let unVisibleTimeout;
    const visibleTooltip = () => {
      clearTimeout(unVisibleTimeout);
      setVisible(true)
    }
    const unVisibleTooltip = () => {
      unVisibleTimeout = setTimeout(() => setVisible(false), 1000)
    }

    targetElement.addEventListener('mouseenter', visibleTooltip);
    targetElement.addEventListener('mouseleave', unVisibleTooltip);

    return () => {
      clearTimeout(time1);
      clearTimeout(time2);
      targetElement.removeEventListener('mouseenter', visibleTooltip);
      targetElement.removeEventListener('mouseleave', unVisibleTooltip);
      setUnMount(false);
    }
  }, [delay, disable]);

  const Tooltip = !unMount && ReactDOM.createPortal(
    <div
      style={{ 
        position: 'absolute',
        top: `${position.top + offsetY}px`,
        left: `${position.left + offsetX}px`,
        zIndex: 1001,
        background: 'white',
        borderRadius: '10px',
        border: '1px solid gray',
        opacity: visible ? 1 : 0,
        transition: 'all 0.5s ease-in-out'
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        style={{
          padding: '10px',
          fontSize: '12px',
          position: 'relative',
          zIndex: 1001
        }}
      >
        <span>{text}</span>
        <span
          style={{
            width: '20px',
            height: '20px',
            fontSize: '12px',
            lineHeight: '20px',
            textAlign: 'center',
            background: 'white',
            border: '1px solid gray',
            borderRadius: '50%',
            cursor: 'pointer',
            position: 'absolute',
            top: '-20%',
            right: '-5%',
            zIndex: 1002
          }} 
          onClick={() => setUnMount(true)}
        >
          x
        </span>
        <span
          style={{
            position: 'absolute',
            top: '10px',
            left: '-15px',
            transform: 'rotate(-90deg)',
            zIndex: 1000
          }}
        >
          <svg width="15" height="15" viewBox="0 0 60 60">
            <polygon points="30,0 60,60 0,60" fill="white" stroke="gray" strokeWidth="5"/>
          </svg>
        </span>
      </div>
    </div>, 
    document.body
  );
  
  return { ref, Tooltip };
}
