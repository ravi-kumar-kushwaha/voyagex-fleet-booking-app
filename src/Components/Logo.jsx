const Logo = ({ 
    width = 120, 
    height = 120, 
    className = "",
    showAnimation = true 
  }) => {
    
    const gradientId1 = `modernGradient-${Math.random().toString(36).substr(2, 9)}`;
    const gradientId2 = `cardGradient-${Math.random().toString(36).substr(2, 9)}`;
    const gradientId3 = `vehicleGradient-${Math.random().toString(36).substr(2, 9)}`;
    const filterId1 = `dropshadow-${Math.random().toString(36).substr(2, 9)}`;
    const filterId2 = `glow-${Math.random().toString(36).substr(2, 9)}`;
  
    return (
      <svg 
        viewBox="0 0 240 240" 
        width={width} 
        height={height}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="VoyageX Logo"
      >
        <defs>
          <linearGradient id={gradientId1} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#667eea" />
            <stop offset="50%" stopColor="#764ba2" />
            <stop offset="100%" stopColor="#f093fb" />
          </linearGradient>
          
          <linearGradient id={gradientId2} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4facfe" />
            <stop offset="100%" stopColor="#00f2fe" />
          </linearGradient>
          
          <linearGradient id={gradientId3} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f8fafc" />
          </linearGradient>
          
          <filter id={filterId1} x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000000" floodOpacity="0.1"/>
          </filter>
          
          <filter id={filterId2} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
      
        <circle cx="120" cy="120" r="110" fill={`url(#${gradientId1})`} opacity="0.1"/>
        <circle cx="120" cy="120" r="100" fill={`url(#${gradientId1})`} filter={`url(#${filterId1})`}/>
        <circle cx="120" cy="120" r="95" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
        
        
        <g transform="translate(60, 85)">
          <path 
            d="M15 25 Q12 18 20 18 L100 18 Q108 18 105 25 L105 38 Q110 38 112 43 L112 48 Q112 53 107 53 L100 53 Q98 58 93 58 L87 58 Q82 58 82 53 L38 53 Q38 58 33 58 L27 58 Q22 58 22 53 L15 53 Q10 53 10 48 L10 43 Q12 38 17 38 Z" 
            fill={`url(#${gradientId3})`}
            stroke="rgba(100,116,139,0.3)" 
            strokeWidth="1" 
            filter={`url(#${filterId1})`}
          />
          
      
          <rect x="25" y="20" width="30" height="15" rx="6" fill={`url(#${gradientId2})`} opacity="0.8"/>
          <rect x="65" y="20" width="30" height="15" rx="6" fill={`url(#${gradientId2})`} opacity="0.8"/>
          

          <circle cx="30" cy="53" r="10" fill="#1e293b"/>
          <circle cx="90" cy="53" r="10" fill="#1e293b"/>
          <circle cx="30" cy="53" r="7" fill={`url(#${gradientId2})`}/>
          <circle cx="90" cy="53" r="7" fill={`url(#${gradientId2})`}/>
          <circle cx="30" cy="53" r="4" fill="#ffffff" opacity="0.9"/>
          <circle cx="90" cy="53" r="4" fill="#ffffff" opacity="0.9"/>
          
         
          <ellipse cx="108" cy="30" rx="4" ry="2" fill="#00f2fe" filter={`url(#${filterId2})`}/>
          <ellipse cx="108" cy="40" rx="4" ry="2" fill="#00f2fe" filter={`url(#${filterId2})`}/>
        </g>

        <g transform="translate(145, 60)">
          <rect x="0" y="0" width="30" height="45" rx="8" fill={`url(#${gradientId3})`} stroke="rgba(100,116,139,0.2)" strokeWidth="1" filter={`url(#${filterId1})`}/>
          <rect x="3" y="6" width="24" height="33" rx="4" fill={`url(#${gradientId2})`}/>
          <rect x="6" y="9" width="18" height="3" rx="1" fill="#ffffff" opacity="0.9"/>
          <rect x="6" y="15" width="12" height="2" rx="1" fill="#ffffff" opacity="0.7"/>
          <rect x="6" y="19" width="8" height="2" rx="1" fill="#ffffff" opacity="0.7"/>
          <rect x="6" y="25" width="18" height="6" rx="3" fill="#ffffff" opacity="0.9"/>
          <text x="15" y="29" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="4" fill={`url(#${gradientId2})`} fontWeight="bold">BOOK</text>
          <rect x="12" y="41" width="6" height="2" rx="1" fill="rgba(100,116,139,0.3)"/>
        </g>
        
   
        <g transform="translate(75, 130)">
          <path d="M15 5 Q20 0 25 5 Q25 12 15 25 Q5 12 5 5 Q10 0 15 5 Z" fill="#ef4444" filter={`url(#${filterId1})`}/>
          <circle cx="15" cy="8" r="4" fill="#ffffff"/>
          <circle cx="15" cy="8" r="2" fill="#ef4444"/>
          
        
          {showAnimation && (
            <circle cx="15" cy="8" r="8" fill="none" stroke="#ef4444" strokeWidth="1" opacity="0.3">
              <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite"/>
            </circle>
          )}
        </g>
        
   
        <text x="120" y="180" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="800" fill="#ffffff" filter={`url(#${filterId1})`}>
          VoyageX
        </text>
        <text x="120" y="200" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fill="rgba(255,255,255,0.8)" fontWeight="300">
          Smart Mobility
        </text>
        
        
        {showAnimation && (
          <>
            <circle cx="180" cy="80" r="3" fill="#00f2fe" opacity="0.6">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite"/>
            </circle>
            <circle cx="60" cy="60" r="2" fill="#f093fb" opacity="0.4">
              <animate attributeName="opacity" values="0.4;0.8;0.4" dur="4s" repeatCount="indefinite"/>
            </circle>
          </>
        )}
      </svg>
    );
  };
  
  export default Logo;
  