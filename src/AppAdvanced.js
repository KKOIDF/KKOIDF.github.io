import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { ErrorBoundary } from 'react-error-boundary';

// Advanced React Systems
import { AppStateProvider, useAppState, useNavigation, useUI, useMusic, usePreferences, useInteractive } from './store/AppStateManager';
import { ParticleSystem, AnimatedText, RippleButton, ProgressiveImage, Card3D, MorphingShape } from './components/AdvancedComponents';
import { usePageNavigation, useKeyboardNavigation, useSwipeNavigation, useMusicPlayer, useIntersectionObserver } from './hooks';
import withPageEnhancements from './hoc/withPageEnhancements';
import { PerformanceMonitor } from './utils/PerformanceMonitor';
import Navigation from './components/Navigation';
import FloatingHearts from './components/FloatingHearts';
import SnowEffect from './components/SnowEffect';
import Lightbox from './components/Lightbox';

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

  /* Smooth scrolling */
  html {
    scroll-behavior: smooth;
  }

  /* Custom scrollbar */
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

  /* Selection colors */
  ::selection {
    background: ${props => props.theme.primary};
    color: white;
  }

  /* Focus outline */
  *:focus {
    outline: 2px solid ${props => props.theme.accent};
    outline-offset: 2px;
  }

  /* Reduced motion for accessibility */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

// Enhanced Loading Component
const LoadingSpinner = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: ${props => props.theme.text};
`;

const SpinnerIcon = styled(motion.div)`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

// Error Boundary Fallback
const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <ErrorContainer>
    <ErrorIcon>😢</ErrorIcon>
    <ErrorTitle>เกิดข้อผิดพลาด</ErrorTitle>
    <ErrorMessage>{error.message}</ErrorMessage>
    <RippleButton onClick={resetErrorBoundary}>
      ลองใหม่อีกครั้ง
    </RippleButton>
  </ErrorContainer>
);

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 2rem;
  text-align: center;
`;

const ErrorIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const ErrorTitle = styled.h2`
  color: #e74c3c;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.p`
  margin-bottom: 2rem;
  opacity: 0.8;
`;

// Enhanced App Component
const AppCore = () => {
  const { state } = useAppState();
  const { currentPage } = useNavigation();
  const { theme, animationsEnabled } = usePreferences();
  const { particleCount, particleType, incrementInteraction } = useInteractive();
  const { lightbox, openLightbox, closeLightbox } = useUI();

  // Custom hooks
  const { currentPageIndex, totalPages, navigateToPage, goNext, goPrevious } = usePageNavigation();
  const { isPlaying, currentSong, togglePlay, nextSong, volume, setVolume } = useMusicPlayer();
  
  // Keyboard navigation
  useKeyboardNavigation({
    onNext: goNext,
    onPrevious: goPrevious,
    onToggleMusic: togglePlay,
    onEscape: closeLightbox
  });

  // Swipe navigation
  useSwipeNavigation({
    onSwipeLeft: goNext,
    onSwipeRight: goPrevious
  });

  // Intersection observer for performance
  const [mainRef, isMainVisible] = useIntersectionObserver({
    threshold: 0.1
  });

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
    incrementInteraction();
  }, [incrementInteraction]);

  return (
    <ThemeProvider theme={themes[theme]}>
      <GlobalStyles />
      <AppContainer 
        ref={mainRef}
        onClick={handleInteraction}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Performance Monitor (Development only) */}
        {process.env.NODE_ENV === 'development' && <PerformanceMonitor />}

        {/* Background Particles */}
        {animationsEnabled && (
          <ParticleSystem 
            count={particleCount} 
            type={particleType}
          />
        )}

        {/* Floating Hearts Background */}
        {animationsEnabled && <FloatingHearts />}
        
        {/* Snow Effect */}
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

        {/* Music Player Controls */}
        <MusicPlayerContainer>
          <Card3D>
            <MusicControls>
              <RippleButton onClick={togglePlay}>
                {isPlaying ? '⏸️' : '▶️'}
              </RippleButton>
              <VolumeControl>
                <VolumeSlider
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                />
              </VolumeControl>
              {currentSong && (
                <SongInfo>
                  <AnimatedText animation="typewriter" speed={100}>
                    {currentSong.title}
                  </AnimatedText>
                </SongInfo>
              )}
            </MusicControls>
          </Card3D>
        </MusicPlayerContainer>

        {/* Theme Controls */}
        <ThemeControls>
          <MorphingShape shapes={['circle', 'heart', 'star']} />
        </ThemeControls>

        {/* Main Content */}
        <ContentContainer>
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => window.location.reload()}
          >
            <Suspense 
              fallback={
                <LoadingSpinner
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
                  <AnimatedText animation="typewriter">
                    กำลังโหลดหน้าความรัก...
                  </AnimatedText>
                </LoadingSpinner>
              }
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
          </ErrorBoundary>
        </ContentContainer>

        {/* Lightbox */}
        <AnimatePresence>
          {lightbox.isOpen && (
            <Lightbox
              currentImage={lightbox.currentImage}
              images={lightbox.images}
              onClose={closeLightbox}
            />
          )}
        </AnimatePresence>

        {/* Page Progress Indicator */}
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

        {/* Interactive Elements Counter */}
        <InteractionCounter>
          <AnimatedText>
            ❤️ {state.interactive.interactionCount}
          </AnimatedText>
        </InteractionCounter>
      </AppContainer>
    </ThemeProvider>
  );
};

// Enhanced App with Providers
const App = () => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.reload()}
    >
      <AppStateProvider>
        <AppCore />
      </AppStateProvider>
    </ErrorBoundary>
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

const MusicPlayerContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 100;
`;

const MusicControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
`;

const VolumeControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const VolumeSlider = styled.input`
  width: 80px;
  accent-color: ${props => props.theme.primary};
`;

const SongInfo = styled.div`
  max-width: 150px;
  font-size: 0.9rem;
  opacity: 0.8;
`;

const ThemeControls = styled.div`
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 100;
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
  color: ${props => props.theme.text};
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

export default App;
