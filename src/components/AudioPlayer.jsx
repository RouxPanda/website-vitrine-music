import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudioPlayer } from '../context/AudioPlayerContext.jsx';
import ProgressBar from './ProgressBar.jsx';
import { formatTime } from '../utils/timeFormat.js';

function AudioPlayer() {
  const { currentTrack, isPlaying, togglePlay, closePlayer } = useAudioPlayer();
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [volume, setVolume] = useState(1);
  const [volumeBeforeMute, setVolumeBeforeMute] = useState(1);
  const [mute, setMute] = useState(false);
  const seekIntervalRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      // Recharge uniquement si le morceau a changé
      if (audio.src !== currentTrack.audioUrl) {
        audio.load();
        setCurrentTime(0); // Réinitialise le timecode uniquement sur changement de piste
      }

      if (isPlaying) {
        audio.play().catch(error => {
          console.error("Audio playback error:", error);
          togglePlay(false);
        });
      } else {
        audio.pause();
      }
    }
  }, [isPlaying, currentTrack, togglePlay]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setCurrentTime(0);
    };
    const handleEnded = () => {
      setCurrentTime(0);
      togglePlay(false);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('canplay', handleLoadedMetadata);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('canplay', handleLoadedMetadata);
    };
  }, [togglePlay]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (mute) {
      setVolumeBeforeMute(volume);
      setVolume(0)
    } else {
      setVolume(volumeBeforeMute)
    }
  }, [mute]);
  

  const startSeek = (direction) => {
    setIsSeeking(true);
    const seekAmount = direction === 'forward' ? 2 : -2;
    
    seekIntervalRef.current = setInterval(() => {
      const audio = audioRef.current;
      if (audio) {
        const newTime = Math.max(0, Math.min(audio.duration, audio.currentTime + seekAmount));
        audio.currentTime = newTime;
      }
    }, 100);
  };

  const stopSeek = () => {
    setIsSeeking(false);
    if (seekIntervalRef.current) {
      clearInterval(seekIntervalRef.current);
      seekIntervalRef.current = null;
    }
  };

  if (!currentTrack) return null;

  return (
    <AnimatePresence>
      {currentTrack && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className='fixed top-5 right-5 bg-gray-200 p-4 border-2 border-gray-500 z-50'
        >
          <audio ref={audioRef} src={currentTrack.audioUrl} onEnded={() => togglePlay(false)} />

          <div className='flex flex-col items-start'>
            <div className='box-player flex flex-col border border-gray-500 w-full mb-2 p-2 bg-gray-800'>
              {/* Display Title */}
              <div className='w-full text-left text-green-500 text-sm font-pixel'>
                <p>{currentTrack.title}</p>
              </div>
              <div className='w-full text-left text-green-500 text-sm font-pixel'>
                <p>{currentTrack.artist} {formatTime(currentTime)} / {formatTime(duration)}</p>
              </div>
              <div className='flex flex-row items-center w-full pt-2'>
                <div className="relative mr-4 w-6 h-6 flex items-center justify-center bg-transparent rounded-full hover:bg-gray-600 transition-all">
                  <img 
                    src={mute ? 'svg/mute-audio-play-svgrepo-com.svg' : 'svg/sound-on-music-svgrepo-com.svg'}
                    className="w-4"
                    onClick={(e) => setMute(!mute)}
                  />
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="has-box-indicator"
                />
                </div>
            </div>

            {/* Playback Controls */}
            <div className='box-player flex items-center space-x-1 border border-gray-500 p-2 bg-gray-300'>
              {/* Play Button */}
              <div className='winCl-wrap'>
                <button
                  onClick={() => togglePlay()}
                  className={`${isPlaying ? "winCl-btn-play" : "winCl-btn"}`}
                  //className={`flex items-center justify-center w-8 h-6 bg-gray-100 border border-gray-500 active:bg-gray-300 ${isPlaying ? 'bg-gray-300' : ''}`}
                >
                  <svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
                    <path d='M8 5v14l11-7z' />
                  </svg>
                </button>
              </div>

              {/* Pause Button */}
              <div className='winCl-wrap'>
                <button
                  onClick={() => togglePlay(false)}
                  className='winCl-btn'
                  // className="flex items-center justify-center w-8 h-6 bg-gray-100 border border-gray-500 active:bg-gray-300"
                >
                  <svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
                    <path d='M6 19h4V5H6v14zm8-14v14h4V5h-4z' />
                  </svg>
                </button>
              </div>

              {/* Stop Button */}
              <div className='winCl-wrap'>
                <button
                  onClick={closePlayer}
                  className='winCl-btn'
                  //className="flex items-center justify-center w-8 h-6 bg-gray-100 border border-gray-500 active:bg-gray-300"
                >
                  <svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
                    <path d='M6 6h12v12H6z' />
                  </svg>
                </button>
              </div>

              {/* Previous Button */}
              <div className='winCl-wrap'>
                <button
                  onClick={() => previousTrack()}
                  className='winCl-btn winCl-btn-play cursor-default'
                  //className="flex items-center justify-center w-8 h-6 bg-gray-100 border border-gray-500 active:bg-gray-300"
                >
                  <svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
                    <path d="M22 6L13.2571 12.1714L22 18.3429V6Z"/>
                    <path d='M4 12.1714V18.3429H2V6.34286H4V12.1714ZM4 12.1714L12.7429 6V18.3429L4 12.1714Z' />
                  </svg>
                </button>
              </div>

              {/* Next Button */}
              <div className='winCl-wrap'>
                <button
                  onClick={() => nextTrack()}
                  className='winCl-btn winCl-btn-play cursor-default'
                  //className="flex items-center justify-center w-8 h-6 bg-gray-100 border border-gray-500 active:bg-gray-300"
                >
                  <svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
                    <path d="M2 18.3429L10.7429 12.1714L2 6V18.3429Z"/>
                    <path d='M20 12.1714L11.2571 18.3429V6L20 12.1714ZM20 12.1714V6H22V18H20V12.1714Z' />
                  </svg>
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className='box-player w-full mt-2'>
              <ProgressBar
                currentTime={currentTime}
                duration={duration}
                onSeek={time => {
                  if (audioRef.current) {
                    audioRef.current.currentTime = time;
                  }
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AudioPlayer;