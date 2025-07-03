import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  // Check if maintenance mode is enabled
  const envMaintenanceMode = import.meta.env.MAINTENANCE_MODE;
  const processMaintenanceMode = process.env.MAINTENANCE_MODE;

  // Debug logging (will appear in Vercel function logs)
  console.log('🔧 Maintenance Mode Check:', {
    'import.meta.env.MAINTENANCE_MODE': envMaintenanceMode,
    'process.env.MAINTENANCE_MODE': processMaintenanceMode,
    'NODE_ENV': process.env.NODE_ENV
  });

  const isMaintenanceMode = envMaintenanceMode === 'true' ||
                           envMaintenanceMode === '1' ||
                           processMaintenanceMode === 'true' ||
                           processMaintenanceMode === '1';

  // If maintenance mode is enabled, show maintenance page for all routes
  if (isMaintenanceMode) {
    console.log('🚧 Maintenance mode is ACTIVE - showing maintenance page');
    
    // Import and render the maintenance page
    const maintenancePageContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Maintenance Mode - Playphysio</title>
  <meta name="description" content="Playphysio is currently undergoing maintenance. We'll be back soon!">
  <meta name="robots" content="noindex, nofollow">
  
  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="icon" type="image/png" href="/favicon.png">
  
  <!-- Prevent caching during maintenance -->
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
  <meta http-equiv="Pragma" content="no-cache">
  <meta http-equiv="Expires" content="0">
  
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      line-height: 1.6;
    }
    
    .maintenance-container {
      text-align: center;
      max-width: 600px;
      padding: 2rem;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }
    
    .logo {
      width: 200px;
      height: auto;
      margin: 0 auto 2rem;
    }
    
    .maintenance-icon {
      font-size: 4rem;
      margin-bottom: 1.5rem;
      opacity: 0.8;
      animation: float 3s ease-in-out infinite;
    }
    
    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
      background: linear-gradient(45deg, #fff, #f0f0f0);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .maintenance-message {
      font-size: 1.2rem;
      margin-bottom: 2rem;
      opacity: 0.9;
    }
    
    .datetime {
      background: rgba(255, 255, 255, 0.15);
      padding: 1rem;
      border-radius: 10px;
      margin-bottom: 2rem;
      font-weight: 500;
    }
    
    .back-soon {
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 2rem;
      color: #ffd700;
    }
    

    

    
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    
    @media (max-width: 768px) {
      .maintenance-container {
        margin: 1rem;
        padding: 1.5rem;
      }
      
      h1 {
        font-size: 2rem;
      }
      
      .maintenance-message {
        font-size: 1rem;
      }
      
      .maintenance-icon {
        font-size: 3rem;
      }
    }
  </style>
</head>
<body>
  <div class="maintenance-container">
    <!-- Playphysio Logo -->
    <img src="/images/playphysio-p-footer-logo.svg" alt="Playphysio" class="logo">
    
    <!-- Maintenance Icon -->
    <div class="maintenance-icon">🔧</div>
    
    <!-- Main Title -->
    <h1>Site Maintenance in Progress</h1>
    
    <!-- Maintenance Message -->
    <p class="maintenance-message">We're currently performing scheduled maintenance - back soon!</p>
    
    <!-- Current Date/Time -->
    <div class="datetime">
      <strong>Maintenance started:</strong><br>
      ${new Date().toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
      })}
    </div>
    
    <!-- Back Soon Message -->
    <p class="back-soon">We'll be back soon!</p>
    

  </div>
  
  <!-- Auto-refresh every 5 minutes to check if maintenance is complete -->
  <script>
    // Refresh page every 5 minutes (300000 ms)
    setTimeout(() => {
      window.location.reload();
    }, 300000);
    
    // Show a subtle notification about auto-refresh
    console.log('🔄 Page will auto-refresh in 5 minutes to check if maintenance is complete');
  </script>
</body>
</html>`;

    return new Response(maintenancePageContent, {
      status: 503, // Service Unavailable
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Retry-After': '300' // Suggest retry after 5 minutes
      }
    });
  }

  // If maintenance mode is not enabled, continue with normal request
  console.log('✅ Maintenance mode is OFF - serving normal content');
  return next();
});
