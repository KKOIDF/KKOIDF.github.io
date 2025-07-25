import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeartsContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
`;

const Heart = styled(motion.div)`
  position: absolute;
  color: rgba(255, 182, 193, 0.6);
  font-size: ${props => props.size}px;
  user-select: none;
`;

const FloatingHearts = () => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts(prev => {
        const newHeart = {
          id: Date.now() + Math.random(),
          left: Math.random() * 100,
          size: Math.random() * 20 + 15,
          duration: Math.random() * 3 + 4,
          delay: Math.random() * 2
        };
        
        // Keep only last 10 hearts
        const updated = [...prev, newHeart].slice(-10);
        return updated;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <HeartsContainer>
      {hearts.map(heart => (
        <Heart
          key={heart.id}
          size={heart.size}
          initial={{
            x: `${heart.left}vw`,
            y: '100vh',
            opacity: 0.3
          }}
          animate={{
            y: '-20vh',
            opacity: [0.3, 0.6, 0.3, 0]
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            ease: 'linear'
          }}
          onAnimationComplete={() => {
            setHearts(prev => prev.filter(h => h.id !== heart.id));
          }}
        >
          ❤️
        </Heart>
      ))}
    </HeartsContainer>
  );
};

export default FloatingHearts;
