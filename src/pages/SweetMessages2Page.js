import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PageContainer = styled(motion.div)`
  min-height: 100vh;
  padding: 80px 20px 20px;
  background: linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  color: #333;
  margin-bottom: 3rem;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
  font-family: 'Dancing Script', cursive;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const LoveDeclaration = styled(motion.div)`
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  max-width: 800px;
  margin-bottom: 2rem;
`;

const DeclarationPhotos = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
  
  .love-photo {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid rgba(255, 255, 255, 0.5);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.1) rotate(5deg);
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    
    .love-photo {
      width: 120px;
      height: 120px;
    }
  }
`;

const BigHeart = styled.div`
  font-size: 6rem;
  color: #e74c3c;
  margin: 2rem 0;
  position: relative;
  
  &.rainbow-heart {
    animation: rainbow 3s linear infinite, heartbeat 2s ease-in-out infinite;
  }
  
  .heart-rays {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    
    span {
      position: absolute;
      width: 3px;
      height: 30px;
      background: linear-gradient(45deg, #ff6b6b, #feca57);
      border-radius: 2px;
      animation: rays 2s ease-in-out infinite;
    }
    
    span:nth-child(1) { transform: rotate(0deg) translateY(-40px); }
    span:nth-child(2) { transform: rotate(90deg) translateY(-40px); }
    span:nth-child(3) { transform: rotate(180deg) translateY(-40px); }
    span:nth-child(4) { transform: rotate(270deg) translateY(-40px); }
  }

  @keyframes rainbow {
    0% { color: #e74c3c; }
    16% { color: #e67e22; }
    33% { color: #f1c40f; }
    50% { color: #2ecc71; }
    66% { color: #3498db; }
    83% { color: #9b59b6; }
    100% { color: #e74c3c; }
  }

  @keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }

  @keyframes rays {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; }
  }
`;

const DeclarationText = styled.div`
  h2 {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 2rem;
    font-family: 'Playfair Display', serif;
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
  
  .main-love-text {
    font-size: 1.3rem;
    color: #555;
    line-height: 1.8;
    text-align: left;
    
    @media (max-width: 768px) {
      font-size: 1.1rem;
      text-align: center;
    }
    
    strong {
      color: #e74c3c;
      font-size: 1.5rem;
      display: block;
      margin: 1rem 0;
      text-align: center;
    }
  }
`;

const FloatingHearts = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  
  .floating-heart {
    position: absolute;
    font-size: 2rem;
    color: rgba(231, 76, 60, 0.3);
    animation: float-up 8s linear infinite;
  }
  
  .floating-heart:nth-child(1) { left: 10%; animation-delay: 0s; }
  .floating-heart:nth-child(2) { left: 30%; animation-delay: 2s; }
  .floating-heart:nth-child(3) { left: 50%; animation-delay: 4s; }
  .floating-heart:nth-child(4) { left: 70%; animation-delay: 6s; }
  .floating-heart:nth-child(5) { left: 90%; animation-delay: 8s; }

  @keyframes float-up {
    0% { 
      transform: translateY(100vh) rotate(0deg); 
      opacity: 0; 
    }
    10%, 90% { 
      opacity: 1; 
    }
    100% { 
      transform: translateY(-100px) rotate(360deg); 
      opacity: 0; 
    }
  }
`;

const SweetMessages2Page = () => {
  return (
    <PageContainer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6 }}
    >
      <FloatingHearts>
        <div className="floating-heart">💕</div>
        <div className="floating-heart">💖</div>
        <div className="floating-heart">💝</div>
        <div className="floating-heart">💗</div>
        <div className="floating-heart">💓</div>
      </FloatingHearts>

      <Title
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        💌 ข้อความหวานๆ ต่อ 💌
      </Title>

      <LoveDeclaration
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <DeclarationPhotos>
          <img 
            src="/images/DB4B22BD-08D4-4B6A-9712-5CA09E5014AB.jpg" 
            alt="ภาพหวาน" 
            className="love-photo" 
          />
          <img 
            src="/images/F2BA042D-505E-4CE3-95F5-A78C6E919F9D.jpg" 
            alt="ภาพหวาน 2" 
            className="love-photo" 
          />
        </DeclarationPhotos>

        <BigHeart className="rainbow-heart">
          <i className="fas fa-heart"></i>
          <div className="heart-rays">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </BigHeart>

        <DeclarationText>
          <h2>โดนัท สุภิชยา ชีพสูงเนิน</h2>
          <p className="main-love-text">
            จากวันที่เราได้พบกันที่โรงเรียน<br />
            จากเพื่อนห้องเดียวกัน<br />
            กลายเป็นคนสำคัญในชีวิต<br /><br />
            
            เธอทำให้เค้ารู้ว่าความรักคืออะไร<br />
            ความอบอุ่น ความเข้าใจ<br />
            และความสุขที่แท้จริง<br /><br />
            
            <strong>เค้าชอบเธอมากมากนะ ❤️</strong>
            และจะยังเป็นแบบนี้ไปตลอดเสมอ
          </p>
        </DeclarationText>
      </LoveDeclaration>
    </PageContainer>
  );
};

export default SweetMessages2Page;
