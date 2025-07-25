import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial State
const initialState = {
  currentPage: 1,
  totalPages: 10,
  musicPlaying: false,
  lightbox: {
    isOpen: false,
    imageSrc: '',
    currentIndex: 0,
    images: []
  },
  animations: {
    isTransitioning: false,
    direction: 'forward'
  },
  preferences: {
    autoPlay: false,
    soundEnabled: true,
    animationSpeed: 'normal'
  }
};

// Action Types
export const ActionTypes = {
  SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
  TOGGLE_MUSIC: 'TOGGLE_MUSIC',
  OPEN_LIGHTBOX: 'OPEN_LIGHTBOX',
  CLOSE_LIGHTBOX: 'CLOSE_LIGHTBOX',
  SET_LIGHTBOX_INDEX: 'SET_LIGHTBOX_INDEX',
  SET_TRANSITIONING: 'SET_TRANSITIONING',
  SET_DIRECTION: 'SET_DIRECTION',
  UPDATE_PREFERENCES: 'UPDATE_PREFERENCES'
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
        animations: {
          ...state.animations,
          direction: action.payload > state.currentPage ? 'forward' : 'backward'
        }
      };

    case ActionTypes.TOGGLE_MUSIC:
      return {
        ...state,
        musicPlaying: !state.musicPlaying
      };

    case ActionTypes.OPEN_LIGHTBOX:
      return {
        ...state,
        lightbox: {
          ...state.lightbox,
          isOpen: true,
          imageSrc: action.payload.imageSrc,
          currentIndex: action.payload.index || 0,
          images: action.payload.images || []
        }
      };

    case ActionTypes.CLOSE_LIGHTBOX:
      return {
        ...state,
        lightbox: {
          ...initialState.lightbox
        }
      };

    case ActionTypes.SET_LIGHTBOX_INDEX:
      return {
        ...state,
        lightbox: {
          ...state.lightbox,
          currentIndex: action.payload
        }
      };

    case ActionTypes.SET_TRANSITIONING:
      return {
        ...state,
        animations: {
          ...state.animations,
          isTransitioning: action.payload
        }
      };

    case ActionTypes.UPDATE_PREFERENCES:
      return {
        ...state,
        preferences: {
          ...state.preferences,
          ...action.payload
        }
      };

    default:
      return state;
  }
};

// Context
const AppContext = createContext();

// Provider Component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Persist preferences to localStorage
  useEffect(() => {
    const savedPreferences = localStorage.getItem('donut-love-preferences');
    if (savedPreferences) {
      dispatch({
        type: ActionTypes.UPDATE_PREFERENCES,
        payload: JSON.parse(savedPreferences)
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('donut-love-preferences', JSON.stringify(state.preferences));
  }, [state.preferences]);

  // Action Creators
  const actions = {
    goToPage: (pageNumber) => {
      dispatch({
        type: ActionTypes.SET_CURRENT_PAGE,
        payload: pageNumber
      });
    },

    nextPage: () => {
      if (state.currentPage < state.totalPages) {
        dispatch({
          type: ActionTypes.SET_CURRENT_PAGE,
          payload: state.currentPage + 1
        });
      }
    },

    prevPage: () => {
      if (state.currentPage > 1) {
        dispatch({
          type: ActionTypes.SET_CURRENT_PAGE,
          payload: state.currentPage - 1
        });
      }
    },

    toggleMusic: () => {
      dispatch({ type: ActionTypes.TOGGLE_MUSIC });
    },

    openLightbox: (imageSrc, index = 0, images = []) => {
      dispatch({
        type: ActionTypes.OPEN_LIGHTBOX,
        payload: { imageSrc, index, images }
      });
    },

    closeLightbox: () => {
      dispatch({ type: ActionTypes.CLOSE_LIGHTBOX });
    },

    setLightboxIndex: (index) => {
      dispatch({
        type: ActionTypes.SET_LIGHTBOX_INDEX,
        payload: index
      });
    },

    setTransitioning: (isTransitioning) => {
      dispatch({
        type: ActionTypes.SET_TRANSITIONING,
        payload: isTransitioning
      });
    },

    updatePreferences: (newPreferences) => {
      dispatch({
        type: ActionTypes.UPDATE_PREFERENCES,
        payload: newPreferences
      });
    }
  };

  const value = {
    state,
    actions
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom Hook
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export default AppContext;
