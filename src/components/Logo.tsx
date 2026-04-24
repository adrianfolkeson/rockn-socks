'use client'

export function Logo({ className = 'h-10' }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 220 50" 
      className={className}
      fill="none"
    >
      {/* Sock Icon */}
      <g transform="translate(0, 5)">
        <path 
          d="M10 5 L10 30 Q10 40 20 40 L35 40 Q45 40 45 30 L45 22 Q45 15 38 12 L22 10 Q15 9 12 5 Z" 
          stroke="url(#logoGrad)" 
          strokeWidth="3" 
          strokeLinecap="round"
          fill="none"
        />
        <line x1="15" y1="15" x2="25" y2="17" stroke="url(#logoGrad)" strokeWidth="2" strokeLinecap="round"/>
        <line x1="16" y1="23" x2="28" y2="25" stroke="url(#logoGrad)" strokeWidth="2" strokeLinecap="round"/>
        <line x1="18" y1="31" x2="32" y2="33" stroke="url(#logoGrad)" strokeWidth="2" strokeLinecap="round"/>
      </g>
      
      {/* Text */}
      <text 
        x="55" 
        y="38" 
        fontFamily="system-ui, -apple-system, Arial, sans-serif" 
        fontWeight="800" 
        fontSize="28" 
        fill="#1e1e1e"
      >
        Strumpmix
      </text>
      
      {/* Underline */}
      <rect x="55" y="45" width="115" height="3" rx="1.5" fill="url(#logoGrad)"/>
      
      {/* Gradient Definition */}
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ec4899"/>
          <stop offset="100%" stopColor="#a855f7"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

export function LogoWhite({ className = 'h-10' }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 220 50" 
      className={className}
      fill="none"
    >
      {/* Sock Icon */}
      <g transform="translate(0, 5)">
        <path 
          d="M10 5 L10 30 Q10 40 20 40 L35 40 Q45 40 45 30 L45 22 Q45 15 38 12 L22 10 Q15 9 12 5 Z" 
          stroke="url(#logoGradW)" 
          strokeWidth="3" 
          strokeLinecap="round"
          fill="none"
        />
        <line x1="15" y1="15" x2="25" y2="17" stroke="url(#logoGradW)" strokeWidth="2" strokeLinecap="round"/>
        <line x1="16" y1="23" x2="28" y2="25" stroke="url(#logoGradW)" strokeWidth="2" strokeLinecap="round"/>
        <line x1="18" y1="31" x2="32" y2="33" stroke="url(#logoGradW)" strokeWidth="2" strokeLinecap="round"/>
      </g>
      
      {/* Text */}
      <text 
        x="55" 
        y="38" 
        fontFamily="system-ui, -apple-system, Arial, sans-serif" 
        fontWeight="800" 
        fontSize="28" 
        fill="#ffffff"
      >
        Strumpmix
      </text>
      
      {/* Underline */}
      <rect x="55" y="45" width="115" height="3" rx="1.5" fill="url(#logoGradW)"/>
      
      {/* Gradient Definition */}
      <defs>
        <linearGradient id="logoGradW" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ec4899"/>
          <stop offset="100%" stopColor="#a855f7"/>
        </linearGradient>
      </defs>
    </svg>
  )
}
