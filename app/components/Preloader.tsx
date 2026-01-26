'use client';

import { useEffect, useState } from 'react';

export default function Preloader() {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Force 16 second delay before showing main site
    const timer = setTimeout(() => {
      setIsComplete(true);
    }, 6000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (isComplete) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[200] bg-black flex items-center justify-center transition-opacity duration-1000 ${isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
    >
      <video
        className="w-full h-full object-cover"
        autoPlay
        muted
        playsInline
        loop
        suppressHydrationWarning
      >
        <source src="/preloader.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
