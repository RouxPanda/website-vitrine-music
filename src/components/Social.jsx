import React from 'react';

function Social() {
  const socialLinks = [
    { name: 'Spotify', url: '#', path: 'svg/spotify.svg' },
    { name: 'SoundCloud', url: '#', path: 'svg/soundcloud.svg' },
    { name: 'Instagram', url: '#', path: 'svg/instagram.svg' },
    { name: 'Twitter', url: '#', path: 'svg/twitter.svg' },
  ];

  return (
    <section id="social" className="min-h-screen flex flex-col justify-center py-20 px-4">
      <div className='relative w-1/3 justify-center mx-auto'>
        <div className='absolute w-full h-full bg-white/[.3] blur-xl rounded-3xl z-0'></div>
        <div className="relative z-10 m-10">
          <h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold uppercase tracking-tighter text-center mb-16 text-black"
          >
            Follow Me
          </h2>
          
          <div className="flex flex-wrap justify-center gap-16">
            {socialLinks.map((social, index) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whilehover={{ y: -4 }}
                className="flex flex-col items-center gap-4 text-black"
              >
                <img 
                  src={social.path}
                  className="w-10 transition-transform duration-300 hover:scale-110"
                />
                <span className="text-sm uppercase tracking-wider">{social.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Social;