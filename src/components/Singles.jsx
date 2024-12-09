import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useAudioPlayer } from '../context/AudioPlayerContext.jsx';
import { singles } from '../data/singles.js';
import FlippableCard from './FlippableCard.jsx';

function Singles() {
  const { playTrack } = useAudioPlayer();
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 600; // Approximately 2 cards width
    const targetScroll = container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
    
    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  };

  return (
    <section id="singles" className="min-h-screen flex flex-col justify-center py-20 px-4">
      <div className="text-center bg-black mb-16 px-3 mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl text-white py-1 font-bold uppercase tracking-tighter text-center"
        >
          Singles
        </motion.h2>
      </div>
      
      <div className="relative px-12">
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:opacity-80 transition-opacity z-10"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>
        
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:opacity-80 transition-opacity z-10"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
          </svg>
        </button>
        
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-8 scrollbar-hide scroll-smooth px-4"
        >
          {singles.map((single) => (
            <motion.div
              key={single.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whilehover={{ scale: 1.02 }}
              className="relative flex-none w-[300px] aspect-square cursor-pointer"
            >
              <FlippableCard track={single} onPlay={playTrack} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Singles;