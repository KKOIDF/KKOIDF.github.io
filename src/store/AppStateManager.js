import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';

// Action Types
const ACTION_TYPES = {
  // Navigation
  SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
  SET_NAVIGATION_DIRECTION: 'SET_NAVIGATION_DIRECTION',
  ADD_TO_HISTORY: 'ADD_TO_HISTORY',
  
  // UI State
  SET_LIGHTBOX: 'SET_LIGHTBOX',
  SET_MENU_VISIBLE: 'SET_MENU_VISIBLE',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  
  // Music Player
  SET_MUSIC_PLAYING: 'SET_MUSIC_PLAYING',
  SET_CURRENT_SONG: 'SET_CURRENT_SONG',
  SET_VOLUME: 'SET_VOLUME',
  SET_PLAYLIST: 'SET_PLAYLIST',
  
  // User Preferences
  SET_THEME: 'SET_THEME',
  SET_ANIMATION_ENABLED: 'SET_ANIMATION_ENABLED',
  SET_SOUND_ENABLED: 'SET_SOUND_ENABLED',
  SET_AUTOPLAY: 'SET_AUTOPLAY',
  
  // Performance
  SET_PERFORMANCE_DATA: 'SET_PERFORMANCE_DATA',
  ADD_PERFORMANCE_METRIC: 'ADD_PERFORMANCE_METRIC',
  
  // Interactive Features
  SET_PARTICLE_COUNT: 'SET_PARTICLE_COUNT',
  SET_PARTICLE_TYPE: 'SET_PARTICLE_TYPE',
  INCREMENT_INTERACTION_COUNT: 'INCREMENT_INTERACTION_COUNT',
  
  // Form Data (for any forms)
  UPDATE_FORM_DATA: 'UPDATE_FORM_DATA',
  RESET_FORM_DATA: 'RESET_FORM_DATA',
  
  // Cache Management
  SET_CACHED_DATA: 'SET_CACHED_DATA',
  CLEAR_CACHE: 'CLEAR_CACHE',
  
  // Reset All
  RESET_STATE: 'RESET_STATE'
};

// Initial State
const initialState = {
  // Navigation State
  navigation: {
    currentPage: 'welcome',
    direction: 1,
    history: ['welcome'],
    canGoBack: false,
    isTransitioning: false
  },
  
  // UI State
  ui: {
    lightbox: {
      isOpen: false,
      currentImage: null,
      images: []
    },
    menu: {
      isVisible: false,
      activeSubmenu: null
    },
    loading: {
      isLoading: false,
      message: 'กำลังโหลด...'
    },
    error: {
      hasError: false,
      message: null,
      code: null
    },
    notifications: []
  },
  
  // Music Player State
  music: {
    isPlaying: false,
    currentSong: null,
    volume: 0.7,
    isMuted: false,
    playlist: [
      { id: 1, title: 'เพลงของเรา', src: '/music/our-song.mp3', duration: 240 },
      { id: 2, title: 'ความทรงจำ', src: '/music/memories.mp3', duration: 180 }
    ],
    playMode: 'repeat' // repeat, shuffle, once
  },
  
  // User Preferences
  preferences: {
    theme: 'romantic', // romantic, dark, light
    animationsEnabled: true,
    soundEnabled: true,
    autoplay: true,
    language: 'th',
    reducedMotion: false
  },
  
  // Performance Monitoring
  performance: {
    fps: 60,
    memoryUsage: 0,
    loadTime: 0,
    renderTime: 0,
    metrics: [],
    isMonitoring: false
  },
  
  // Interactive Features
  interactive: {
    particleCount: 50,
    particleType: 'hearts',
    interactionCount: 0,
    clickedElements: new Set(),
    achievements: []
  },
  
  // Form Data
  forms: {
    contactForm: {
      name: '',
      email: '',
      message: ''
    },
    commentForm: {
      comment: '',
      rating: 5
    }
  },
  
  // Cache
  cache: {
    images: new Map(),
    data: new Map(),
    lastUpdated: Date.now()
  }
};

// Reducer Function
const appReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_CURRENT_PAGE:
      return {
        ...state,
        navigation: {
          ...state.navigation,
          currentPage: action.payload,
          canGoBack: state.navigation.history.length > 1
        }
      };
      
    case ACTION_TYPES.SET_NAVIGATION_DIRECTION:
      return {
        ...state,
        navigation: {
          ...state.navigation,
          direction: action.payload
        }
      };
      
    case ACTION_TYPES.ADD_TO_HISTORY:
      const newHistory = [...state.navigation.history, action.payload].slice(-10);
      return {
        ...state,
        navigation: {
          ...state.navigation,
          history: newHistory,
          canGoBack: newHistory.length > 1
        }
      };
      
    case ACTION_TYPES.SET_LIGHTBOX:
      return {
        ...state,
        ui: {
          ...state.ui,
          lightbox: {
            ...state.ui.lightbox,
            ...action.payload
          }
        }
      };
      
    case ACTION_TYPES.SET_MENU_VISIBLE:
      return {
        ...state,
        ui: {
          ...state.ui,
          menu: {
            ...state.ui.menu,
            isVisible: action.payload
          }
        }
      };
      
    case ACTION_TYPES.SET_LOADING:
      return {
        ...state,
        ui: {
          ...state.ui,
          loading: {
            ...state.ui.loading,
            ...action.payload
          }
        }
      };
      
    case ACTION_TYPES.SET_ERROR:
      return {
        ...state,
        ui: {
          ...state.ui,
          error: {
            ...state.ui.error,
            ...action.payload
          }
        }
      };
      
    case ACTION_TYPES.SET_MUSIC_PLAYING:
      return {
        ...state,
        music: {
          ...state.music,
          isPlaying: action.payload
        }
      };
      
    case ACTION_TYPES.SET_CURRENT_SONG:
      return {
        ...state,
        music: {
          ...state.music,
          currentSong: action.payload
        }
      };
      
    case ACTION_TYPES.SET_VOLUME:
      return {
        ...state,
        music: {
          ...state.music,
          volume: action.payload,
          isMuted: action.payload === 0
        }
      };
      
    case ACTION_TYPES.SET_THEME:
      return {
        ...state,
        preferences: {
          ...state.preferences,
          theme: action.payload
        }
      };
      
    case ACTION_TYPES.SET_ANIMATION_ENABLED:
      return {
        ...state,
        preferences: {
          ...state.preferences,
          animationsEnabled: action.payload
        }
      };
      
    case ACTION_TYPES.SET_PERFORMANCE_DATA:
      return {
        ...state,
        performance: {
          ...state.performance,
          ...action.payload
        }
      };
      
    case ACTION_TYPES.ADD_PERFORMANCE_METRIC:
      return {
        ...state,
        performance: {
          ...state.performance,
          metrics: [...state.performance.metrics, action.payload].slice(-100)
        }
      };
      
    case ACTION_TYPES.SET_PARTICLE_COUNT:
      return {
        ...state,
        interactive: {
          ...state.interactive,
          particleCount: action.payload
        }
      };
      
    case ACTION_TYPES.INCREMENT_INTERACTION_COUNT:
      return {
        ...state,
        interactive: {
          ...state.interactive,
          interactionCount: state.interactive.interactionCount + 1
        }
      };
      
    case ACTION_TYPES.UPDATE_FORM_DATA:
      return {
        ...state,
        forms: {
          ...state.forms,
          [action.payload.formName]: {
            ...state.forms[action.payload.formName],
            ...action.payload.data
          }
        }
      };
      
    case ACTION_TYPES.SET_CACHED_DATA:
      const newCache = new Map(state.cache.data);
      newCache.set(action.payload.key, action.payload.value);
      return {
        ...state,
        cache: {
          ...state.cache,
          data: newCache,
          lastUpdated: Date.now()
        }
      };
      
    case ACTION_TYPES.RESET_STATE:
      return {
        ...initialState,
        preferences: state.preferences // Keep user preferences
      };
      
    default:
      return state;
  }
};

// App Context
const AppStateContext = createContext();

// Custom Hook to use App State
export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within AppStateProvider');
  }
  return context;
};

// Action Creators
export const actionCreators = {
  // Navigation Actions
  navigateToPage: (page, direction = 1) => (dispatch) => {
    dispatch({ type: ACTION_TYPES.SET_NAVIGATION_DIRECTION, payload: direction });
    dispatch({ type: ACTION_TYPES.ADD_TO_HISTORY, payload: page });
    dispatch({ type: ACTION_TYPES.SET_CURRENT_PAGE, payload: page });
  },
  
  // UI Actions
  openLightbox: (image, images = []) => ({
    type: ACTION_TYPES.SET_LIGHTBOX,
    payload: { isOpen: true, currentImage: image, images }
  }),
  
  closeLightbox: () => ({
    type: ACTION_TYPES.SET_LIGHTBOX,
    payload: { isOpen: false, currentImage: null }
  }),
  
  toggleMenu: () => (dispatch, getState) => {
    const isVisible = getState().ui.menu.isVisible;
    dispatch({ type: ACTION_TYPES.SET_MENU_VISIBLE, payload: !isVisible });
  },
  
  setLoading: (isLoading, message = 'กำลังโหลด...') => ({
    type: ACTION_TYPES.SET_LOADING,
    payload: { isLoading, message }
  }),
  
  setError: (hasError, message = null, code = null) => ({
    type: ACTION_TYPES.SET_ERROR,
    payload: { hasError, message, code }
  }),
  
  // Music Actions
  playMusic: (song = null) => (dispatch, getState) => {
    if (song) {
      dispatch({ type: ACTION_TYPES.SET_CURRENT_SONG, payload: song });
    }
    dispatch({ type: ACTION_TYPES.SET_MUSIC_PLAYING, payload: true });
  },
  
  pauseMusic: () => ({
    type: ACTION_TYPES.SET_MUSIC_PLAYING,
    payload: false
  }),
  
  setVolume: (volume) => ({
    type: ACTION_TYPES.SET_VOLUME,
    payload: Math.max(0, Math.min(1, volume))
  }),
  
  // Preference Actions
  setTheme: (theme) => ({
    type: ACTION_TYPES.SET_THEME,
    payload: theme
  }),
  
  toggleAnimations: () => (dispatch, getState) => {
    const current = getState().preferences.animationsEnabled;
    dispatch({ type: ACTION_TYPES.SET_ANIMATION_ENABLED, payload: !current });
  },
  
  // Performance Actions
  updatePerformance: (data) => ({
    type: ACTION_TYPES.SET_PERFORMANCE_DATA,
    payload: data
  }),
  
  addMetric: (metric) => ({
    type: ACTION_TYPES.ADD_PERFORMANCE_METRIC,
    payload: { ...metric, timestamp: Date.now() }
  }),
  
  // Interactive Actions
  incrementInteraction: () => ({
    type: ACTION_TYPES.INCREMENT_INTERACTION_COUNT
  }),
  
  setParticleSettings: (count, type) => (dispatch) => {
    dispatch({ type: ACTION_TYPES.SET_PARTICLE_COUNT, payload: count });
    dispatch({ type: ACTION_TYPES.SET_PARTICLE_TYPE, payload: type });
  },
  
  // Form Actions
  updateForm: (formName, data) => ({
    type: ACTION_TYPES.UPDATE_FORM_DATA,
    payload: { formName, data }
  }),
  
  // Cache Actions
  cacheData: (key, value) => ({
    type: ACTION_TYPES.SET_CACHED_DATA,
    payload: { key, value }
  })
};

// App State Provider Component
export const AppStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Enhanced dispatch with thunk support
  const enhancedDispatch = useCallback((action) => {
    if (typeof action === 'function') {
      return action(enhancedDispatch, () => state);
    }
    return dispatch(action);
  }, [state]);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedPreferences = localStorage.getItem('romanticSite_preferences');
    if (savedPreferences) {
      try {
        const preferences = JSON.parse(savedPreferences);
        Object.keys(preferences).forEach(key => {
          if (key === 'theme') {
            enhancedDispatch(actionCreators.setTheme(preferences[key]));
          } else if (key === 'animationsEnabled') {
            enhancedDispatch({ type: ACTION_TYPES.SET_ANIMATION_ENABLED, payload: preferences[key] });
          } else if (key === 'soundEnabled') {
            enhancedDispatch({ type: ACTION_TYPES.SET_SOUND_ENABLED, payload: preferences[key] });
          }
        });
      } catch (error) {
        console.warn('Failed to load preferences:', error);
      }
    }
  }, [enhancedDispatch]);

  // Save preferences to localStorage when they change
  useEffect(() => {
    localStorage.setItem('romanticSite_preferences', JSON.stringify(state.preferences));
  }, [state.preferences]);

  // Performance monitoring
  useEffect(() => {
    if (state.performance.isMonitoring) {
      const interval = setInterval(() => {
        if (performance.memory) {
          enhancedDispatch(actionCreators.updatePerformance({
            memoryUsage: performance.memory.usedJSHeapSize / 1024 / 1024
          }));
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [state.performance.isMonitoring, enhancedDispatch]);

  // Selector functions
  const selectors = {
    getCurrentPage: () => state.navigation.currentPage,
    getDirection: () => state.navigation.direction,
    canGoBack: () => state.navigation.canGoBack,
    isLightboxOpen: () => state.ui.lightbox.isOpen,
    getCurrentImage: () => state.ui.lightbox.currentImage,
    isMenuVisible: () => state.ui.menu.isVisible,
    isLoading: () => state.ui.loading.isLoading,
    hasError: () => state.ui.error.hasError,
    isMusicPlaying: () => state.music.isPlaying,
    getCurrentSong: () => state.music.currentSong,
    getVolume: () => state.music.volume,
    getTheme: () => state.preferences.theme,
    areAnimationsEnabled: () => state.preferences.animationsEnabled,
    getInteractionCount: () => state.interactive.interactionCount,
    getParticleCount: () => state.interactive.particleCount,
    getCachedData: (key) => state.cache.data.get(key),
    getFormData: (formName) => state.forms[formName] || {}
  };

  const contextValue = {
    state,
    dispatch: enhancedDispatch,
    actions: actionCreators,
    selectors
  };

  return (
    <AppStateContext.Provider value={contextValue}>
      {children}
    </AppStateContext.Provider>
  );
};

// Custom Hooks for specific state slices
export const useNavigation = () => {
  const { state, dispatch, actions } = useAppState();
  return {
    currentPage: state.navigation.currentPage,
    direction: state.navigation.direction,
    history: state.navigation.history,
    canGoBack: state.navigation.canGoBack,
    navigateToPage: (page, direction) => dispatch(actions.navigateToPage(page, direction))
  };
};

export const useUI = () => {
  const { state, dispatch, actions } = useAppState();
  return {
    lightbox: state.ui.lightbox,
    menu: state.ui.menu,
    loading: state.ui.loading,
    error: state.ui.error,
    openLightbox: (image, images) => dispatch(actions.openLightbox(image, images)),
    closeLightbox: () => dispatch(actions.closeLightbox()),
    toggleMenu: () => dispatch(actions.toggleMenu()),
    setLoading: (isLoading, message) => dispatch(actions.setLoading(isLoading, message)),
    setError: (hasError, message, code) => dispatch(actions.setError(hasError, message, code))
  };
};

export const useMusic = () => {
  const { state, dispatch, actions } = useAppState();
  return {
    isPlaying: state.music.isPlaying,
    currentSong: state.music.currentSong,
    volume: state.music.volume,
    playlist: state.music.playlist,
    playMusic: (song) => dispatch(actions.playMusic(song)),
    pauseMusic: () => dispatch(actions.pauseMusic()),
    setVolume: (volume) => dispatch(actions.setVolume(volume))
  };
};

export const usePreferences = () => {
  const { state, dispatch, actions } = useAppState();
  return {
    theme: state.preferences.theme,
    animationsEnabled: state.preferences.animationsEnabled,
    soundEnabled: state.preferences.soundEnabled,
    setTheme: (theme) => dispatch(actions.setTheme(theme)),
    toggleAnimations: () => dispatch(actions.toggleAnimations())
  };
};

export const useInteractive = () => {
  const { state, dispatch, actions } = useAppState();
  return {
    particleCount: state.interactive.particleCount,
    particleType: state.interactive.particleType,
    interactionCount: state.interactive.interactionCount,
    incrementInteraction: () => dispatch(actions.incrementInteraction()),
    setParticleSettings: (count, type) => dispatch(actions.setParticleSettings(count, type))
  };
};

export default AppStateProvider;
