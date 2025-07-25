import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useAppState, useNavigation, useUI, useInteractive, usePreferences } from '../store/AppStateManager';
import { AnimatedText, RippleButton, ProgressiveImage, Card3D, ParticleSystem } from '../components/AdvancedComponents';
import { useIntersectionObserver, useLocalStorage } from '../hooks';
import withPageEnhancements from '../hoc/withPageEnhancements';

const WelcomePageEnhanced = () => {
  const { currentPage } = useNavigation();
  const { incrementInteraction, particleType } = useInteractive();
  const { animationsEnabled, theme } = usePreferences();
  const { openLightbox } = useUI();
  
  // Advanced state management
  const [isVisible, setIsVisible] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useLocalStorage('welcomePage_interacted', false);
  
  // Refs and animations
  const containerRef = useRef();
  const controls = useAnimation();
  const [titleRef, titleInView] = useIntersectionObserver({ threshold: 0.5 });
  const [contentRef, contentInView] = useIntersectionObserver({ threshold: 0.3 });

  // Welcome messages rotation
  const welcomeMessages = [
    "ยินดีต้อนรับสู่โลกของเรา 💕",
    "ที่นี่เต็มไปด้วยความรักที่มีให้เธอ ❤️",
    "ทุกหน้าที่นี่คือความทรงจำดีๆ ของเรา 🌟",
    "เธอคือหัวใจของทุกอย่างที่นี่ 💖",
    "ขอบคุณที่เป็นส่วนหนึ่งในชีวิตของฉัน 🥰"
  ];

  // Image gallery for lightbox
  const galleryImages = [
    { id: 1, src: '/images/DigitalCover-op.jpg', alt: 'ภาพปก', title: 'ความทรงจำพิเศษ' },
    { id: 2, src: '/images/F2BA042D-505E-4CE3-95F5-A78C6E919F9D.jpg', alt: 'ความทรงจำ 1', title: 'วันที่สวยงาม' },
    { id: 3, src: '/images/B6457B93-4DF7-42F9-9A54-AC334FCE13DF.jpg', alt: 'ความทรงจำ 2', title: 'ช่วงเวลาแห่งรัก' }
  ];

  // Auto-rotate welcome messages
  useEffect(() => {
    if (!animationsEnabled) return;
    
    const interval = setInterval(() => {
      setCurrentMessageIndex(prev => (prev + 1) % welcomeMessages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [welcomeMessages.length, animationsEnabled]);

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      controls.start("visible");
    }, 500);

    return () => clearTimeout(timer);
  }, [controls]);

  // Intersection observer effects
  useEffect(() => {
    if (titleInView && !hasInteracted) {
      setHasInteracted(true);
      incrementInteraction();
    }
  }, [titleInView, hasInteracted, incrementInteraction, setHasInteracted]);

  // Handle image click
  const handleImageClick = useCallback((image, images) => {
    openLightbox(image, images);
    incrementInteraction();
  }, [openLightbox, incrementInteraction]);

  // Handle navigation button click
  const handleNavigate = useCallback((direction) => {
    incrementInteraction();
    // Navigation logic would go here
  }, [incrementInteraction]);

  // Interactive background click
  const handleBackgroundClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      incrementInteraction();
      
      // Create ripple effect at click position
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Add a temporary particle effect at click position
      const ripple = document.createElement('div');
      ripple.style.position = 'absolute';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.style.width = '20px';
      ripple.style.height = '20px';
      ripple.style.background = 'rgba(255, 107, 107, 0.5)';
      ripple.style.borderRadius = '50%';
      ripple.style.pointerEvents = 'none';
      ripple.style.animation = 'ripple-effect 0.6s ease-out forwards';
      
      e.currentTarget.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    }
  }, [incrementInteraction]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
    }
  };

  return (
    <WelcomeContainer
      ref={containerRef}
      onClick={handleBackgroundClick}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      {/* Background Particles */}
      {animationsEnabled && (
        <ParticleSystem count={30} type={particleType} />
      )}

      {/* Header Section */}
      <HeaderSection>
        <motion.div ref={titleRef} variants={itemVariants}>
          <MainTitle>
            <AnimatedText 
              animation="typewriter" 
              speed={150}
              className="main-title"
            >
              สวัสดีครับ โดนัท 🍩
            </AnimatedText>
          </MainTitle>
        </motion.div>

        <motion.div variants={itemVariants}>
          <SubTitle>
            <AnimatedText 
              animation="fadeIn"
              className="sub-title"
            >
              {welcomeMessages[currentMessageIndex]}
            </AnimatedText>
          </SubTitle>
        </motion.div>
      </HeaderSection>

      {/* Content Section */}
      <ContentSection ref={contentRef}>
        <motion.div variants={itemVariants}>
          <Card3D className="intro-card">
            <IntroContent>
              <ProfileImageContainer>
                <ProgressiveImage
                  src="/images/DigitalCover-op.jpg"
                  alt="รูปของเรา"
                  placeholder="linear-gradient(45deg, #ff6b6b, #feca57)"
                  onLoad={() => incrementInteraction()}
                  onClick={() => handleImageClick(galleryImages[0], galleryImages)}
                />
              </ProfileImageContainer>
              
              <IntroText>
                <AnimatedText animation="fadeIn">
                  วันนี้วันที่ 21 มกราคม 2568 เป็นวันครบรอบที่เราได้รู้จักกันมา 1 ปี 1 เดือน 24 วัน
                  และวันนี้เป็นวันเกิดของเธอด้วยนะ วันที่พิเศษที่สุดของปี 🎂
                </AnimatedText>
              </IntroText>

              <ActionButtons>
                <RippleButton 
                  onClick={() => handleNavigate('next')}
                  className="primary-button"
                >
                  เริ่มต้นการเดินทาง ✨
                </RippleButton>
                
                <RippleButton 
                  onClick={() => handleImageClick(galleryImages[0], galleryImages)}
                  className="secondary-button"
                >
                  ดูรูปภาพ 📸
                </RippleButton>
              </ActionButtons>
            </IntroContent>
          </Card3D>
        </motion.div>

        {/* Feature Cards */}
        <FeatureGrid>
          {[
            { icon: '🎂', title: 'วันเกิดของเธอ', desc: 'วันพิเศษที่สุดในปี' },
            { icon: '❤️', title: 'สิ่งที่ชอบ', desc: 'ทุกอย่างที่เธอรัก' },
            { icon: '📸', title: 'ภาพความทรงจำ', desc: 'ช่วงเวลาดีๆ ของเรา' },
            { icon: '💌', title: 'ข้อความรัก', desc: 'คำหวานๆ ที่มีให้เธอ' }
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <FeatureCard onClick={() => handleNavigate(feature.title)}>
                <FeatureIcon>{feature.icon}</FeatureIcon>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDesc>
                  <AnimatedText animation="fadeIn">
                    {feature.desc}
                  </AnimatedText>
                </FeatureDesc>
              </FeatureCard>
            </motion.div>
          ))}
        </FeatureGrid>
      </ContentSection>

      {/* Footer Message */}
      <FooterSection>
        <motion.div variants={itemVariants}>
          <FooterMessage>
            <AnimatedText animation="typewriter" speed={80}>
              ขอให้เธอมีความสุขมากๆ ในวันเกิดนี้นะครับ ❤️
              และขอบคุณที่เป็นส่วนหนึ่งในชีวิตของผม 🥰
            </AnimatedText>
          </FooterMessage>
        </motion.div>
      </FooterSection>

      {/* Floating Action Button */}
      <FloatingButton
        as={motion.div}
        whileHover={{ scale: 1.1, rotate: 360 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => handleNavigate('menu')}
        title="เมนูหลัก"
      >
        💝
      </FloatingButton>

      {/* Add CSS for ripple effect */}
      <style jsx>{`
        @keyframes ripple-effect {
          to {
            transform: scale(20);
            opacity: 0;
          }
        }
      `}</style>
    </WelcomeContainer>
  );
};

// Styled Components
const WelcomeContainer = styled(motion.div)`
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  position: relative;
  overflow: hidden;
  cursor: pointer;
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  z-index: 2;
`;

const MainTitle = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4rem);
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #ff6b6b, #feca57);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: bold;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const SubTitle = styled.h2`
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
  font-weight: 300;
`;

const ContentSection = styled.div`
  max-width: 800px;
  width: 100%;
  z-index: 2;
`;

const IntroContent = styled.div`
  text-align: center;
  padding: 2rem;
`;

const ProfileImageContainer = styled.div`
  width: 200px;
  height: 200px;
  margin: 0 auto 2rem;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const IntroText = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
  text-align: center;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;

  .primary-button {
    background: linear-gradient(45deg, #ff6b6b, #feca57);
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 25px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
  }

  .secondary-button {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.3);
    padding: 1rem 2rem;
    border-radius: 25px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-5px);
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.2rem;
  color: white;
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const FeatureDesc = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  line-height: 1.4;
`;

const FooterSection = styled.div`
  margin-top: 3rem;
  text-align: center;
  z-index: 2;
`;

const FooterMessage = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  max-width: 600px;
`;

const FloatingButton = styled.div`
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  width: 60px;
  height: 60px;
  background: linear-gradient(45deg, #ff6b6b, #feca57);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(255, 107, 107, 0.4);
  z-index: 100;
`;

export default withPageEnhancements(WelcomePageEnhanced);
