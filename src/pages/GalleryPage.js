import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const PageContainer = styled(motion.div)`
  min-height: 100vh;
  padding: 80px 20px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  color: #fff;
  margin-bottom: 2rem;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
  font-family: 'Dancing Script', cursive;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const ControlsContainer = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const ModeButton = styled(motion.button)`
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  background: ${props => props.active ? 
    'linear-gradient(45deg, #ff6b6b, #feca57)' : 
    'rgba(255, 255, 255, 0.2)'};
  color: white;
  font-weight: bold;
  cursor: pointer;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(45deg, #ff6b6b, #feca57);
    transform: translateY(-2px);
  }
`;

const GalleryContainer = styled(motion.div)`
  width: 100%;
  max-width: 1200px;
  height: 600px;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    height: 400px;
    margin: 0 10px;
  }
`;

// 3D Carousel Mode
const CarouselContainer = styled.div`
  width: 100%;
  height: 100%;
  perspective: 1000px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CarouselWrapper = styled(motion.div)`
  position: relative;
  width: 300px;
  height: 400px;
  transform-style: preserve-3d;
`;

const CarouselImage = styled(motion.img)`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  cursor: pointer;
`;

// Infinite Scroll Mode
const ScrollContainer = styled(motion.div)`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const ScrollImage = styled(motion.img)`
  flex-shrink: 0;
  width: 300px;
  height: 100%;
  object-fit: cover;
  margin-right: 20px;
  border-radius: 15px;
  cursor: pointer;
`;

// Parallax Mode
const ParallaxContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

const ParallaxLayer = styled(motion.img)`
  position: absolute;
  width: 120%;
  height: 120%;
  object-fit: cover;
  border-radius: 15px;
  cursor: pointer;
`;

// Morphing Grid Mode
const GridContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  width: 100%;
  height: 100%;
  padding: 20px;
  overflow-y: auto;
`;

const GridImage = styled(motion.img)`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 15px;
  cursor: pointer;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
`;

const GalleryPage = ({ onOpenLightbox }) => {
  const [currentMode, setCurrentMode] = useState('carousel');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sample images (you'll need to replace with actual image paths)
  const images = [
    '/images/24752523-3574-48A1-9DD3-A47FC749B8DA.jpg',
    '/images/A426E87E-777C-496C-8848-66DDA9B01A2E.jpg',
    '/images/B6457B93-4DF7-42F9-9A54-AC334FCE13DF.jpg',
    '/images/BBE3E527-7FDD-477C-9206-06C35C9CEF55.jpg',
    '/images/BD6D86DC-4998-4A3D-A26A-90247D52BD5A.jpg',
    '/images/CCBE6973-5555-4ED3-8174-679BADCCF996.jpg',
    '/images/DB4B22BD-08D4-4B6A-9712-5CA09E5014AB.jpg',
    '/images/DigitalCover-op.jpg',
    '/images/F2BA042D-505E-4CE3-95F5-A78C6E919F9D.jpg',
    '/images/F6E7E2C5-67D0-4F28-B45A-872F931A251B.jpg',
    '/images/F8A10545-5084-479E-9D49-7FFAD75D4BC3.jpg',
    '/images/FD32625C-E454-42C4-8A1D-0A2DDCC75209.jpg',
    '/images/w644.jpg',
    '/images/w644 (1).jpg'
  ];

  const modes = [
    { id: 'carousel', name: '3D Carousel', icon: '🎠' },
    { id: 'scroll', name: 'Infinite Scroll', icon: '∞' },
    { id: 'parallax', name: 'Parallax', icon: '🌊' },
    { id: 'grid', name: 'Morphing Grid', icon: '▦' }
  ];

  const renderCarousel = () => {
    return (
      <CarouselContainer>
        <CarouselWrapper
          animate={{ rotateY: currentIndex * -60 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {images.slice(0, 6).map((image, index) => (
            <CarouselImage
              key={index}
              src={image}
              alt={`Gallery ${index + 1}`}
              style={{
                transform: `rotateY(${index * 60}deg) translateZ(250px)`
              }}
              onClick={() => onOpenLightbox(image, index)}
              whileHover={{ scale: 1.05 }}
            />
          ))}
        </CarouselWrapper>
      </CarouselContainer>
    );
  };

  const renderScroll = () => {
    return (
      <ScrollContainer>
        <motion.div
          style={{ display: 'flex' }}
          animate={{ x: -currentIndex * 320 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {[...images, ...images].map((image, index) => (
            <ScrollImage
              key={index}
              src={image}
              alt={`Gallery ${index + 1}`}
              onClick={() => onOpenLightbox(image, index % images.length)}
              whileHover={{ scale: 1.02, y: -10 }}
            />
          ))}
        </motion.div>
      </ScrollContainer>
    );
  };

  const renderParallax = () => {
    return (
      <ParallaxContainer>
        {images.slice(0, 3).map((image, index) => (
          <ParallaxLayer
            key={index}
            src={image}
            alt={`Gallery ${index + 1}`}
            style={{
              zIndex: 3 - index,
              left: `${index * 10}%`,
              top: `${index * 10}%`
            }}
            animate={{
              x: [0, -50, 0],
              y: [0, -30, 0]
            }}
            transition={{
              duration: 8 + index * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            onClick={() => onOpenLightbox(image, index)}
            whileHover={{ scale: 1.02 }}
          />
        ))}
      </ParallaxContainer>
    );
  };

  const renderGrid = () => {
    return (
      <GridContainer
        layout
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {images.map((image, index) => (
          <GridImage
            key={index}
            src={image}
            alt={`Gallery ${index + 1}`}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onOpenLightbox(image, index)}
            whileHover={{ 
              scale: 1.05, 
              rotate: Math.random() * 10 - 5,
              zIndex: 10
            }}
          />
        ))}
      </GridContainer>
    );
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <PageContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Title
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        🖼️ แกลเลอรี่ความทรงจำ 🖼️
      </Title>

      <ControlsContainer
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        {modes.map((mode) => (
          <ModeButton
            key={mode.id}
            active={currentMode === mode.id}
            onClick={() => setCurrentMode(mode.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {mode.icon} {mode.name}
          </ModeButton>
        ))}
      </ControlsContainer>

      <GalleryContainer
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <AnimatePresence mode="wait">
          {currentMode === 'carousel' && renderCarousel()}
          {currentMode === 'scroll' && renderScroll()}
          {currentMode === 'parallax' && renderParallax()}
          {currentMode === 'grid' && renderGrid()}
        </AnimatePresence>
      </GalleryContainer>
    </PageContainer>
  );
};

export default GalleryPage;
