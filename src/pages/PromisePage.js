import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PageContainer = styled(motion.div)`
  min-height: 100vh;
  padding: 80px 20px 20px;
  background: linear-gradient(135deg, #74b9ff 0%, #6c5ce7 100%);
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

const PromiseContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  max-width: 800px;
  margin-bottom: 2rem;
`;

const PromiseRing = styled.div`
  font-size: 6rem;
  color: #ffeaa7;
  margin-bottom: 2rem;
  position: relative;
  
  i {
    animation: rotate 4s linear infinite;
    filter: drop-shadow(0 0 10px rgba(255, 234, 167, 0.8));
  }

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const Promises = styled.div`
  h3 {
    font-size: 2rem;
    color: #fff;
    margin-bottom: 2rem;
    font-family: 'Playfair Display', serif;
  }
`;

const PromiseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const PromiseItem = styled(motion.div)`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateX(10px);
  }
  
  i {
    font-size: 2rem;
    color: #ffeaa7;
    margin-right: 1.5rem;
    min-width: 40px;
    animation: pulse 2s ease-in-out infinite;
  }
  
  p {
    font-size: 1.2rem;
    color: #fff;
    margin: 0;
    text-align: left;
    line-height: 1.6;
    
    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
`;

const FloatingStars = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  
  .star {
    position: absolute;
    font-size: 1.5rem;
    color: rgba(255, 234, 167, 0.6);
    animation: twinkle 3s ease-in-out infinite;
  }
  
  .star:nth-child(1) { top: 10%; left: 10%; animation-delay: 0s; }
  .star:nth-child(2) { top: 20%; right: 10%; animation-delay: 0.5s; }
  .star:nth-child(3) { top: 60%; left: 5%; animation-delay: 1s; }
  .star:nth-child(4) { bottom: 20%; right: 15%; animation-delay: 1.5s; }
  .star:nth-child(5) { bottom: 40%; left: 15%; animation-delay: 2s; }
  .star:nth-child(6) { top: 40%; right: 5%; animation-delay: 2.5s; }

  @keyframes twinkle {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.2); }
  }
`;

const PromisePage = () => {
  const promises = [
    {
      icon: "fas fa-heart",
      text: "จะดูแลเธอและเป็นกำลังใจให้เสมอ"
    },
    {
      icon: "fas fa-sun",
      text: "จะพยายามทำให้เธอมีความสุขทุกวัน"
    },
    {
      icon: "fas fa-hands-helping",
      text: "จะอยู่เคียงข้างเธอในทุกสถานการณ์"
    },
    {
      icon: "fas fa-heart-pulse",
      text: "จะห่วงใยเธอด้วยหัวใจที่จริงใส"
    },
    {
      icon: "fas fa-infinity",
      text: "จะอยู่ข้างเธอไปนานๆ"
    }
  ];

  return (
    <PageContainer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6 }}
    >
      <FloatingStars>
        <div className="star">⭐</div>
        <div className="star">✨</div>
        <div className="star">🌟</div>
        <div className="star">💫</div>
        <div className="star">⭐</div>
        <div className="star">✨</div>
      </FloatingStars>

      <Title
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        🤝 สัญญาดีๆ 🤝
      </Title>

      <PromiseContainer
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <PromiseRing>
          <i className="fas fa-heart"></i>
        </PromiseRing>

        <Promises>
          <h3>เค้าสัญญาว่า:</h3>
          <PromiseList>
            {promises.map((promise, index) => (
              <PromiseItem
                key={index}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.2, duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
              >
                <i className={promise.icon}></i>
                <p>{promise.text}</p>
              </PromiseItem>
            ))}
          </PromiseList>
        </Promises>
      </PromiseContainer>
    </PageContainer>
  );
};

export default PromisePage;
