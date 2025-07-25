import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PageContainer = styled(motion.div)`
  min-height: 100vh;
  padding: 80px 20px 20px;
  background: linear-gradient(135deg, #1a0033 0%, #4a0080 50%, #8a2be2 100%);
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
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="hearts" patternUnits="userSpaceOnUse" width="30" height="30"><text x="15" y="20" text-anchor="middle" font-size="12" fill="rgba(255,105,180,0.1)">💜</text></pattern></defs><rect width="100" height="100" fill="url(%23hearts)"/></svg>');
    animation: pulse 8s ease-in-out infinite;
    pointer-events: none;
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.2; }
    50% { opacity: 0.4; }
  }
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  color: #ff69b4;
  margin-bottom: 3rem;
  text-shadow: 0 0 30px rgba(255, 105, 180, 0.8);
  font-family: 'Dancing Script', cursive;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const MagicScroll = styled(motion.div)`
  background: linear-gradient(45deg, #4a0080, #8a2be2);
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 
    0 0 50px rgba(255, 105, 180, 0.3),
    inset 0 0 30px rgba(0, 0, 0, 0.3);
  border: 3px solid #ff69b4;
  max-width: 800px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    animation: magicSweep 4s linear infinite;
  }

  @keyframes magicSweep {
    0% { left: -100%; }
    100% { left: 100%; }
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

const FloatingMagic = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
`;

const MagicElement = styled(motion.div)`
  position: absolute;
  font-size: 2.5rem;
  z-index: 1;
`;

const SecretMessage2Page = () => {
  const magicElements = [
    { emoji: '🔮', top: '10%', left: '15%' },
    { emoji: '✨', top: '20%', right: '10%' },
    { emoji: '🌙', bottom: '15%', left: '10%' },
    { emoji: '⭐', bottom: '25%', right: '15%' },
    { emoji: '💫', top: '45%', left: '8%' },
    { emoji: '🌟', top: '65%', right: '12%' },
    { emoji: '🔯', top: '35%', right: '5%' },
    { emoji: '💜', bottom: '35%', left: '5%' }
  ];

  return (
    <PageContainer
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.8 }}
    >
      <FloatingMagic>
        {magicElements.map((element, index) => (
          <MagicElement
            key={index}
            style={{
              top: element.top,
              bottom: element.bottom,
              left: element.left,
              right: element.right
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 5,
              delay: index * 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {element.emoji}
          </MagicElement>
        ))}
      </FloatingMagic>

      <Title
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        🔮 ข้อความลับฉบับที่ 2 🔮
      </Title>

      <MagicScroll
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.6, duration: 1.2, type: "spring", stiffness: 80 }}
        whileHover={{ scale: 1.02 }}
      >
        <SecretMessage
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          🌙 "ในคืนที่ดาวเต็มฟ้า ฉันขอพรให้เธอมีความสุขตลอดไป" 🌙
        </SecretMessage>

        <SecretMessage
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.9, duration: 0.8 }}
        >
          💜 "หัวใจฉันเต้นเป็นจังหวะเมื่อได้อยู่ใกล้เธอ" 💜
        </SecretMessage>

        <SecretMessage
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.3, duration: 0.8 }}
        >
          🔯 "เธอคือคำตอบของทุกคำถามที่ฉันเคยมี" 🔯
        </SecretMessage>

        <SecretMessage
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.7, duration: 0.8 }}
        >
          ✨ "ขอให้ความรักของเราเปล่งประกายไปตลอดกาล" ✨
        </SecretMessage>

        <SecretMessage
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.1, duration: 0.8 }}
        >
          💫 "เธอทำให้ฉันเชื่อในเวทมนตร์แห่งความรัก" 💫
        </SecretMessage>
      </MagicScroll>
    </PageContainer>
  );
};

export default SecretMessage2Page;
