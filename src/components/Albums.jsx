import React from 'react';
import { motion } from 'framer-motion';
import { useAudioPlayer } from '../context/AudioPlayerContext.jsx';
import { albums } from '../data/albums.js';
import FlippableCard from './FlippableCard.jsx';

function Albums() {
  const { playTrack } = useAudioPlayer();

  return (
    <section id="albums" className="min-h-screen flex flex-col justify-center py-20 px-4">
      <div className="text-center bg-black mb-16 px-3 mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl text-white py-1 font-bold uppercase tracking-tighter text-center"
        >
          Albums
        </motion.h2>
      </div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto w-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {albums.map((album, index) => (
          <motion.div
            key={album.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative aspect-square w-full"
          >
            <FlippableCard track={album} onPlay={playTrack} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default Albums;