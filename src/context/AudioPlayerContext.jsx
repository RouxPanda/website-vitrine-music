import React, { createContext, useContext, useState } from 'react';

const AudioPlayerContext = createContext();

export function AudioPlayerProvider({ children }) {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playTrack = (track) => {
    if (currentTrack?.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  const togglePlay = (value) => {
    setIsPlaying(value ?? !isPlaying);
  };

  const closePlayer = () => {
    setCurrentTrack(null);
    setIsPlaying(false);
  };

  return (
    <AudioPlayerContext.Provider value={{
      currentTrack,
      isPlaying,
      playTrack,
      togglePlay,
      closePlayer
    }}>
      {children}
    </AudioPlayerContext.Provider>
  );
}

export function useAudioPlayer() {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error('useAudioPlayer must be used within an AudioPlayerProvider');
  }
  return context;
}