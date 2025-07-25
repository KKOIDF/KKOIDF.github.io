import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const LightboxOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  cursor: pointer;
`;

const LightboxContent = styled(motion.div)`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  cursor: default;
`;

const LightboxImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: -50px;
  right: 0;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  font-size: 2rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const NavigationButton = styled(motion.button)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  font-size: 2rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  z-index: 10;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PrevButton = styled(NavigationButton)`
  left: -80px;

  @media (max-width: 768px) {
    left: 10px;
  }
`;

const NextButton = styled(NavigationButton)`
  right: -80px;

  @media (max-width: 768px) {
    right: 10px;
  }
`;

const ImageCounter = styled(motion.div)`
  position: absolute;
  bottom: -50px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 1.2rem;
  background: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 25px;
  backdrop-filter: blur(10px);
`;

const Lightbox = ({ isOpen, imageSrc, imageIndex, totalImages, onClose, onNext, onPrev }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') onPrev();
    if (e.key === 'ArrowRight') onNext();
  };

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyPress);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <LightboxOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleOverlayClick}
        >
          <LightboxContent
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ✕
            </CloseButton>

            <PrevButton
              onClick={onPrev}
              disabled={imageIndex === 0}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ‹
            </PrevButton>

            <NextButton
              onClick={onNext}
              disabled={imageIndex === totalImages - 1}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ›
            </NextButton>

            <LightboxImage
              src={imageSrc}
              alt="Gallery Image"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />

            <ImageCounter
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              {imageIndex + 1} / {totalImages}
            </ImageCounter>
          </LightboxContent>
        </LightboxOverlay>
      )}
    </AnimatePresence>
  );
};

export default Lightbox;
