import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useIntersectionObserver } from '../hooks';
import withPageEnhancements, { 
  LazyImage 
} from '../hoc/withPageEnhancements';

const PageContainer = styled(motion.div)`
  min-height: 100vh;
  padding: 80px 20px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const HeroImage = styled(motion.div)`
  margin-bottom: 2rem;
  position: relative;
  
  .main-photo {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    object-fit: cover;
    border: 5px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.05);
    }
    
    @media (max-width: 768px) {
      width: 250px;
      height: 250px;
    }
  }
`;

const HeartAnimation = styled(motion.div)`
  font-size: 3rem;
  color: #ff6b6b;
  margin: 1rem 0;
  
  i {
    animation: heartbeat 1.5s ease-in-out infinite;
  }
  
  @keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
  }
`;

const MainTitle = styled(motion.h1)`
  font-size: 4rem;
  color: #fff;
  margin-bottom: 1rem;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
  font-family: 'Dancing Script', cursive;
  background: linear-gradient(45deg, #fff, #feca57, #ff6b6b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.h2)`
  font-size: 2rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
  font-family: 'Playfair Display', serif;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const RomanticText = styled(motion.p)`
  font-size: 1.4rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 3rem;
  max-width: 600px;
  line-height: 1.8;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const MagicBtn = styled(motion.button)`
  background: linear-gradient(45deg, #ff6b6b, #feca57);
  border: none;
  padding: 15px 30px;
  border-radius: 50px;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(255, 107, 107, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover:before {
    left: 100%;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 40px rgba(255, 107, 107, 0.4);
  }
  
  .sparkles {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    
    .sparkle {
      position: absolute;
      animation: sparkle 2s linear infinite;
    }
    
    .sparkle:nth-child(1) { top: 20%; left: 20%; animation-delay: 0s; }
    .sparkle:nth-child(2) { top: 50%; right: 20%; animation-delay: 0.5s; }
    .sparkle:nth-child(3) { bottom: 20%; left: 50%; animation-delay: 1s; }
  }
  
  @keyframes sparkle {
    0%, 100% { opacity: 0; transform: scale(0); }
    50% { opacity: 1; transform: scale(1); }
  }
`;

const FloatingHearts = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  
  .heart {
    position: absolute;
    font-size: 2rem;
    color: rgba(255, 192, 203, 0.6);
    animation: float 6s ease-in-out infinite;
  }
  
  .heart:nth-child(1) { left: 10%; animation-delay: 0s; }
  .heart:nth-child(2) { left: 20%; animation-delay: 1s; }
  .heart:nth-child(3) { left: 70%; animation-delay: 2s; }
  .heart:nth-child(4) { left: 80%; animation-delay: 3s; }
  .heart:nth-child(5) { left: 50%; animation-delay: 4s; }
  
  @keyframes float {
    0%, 100% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
    10%, 90% { opacity: 1; }
    50% { transform: translateY(-100px) rotate(180deg); }
  }
`;

const WelcomePage = ({ navigateWithTransition }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const controls = useAnimation();
  const [titleRef, titleInView] = useIntersectionObserver({ threshold: 0.5 });

  // Advanced animation sequence
  useEffect(() => {
    if (titleInView) {
      controls.start({
        scale: [1, 1.05, 1],
        rotate: [0, 1, -1, 0],
        transition: { duration: 3, repeat: Infinity, repeatDelay: 2 }
      });
    }
  }, [titleInView, controls]);

  const handleNextPage = () => {
    if (navigateWithTransition) {
      navigateWithTransition(2);
    }
  };

  return (
    <PageContainer
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6 }}
    >
      <FloatingHearts>
        <div className="heart">💕</div>
        <div className="heart">💖</div>
        <div className="heart">💗</div>
        <div className="heart">💘</div>
        <div className="heart">💝</div>
      </FloatingHearts>

      <HeroImage
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        whileHover={{ scale: 1.05 }}
      >
        <LazyImage
          src="/images/24752523-3574-48A1-9DD3-A47FC749B8DA.jpg"
          alt="ภาพสวยๆ"
          className="main-photo"
          onLoad={() => setImageLoaded(true)}
        />
      </HeroImage>

      <HeartAnimation
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <i className="fas fa-heart"></i>
      </HeartAnimation>

      <MainTitle
        ref={titleRef}
        animate={controls}
        initial={{ y: -50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        ถึงโดนัท
      </MainTitle>

      <Subtitle
        initial={{ y: -30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        สุภิชยา ชีพสูงเนิน
      </Subtitle>

      <RomanticText
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        จากวันที่เราได้พบกันที่โรงเรียน<br />
        ในฐานะเพื่อนห้องเดียวกัน<br />
        ชีวิตของเค้าได้เปลี่ยนไปตลอดกาล ✨
      </RomanticText>

      <MagicBtn
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleNextPage}
      >
        <i className="fas fa-heart"></i> เริ่มต้นการเดินทางแห่งความรัก
        <div className="sparkles">
          <span className="sparkle">✨</span>
          <span className="sparkle">💖</span>
          <span className="sparkle">⭐</span>
        </div>
      </MagicBtn>
    </PageContainer>
  );
};

export default withPageEnhancements(WelcomePage, {
  preloadImages: true,
  lazyLoad: true,
  animationDelay: 0.2
});
