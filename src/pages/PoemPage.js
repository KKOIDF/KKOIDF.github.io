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

const PoemContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 0;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  max-width: 700px;
  position: relative;
  overflow: hidden;
`;

const PoemDecoration = styled.div`
  position: relative;
  padding: 3rem;
  
  .poem-border {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-radius: 20px;
    margin: 1rem;
    
    .corner-decoration {
      position: absolute;
      font-size: 2rem;
      color: rgba(255, 255, 255, 0.7);
      
      &.top-left { top: -10px; left: -10px; }
      &.top-right { top: -10px; right: -10px; }
      &.bottom-left { bottom: -10px; left: -10px; }
      &.bottom-right { bottom: -10px; right: -10px; }
    }
  }
`;

const PoemContent = styled.div`
  position: relative;
  z-index: 2;
`;

const PoemVerse = styled(motion.div)`
  margin-bottom: 2rem;
  padding: 1rem;
  border-left: 3px solid rgba(255, 255, 255, 0.4);
  
  .poem-line {
    font-size: 1.2rem;
    color: #fff;
    line-height: 1.8;
    margin-bottom: 0.5rem;
    font-family: 'Playfair Display', serif;
    font-style: italic;
    
    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;

const PoemSignature = styled.div`
  margin-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  padding-top: 1rem;
  
  .signature-line {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.8);
    font-style: italic;
    text-align: right;
    font-family: 'Dancing Script', cursive;
  }
`;

const FloatingPetals = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  
  .petal {
    position: absolute;
    font-size: 2rem;
    animation: float-petals 8s ease-in-out infinite;
  }
  
  .petal:nth-child(1) { 
    left: 10%; 
    animation-delay: 0s; 
    animation-duration: 6s;
  }
  .petal:nth-child(2) { 
    left: 30%; 
    animation-delay: 1s; 
    animation-duration: 7s;
  }
  .petal:nth-child(3) { 
    left: 50%; 
    animation-delay: 2s; 
    animation-duration: 8s;
  }
  .petal:nth-child(4) { 
    left: 70%; 
    animation-delay: 3s; 
    animation-duration: 6s;
  }
  .petal:nth-child(5) { 
    left: 90%; 
    animation-delay: 4s; 
    animation-duration: 7s;
  }

  @keyframes float-petals {
    0% {
      transform: translateY(100vh) rotate(0deg);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateY(-100px) rotate(360deg);
      opacity: 0;
    }
  }
`;

const PoemPage = () => {
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
        📝 แต่งกลอนให้เธอเด้ออ 📝
      </Title>

      <PoemContainer
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <PoemDecoration>
          <div className="poem-border">
            <div className="corner-decoration top-left">❁</div>
            <div className="corner-decoration top-right">❁</div>
            <div className="corner-decoration bottom-left">❁</div>
            <div className="corner-decoration bottom-right">❁</div>
          </div>
          
          <PoemContent>
            <PoemVerse
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <p className="poem-line">Just once, my love, to touch your lips,</p>
              <p className="poem-line">Like rain that falls in fleeting drips.</p>
              <p className="poem-line">A single kiss, not claimed in haste,</p>
              <p className="poem-line">But aged like wine, with gentle taste.</p>
            </PoemVerse>
            
            <PoemVerse
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <p className="poem-line">They say true love will stand the test,</p>
              <p className="poem-line">Not always loud, but felt the best.</p>
              <p className="poem-line">A flower blooms, then fades from sight,</p>
              <p className="poem-line">But once it bloomed — it felt so right.</p>
            </PoemVerse>
            
            <PoemVerse
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
            >
              <p className="poem-line">Better one rose than fields untrue,</p>
              <p className="poem-line">A moment pure, a kiss from you.</p>
              <p className="poem-line">For in that breath, my soul would know,</p>
              <p className="poem-line">The seed was sown, and love did grow.</p>
            </PoemVerse>
            
            <PoemSignature>
              <p className="signature-line">Kritchakorn J.</p>
            </PoemSignature>
          </PoemContent>
          
          <FloatingPetals>
            <span className="petal">🌸</span>
            <span className="petal">🌺</span>
            <span className="petal">🌹</span>
            <span className="petal">🌻</span>
            <span className="petal">🌷</span>
          </FloatingPetals>
        </PoemDecoration>
      </PoemContainer>
    </PageContainer>
  );
};

export default PoemPage;
