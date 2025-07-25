import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

// Router Context
const RouterContext = createContext();

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};

// Route definitions
const routes = [
  { path: '/', component: 'WelcomePage', title: 'ยินดีต้อนรับสู่โลกของเรา' },
  { path: '/birthday', component: 'BirthdayPage', title: 'วันเกิดของเธอ' },
  { path: '/favorites', component: 'FavoritesPage', title: 'สิ่งที่ชอบ' },
  { path: '/photos', component: 'PhotosPage', title: 'ภาพความทรงจำ' },
  { path: '/messages', component: 'MessagesPage', title: 'ข้อความรัก' },
  { path: '/promises', component: 'PromisesPage', title: 'คำสัญญา' }
];

// Router Provider Component
export const RouterProvider = ({ children, components }) => {
  const [currentRoute, setCurrentRoute] = useState('/');
  const [direction, setDirection] = useState(0);
  const [history, setHistory] = useState(['/']);

  const getCurrentRouteIndex = () => {
    return routes.findIndex(route => route.path === currentRoute);
  };

  const navigate = (path, options = {}) => {
    const currentIndex = getCurrentRouteIndex();
    const targetIndex = routes.findIndex(route => route.path === path);
    
    if (targetIndex === -1) return;

    const newDirection = targetIndex > currentIndex ? 1 : -1;
    setDirection(options.direction !== undefined ? options.direction : newDirection);
    
    setHistory(prev => {
      const newHistory = [...prev];
      if (newHistory[newHistory.length - 1] !== path) {
        newHistory.push(path);
      }
      return newHistory.slice(-10); // Keep only last 10 entries
    });

    setCurrentRoute(path);
    
    // Update browser history if available
    if (typeof window !== 'undefined' && window.history) {
      window.history.pushState({ path }, '', `#${path}`);
    }
  };

  const goBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop(); // Remove current
      const previousPath = newHistory[newHistory.length - 1];
      setHistory(newHistory);
      navigate(previousPath, { direction: -1 });
    }
  };

  const goForward = () => {
    const currentIndex = getCurrentRouteIndex();
    const nextIndex = (currentIndex + 1) % routes.length;
    navigate(routes[nextIndex].path, { direction: 1 });
  };

  const goBackward = () => {
    const currentIndex = getCurrentRouteIndex();
    const prevIndex = currentIndex === 0 ? routes.length - 1 : currentIndex - 1;
    navigate(routes[prevIndex].path, { direction: -1 });
  };

  // Handle browser back/forward
  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.path) {
        setCurrentRoute(event.state.path);
      }
    };

    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || '/';
      if (routes.find(route => route.path === hash)) {
        setCurrentRoute(hash);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('popstate', handlePopState);
      window.addEventListener('hashchange', handleHashChange);
      
      // Initialize from current hash
      handleHashChange();

      return () => {
        window.removeEventListener('popstate', handlePopState);
        window.removeEventListener('hashchange', handleHashChange);
      };
    }
  }, []);

  const currentRouteData = routes.find(route => route.path === currentRoute);

  const contextValue = {
    currentRoute,
    currentRouteData,
    direction,
    history,
    routes,
    navigate,
    goBack,
    goForward,
    goBackward,
    canGoBack: history.length > 1,
    getCurrentRouteIndex
  };

  return (
    <RouterContext.Provider value={contextValue}>
      <RouterContainer>
        <AnimatePresence mode="wait" custom={direction}>
          <RouteRenderer
            key={currentRoute}
            route={currentRouteData}
            direction={direction}
            components={components}
          />
        </AnimatePresence>
      </RouterContainer>
    </RouterContext.Provider>
  );
};

// Route Renderer Component
const RouteRenderer = ({ route, direction, components }) => {
  const Component = components[route.component];

  if (!Component) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div>Component not found: {route.component}</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      custom={direction}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={routeVariants}
      transition={{ 
        duration: 0.5, 
        ease: [0.4, 0, 0.2, 1] 
      }}
      style={{ width: '100%', height: '100%' }}
    >
      <Component />
    </motion.div>
  );
};

// Route Animation Variants
const routeVariants = {
  initial: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.95
  }),
  animate: {
    x: 0,
    opacity: 1,
    scale: 1
  },
  exit: (direction) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.95
  })
};

// Navigation Controls Component
export const NavigationControls = ({ className }) => {
  const { goBack, goForward, goBackward, canGoBack, currentRouteData } = useRouter();

  return (
    <NavigationContainer className={className}>
      <NavButton
        onClick={goBackward}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="หน้าก่อนหน้า"
      >
        ⬅️
      </NavButton>

      {canGoBack && (
        <NavButton
          onClick={goBack}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="ย้อนกลับ"
        >
          ↩️
        </NavButton>
      )}

      <CurrentRouteTitle>
        {currentRouteData?.title}
      </CurrentRouteTitle>

      <NavButton
        onClick={goForward}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="หน้าถัดไป"
      >
        ➡️
      </NavButton>
    </NavigationContainer>
  );
};

// Route Menu Component
export const RouteMenu = ({ isVisible, onClose }) => {
  const { navigate, currentRoute } = useRouter();

  const handleRouteClick = (path) => {
    navigate(path);
    if (onClose) onClose();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <MenuContainer
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <MenuContent>
            {routes.map((route) => (
              <MenuItem
                key={route.path}
                onClick={() => handleRouteClick(route.path)}
                isActive={currentRoute === route.path}
                whileHover={{ scale: 1.05, x: 10 }}
                whileTap={{ scale: 0.95 }}
              >
                <RouteIcon>{getRouteIcon(route.path)}</RouteIcon>
                <RouteTitle>{route.title}</RouteTitle>
                {currentRoute === route.path && <ActiveIndicator />}
              </MenuItem>
            ))}
          </MenuContent>
        </MenuContainer>
      )}
    </AnimatePresence>
  );
};

// Helper function to get route icons
const getRouteIcon = (path) => {
  const iconMap = {
    '/': '🏠',
    '/birthday': '🎂',
    '/favorites': '❤️',
    '/photos': '📸',
    '/messages': '💌',
    '/promises': '🤝'
  };
  return iconMap[path] || '📄';
};

// Progress Indicator Component
export const RouteProgress = () => {
  const { getCurrentRouteIndex, routes } = useRouter();
  const currentIndex = getCurrentRouteIndex();
  const progress = ((currentIndex + 1) / routes.length) * 100;

  return (
    <ProgressContainer>
      <ProgressBar
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      <ProgressText>
        {currentIndex + 1} / {routes.length}
      </ProgressText>
    </ProgressContainer>
  );
};

// Custom Hook for Route Transitions
export const useRouteTransition = () => {
  const { direction, currentRoute } = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 500);
    return () => clearTimeout(timer);
  }, [currentRoute]);

  return { isTransitioning, direction };
};

// Styled Components
const RouterContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

const NavigationContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const NavButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 10px;
  padding: 0.5rem;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 107, 107, 0.5);
  }
`;

const CurrentRouteTitle = styled.div`
  flex: 1;
  text-align: center;
  color: white;
  font-weight: bold;
  font-size: 1.1rem;
`;

const MenuContainer = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(20px);
  z-index: 1000;
  border-radius: 0 0 20px 20px;
`;

const MenuContent = styled.div`
  padding: 1rem;
`;

const MenuItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  margin-bottom: 0.5rem;
  background: ${props => props.isActive ? 'rgba(255, 107, 107, 0.3)' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 15px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 107, 107, 0.2);
  }
`;

const RouteIcon = styled.div`
  font-size: 1.5rem;
`;

const RouteTitle = styled.div`
  color: white;
  font-weight: bold;
  flex: 1;
`;

const ActiveIndicator = styled.div`
  width: 8px;
  height: 8px;
  background: #ff6b6b;
  border-radius: 50%;
  position: absolute;
  right: 1rem;
`;

const ProgressContainer = styled.div`
  position: relative;
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  overflow: hidden;
`;

const ProgressBar = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, #ff6b6b, #feca57);
  border-radius: 2px;
`;

const ProgressText = styled.div`
  position: absolute;
  top: 8px;
  right: 0;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
`;

export default RouterProvider;
