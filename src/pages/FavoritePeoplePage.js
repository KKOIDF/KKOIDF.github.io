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
  justify-content: center;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  color: #2c3e50;
  margin-bottom: 3rem;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
  font-family: 'Dancing Script', cursive;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const PeopleGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 800px;
  margin: 2rem 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const PersonCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const PersonImage = styled(motion.div)`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin: 0 auto 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
`;

const PersonName = styled.h3`
  font-size: 1.4rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-family: 'Playfair Display', serif;
`;

const PersonDescription = styled.p`
  font-size: 1rem;
  color: #7f8c8d;
  line-height: 1.5;
`;

const HeartRain = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
`;

const HeartDrop = styled(motion.div)`
  position: absolute;
  color: rgba(255, 192, 203, 0.6);
  font-size: 1.5rem;
  z-index: 1;
`;

const FavoritePeoplePage = () => {
  const favoriteTeam = [
    {
      name: "คุณแม่",
      emoji: "👩‍❤️‍👨",
      description: "ผู้หญิงที่แข็งแกร่งและเป็นแรงบันดาลใจ เสียสละเพื่อครอบครัวและให้ความรักอย่างไม่มีเงื่อนไข"
    },
    {
      name: "คุณพ่อ",
      emoji: "👨‍💼",
      description: "ผู้ชายที่เป็นต้นแบบความเข้มแข็ง สอนคุณค่าของการทำงานหนักและการเป็นคนดี"
    },
    {
      name: "น้องสาว",
      emoji: "👭",
      description: "เพื่อนที่ดีที่สุดตลอดชีวิต ผู้ที่เข้าใจและให้กำลังใจในทุกสถานการณ์"
    },
    {
      name: "ปู่ย่า ตายาย",
      emoji: "👴👵",
      description: "แหล่งภูมิปัญญาและความอบอุ่น ผู้ที่สอนให้รู้จักความรักที่แท้จริง"
    },
    {
      name: "เพื่อนรัก",
      emoji: "🤝",
      description: "ผู้ที่อยู่เคียงข้างในทุกช่วงเวลา ทั้งความสุขและความทุกข์"
    },
    {
      name: "คนพิเศษ",
      emoji: "💕",
      description: "ผู้ที่ทำให้ชีวิตมีสีสันและความหมาย เป็นแรงบันดาลใจในการเป็นคนที่ดีขึ้น"
    }
  ];

  const heartDrops = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 3 + 4
  }));

  return (
    <PageContainer
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6 }}
    >
      <HeartRain>
        {heartDrops.map((drop) => (
          <HeartDrop
            key={drop.id}
            style={{ left: `${drop.left}%` }}
            animate={{
              y: ['0vh', '110vh'],
              rotate: [0, 360],
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration: drop.duration,
              delay: drop.delay,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            💖
          </HeartDrop>
        ))}
      </HeartRain>

      <Title
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        คนสำคัญในชีวิต 💝
      </Title>

      <PeopleGrid
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        {favoriteTeam.map((person, index) => (
          <PersonCard
            key={index}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
          >
            <PersonImage
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.3 }}
            >
              {person.emoji}
            </PersonImage>
            <PersonName>{person.name}</PersonName>
            <PersonDescription>{person.description}</PersonDescription>
          </PersonCard>
        ))}
      </PeopleGrid>
    </PageContainer>
  );
};

export default FavoritePeoplePage;
