import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SnowContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
`;

const Snowflake = styled(motion.div)`
  position: absolute;
  color: rgba(255, 255, 255, 0.8);
  font-size: ${props => props.size}px;
  user-select: none;
`;

const SnowEffect = () => {
  const [snowflakes, setSnowflakes] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSnowflakes(prev => {
        const newSnowflake = {
          id: Date.now() + Math.random(),
          left: Math.random() * 100,
          size: Math.random() * 15 + 10,
          duration: Math.random() * 5 + 8,
          delay: Math.random() * 3
        };
        
        // Keep only last 15 snowflakes
        const updated = [...prev, newSnowflake].slice(-15);
        return updated;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <SnowContainer>
      {snowflakes.map(flake => (
        <Snowflake
          key={flake.id}
          size={flake.size}
          initial={{
            x: `${flake.left}vw`,
            y: '-10vh',
            opacity: 0.8,
            rotate: 0
          }}
          animate={{
            y: '110vh',
            opacity: [0.8, 1, 0.8, 0],
            rotate: 360
          }}
          transition={{
            duration: flake.duration,
            delay: flake.delay,
            ease: 'linear'
          }}
          onAnimationComplete={() => {
            setSnowflakes(prev => prev.filter(s => s.id !== flake.id));
          }}
        >
          ❄️
        </Snowflake>
      ))}
    </SnowContainer>
  );
};

export default SnowEffect;
