import React, { Suspense, lazy, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faPause, faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons';

// Context & Hooks
import { AppProvider, useApp } from './context/AppContext';
import { 
  usePageNavigation, 
  useKeyboardNavigation, 
  useSwipeNavigation,
  useMusicPlayer 
} from './hooks';

// Components
import Navigation from './components/Navigation';
import FloatingHearts from './components/FloatingHearts';
import SnowEffect from './components/SnowEffect';
import Lightbox from './components/Lightbox';
import GlobalStyles from './GlobalStyles';

// Lazy load pages for better performance
const WelcomePage = lazy(() => import('./pages/WelcomePage'));
const BirthdayPage = lazy(() => import('./pages/BirthdayPage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));
const SweetMessagesPage = lazy(() => import('./pages/SweetMessagesPage'));
const SweetMessages2Page = lazy(() => import('./pages/SweetMessages2Page'));
const PromisePage = lazy(() => import('./pages/PromisePage'));
const PoemPage = lazy(() => import('./pages/PoemPage'));
const DailyLifePage = lazy(() => import('./pages/DailyLifePage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const FinalWishesPage = lazy(() => import('./pages/FinalWishesPage'));

const AppContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  overflow-x: hidden;
  font-family: 'Kanit', sans-serif;
  touch-action: pan-y;
`;

const PageContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  will-change: transform, opacity;
`;

const MusicControl = styled.div`
  position: fixed;
  bottom: 100px;
  right: 30px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MusicButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
  
  ${props => props.playing && `
    animation: pulse 2s infinite;
  `}
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
`;

const VolumeControl = styled(motion.div)`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  padding: 8px 12px;
  backdrop-filter: blur(10px);
  gap: 8px;
  opacity: ${props => props.show ? 1 : 0};
  transform: ${props => props.show ? 'translateY(0)' : 'translateY(10px)'};
  transition: all 0.3s ease;
  pointer-events: ${props => props.show ? 'auto' : 'none'};
`;

const VolumeSlider = styled.input`
  width: 80px;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  outline: none;
  
  &::-webkit-slider-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    background: white;
    border-radius: 50%;
    cursor: pointer;
  }
`;

const LoadingOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const LoadingSpinner = styled(motion.div)`
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid #fff;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Loading Component
const LoadingComponent = () => (
  <LoadingOverlay
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    <LoadingSpinner />
  </LoadingOverlay>
);

// Main App Component
const AppContent = () => {
  const { state } = useApp();
  const { currentPage, totalPages, navigateWithTransition } = usePageNavigation();
  const { 
    isPlaying, 
    isLoaded, 
    currentTime, 
    duration, 
    toggleMusic, 
    setVolume 
  } = useMusicPlayer();
  
  const appRef = useRef(null);
  const [showVolumeControl, setShowVolumeControl] = React.useState(false);
  const [volume, setVolumeState] = React.useState(0.3);

  // Enable keyboard and swipe navigation
  useKeyboardNavigation();
  useSwipeNavigation(appRef);

  const pages = [
    { component: WelcomePage, name: 'หน้าแรก' },
    { component: BirthdayPage, name: 'วันเกิด' },
    { component: FavoritesPage, name: 'สิ่งที่ชอบ' },
    { component: SweetMessagesPage, name: 'ข้อความจากใจ' },
    { component: SweetMessages2Page, name: 'ข้อความหวาน' },
    { component: PromisePage, name: 'สัญญา' },
    { component: PoemPage, name: 'บทกวี' },
    { component: DailyLifePage, name: 'ทุกวัน' },
    { component: GalleryPage, name: 'แกลลอรี่' },
    { component: FinalWishesPage, name: 'ความปรารถนา' }
  ];

  const pageVariants = {
    initial: (direction) => ({
      opacity: 0,
      x: direction > 0 ? '100%' : '-100%',
      scale: 0.8
    }),
    in: {
      opacity: 1,
      x: 0,
      scale: 1
    },
    out: (direction) => ({
      opacity: 0,
      x: direction > 0 ? '-100%' : '100%',
      scale: 0.8
    })
  };

  const pageTransition = {
    type: 'spring',
    stiffness: 300,
    damping: 30,
    duration: 0.8
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolumeState(newVolume);
    setVolume(newVolume);
  };

  const CurrentPageComponent = pages[currentPage - 1]?.component;

  return (
    <AppContainer ref={appRef}>
      <AnimatePresence mode="wait" custom={state.animations.direction === 'forward' ? 1 : -1}>
        <PageContainer
          key={currentPage}
          custom={state.animations.direction === 'forward' ? 1 : -1}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          <Suspense fallback={<LoadingComponent />}>
            {CurrentPageComponent && (
              <CurrentPageComponent 
                currentPage={currentPage}
                totalPages={totalPages}
                navigateWithTransition={navigateWithTransition}
              />
            )}
          </Suspense>
        </PageContainer>
      </AnimatePresence>

      <Navigation
        currentPage={currentPage}
        totalPages={totalPages}
        goToPage={navigateWithTransition}
      />

      <MusicControl>
        <MusicButton 
          playing={isPlaying}
          onClick={toggleMusic}
          onMouseEnter={() => setShowVolumeControl(true)}
          onMouseLeave={() => setShowVolumeControl(false)}
          title={isPlaying ? 'หยุดเพลง' : 'เปิดเพลง'}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FontAwesomeIcon icon={isPlaying ? faPause : faMusic} />
        </MusicButton>
        
        <VolumeControl 
          show={showVolumeControl && isLoaded}
          onMouseEnter={() => setShowVolumeControl(true)}
          onMouseLeave={() => setShowVolumeControl(false)}
        >
          <FontAwesomeIcon 
            icon={volume > 0 ? faVolumeUp : faVolumeMute} 
            style={{ color: 'white', fontSize: '0.9rem' }}
          />
          <VolumeSlider
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
          />
        </VolumeControl>
      </MusicControl>

      <FloatingHearts />
      <SnowEffect />

      {state.lightbox.isOpen && (
        <Lightbox
          isOpen={state.lightbox.isOpen}
          imageSrc={state.lightbox.imageSrc}
          currentIndex={state.lightbox.currentIndex}
          images={state.lightbox.images}
        />
      )}
    </AppContainer>
  );
};

// Main App with Provider
function App() {
  return (
    <AppProvider>
      <GlobalStyles />
      <AppContent />
    </AppProvider>
  );
}

export default App;
