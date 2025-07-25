import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// Import existing components that we know work
import Navigation from './components/Navigation';
import FloatingHearts from './components/FloatingHearts';
import SnowEffect from './components/SnowEffect';
import Lightbox from './components/Lightbox';

// Lazy load pages
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

// Themes
const themes = {
  romantic: {
    primary: '#ff6b6b',
    secondary: '#feca57',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    text: '#ffffff',
    accent: '#ff9ff3'
  },
  dark: {
    primary: '#2c3e50',
    secondary: '#34495e',
    background: 'linear-gradient(135deg, #2c3e50 0%, #000000 100%)',
    text: '#ecf0f1',
    accent: '#e74c3c'
  },
  light: {
    primary: '#3498db',
    secondary: '#9b59b6',
    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
    text: '#2c3e50',
    accent: '#e67e22'
  }
};

// Global Styles with Theme Support
const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Kanit', sans-serif;
    overflow-x: hidden;
    background: ${props => props.theme.background};
    color: ${props => props.theme.text};
    transition: all 0.3s ease;
  }

  html {
    scroll-behavior: smooth;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.primary};
    border-radius: 4px;
  }

  ::selection {
    background: ${props => props.theme.primary};
    color: white;
  }

  *:focus {
    outline: 2px solid ${props => props.theme.accent};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

// Enhanced Loading Component
const LoadingSpinner = ({ theme }) => (
  <LoadingContainer
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <SpinnerIcon
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    >
      ⏳
    </SpinnerIcon>
    <LoadingText
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      กำลังโหลดหน้าความรัก...
    </LoadingText>
  </LoadingContainer>
);

// Advanced App Component with State Management
const AppAdvanced = () => {
  const [currentPage, setCurrentPage] = useState('welcome');
  const [theme, setTheme] = useState('romantic');
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [interactionCount, setInteractionCount] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);

  // Page navigation
  const pageOrder = [
    'welcome', 'birthday', 'favorites', 'sweetMessages', 
    'sweetMessages2', 'promise', 'poem', 'dailyLife', 
    'gallery', 'finalWishes'
  ];

  const currentPageIndex = pageOrder.indexOf(currentPage);
  const totalPages = pageOrder.length;

  // Navigation functions
  const goNext = useCallback(() => {
    const nextIndex = (currentPageIndex + 1) % totalPages;
    setCurrentPage(pageOrder[nextIndex]);
    setInteractionCount(prev => prev + 1);
  }, [currentPageIndex, totalPages, pageOrder]);

  const goPrevious = useCallback(() => {
    const prevIndex = currentPageIndex === 0 ? totalPages - 1 : currentPageIndex - 1;
    setCurrentPage(pageOrder[prevIndex]);
    setInteractionCount(prev => prev + 1);
  }, [currentPageIndex, totalPages, pageOrder]);

  const navigateToPage = useCallback((page) => {
    setCurrentPage(page);
    setInteractionCount(prev => prev + 1);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch(e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          goNext();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          goPrevious();
          break;
        case 'Escape':
          setLightboxOpen(false);
          break;
        case 'm':
        case 'M':
          setMusicPlaying(prev => !prev);
          break;
        case 't':
        case 'T':
          const themeKeys = Object.keys(themes);
          const currentThemeIndex = themeKeys.indexOf(theme);
          const nextThemeIndex = (currentThemeIndex + 1) % themeKeys.length;
          setTheme(themeKeys[nextThemeIndex]);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrevious, theme]);

  // Touch/Swipe navigation
  useEffect(() => {
    let startX = 0;
    let startY = 0;

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const diffX = startX - endX;
      const diffY = startY - endY;

      // Check if horizontal swipe is more significant than vertical
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX > 0) {
          goNext();
        } else {
          goPrevious();
        }
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [goNext, goPrevious]);

  // Page components mapping
  const pageComponents = {
    welcome: WelcomePage,
    birthday: BirthdayPage,
    favorites: FavoritesPage,
    sweetMessages: SweetMessagesPage,
    sweetMessages2: SweetMessages2Page,
    promise: PromisePage,
    poem: PoemPage,
    dailyLife: DailyLifePage,
    gallery: GalleryPage,
    finalWishes: FinalWishesPage
  };

  const CurrentPageComponent = pageComponents[currentPage] || WelcomePage;

  // Handle interaction tracking
  const handleInteraction = useCallback(() => {
    setInteractionCount(prev => prev + 1);
  }, []);

  return (
    <ThemeProvider theme={themes[theme]}>
      <GlobalStyles />
      <AppContainer 
        onClick={handleInteraction}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Background Effects */}
        {animationsEnabled && <FloatingHearts />}
        {animationsEnabled && <SnowEffect />}

        {/* Navigation */}
        <NavigationContainer>
          <Navigation 
            currentPage={currentPage}
            onNavigate={navigateToPage}
            totalPages={totalPages}
            currentIndex={currentPageIndex}
          />
        </NavigationContainer>

        {/* Theme & Controls */}
        <ControlsContainer>
          <ControlButton
            onClick={() => setAnimationsEnabled(!animationsEnabled)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="เปิด/ปิด แอนิเมชั่น"
          >
            {animationsEnabled ? '🎪' : '⏸️'}
          </ControlButton>
          
          <ControlButton
            onClick={() => {
              const themeKeys = Object.keys(themes);
              const currentThemeIndex = themeKeys.indexOf(theme);
              const nextThemeIndex = (currentThemeIndex + 1) % themeKeys.length;
              setTheme(themeKeys[nextThemeIndex]);
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="เปลี่ยนธีม"
          >
            🎨
          </ControlButton>

          <ControlButton
            onClick={() => setMusicPlaying(!musicPlaying)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="เปิด/ปิด เพลง"
          >
            {musicPlaying ? '🎵' : '🔇'}
          </ControlButton>
        </ControlsContainer>

        {/* Main Content */}
        <ContentContainer>
          <Suspense 
            fallback={<LoadingSpinner theme={themes[theme]} />}
          >
            <AnimatePresence mode="wait">
              <PageWrapper
                key={currentPage}
                initial={{ opacity: 0, x: 100, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -100, scale: 0.95 }}
                transition={{ 
                  duration: animationsEnabled ? 0.5 : 0.1,
                  ease: [0.4, 0, 0.2, 1]
                }}
              >
                <CurrentPageComponent />
              </PageWrapper>
            </AnimatePresence>
          </Suspense>
        </ContentContainer>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxOpen && (
            <Lightbox
              currentImage={lightboxImage}
              onClose={() => setLightboxOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Page Progress */}
        <ProgressContainer>
          <ProgressBar
            initial={{ width: 0 }}
            animate={{ width: `${((currentPageIndex + 1) / totalPages) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
          <ProgressText>
            {currentPageIndex + 1} / {totalPages}
          </ProgressText>
        </ProgressContainer>

        {/* Interaction Counter */}
        <InteractionCounter>
          <CounterText>❤️ {interactionCount}</CounterText>
        </InteractionCounter>

        {/* Keyboard Shortcuts Info */}
        <KeyboardHelp>
          <HelpText>
            ⌨️ ← → เปลี่ยนหน้า | Space ถัดไป | M เพลง | T ธีม | Esc ปิด
          </HelpText>
        </KeyboardHelp>
      </AppContainer>
    </ThemeProvider>
  );
};

// Styled Components
const AppContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: ${props => props.theme.background};
  overflow-x: hidden;
  font-family: 'Kanit', sans-serif;
  touch-action: pan-y;
`;

const NavigationContainer = styled.div`
  position: fixed;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 0.5rem;
`;

const ControlsContainer = styled.div`
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 100;
  display: flex;
  gap: 0.5rem;
`;

const ControlButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 10px;
  padding: 0.5rem;
  font-size: 1.2rem;
  cursor: pointer;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.accent};
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
`;

const PageWrapper = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
`;

const LoadingContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: white;
`;

const SpinnerIcon = styled(motion.div)`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const LoadingText = styled(motion.div)`
  font-size: 1.2rem;
  opacity: 0.8;
`;

const ProgressContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  z-index: 100;
`;

const ProgressBar = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, ${props => props.theme.primary}, ${props => props.theme.secondary});
`;

const ProgressText = styled.div`
  position: absolute;
  top: -30px;
  right: 1rem;
  font-size: 0.8rem;
  color: white;
  opacity: 0.7;
`;

const InteractionCounter = styled.div`
  position: fixed;
  top: 2rem;
  left: 2rem;
  z-index: 100;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const CounterText = styled.div`
  color: white;
  font-weight: bold;
`;

const KeyboardHelp = styled.div`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  background: rgba(0, 0, 0, 0.7);
  padding: 0.5rem 1rem;
  border-radius: 15px;
  backdrop-filter: blur(10px);
`;

const HelpText = styled.div`
  color: white;
  font-size: 0.8rem;
  opacity: 0.8;
`;

export default AppAdvanced;
