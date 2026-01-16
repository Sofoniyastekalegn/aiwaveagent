
import React from 'react';

interface WaveformProps {
  isActive: boolean;
  colorClass?: string;
}

const Waveform: React.FC<WaveformProps> = ({ isActive, colorClass = "from-blue-400 to-purple-500" }) => {
  const bars = [0, 100, 200, 300, 400, 500, 600];
  
  return (
    <div className="flex justify-center items-center space-x-2 h-24">
      {bars.map((delay, i) => (
        <div
          key={i}
          className={`w-3 bg-gradient-to-b ${colorClass} rounded-full ${
            isActive ? `animate-wave` : 'h-2'
          }`}
          style={{ 
            animationDelay: isActive ? `${delay}ms` : '0s',
            height: isActive ? 'auto' : '8px'
          }}
        ></div>
      ))}
    </div>
  );
};

export default Waveform;
