import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AppSimplified from './AppSimplified';
import GlobalStyles from './GlobalStyles';

// FontAwesome setup
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

// Demo Component with Toggle
const Demo = () => {
  const [showAdvanced, setShowAdvanced] = React.useState(true);

  return (
    <div style={{ 
      position: 'relative',
      width: '100%',
      height: '100vh'
    }}>
      {/* Toggle Button */}
      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          zIndex: 1000,
          padding: '12px 24px',
          background: showAdvanced 
            ? 'linear-gradient(45deg, #ff6b6b, #feca57)' 
            : 'linear-gradient(45deg, #667eea, #764ba2)',
          color: 'white',
          border: 'none',
          borderRadius: '25px',
          cursor: 'pointer',
          fontFamily: 'Kanit, sans-serif',
          fontWeight: 'bold',
          fontSize: '14px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
          transition: 'all 0.3s ease',
          textAlign: 'center',
          minWidth: '160px'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.05)';
          e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.4)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = '0 4px 16px rgba(0,0,0,0.3)';
        }}
      >
        {showAdvanced ? '🚀 Advanced React' : '📱 Original'} 
        <br />
        <small style={{ fontSize: '11px', opacity: 0.9 }}>
          {showAdvanced ? 'คลิกดูเวอร์ชันเดิม' : 'คลิกดู Advanced Features'}
        </small>
      </button>

      {/* Features List Overlay */}
      {showAdvanced && (
        <div style={{
          position: 'fixed',
          bottom: '10px',
          left: '10px',
          background: 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: '15px',
          borderRadius: '15px',
          fontSize: '12px',
          maxWidth: '320px',
          zIndex: 999,
          fontFamily: 'Kanit, sans-serif',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <h4 style={{ 
            margin: '0 0 10px 0', 
            color: '#ff6b6b',
            fontSize: '14px',
            textAlign: 'center'
          }}>
            🚀 Advanced React Features Added:
          </h4>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '8px',
            lineHeight: '1.4'
          }}>
            <div>
              <div>⚡ Context + useReducer</div>
              <div>🎣 Custom Hooks (8)</div>
              <div>🔄 HOCs</div>
              <div>📊 Performance Monitor</div>
              <div>🎨 Advanced Animations</div>
              <div>💫 Particle System</div>
              <div>🎵 Music Integration</div>
              <div>🔍 Intersection Observer</div>
            </div>
            <div>
              <div>💾 Local Storage</div>
              <div>🎪 3D Card Effects</div>
              <div>🌟 Morphing Shapes</div>
              <div>⌨️ Keyboard Nav</div>
              <div>👆 Swipe Gestures</div>
              <div>🔥 Error Boundaries</div>
              <div>⚙️ State Management</div>
              <div>✨ เนื้อหาเดิม 100%</div>
            </div>
          </div>
        </div>
      )}

      {/* Show Advanced or Original App */}
      <GlobalStyles />
      {showAdvanced ? <AppSimplified /> : <App />}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Demo />
  </React.StrictMode>
);
