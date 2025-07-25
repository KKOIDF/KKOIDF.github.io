import React, { createContext, useContext, useEffect, useState } from 'react';

// Performance metrics tracking
const PerformanceContext = createContext();

export const usePerformance = () => {
  const context = useContext(PerformanceContext);
  if (!context) {
    throw new Error('usePerformance must be used within PerformanceProvider');
  }
  return context;
};

export const PerformanceProvider = ({ children }) => {
  const [metrics, setMetrics] = useState({
    renderTimes: [],
    imageLoadTimes: [],
    pageTransitions: [],
    memoryUsage: null,
    fps: null
  });

  const [isMonitoring, setIsMonitoring] = useState(process.env.NODE_ENV === 'development');

  // Measure render performance
  const measureRender = (componentName, startTime) => {
    if (!isMonitoring) return;
    
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    setMetrics(prev => ({
      ...prev,
      renderTimes: [...prev.renderTimes.slice(-9), {
        component: componentName,
        time: renderTime,
        timestamp: Date.now()
      }]
    }));
  };

  // Measure image load performance
  const measureImageLoad = (imageSrc, startTime) => {
    if (!isMonitoring) return;
    
    const endTime = performance.now();
    const loadTime = endTime - startTime;
    
    setMetrics(prev => ({
      ...prev,
      imageLoadTimes: [...prev.imageLoadTimes.slice(-9), {
        src: imageSrc,
        time: loadTime,
        timestamp: Date.now()
      }]
    }));
  };

  // Measure page transition performance
  const measurePageTransition = (fromPage, toPage, duration) => {
    if (!isMonitoring) return;
    
    setMetrics(prev => ({
      ...prev,
      pageTransitions: [...prev.pageTransitions.slice(-9), {
        from: fromPage,
        to: toPage,
        duration,
        timestamp: Date.now()
      }]
    }));
  };

  // Monitor FPS
  useEffect(() => {
    if (!isMonitoring) return;

    let frameCount = 0;
    let startTime = performance.now();
    let animationId;

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - startTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - startTime));
        setMetrics(prev => ({ ...prev, fps }));
        frameCount = 0;
        startTime = currentTime;
      }
      
      animationId = requestAnimationFrame(measureFPS);
    };

    animationId = requestAnimationFrame(measureFPS);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isMonitoring]);

  // Monitor memory usage
  useEffect(() => {
    if (!isMonitoring || !('memory' in performance)) return;

    const measureMemory = () => {
      const memory = performance.memory;
      setMetrics(prev => ({
        ...prev,
        memoryUsage: {
          used: Math.round(memory.usedJSHeapSize / 1048576), // MB
          total: Math.round(memory.totalJSHeapSize / 1048576), // MB
          limit: Math.round(memory.jsHeapSizeLimit / 1048576) // MB
        }
      }));
    };

    measureMemory();
    const interval = setInterval(measureMemory, 5000);

    return () => clearInterval(interval);
  }, [isMonitoring]);

  const value = {
    metrics,
    isMonitoring,
    setIsMonitoring,
    measureRender,
    measureImageLoad,
    measurePageTransition
  };

  return (
    <PerformanceContext.Provider value={value}>
      {children}
    </PerformanceContext.Provider>
  );
};

// Performance Monitor UI Component
export const PerformanceMonitor = () => {
  const { metrics, isMonitoring, setIsMonitoring } = usePerformance();
  const [isVisible, setIsVisible] = useState(false);

  if (!isMonitoring) return null;

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          zIndex: 10000,
          background: '#333',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          padding: '8px 12px',
          fontSize: '12px',
          cursor: 'pointer'
        }}
      >
        📊 Performance
      </button>

      {/* Performance Panel */}
      {isVisible && (
        <div
          style={{
            position: 'fixed',
            top: '60px',
            left: '20px',
            background: 'rgba(0, 0, 0, 0.9)',
            color: 'white',
            padding: '16px',
            borderRadius: '8px',
            fontSize: '12px',
            maxWidth: '300px',
            maxHeight: '400px',
            overflow: 'auto',
            zIndex: 10000,
            fontFamily: 'monospace'
          }}
        >
          <div style={{ marginBottom: '12px' }}>
            <strong>Performance Metrics</strong>
            <button
              onClick={() => setIsMonitoring(false)}
              style={{
                float: 'right',
                background: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '2px',
                padding: '2px 6px',
                fontSize: '10px',
                cursor: 'pointer'
              }}
            >
              ×
            </button>
          </div>

          {/* FPS */}
          <div style={{ marginBottom: '8px' }}>
            <strong>FPS:</strong> {metrics.fps || 'Calculating...'}
          </div>

          {/* Memory Usage */}
          {metrics.memoryUsage && (
            <div style={{ marginBottom: '8px' }}>
              <strong>Memory:</strong> {metrics.memoryUsage.used}MB / {metrics.memoryUsage.total}MB
            </div>
          )}

          {/* Recent Render Times */}
          <div style={{ marginBottom: '8px' }}>
            <strong>Recent Renders:</strong>
            {metrics.renderTimes.slice(-3).map((render, i) => (
              <div key={i} style={{ fontSize: '10px', marginLeft: '8px' }}>
                {render.component}: {render.time.toFixed(2)}ms
              </div>
            ))}
          </div>

          {/* Recent Image Loads */}
          <div style={{ marginBottom: '8px' }}>
            <strong>Recent Image Loads:</strong>
            {metrics.imageLoadTimes.slice(-3).map((load, i) => (
              <div key={i} style={{ fontSize: '10px', marginLeft: '8px' }}>
                {load.src.split('/').pop()}: {load.time.toFixed(2)}ms
              </div>
            ))}
          </div>

          {/* Page Transitions */}
          <div>
            <strong>Page Transitions:</strong>
            {metrics.pageTransitions.slice(-3).map((transition, i) => (
              <div key={i} style={{ fontSize: '10px', marginLeft: '8px' }}>
                {transition.from} → {transition.to}: {transition.duration.toFixed(2)}ms
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

// HOC for measuring component render time
export const withPerformanceTracking = (WrappedComponent, componentName) => {
  return React.memo((props) => {
    const { measureRender } = usePerformance();
    const startTime = performance.now();

    useEffect(() => {
      measureRender(componentName || WrappedComponent.name, startTime);
    });

    return <WrappedComponent {...props} />;
  });
};

// Hook for measuring custom operations
export const usePerformanceMeasure = () => {
  const { measureRender, measureImageLoad, measurePageTransition } = usePerformance();

  const measureOperation = (operationName, operation) => {
    const startTime = performance.now();
    
    const result = operation();
    
    if (result && typeof result.then === 'function') {
      // Handle async operations
      return result.finally(() => {
        measureRender(operationName, startTime);
      });
    } else {
      // Handle sync operations
      measureRender(operationName, startTime);
      return result;
    }
  };

  return {
    measureOperation,
    measureImageLoad,
    measurePageTransition
  };
};
