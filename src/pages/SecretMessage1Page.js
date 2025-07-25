import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PageContainer = styled(motion.div)`
  min-height: 100vh;
  padding: 80px 20px 20px;
  background: linear-gradient(135deg, #2c1810 0%, #8b4513 50%, #daa520 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="stars" patternUnits="userSpaceOnUse" width="25" height="25"><text x="12" y="18" text-anchor="middle" font-size="10" fill="rgba(255,223,0,0.1)">⭐</text></pattern></defs><rect width="100" height="100" fill="url(%23stars)"/></svg>');
    animation: twinkle 10s ease-in-out infinite;
    pointer-events: none;
  }

  @keyframes twinkle {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.6; }
  }
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  color: #ffd700;
  margin-bottom: 3rem;
  text-shadow: 0 0 30px rgba(255, 215, 0, 0.8);
  font-family: 'Dancing Script', cursive;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const TreasureBox = styled(motion.div)`
  background: linear-gradient(45deg, #8b4513, #daa520);
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 
    0 0 50px rgba(255, 215, 0, 0.3),
    inset 0 0 30px rgba(0, 0, 0, 0.2);
  border: 3px solid #ffd700;
  max-width: 800px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      transparent,
      rgba(255, 215, 0, 0.1),
      transparent
    );
    animation: shine 3s linear infinite;
  }

  @keyframes shine {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const SecretMessage = styled(motion.p)`
  font-size: 1.4rem;
  color: #fff;
  line-height: 1.8;
  margin: 1.5rem 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  font-style: italic;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const GemContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
`;

const FloatingGem = styled(motion.div)`
  position: absolute;
  font-size: 2rem;
  z-index: 1;
`;

const SecretMessage1Page = () => {
  const gems = [
    { emoji: '💎', top: '15%', left: '10%' },
    { emoji: '🔮', top: '25%', right: '15%' },
    { emoji: '👑', bottom: '20%', left: '20%' },
    { emoji: '⭐', bottom: '30%', right: '10%' },
    { emoji: '✨', top: '50%', left: '5%' },
    { emoji: '🌟', top: '70%', right: '8%' }
  ];

  return (
    <PageContainer
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.8 }}
    >
      <GemContainer>
        {gems.map((gem, index) => (
          <FloatingGem
            key={index}
            style={{
              top: gem.top,
              bottom: gem.bottom,
              left: gem.left,
              right: gem.right
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 15, -15, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 4,
              delay: index * 0.7,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {gem.emoji}
          </FloatingGem>
        ))}
      </GemContainer>

      <Title
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        💝 ข้อความลับฉบับที่ 1 💝
      </Title>

      <TreasureBox
        initial={{ scale: 0, rotate: 180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.6, duration: 1, type: "spring", stiffness: 100 }}
        whileHover={{ scale: 1.02 }}
      >
        <SecretMessage
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          🌟 "ในโลกที่เต็มไปด้วยผู้คน เธอคือดาวที่ส่องแสงสว่างที่สุด" 🌟
        </SecretMessage>

        <SecretMessage
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          💫 "ทุกครั้งที่ยิ้ม ใจฉันก็เต้นเร็วขึ้น ราวกับได้พบกับความมหัศจรรย์" 💫
        </SecretMessage>

        <SecretMessage
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0, duration: 0.8 }}
        >
          🌈 "ขอบคุณที่ทำให้ชีวิตฉันมีสีสันและเต็มไปด้วยความหวัง" 🌈
        </SecretMessage>

        <SecretMessage
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 0.8 }}
        >
          ✨ "เธอคือของขวัญที่ดีที่สุดที่ชีวิตมอบให้ฉัน" ✨
        </SecretMessage>
      </TreasureBox>
    </PageContainer>
  );
};

export default SecretMessage1Page;
