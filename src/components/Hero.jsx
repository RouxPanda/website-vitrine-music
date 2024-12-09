import React from 'react';

function Hero() {
  return (
    <section id="hero" className="h-screen flex items-center justify-center relative">
      <div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center scale-animation"
      >
        <h1 className="font-['Proxima_Nova'] text-[clamp(3rem,10vw,8rem)] font-bold tracking-tighter leading-none animated-title">
          ????????
        </h1>
      </div>
      
      <div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </div>
    </section>
  );
}

export default Hero;