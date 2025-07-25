import React, { Suspense, memo } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntersectionObserver } from '../hooks';

// Loading Spinner Component
const LoadingSpinner = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const Spinner = styled(motion.div)`
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

const LoadingComponent = () => (
  <LoadingSpinner
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <Spinner />
  </LoadingSpinner>
);

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Page Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorContent>
            <h2>อ๊ะ! มีข้อผิดพลาดเกิดขึ้น 😅</h2>
            <p>กรุณารีเฟรชหน้าเพจใหม่นะคะ</p>
            <button onClick={() => window.location.reload()}>
              รีเฟรช
            </button>
          </ErrorContent>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
`;

const ErrorContent = styled.div`
  padding: 2rem;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);

  h2 {
    margin-bottom: 1rem;
    font-family: 'Kanit', sans-serif;
  }

  button {
    margin-top: 1rem;
    padding: 10px 20px;
    border: none;
    border-radius: 20px;
    background: #fff;
    color: #667eea;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.05);
    }
  }
`;

// Page Wrapper HOC
const withPageEnhancements = (WrappedComponent, pageConfig = {}) => {
  const EnhancedPage = memo((props) => {
    const [ref, isIntersecting] = useIntersectionObserver({
      threshold: 0.1,
      rootMargin: '50px'
    });

    const {
      preloadImages = true,
      lazyLoad = true,
      animationDelay = 0,
      ...otherConfig
    } = pageConfig;

    return (
      <ErrorBoundary>
        <Suspense fallback={<LoadingComponent />}>
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={
              !lazyLoad || isIntersecting
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 20 }
            }
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.6,
              delay: animationDelay,
              ease: "easeOut"
            }}
          >
            <WrappedComponent {...props} {...otherConfig} />
          </motion.div>
        </Suspense>
      </ErrorBoundary>
    );
  });

  EnhancedPage.displayName = `withPageEnhancements(${WrappedComponent.displayName || WrappedComponent.name})`;
  
  return EnhancedPage;
};

// Page Container Component with advanced features
export const PageContainer = styled(motion.div)`
  min-height: 100vh;
  padding: 80px 20px 20px;
  background: ${props => props.background || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;

  /* Enhanced responsive design */
  @media (max-width: 768px) {
    padding: 60px 15px 15px;
  }

  @media (max-width: 480px) {
    padding: 50px 10px 10px;
  }

  /* Advanced scroll behavior */
  scroll-behavior: smooth;
  
  /* Better performance for animations */
  will-change: transform, opacity;
  transform: translateZ(0);
`;

// Enhanced Title Component
export const EnhancedTitle = styled(motion.h1)`
  font-size: clamp(2rem, 5vw, 3.5rem);
  color: #fff;
  margin-bottom: 2rem;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
  font-family: 'Dancing Script', cursive;
  text-align: center;
  position: relative;

  /* Gradient text effect */
  background: linear-gradient(45deg, #fff, #feca57, #ff6b6b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  /* Responsive font sizing */
  @media (max-width: 768px) {
    font-size: clamp(1.8rem, 4vw, 2.5rem);
  }
`;

// Interactive Button Component
export const InteractiveButton = styled(motion.button)`
  padding: 15px 30px;
  border: none;
  border-radius: 30px;
  background: linear-gradient(45deg, #ff6b6b, #feca57);
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover:before {
    left: 100%;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  /* Responsive sizing */
  @media (max-width: 768px) {
    padding: 12px 24px;
    font-size: 1rem;
  }
`;

// Advanced Image Component with lazy loading
export const LazyImage = memo(({ src, alt, className, ...props }) => {
  const [ref, isIntersecting] = useIntersectionObserver();
  const [loaded, setLoaded] = React.useState(false);
  const [error, setError] = React.useState(false);

  return (
    <div ref={ref} className={className}>
      <AnimatePresence>
        {isIntersecting && (
          <motion.img
            src={src}
            alt={alt}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={loaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: error ? 'none' : 'block'
            }}
            {...props}
          />
        )}
      </AnimatePresence>
      
      {/* Loading placeholder */}
      {!loaded && !error && isIntersecting && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: loaded ? 0 : 1 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, #f0f0f0, #e0e0e0)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Spinner style={{ width: '30px', height: '30px' }} />
        </motion.div>
      )}
      
      {/* Error fallback */}
      {error && (
        <div style={{
          background: '#f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#999',
          fontSize: '0.9rem'
        }}>
          ไม่สามารถโหลดรูปภาพได้
        </div>
      )}
    </div>
  );
});

export default withPageEnhancements;
