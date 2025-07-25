import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PageContainer = styled(motion.div)`
  min-height: 100vh;
  padding: 80px 20px 20px;
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
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

const DailyLove = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const TimeOfDay = styled(motion.div)`
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 30px 50px rgba(0, 0, 0, 0.15);
  }

  &.morning {
    background: linear-gradient(135deg, rgba(255, 193, 7, 0.2), rgba(255, 152, 0, 0.2));
  }

  &.afternoon {
    background: linear-gradient(135deg, rgba(255, 235, 59, 0.2), rgba(255, 193, 7, 0.2));
  }

  &.evening {
    background: linear-gradient(135deg, rgba(156, 39, 176, 0.2), rgba(103, 58, 183, 0.2));
  }

  &.night {
    background: linear-gradient(135deg, rgba(63, 81, 181, 0.2), rgba(48, 63, 159, 0.2));
  }

  .time-photo {
    margin-bottom: 1.5rem;
    
    .daily-photo {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid rgba(255, 255, 255, 0.5);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }
  }

  i {
    font-size: 3rem;
    margin-bottom: 1rem;
    display: block;
    
    &.fa-sun {
      color: #ff9800;
      animation: sunny 3s ease-in-out infinite;
    }
    
    &.fa-cloud-sun {
      color: #ffc107;
      animation: cloudy 4s ease-in-out infinite;
    }
    
    &.fa-moon {
      color: #9c27b0;
      animation: moony 5s ease-in-out infinite;
    }
    
    &.fa-star {
      color: #3f51b5;
      animation: starry 2s ease-in-out infinite;
    }
  }

  h3 {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 1rem;
    font-family: 'Playfair Display', serif;
  }

  p {
    font-size: 1.1rem;
    color: #555;
    line-height: 1.6;
  }

  @keyframes sunny {
    0%, 100% { transform: rotate(0deg) scale(1); }
    50% { transform: rotate(180deg) scale(1.1); }
  }

  @keyframes cloudy {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(10px); }
  }

  @keyframes moony {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }

  @keyframes starry {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
  }
`;

const FloatingIcons = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  
  .floating-icon {
    position: absolute;
    font-size: 2rem;
    opacity: 0.3;
    animation: float-around 8s ease-in-out infinite;
  }
  
  .floating-icon:nth-child(1) { 
    left: 5%; 
    top: 10%; 
    animation-delay: 0s; 
    color: #ff9800;
  }
  .floating-icon:nth-child(2) { 
    right: 5%; 
    top: 20%; 
    animation-delay: 2s; 
    color: #ffc107;
  }
  .floating-icon:nth-child(3) { 
    left: 10%; 
    bottom: 30%; 
    animation-delay: 4s; 
    color: #9c27b0;
  }
  .floating-icon:nth-child(4) { 
    right: 10%; 
    bottom: 20%; 
    animation-delay: 6s; 
    color: #3f51b5;
  }

  @keyframes float-around {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    25% { transform: translateY(-20px) rotate(90deg); }
    50% { transform: translateY(-10px) rotate(180deg); }
    75% { transform: translateY(-30px) rotate(270deg); }
  }
`;

const DailyLifePage = () => {
  return (
    <PageContainer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6 }}
    >
      <FloatingIcons>
        <div className="floating-icon">☀️</div>
        <div className="floating-icon">🌤️</div>
        <div className="floating-icon">🌙</div>
        <div className="floating-icon">⭐</div>
      </FloatingIcons>

      <Title
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        🌅 ทุกวันกับโดนัท 🌙
      </Title>

      <DailyLove>
        <TimeOfDay
          className="morning"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="time-photo">
            <img 
              src="/images/F2BA042D-505E-4CE3-95F5-A78C6E919F9D.jpg" 
              alt="เช้า" 
              className="daily-photo" 
            />
          </div>
          <i className="fas fa-sun"></i>
          <h3>ตอนเช้า</h3>
          <p>
            ขอให้เธอตื่นมาด้วยรอยยิ้ม<br />
            เริ่มวันใหม่ด้วยความสุข
          </p>
        </TimeOfDay>
        
        <TimeOfDay
          className="afternoon"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <i className="fas fa-cloud-sun"></i>
          <h3>ตอนกลางวัน</h3>
          <p>
            ให้มีแรงกำลังใจในการทำงาน<br />
            และอย่าลืมพักผ่อนบ้างนะ
          </p>
        </TimeOfDay>
        
        <TimeOfDay
          className="evening"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <i className="fas fa-moon"></i>
          <h3>ตอนเย็น</h3>
          <p>
            ขอให้หมดเหนื่อยหมดเครียด<br />
            มีเวลาทำในสิ่งที่ชอบ
          </p>
        </TimeOfDay>
        
        <TimeOfDay
          className="night"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
        >
          <i className="fas fa-star"></i>
          <h3>ตอนกลางคืน</h3>
          <p>
            หลับสบายและฝันดี<br />
            พร้อมตื่นมาใหม่พรุ่งนี้
          </p>
        </TimeOfDay>
      </DailyLove>
    </PageContainer>
  );
};

export default DailyLifePage;
