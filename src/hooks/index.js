import { useState, useEffect, useCallback, useRef } from 'react';
import { useApp } from '../context/AppContext';

// Hook สำหรับ Page Navigation พร้อม smooth transitions
export const usePageNavigation = () => {
  const { state, actions } = useApp();
  const [isNavigating, setIsNavigating] = useState(false);

  const navigateWithTransition = useCallback(async (pageNumber) => {
    if (isNavigating || pageNumber === state.currentPage) return;
    
    setIsNavigating(true);
    actions.setTransitioning(true);
    
    // Smooth transition delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    actions.goToPage(pageNumber);
    
    // Reset transition state
    await new Promise(resolve => setTimeout(resolve, 800));
    actions.setTransitioning(false);
    setIsNavigating(false);
  }, [isNavigating, state.currentPage, actions]);

  const nextPage = useCallback(() => {
    if (state.currentPage < state.totalPages) {
      navigateWithTransition(state.currentPage + 1);
    }
  }, [state.currentPage, state.totalPages, navigateWithTransition]);

  const prevPage = useCallback(() => {
    if (state.currentPage > 1) {
      navigateWithTransition(state.currentPage - 1);
    }
  }, [state.currentPage, navigateWithTransition]);

  return {
    currentPage: state.currentPage,
    totalPages: state.totalPages,
    isNavigating,
    navigateWithTransition,
    nextPage,
    prevPage
  };
};

// Hook สำหรับ Keyboard Navigation
export const useKeyboardNavigation = () => {
  const { nextPage, prevPage } = usePageNavigation();
  const { actions } = useApp();

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowRight':
        case ' ': // Spacebar
          e.preventDefault();
          nextPage();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          prevPage();
          break;
        case 'Escape':
          actions.closeLightbox();
          break;
        case 'm':
        case 'M':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            actions.toggleMusic();
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextPage, prevPage, actions]);
};

// Hook สำหรับ Touch/Swipe Navigation
export const useSwipeNavigation = (elementRef) => {
  const { nextPage, prevPage } = usePageNavigation();
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextPage();
    } else if (isRightSwipe) {
      prevPage();
    }
  };

  useEffect(() => {
    const element = elementRef?.current;
    if (!element) return;

    element.addEventListener('touchstart', onTouchStart);
    element.addEventListener('touchmove', onTouchMove);
    element.addEventListener('touchend', onTouchEnd);

    return () => {
      element.removeEventListener('touchstart', onTouchStart);
      element.removeEventListener('touchmove', onTouchMove);
      element.removeEventListener('touchend', onTouchEnd);
    };
  }, [elementRef, touchStart, touchEnd]);
};

// Hook สำหรับ Music Player
export const useMusicPlayer = () => {
  const { state, actions } = useApp();
  const audioRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    // Create audio element for background music
    audioRef.current = new Audio('/audio/love-song.mp3'); // Add your music file
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    const audio = audioRef.current;

    const handleLoadedData = () => {
      setIsLoaded(true);
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.pause();
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current || !isLoaded) return;

    if (state.musicPlaying) {
      audioRef.current.play().catch(console.error);
    } else {
      audioRef.current.pause();
    }
  }, [state.musicPlaying, isLoaded]);

  const setVolume = useCallback((volume) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, volume));
    }
  }, []);

  const seek = useCallback((time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  }, []);

  return {
    isPlaying: state.musicPlaying,
    isLoaded,
    currentTime,
    duration,
    toggleMusic: actions.toggleMusic,
    setVolume,
    seek
  };
};

// Hook สำหรับ Image Preloading
export const useImagePreloader = (imageList) => {
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(src);
        img.onerror = reject;
        img.src = src;
      });
    };

    const loadAllImages = async () => {
      setIsLoading(true);
      try {
        const promises = imageList.map(loadImage);
        const loaded = await Promise.allSettled(promises);
        
        const successfullyLoaded = loaded
          .filter(result => result.status === 'fulfilled')
          .map(result => result.value);

        setLoadedImages(new Set(successfullyLoaded));
      } catch (error) {
        console.error('Error preloading images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (imageList.length > 0) {
      loadAllImages();
    }
  }, [imageList]);

  return { loadedImages, isLoading };
};

// Hook สำหรับ Intersection Observer (Lazy Loading)
export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        ...options
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [options]);

  return [elementRef, isIntersecting];
};

// Hook สำหรับ Local Storage
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
};

// Hook สำหรับ Animation Timing
export const useAnimationFrame = (callback) => {
  const requestRef = useRef();
  const previousTimeRef = useRef();

  const animate = useCallback((time) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;
      callback(deltaTime);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }, [callback]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animate]);
};
