import React, { useRef, useCallback } from 'react';

function ProgressBar({ currentTime, duration, onSeek }) {
  const progressRef = useRef(null);
  const isDraggingRef = useRef(false);

  const calculateSeekTime = useCallback((clientX) => {
    const bounds = progressRef.current.getBoundingClientRect();
    const x = clientX - bounds.left;
    const width = bounds.width;
    const percentage = Math.min(Math.max(x / width, 0), 1);
    return percentage * duration;
  }, [duration]);

  const handleClick = (e) => {
    if (!duration) return;
    const seekTime = calculateSeekTime(e.clientX);
    onSeek(seekTime);
  };

  const handleMouseDown = () => {
    isDraggingRef.current = true;
  };

  const handleMouseMove = (e) => {
    if (isDraggingRef.current && duration) {
      const seekTime = calculateSeekTime(e.clientX);
      onSeek(seekTime);
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  React.useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [duration]);

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={progressRef}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      className="h-4 cursor-pointer relative overflow-hidden group bg-gray-100 border border-gray-500"
    >
      <div
        className="absolute top-0 left-0 h-full bg-blue-600 transition-all duration-100"
        style={{ width: `${progress}%` }}
      />
      <div
        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ left: `${progress}%`, transform: `translate(-50%, -50%)` }}
      />
    </div>
  );
}

export default ProgressBar;