import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PageContainer = styled(motion.div)`
  min-height: 100vh;
  padding: 80px 20px 20px;
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const BirthdayHeader = styled(motion.div)`
  margin-bottom: 3rem;
  
  h1 {
    font-size: 4rem;
    color: #fff;
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
    font-family: 'Dancing Script', cursive;
    margin-bottom: 1rem;
    
    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }
  
  .birthday-date {
    font-size: 2rem;
    color: rgba(255, 255, 255, 0.9);
    font-family: 'Playfair Display', serif;
    
    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }
`;

const BirthdayContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
`;

const BirthdayPhotos = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  
  .birthday-photo {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid rgba(255, 255, 255, 0.5);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    
    .birthday-photo {
      width: 120px;
      height: 120px;
    }
  }
`;

const CakeAnimation = styled.div`
  font-size: 6rem;
  margin: 2rem 0;
  position: relative;
  
  &.bounce-cake {
    animation: bounce 2s ease-in-out infinite;
  }
  
  .cake-sparkles {
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 0.5rem;
    
    span {
      font-size: 1.5rem;
      animation: sparkle 2s ease-in-out infinite;
    }
    
    span:nth-child(1) { animation-delay: 0s; }
    span:nth-child(2) { animation-delay: 0.5s; }
    span:nth-child(3) { animation-delay: 1s; }
    span:nth-child(4) { animation-delay: 1.5s; }
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }

  @keyframes sparkle {
    0%, 100% { opacity: 0; transform: scale(0.5); }
    50% { opacity: 1; transform: scale(1); }
  }
`;

const WishText = styled.p`
  font-size: 1.3rem;
  color: #fff;
  text-align: center;
  line-height: 1.8;
  margin-bottom: 2rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const WishesBox = styled.div`
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  
  h3 {
    font-size: 1.5rem;
    color: #fff;
    margin-bottom: 1rem;
    font-family: 'Playfair Display', serif;
  }
`;

const WishesList = styled.ul`
  list-style: none;
  padding: 0;
  
  li {
    font-size: 1.1rem;
    color: #fff;
    margin: 0.8rem 0;
    padding-left: 0;
    line-height: 1.6;
  }
`;

const Balloons = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  
  .balloon {
    position: absolute;
    font-size: 3rem;
    animation: float 4s ease-in-out infinite;
  }
  
  .balloon:nth-child(1) { left: 5%; top: 20%; animation-delay: 0s; color: #ff6b6b; }
  .balloon:nth-child(2) { right: 5%; top: 30%; animation-delay: 0.5s; color: #4ecdc4; }
  .balloon:nth-child(3) { left: 10%; top: 60%; animation-delay: 1s; color: #45b7d1; }
  .balloon:nth-child(4) { right: 10%; top: 70%; animation-delay: 1.5s; color: #f9ca24; }
  .balloon:nth-child(5) { left: 50%; top: 10%; animation-delay: 2s; color: #6c5ce7; }
  
  @keyframes float {
    0%, 100% { transform: translateY(0) rotate(-5deg); }
    50% { transform: translateY(-30px) rotate(5deg); }
  }
`;

const BirthdayPage = () => {
  return (
    <PageContainer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6 }}
    >
      <Balloons>
        <div className="balloon">🎈</div>
        <div className="balloon">🎈</div>
        <div className="balloon">🎈</div>
        <div className="balloon">🎈</div>
        <div className="balloon">🎈</div>
      </Balloons>

      <BirthdayHeader
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <h1>🎂 สุขสันต์วันเกิด 18 มีนาคม 🎂</h1>
      </BirthdayHeader>

      <BirthdayContent>
        <BirthdayPhotos>
          <img 
            src="/images/A426E87E-777C-496C-8848-66DDA9B01A2E.jpg" 
            alt="ภาพวันเกิด" 
            className="birthday-photo" 
          />
          <img 
            src="/images/B6457B93-4DF7-42F9-9A54-AC334FCE13DF.jpg" 
            alt="ภาพวันเกิด 2" 
            className="birthday-photo" 
          />
        </BirthdayPhotos>

        <CakeAnimation className="bounce-cake">
          <i className="fas fa-birthday-cake"></i>
          <div className="cake-sparkles">
            <span>🎉</span>
            <span>🎊</span>
            <span>✨</span>
            <span>🎈</span>
          </div>
        </CakeAnimation>

        <WishText>
          วันที่ 18 มีนาคม 2547<br />
          วันที่โลกใบนี้ได้รับของขวัญที่มีค่าที่สุด<br />
          นั่นคือการมีตัวเธอ โดนัท ❤️
        </WishText>

        <WishesBox>
          <h3>ขออวยพรให้เธอ:</h3>
          <WishesList>
            <li>🌟 มีความสุขในทุกๆ วันที่ผ่านไป</li>
            <li>✨ หายเหนื่อยและไม่ต้องเครียดมาก</li>
            <li>💪 สุขภาพแข็งแรงเสมอ</li>
            <li>📚 เรียนได้เกรดดีๆ</li>
            <li>💖 มีความรักและกำลังใจเสมอ</li>
          </WishesList>
        </WishesBox>
      </BirthdayContent>
    </PageContainer>
  );
};

export default BirthdayPage;
