import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const NavigationContainer = styled.div`
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
`;

const DotsContainer = styled.div`
  display: flex;
  gap: 15px;
  padding: 15px 25px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
`;

const Dot = styled(motion.button)`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: ${props => props.active ? '#fff' : 'rgba(255,255,255,0.4)'};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    background: #fff;
    transform: scale(1.2);
  }

  &::after {
    content: '${props => props.tooltip}';
    position: absolute;
    bottom: 120%;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0,0,0,0.8);
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 12px;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }

  &:hover::after {
    opacity: 1;
  }
`;

const Navigation = ({ currentPage, totalPages, goToPage }) => {
  const pageNames = [
    'หน้าแรก',
    'วันเกิด', 
    'สิ่งที่ชอบ',
    'ข้อความจากใจ',
    'ข้อความหวาน',
    'สัญญา',
    'บทกวี',
    'ทุกวัน',
    'แกลลอรี่',
    'ความปรารถนา'
  ];

  return (
    <NavigationContainer>
      <DotsContainer>
        {Array.from({ length: totalPages }, (_, i) => (
          <Dot
            key={i + 1}
            active={currentPage === i + 1}
            tooltip={pageNames[i]}
            onClick={() => goToPage(i + 1)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </DotsContainer>
    </NavigationContainer>
  );
};

export default Navigation;
