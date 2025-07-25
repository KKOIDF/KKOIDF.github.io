import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700&family=Dancing+Script:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Kanit', sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    overflow-x: hidden;
  }

  html {
    scroll-behavior: smooth;
  }

  button {
    font-family: 'Kanit', sans-serif;
  }

  /* Animation Keyframes */
  @keyframes float {
    0%, 100% {
      transform: translateY(0) rotate(0deg);
    }
    33% {
      transform: translateY(-10px) rotate(1deg);
    }
    66% {
      transform: translateY(-5px) rotate(-1deg);
    }
  }

  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }

  @keyframes rainbow {
    0% { color: #ff6b6b; }
    16% { color: #ee5a24; }
    32% { color: #ffd700; }
    48% { color: #00d2d3; }
    64% { color: #ff79c6; }
    80% { color: #50fa7b; }
    100% { color: #ff6b6b; }
  }

  @keyframes sparkle {
    0%, 100% {
      opacity: 0;
      transform: scale(0);
    }
    50% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes typewriter {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }

  @keyframes blink {
    50% {
      border-color: transparent;
    }
  }

  @keyframes fall {
    to {
      transform: translateY(100vh) rotate(360deg);
      opacity: 0;
    }
  }

  @keyframes infiniteScroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  @keyframes parallaxMove1 {
    0% { transform: translateX(0); }
    100% { transform: translateX(-100%); }
  }

  @keyframes parallaxMove2 {
    0% { transform: translateX(0); }
    100% { transform: translateX(-100%); }
  }

  /* Mobile Responsive */
  @media (max-width: 768px) {
    body {
      font-size: 14px;
    }
  }
`;

export default GlobalStyles;
