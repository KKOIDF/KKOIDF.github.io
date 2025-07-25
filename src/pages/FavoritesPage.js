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

const FavoritesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
  max-width: 1200px;
  width: 100%;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FavoriteItem = styled(motion.div)`
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 30px 50px rgba(0, 0, 0, 0.15);
  }

  &.shake-hover:hover {
    animation: shake 0.5s ease-in-out;
  }

  &.glow-hover:hover {
    box-shadow: 0 0 30px rgba(255, 192, 203, 0.5);
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
`;

const CatSection = styled.div`
  .favorite-photo {
    margin-bottom: 1.5rem;
    
    .cat-photo {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid rgba(255, 255, 255, 0.5);
      animation: wiggle 2s ease-in-out infinite;
    }
  }

  .cat-icon {
    font-size: 3rem;
    color: #6c5ce7;
    margin-bottom: 1rem;
  }

  .paw-prints {
    margin-top: 1rem;
    
    span {
      font-size: 1.5rem;
      margin: 0 0.5rem;
      animation: bounce 2s ease-in-out infinite;
      display: inline-block;
    }
    
    span:nth-child(1) { animation-delay: 0s; }
    span:nth-child(2) { animation-delay: 0.3s; }
    span:nth-child(3) { animation-delay: 0.6s; }
  }

  @keyframes wiggle {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(-5deg); }
    75% { transform: rotate(5deg); }
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
`;

const ActressSection = styled.div`
  .favorite-photos-triangle {
    margin-bottom: 1.5rem;
    
    .triangle-row-1 {
      display: flex;
      justify-content: center;
      margin-bottom: 1rem;
      
      .actress-photo {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid rgba(255, 255, 255, 0.5);
      }
    }
    
    .triangle-row-2 {
      display: flex;
      justify-content: center;
      gap: 1rem;
      
      .actress-photo {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid rgba(255, 255, 255, 0.5);
      }
    }
  }

  .star-icon {
    font-size: 3rem;
    color: #f39c12;
    margin-bottom: 1rem;
    
    &.rotating-star {
      animation: rotate 3s linear infinite;
    }
  }

  .actresses {
    margin: 1rem 0;
    
    .actress-name {
      font-size: 1.1rem;
      color: #333;
      margin: 0.5rem 0;
      font-weight: bold;
    }
  }

  .sweet-note {
    font-style: italic;
    color: #e74c3c;
    margin: 1rem 0;
    font-size: 1.1rem;
  }

  .star-shower {
    margin-top: 1rem;
    
    span {
      font-size: 1.5rem;
      margin: 0 0.3rem;
      animation: twinkle 2s ease-in-out infinite;
      display: inline-block;
    }
    
    span:nth-child(1) { animation-delay: 0s; }
    span:nth-child(2) { animation-delay: 0.5s; }
    span:nth-child(3) { animation-delay: 1s; }
    span:nth-child(4) { animation-delay: 1.5s; }
  }

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes twinkle {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.2); }
  }
`;

const ItemTitle = styled.h3`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 1rem;
  font-family: 'Playfair Display', serif;
`;

const ItemDescription = styled.p`
  font-size: 1.1rem;
  color: #555;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const FavoritesPage = () => {
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
        🐱 สิ่งที่โดนัทชอบ 🐱
      </Title>

      <FavoritesGrid>
        <FavoriteItem
          className="shake-hover"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <CatSection>
            <div className="favorite-photo">
              <img 
                src="/images/BBE3E527-7FDD-477C-9206-06C35C9CEF55.jpg" 
                alt="แมวน่ารัก" 
                className="cat-photo wiggle" 
              />
            </div>
            <div className="cat-icon">
              <i className="fas fa-cat"></i>
            </div>
            <ItemTitle>แมวดำ</ItemTitle>
            <ItemDescription>
              เหมือนที่เธอชอบแมวดำ<br />
              เค้าก็ชอบดูเธอยิ้ม<br />
              มันน่ารักเหมือนกัน 🖤
            </ItemDescription>
            <div className="paw-prints">
              <span>🐾</span>
              <span>🐾</span>
              <span>🐾</span>
            </div>
          </CatSection>
        </FavoriteItem>

        <FavoriteItem
          className="glow-hover"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <ActressSection>
            <div className="favorite-photos-triangle">
              <div className="triangle-row-1">
                <img 
                  src="/images/DigitalCover-op.jpg" 
                  alt="นักแสดงสวย 1" 
                  className="actress-photo" 
                />
              </div>
              <div className="triangle-row-2">
                <img 
                  src="/images/w644 (1).jpg" 
                  alt="นักแสดงสวย 2" 
                  className="actress-photo" 
                />
                <img 
                  src="/images/w644.jpg" 
                  alt="นักแสดงสวย 3" 
                  className="actress-photo" 
                />
              </div>
            </div>
            <div className="star-icon rotating-star">
              <i className="fas fa-star"></i>
            </div>
            <ItemTitle>คนที่เธอชอบ</ItemTitle>
            <div className="actresses">
              <p className="actress-name">🌟 ฟรีน สโรชา จันทร์กิมฮะ</p>
              <p className="actress-name">🌟 ลูกแก้ว กมลลักษณ์ แสงทรัพย์สิน</p>
              <p className="actress-name">🌟 น้ำตาล ทิพนารี วีรวัฒโนดม</p>
            </div>
            <p className="sweet-note">
              พวกเธอสวยและเท่ห์<br />
              แต่ไม่เท่าโดนัทของเค้าหรอก 😘
            </p>
            <div className="star-shower">
              <span>⭐</span>
              <span>🌟</span>
              <span>✨</span>
              <span>💫</span>
            </div>
          </ActressSection>
        </FavoriteItem>
      </FavoritesGrid>
    </PageContainer>
  );
};

export default FavoritesPage;
