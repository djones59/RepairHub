import React from 'react';
import { useTransition, animated } from 'react-spring';
import { useLocation } from 'react-router-dom';

const BlurFadeTransition = ({ children }) => {
  const location = useLocation();

  const transitions = useTransition(location, {
    from: { opacity: 0, filter: 'blur(30px)', backgroundColor: 'rgba(0, 0, 0, 1)' },
    enter: { opacity: 1, filter: 'blur(0px)', backgroundColor: 'rgba(0, 0, 0, 0)' },
    leave: { opacity: 0, filter: 'blur(30px)', backgroundColor: 'rgba(0, 0, 0, 1)' },
    config: { duration: 500 }, // Adjust transition speed for smoothness
  });

  return transitions((style, item) => (
    <animated.div
      style={{
        ...style,
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        top: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black', // Ensure the background is black during blur
        overflow: 'hidden',
      }}
    >
      {children}
    </animated.div>
  ));
};

export default BlurFadeTransition;
