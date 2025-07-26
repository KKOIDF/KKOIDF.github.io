<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>💖 ถึงโดนัท - เว็บไซต์แห่งความรัก 💖</title>
    <meta name="description" content="เว็บไซต์โรแมนติกพิเศษที่เต็มไปด้วยความรัก ความทรงจำ และความสุข สำหรับโดนัท สุภิชยา ชีพสูงเนิน">
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700&family=Dancing+Script:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap" rel="stylesheet">
    
    <!-- FontAwesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    
    <!-- Favicon -->
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💖</text></svg>">
    
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Kanit', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            overflow: hidden;
        }
        
        #root {
            width: 100%;
            height: 100vh;
        }
        
        /* Loading Animation */
        .loading-screen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.5s ease-out;
        }
        
        .loading-heart {
            font-size: 60px;
            animation: heartbeat 1.5s infinite;
            margin-bottom: 20px;
        }
        
        .loading-text {
            color: white;
            font-size: 24px;
            font-weight: 500;
            text-align: center;
            margin-bottom: 10px;
        }
        
        .loading-subtext {
            color: rgba(255, 255, 255, 0.8);
            font-size: 16px;
            text-align: center;
        }
        
        @keyframes heartbeat {
            0%, 50%, 100% { transform: scale(1); }
            25%, 75% { transform: scale(1.1); }
        }
        
        .loading-dots {
            display: inline-block;
            animation: dots 1.5s infinite;
        }
        
        @keyframes dots {
            0%, 20% { content: ''; }
            40% { content: '.'; }
            60% { content: '..'; }
            80%, 100% { content: '...'; }
        }
        
        /* Fallback message for browsers without JavaScript */
        .no-js {
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 255, 255, 0.95);
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            max-width: 500px;
            margin: 20px;
        }
        
        .no-js h2 {
            color: #333;
            margin-bottom: 15px;
            font-size: 24px;
        }
        
        .no-js p {
            color: #666;
            line-height: 1.6;
            margin-bottom: 20px;
        }
        
        .no-js a {
            display: inline-block;
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 25px;
            font-weight: 500;
            transition: transform 0.3s ease;
        }
        
        .no-js a:hover {
            transform: translateY(-2px);
        }
    </style>
</head>
<body>
    <!-- React App Root -->
    <div id="root">
        <!-- Loading Screen -->
        <div class="loading-screen" id="loadingScreen">
            <div class="loading-heart">💖</div>
            <div class="loading-text">กำลังเตรียมความรักให้เธอ</div>
            <div class="loading-subtext">
                กรุณารอสักครู่<span class="loading-dots"></span>
            </div>
        </div>
    </div>
    
    <!-- Fallback for browsers without JavaScript -->
    <noscript>
        <div class="no-js" style="display: block;">
            <h2>💖 ต้องเปิด JavaScript นะคะ</h2>
            <p>
                เว็บไซต์นี้ใช้เทคโนโลยี React ที่ต้องการ JavaScript เพื่อแสดงเนื้อหาที่สวยงาม<br>
                กรุณาเปิด JavaScript ในเบราว์เซอร์ของคุณ แล้วรีเฟรชหน้านี้ใหม่
            </p>
            <a href="javascript:location.reload()">🔄 รีเฟรชหน้า</a>
        </div>
    </noscript>
    
    <!-- React Scripts will be injected here by build process -->
    <!-- For development, we'll include React and our app directly -->
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    
    <!-- Include our React app -->
    <script type="text/babel" src="src/index.js"></script>
    
    <script type="text/javascript">
        // Hide loading screen when React app loads
        window.addEventListener('DOMContentLoaded', function() {
            // Give React more time to load and render
            setTimeout(function() {
                const loadingScreen = document.getElementById('loadingScreen');
                if (loadingScreen) {
                    loadingScreen.style.opacity = '0';
                    setTimeout(function() {
                        loadingScreen.style.display = 'none';
                    }, 500);
                }
            }, 3000); // Show loading for 3 seconds to ensure React loads
        });
        
        // Better loading detection - hide when React actually renders
        const checkReactLoaded = () => {
            const reactRoot = document.querySelector('#root > div:not(.loading-screen)');
            if (reactRoot) {
                const loadingScreen = document.getElementById('loadingScreen');
                if (loadingScreen) {
                    loadingScreen.style.opacity = '0';
                    setTimeout(function() {
                        loadingScreen.style.display = 'none';
                    }, 500);
                }
            } else {
                setTimeout(checkReactLoaded, 100);
            }
        };
        
        // Start checking after a short delay
        setTimeout(checkReactLoaded, 1000);
        
        // Add some interactive effects
        document.addEventListener('mousemove', function(e) {
            const loading = document.getElementById('loadingScreen');
            if (!loading || loading.style.display === 'none') return;
            
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            loading.style.background = `
                radial-gradient(circle at ${x * 100}% ${y * 100}%, 
                rgba(255,255,255,0.1) 0%, 
                transparent 50%),
                linear-gradient(135deg, #667eea 0%, #764ba2 100%)
            `;
        });
    </script>
</body>
</html>
