export function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg" fill="none">
      {/* Middle Person - Orange */}
      <circle cx="50" cy="20" r="7" fill="#F57C00" />
      <path d="M30 15 Q43 28 50 40 Q57 28 70 15 Q57 35 50 50 Q43 35 30 15 Z" fill="#F57C00" />
      
      {/* Left Person - Yellow */}
      <circle cx="25" cy="32" r="6" fill="#FFC107" />
      <path d="M10 28 Q20 40 25 50 Q30 40 40 28 Q33 45 25 60 Q17 45 10 28 Z" fill="#FFC107" />
      
      {/* Right Person - Red */}
      <circle cx="75" cy="32" r="6" fill="#D32F2F" />
      <path d="M60 28 Q70 40 75 50 Q80 40 90 28 Q83 45 75 60 Q67 45 60 28 Z" fill="#D32F2F" />
      
      {/* Graduation Cap Top (Diamond) */}
      <path d="M50 40 L95 56 L50 72 L5 56 Z" fill="#222222" />
      
      {/* Cap Base */}
      <path d="M30 63 L30 84 Q50 92 70 84 L70 63 L50 72 Z" fill="#222222" />
      
      {/* Tassel */}
      <line x1="50" y1="56" x2="50" y2="84" stroke="#757575" strokeWidth="2" />
      <path d="M47 84 L53 84 L55 94 L45 94 Z" fill="#757575" />
    </svg>
  );
}
