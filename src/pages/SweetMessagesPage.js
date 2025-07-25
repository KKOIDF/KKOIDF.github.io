import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PageContainer = styled(motion.div)`
  min-height: 100vh;
  padding: 80px 20px 20px;
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
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

const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 800px;
  width: 100%;
  margin-bottom: 3rem;
`;

const MessageCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  }

  h3 {
    font-size: 1.8rem;
    color: #333;
    margin-bottom: 1.5rem;
    font-family: 'Playfair Display', serif;
  }

  p {
    font-size: 1.2rem;
    color: #555;
    line-height: 1.8;
    margin-bottom: 1rem;
  }

  .typewriter {
    overflow: hidden;
    border-right: 3px solid #ff6b6b;
    white-space: nowrap;
    margin: 0 auto;
    animation: typing 3s steps(40, end), blink-caret 0.75s step-end infinite;
  }

  @keyframes typing {
    from { width: 0; }
    to { width: 100%; }
  }

  @keyframes blink-caret {
    from, to { border-color: transparent; }
    50% { border-color: #ff6b6b; }
  }
`;

const LoveEmojis = styled.div`
  margin-top: 1rem;
  
  .floating-emoji {
    font-size: 1.5rem;
    margin: 0 0.5rem;
    display: inline-block;
    animation: float 3s ease-in-out infinite;
  }
  
  .floating-emoji:nth-child(1) { animation-delay: 0s; }
  .floating-emoji:nth-child(2) { animation-delay: 0.5s; }
  .floating-emoji:nth-child(3) { animation-delay: 1s; }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
`;

const BigHeart = styled.div`
  font-size: 4rem;
  color: #ff6b6b;
  margin: 2rem 0;
  animation: heartbeat 1.5s ease-in-out infinite;

  @keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
  }
`;

const SweetMessagesPage = () => {
  return (
    <PageContainer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6 }}
    >
      <Title
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        💌 ข้อความจากใจ 💌
      </Title>

      <MessagesContainer>
        <MessageCard
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <h3>ถึงโดนัทคนเก่ง</h3>
          <p>
            เธอคือคนที่ทำให้เค้ารู้สึกว่าโลกนี้สวยงาม<br />
            ทุกวันที่ได้เห็นรอยยิ้มของเธอ<br />
            มันทำให้เค้ามีความสุขขึ้นมาทันที ✨<br />
            ขอบคุณที่เป็นแสงสว่างในชีวิตของเค้า
          </p>
        </MessageCard>

        <MessageCard
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div>
            <BigHeart>
              <i className="fas fa-heart"></i>
            </BigHeart>
          </div>
          <h3>ถึงเธอผู้เท่ห์และคูล</h3>
          <p className="typewriter">
            โดนัทคนเก่ง เธอคือผู้หญิงที่เท่ห์และคูลที่สุดในโลก<br />
            ทุกท่าทางของเธอล้วนมีเสน่ห์<br />
            ทำให้เค้าหลงรักแล้วรักอีก รักไม่มีเบื่อ ✨
          </p>
          <LoveEmojis>
            <span className="floating-emoji">💕</span>
            <span className="floating-emoji">😍</span>
            <span className="floating-emoji">✨</span>
          </LoveEmojis>
        </MessageCard>

        <MessageCard
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <h3>ดูแลตัวเองด้วยนะ</h3>
          <p>
            อยากให้เธอหายเหนื่อยและมีแต่ความสุข<br />
            ไม่ต้องเครียดมากไป ค่อยๆ ทำไป<br />
            ดูแลสุขภาพตัวเองให้ดีๆ นะคะ 💪<br />
            เพราะเค้าอยากเห็นเธอแข็งแรงเสมอ
          </p>
        </MessageCard>

        <MessageCard
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
        >
          <h3>เรื่องการเรียน</h3>
          <p>
            ขอให้การเรียนของเธอเป็นไปด้วยดี<br />
            ได้เกรดดีๆ ตามที่ตั้งใจไว้<br />
            แต่อย่าเครียดมากจนเกินไปนะ 📚<br />
            เค้าเชื่อในความสามารถของเธอ
          </p>
        </MessageCard>
      </MessagesContainer>
    </PageContainer>
  );
};

export default SweetMessagesPage;
