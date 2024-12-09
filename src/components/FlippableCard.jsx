import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAudioPlayer } from '../context/AudioPlayerContext';

function FlippableCard({ track, onPlay }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const { currentTrack, isPlaying } = useAudioPlayer();

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const isCurrentTrack = currentTrack?.id === track.id;

  return (
    <div className="relative w-full h-full perspective-1000">
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front of card */}
        <div 
          className="absolute w-full h-full backface-hidden cursor-pointer hover:rotate-2 transition-all transform"
          onClick={() => setIsFlipped(true)}
        >
          <img 
            src={track.cover} 
            alt={track.title}
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-30 transition-opacity rounded-lg" />
        </div>

        {/* Back of card */}
        <div 
          className="absolute w-full h-full bg-white backface-hidden rounded-lg overflow-hidden"
          style={{ transform: 'rotateY(180deg)' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <img 
              src={track.cover} 
              alt=""
              className="w-full h-full object-cover grayscale opacity-20"
            />
          </div>

          {/* Content */}
          <div className="relative z-10 p-6 h-full flex flex-col">
            <button 
              onClick={() => setIsFlipped(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>

            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">{track.title}</h3>
              <p className="text-gray-600 mb-4">Duration: {formatDuration(track.duration || 180)}</p>
              <p className="text-gray-600">{track.description || 'No description available'}</p>
            </div>

            <button
              onClick={() => onPlay(track)}
              className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:opacity-80 transition-opacity ml-auto"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                {isCurrentTrack && isPlaying ? (
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                ) : (
                  <path d="M8 5v14l11-7z"/>
                )}
              </svg>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default FlippableCard;