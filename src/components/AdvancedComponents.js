import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, useAnimation, useInView } from 'framer-motion';

// Advanced Particle System
const ParticleSystem = ({ count = 50, type = 'hearts' }) => {
  const [particles, setParticles] = useState([]);
  const containerRef = useRef();

  useEffect(() => {
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 0.5 + 0.5,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
      emoji: type === 'hearts' ? ['💕', '💖', '💗', '💘', '💝'][Math.floor(Math.random() * 5)] : '✨'
    }));
    setParticles(newParticles);
  }, [count, type]);

  return (
    <ParticleContainer ref={containerRef}>
      {particles.map((particle) => (
        <Particle
          key={particle.id}
          as={motion.div}
          initial={{ 
            x: `${particle.x}vw`,
            y: `100vh`,
            opacity: 0,
            scale: 0
          }}
          animate={{
            x: [`${particle.x}vw`, `${particle.x + (Math.random() - 0.5) * 20}vw`],
            y: [`100vh`, `-10vh`],
            opacity: [0, 1, 1, 0],
            scale: [0, particle.size, particle.size, 0],
            rotate: [0, 360]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ fontSize: `${particle.size}rem` }}
        >
          {particle.emoji}
        </Particle>
      ))}
    </ParticleContainer>
  );
};

const ParticleContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
`;

const Particle = styled.div`
  position: absolute;
  pointer-events: none;
  user-select: none;
`;

// Advanced Text Animation Component
const AnimatedText = ({ 
  children, 
  animation = 'typewriter',
  speed = 50,
  className,
  ...props 
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = children.toString();
  const controls = useAnimation();
  const ref = useRef();
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    if (animation === 'typewriter') {
      const timer = setInterval(() => {
        if (currentIndex < fullText.length) {
          setDisplayText(fullText.slice(0, currentIndex + 1));
          setCurrentIndex(prev => prev + 1);
        } else {
          clearInterval(timer);
        }
      }, speed);

      return () => clearInterval(timer);
    } else if (animation === 'fadeIn') {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8 }
      });
    }
  }, [isInView, currentIndex, fullText, speed, animation, controls]);

  if (animation === 'typewriter') {
    return (
      <motion.div ref={ref} className={className} {...props}>
        {displayText}
        <Cursor animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }}>
          |
        </Cursor>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

const Cursor = styled(motion.span)`
  color: inherit;
  font-weight: normal;
`;

// Enhanced Button with Ripple Effect
const RippleButton = ({ children, onClick, className, ...props }) => {
  const [ripples, setRipples] = useState([]);
  const buttonRef = useRef();

  const handleClick = (e) => {
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = {
      id: Date.now(),
      x,
      y,
      size: Math.max(rect.width, rect.height) * 2
    };

    setRipples(prev => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);

    if (onClick) onClick(e);
  };

  return (
    <RippleButtonContainer
      ref={buttonRef}
      onClick={handleClick}
      className={className}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
      {ripples.map(ripple => (
        <RippleEffect
          key={ripple.id}
          initial={{
            width: 0,
            height: 0,
            x: ripple.x,
            y: ripple.y,
            opacity: 0.6
          }}
          animate={{
            width: ripple.size,
            height: ripple.size,
            x: ripple.x - ripple.size / 2,
            y: ripple.y - ripple.size / 2,
            opacity: 0
          }}
          transition={{ duration: 0.6 }}
        />
      ))}
    </RippleButtonContainer>
  );
};

const RippleButtonContainer = styled(motion.button)`
  position: relative;
  overflow: hidden;
  background: linear-gradient(45deg, #ff6b6b, #feca57);
  border: none;
  border-radius: 25px;
  padding: 15px 30px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.3);
  }
`;

const RippleEffect = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  pointer-events: none;
  transform: translate(-50%, -50%);
`;

// Advanced Image Component with Progressive Loading
const ProgressiveImage = ({ 
  src, 
  placeholder, 
  alt, 
  className,
  onLoad,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef();

  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    setHasError(true);
  };

  return (
    <ImageContainer className={className}>
      {/* Placeholder */}
      <motion.div
        animate={{ opacity: isLoaded ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: placeholder || 'linear-gradient(45deg, #f0f0f0, #e0e0e0)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem'
        }}
      >
        {!hasError ? '📷' : '❌'}
      </motion.div>

      {/* Actual Image */}
      <motion.img
        ref={imgRef}
        src={src}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 1.1 }}
        transition={{ duration: 0.5 }}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
        {...props}
      />

      {/* Loading Spinner */}
      {!isLoaded && !hasError && (
        <LoadingSpinner>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            ⏳
          </motion.div>
        </LoadingSpinner>
      )}
    </ImageContainer>
  );
};

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 15px;
`;

const LoadingSpinner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
`;

// Advanced Card Component with 3D Transform
const Card3D = ({ children, className, ...props }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef();

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const rotateXValue = (e.clientY - centerY) / 10;
    const rotateYValue = (centerX - e.clientX) / 10;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <Card3DContainer
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={className}
      {...props}
    >
      {children}
    </Card3DContainer>
  );
};

const Card3DContainer = styled(motion.div)`
  perspective: 1000px;
  transform-style: preserve-3d;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

// Morphing Shape Component
const MorphingShape = ({ shapes = ['circle', 'heart', 'star'], interval = 3000 }) => {
  const [currentShape, setCurrentShape] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentShape(prev => (prev + 1) % shapes.length);
    }, interval);

    return () => clearInterval(timer);
  }, [shapes.length, interval]);

  const getShapePath = (shape) => {
    switch (shape) {
      case 'circle':
        return 'M 50,50 m -40,0 a 40,40 0 1,0 80,0 a 40,40 0 1,0 -80,0';
      case 'heart':
        return 'M 50,30 C 50,25 45,15 35,15 C 25,15 20,25 20,30 C 20,35 25,45 50,70 C 75,45 80,35 80,30 C 80,25 75,15 65,15 C 55,15 50,25 50,30 Z';
      case 'star':
        return 'M 50,10 L 60,35 L 85,35 L 67,52 L 75,80 L 50,65 L 25,80 L 33,52 L 15,35 L 40,35 Z';
      default:
        return 'M 50,50 m -40,0 a 40,40 0 1,0 80,0 a 40,40 0 1,0 -80,0';
    }
  };

  return (
    <MorphingSVG
      width="100"
      height="100"
      viewBox="0 0 100 100"
      animate={{
        scale: [1, 1.1, 1],
        rotate: [0, 360]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <motion.path
        d={getShapePath(shapes[currentShape])}
        fill="url(#gradient)"
        animate={{
          d: getShapePath(shapes[currentShape])
        }}
        transition={{
          duration: 0.8,
          ease: "easeInOut"
        }}
      />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff6b6b" />
          <stop offset="100%" stopColor="#feca57" />
        </linearGradient>
      </defs>
    </MorphingSVG>
  );
};

const MorphingSVG = styled(motion.svg)`
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
`;

export {
  ParticleSystem,
  AnimatedText,
  RippleButton,
  ProgressiveImage,
  Card3D,
  MorphingShape
};
