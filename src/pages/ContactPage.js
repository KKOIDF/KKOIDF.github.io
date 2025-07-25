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
  justify-content: center;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  color: #fff;
  margin-bottom: 3rem;
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.6);
  font-family: 'Dancing Script', cursive;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const ContactCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 25px;
  padding: 3rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  max-width: 600px;
  width: 100%;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      rgba(102, 126, 234, 0.1),
      rgba(118, 75, 162, 0.1)
    );
    z-index: 1;
  }
`;

const ContactInfo = styled(motion.div)`
  position: relative;
  z-index: 2;
  margin: 1.5rem 0;
`;

const ContactLabel = styled.h3`
  font-size: 1.4rem;
  color: #333;
  margin-bottom: 0.5rem;
  font-family: 'Playfair Display', serif;
`;

const ContactValue = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 1rem;
  word-break: break-all;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  font-size: 1.5rem;
  text-decoration: none;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  }
`;

const FloatingElements = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
`;

const FloatingElement = styled(motion.div)`
  position: absolute;
  font-size: 2rem;
  z-index: 1;
`;

const ContactPage = () => {
  const floatingElements = [
    { emoji: '📱', top: '15%', left: '10%' },
    { emoji: '💌', top: '20%', right: '15%' },
    { emoji: '📧', bottom: '20%', left: '15%' },
    { emoji: '💬', bottom: '25%', right: '10%' },
    { emoji: '🌐', top: '45%', left: '5%' },
    { emoji: '📞', top: '65%', right: '8%' }
  ];

  return (
    <PageContainer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6 }}
    >
      <FloatingElements>
        {floatingElements.map((element, index) => (
          <FloatingElement
            key={index}
            style={{
              top: element.top,
              bottom: element.bottom,
              left: element.left,
              right: element.right
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              duration: 4,
              delay: index * 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {element.emoji}
          </FloatingElement>
        ))}
      </FloatingElements>

      <Title
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        📞 ติดต่อเรา 📞
      </Title>

      <ContactCard
        initial={{ scale: 0, rotate: 180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.5, duration: 1, type: "spring", stiffness: 100 }}
        whileHover={{ scale: 1.02 }}
      >
        <ContactInfo
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <ContactLabel>📧 อีเมล</ContactLabel>
          <ContactValue>example@email.com</ContactValue>
        </ContactInfo>

        <ContactInfo
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <ContactLabel>📱 โทรศัพท์</ContactLabel>
          <ContactValue>+66 XX-XXX-XXXX</ContactValue>
        </ContactInfo>

        <ContactInfo
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <ContactLabel>📍 ที่อยู่</ContactLabel>
          <ContactValue>ประเทศไทย 🇹🇭</ContactValue>
        </ContactInfo>

        <SocialLinks>
          <SocialLink
            href="#"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.6, duration: 0.3 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            📧
          </SocialLink>
          <SocialLink
            href="#"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.8, duration: 0.3 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            📱
          </SocialLink>
          <SocialLink
            href="#"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2.0, duration: 0.3 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            💬
          </SocialLink>
        </SocialLinks>
      </ContactCard>
    </PageContainer>
  );
};

export default ContactPage;
