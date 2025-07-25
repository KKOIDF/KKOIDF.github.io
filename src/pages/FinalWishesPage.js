import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PageContainer = styled(motion.div)`
  min-height: 100vh;
  padding: 80px 20px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  color: #fff;
  margin-bottom: 3rem;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
  font-family: 'Dancing Script', cursive;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const FinalWishes = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  max-width: 900px;
  margin-bottom: 3rem;
`;

const FinalPhotos = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  .final-photo {
    width: 120px;
    height: 120px;
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
    flex-wrap: wrap;
    gap: 1rem;
    
    .final-photo {
      width: 100px;
      height: 100px;
    }
  }
`;

const WishSparkle = styled.div`
  font-size: 4rem;
  color: #ffeaa7;
  margin: 2rem 0;
  
  i {
    animation: sparkle-magic 3s ease-in-out infinite;
    filter: drop-shadow(0 0 10px rgba(255, 234, 167, 0.8));
  }

  @keyframes sparkle-magic {
    0%, 100% { transform: rotate(0deg) scale(1); }
    25% { transform: rotate(90deg) scale(1.1); }
    50% { transform: rotate(180deg) scale(1.2); }
    75% { transform: rotate(270deg) scale(1.1); }
  }
`;

const FinalText = styled.div`
  .big-wish {
    font-size: 1.3rem;
    color: #fff;
    line-height: 1.8;
    margin-bottom: 2rem;
    
    @media (max-width: 768px) {
      font-size: 1.1rem;
    }
    
    .highlight {
      color: #ffeaa7;
      font-weight: bold;
      font-size: 1.4rem;
      text-shadow: 0 0 10px rgba(255, 234, 167, 0.5);
      
      @media (max-width: 768px) {
        font-size: 1.2rem;
      }
    }
  }
`;

const Signature = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  padding-top: 1.5rem;
  margin-top: 2rem;
  
  p {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.9);
    margin: 0.5rem 0;
    
    &.from {
      font-size: 1.2rem;
      color: #ffeaa7;
      font-weight: bold;
      margin-top: 1rem;
    }
  }
`;

const RestartSection = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;

const ActionButton = styled(motion.button)`
  background: linear-gradient(45deg, #ff6b6b, #feca57);
  border: none;
  padding: 15px 30px;
  border-radius: 50px;
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(255, 107, 107, 0.3);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 40px rgba(255, 107, 107, 0.4);
  }
  
  &.surprise-btn {
    background: linear-gradient(45deg, #6c5ce7, #a29bfe);
    box-shadow: 0 10px 30px rgba(108, 92, 231, 0.3);
    
    &:hover {
      box-shadow: 0 15px 40px rgba(108, 92, 231, 0.4);
    }
  }
`;

const FloatingWishes = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  
  .wish-star {
    position: absolute;
    font-size: 1.5rem;
    color: rgba(255, 234, 167, 0.6);
    animation: wish-float 6s ease-in-out infinite;
  }
  
  .wish-star:nth-child(1) { left: 5%; top: 10%; animation-delay: 0s; }
  .wish-star:nth-child(2) { right: 5%; top: 20%; animation-delay: 1s; }
  .wish-star:nth-child(3) { left: 10%; bottom: 30%; animation-delay: 2s; }
  .wish-star:nth-child(4) { right: 10%; bottom: 20%; animation-delay: 3s; }
  .wish-star:nth-child(5) { left: 50%; top: 5%; animation-delay: 4s; }
  .wish-star:nth-child(6) { right: 30%; top: 60%; animation-delay: 5s; }

  @keyframes wish-float {
    0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
    50% { transform: translateY(-30px) rotate(180deg); opacity: 1; }
  }
`;

const FinalWishesPage = ({ onNavigate, onRestart }) => {
  const handleSurprise = () => {
    // Add surprise functionality here
    alert('🎁 เซอร์ไพรส์! ขอบคุณที่อ่านจนจบนะคะ 💕');
  };

  return (
    <PageContainer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6 }}
    >
      <FloatingWishes>
        <div className="wish-star">✨</div>
        <div className="wish-star">🌟</div>
        <div className="wish-star">💫</div>
        <div className="wish-star">⭐</div>
        <div className="wish-star">✨</div>
        <div className="wish-star">🌟</div>
      </FloatingWishes>

      <Title
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        ✨ ความปรารถนาจากใจ ✨
      </Title>

      <FinalWishes
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <FinalPhotos>
          <img 
            src="/images/F6E7E2C5-67D0-4F28-B45A-872F931A251B.jpg" 
            alt="ภาพสุดท้าย" 
            className="final-photo" 
          />
          <img 
            src="/images/F8A10545-5084-479E-9D49-7FFAD75D4BC3.jpg" 
            alt="ภาพสุดท้าย 2" 
            className="final-photo" 
          />
          <img 
            src="/images/FD32625C-E454-42C4-8A1D-0A2DDCC75209.jpg" 
            alt="ภาพสุดท้าย 3" 
            className="final-photo" 
          />
        </FinalPhotos>

        <WishSparkle>
          <i className="fas fa-magic"></i>
        </WishSparkle>

        <FinalText>
          <p className="big-wish">
            ขอให้โดนัท สุภิชยา<br />
            มีความสุขมากมายตลอดไป<br />
            สุขภาพแข็งแรง ไม่เจ็บไม่ป่วย<br />
            การเรียนราบรื่น ได้เกรดดีๆ<br />
            มีคนห่วงใยและคนที่ห่วงใยเธอ<br />
            อยู่เคียงข้างเสมอ<br /><br />
            
            <span className="highlight">เธอคือดาวดวงสำคัญในชีวิตเค้า</span><br />
            <span className="highlight">และจะเป็นแบบนั้นไปตลอด</span>
          </p>
          
          <Signature>
            <p>ด้วยความห่วงใยอันไม่มีที่สิ้นสุด</p>
            <p className="from">💕 จากคนที่ห่วงใยเธอมากที่สุด 💕</p>
          </Signature>
        </FinalText>
      </FinalWishes>
      
      <RestartSection>
        <ActionButton
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate && onNavigate(1)}
        >
          <i className="fas fa-redo"></i> อ่านอีกรอบ
        </ActionButton>
        
        <ActionButton
          className="surprise-btn"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSurprise}
        >
          <i className="fas fa-gift"></i> เซอร์ไพรส์! 🎁
        </ActionButton>
      </RestartSection>
    </PageContainer>
  );
};

export default FinalWishesPage;
