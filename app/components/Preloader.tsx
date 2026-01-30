'use client';

import { useEffect, useState } from 'react';

interface PreloaderProps {
  onReboot: () => void;
}

export default function Preloader({ onReboot }: PreloaderProps) {
  const [isComplete, setIsComplete] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Show REBOOT button after short sequence
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleReboot = () => {
    setIsComplete(true);
    // Mount the site immediately so it fades in UNDER the preloader
    onReboot();
  };

  if (isComplete) return null;

  return (
    <div className={`fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center transition-opacity duration-700 ${isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          className="w-full h-full object-cover opacity-20 filter grayscale"
          autoPlay
          muted
          playsInline
          loop
          suppressHydrationWarning
        >
          <source src="/preloader.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-80" />
      </div>

      {/* Main Content */}
      <div className={`relative z-10 flex flex-col items-center gap-16 text-center w-full max-w-xl px-6 transition-all duration-300 ${isComplete ? 'scale-90 opacity-0' : 'scale-100 opacity-100'}`}>
        <div className="space-y-4">
          <div className="h-[1px] w-64 bg-zinc-900 mx-auto overflow-hidden relative">
            <div className={`h-full bg-red-600 shadow-[0_0_15px_#dc2626] transition-all duration-[3000ms] ease-in-out ${isReady ? 'w-full' : 'w-0'}`} />
          </div>
          <p className="font-mono text-[9px] tracking-[0.8em] text-zinc-600 uppercase">
            {isReady ? 'SYSTEM STATUS: READY' : 'RECOVERY IN PROGRESS...'}
          </p>
        </div>

        <div className={`transition-all duration-1000 delay-500 transform ${isReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <button
            onClick={handleReboot}
            className="group relative px-24 py-8 overflow-hidden transition-all duration-300 active:scale-95"
          >
            {/* Sharp Glitch Border - NO SOFT FOG */}
            <div className="absolute inset-0 border border-zinc-800 transition-colors duration-300 group-hover:border-red-600/50" />

            {/* The "Glitch" elements on hover */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-red-600 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
            <div className="absolute bottom-0 right-0 w-full h-[1px] bg-red-600 translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
            <div className="absolute top-0 left-0 w-[1px] h-full bg-red-600 -translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-100 ease-out" />
            <div className="absolute bottom-0 right-0 w-[1px] h-full bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-100 ease-out" />

            {/* Corner Markers - Sharper */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-zinc-700 transition-colors duration-300 group-hover:border-red-600" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-zinc-700 transition-colors duration-300 group-hover:border-red-600" />

            <span className="relative z-10 font-heading text-5xl md:text-6xl tracking-[0.5em] text-zinc-300 group-hover:text-white group-hover:tracking-[0.6em] transition-all duration-500">
              REBOOT
            </span>

            {/* Scanline Scan Effect on Hover */}
            <div className="absolute inset-0 bg-red-600/5 -translate-y-full group-hover:translate-y-full transition-transform duration-700 ease-linear pointer-events-none" />
          </button>

          <div className="mt-12 space-y-2 opacity-40 group-hover:opacity-80 transition-opacity">
            <p className="font-mono text-[10px] text-zinc-500 tracking-[0.4em] uppercase">
              Encryption Protocol: ENABLED
            </p>
            <p className="font-mono text-[9px] text-red-600/80 tracking-widest uppercase">
              Click to override system failure
            </p>
          </div>
        </div>
      </div>

      {/* Retro Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none z-[100] opacity-[0.05] select-none mix-blend-overlay"
        style={{ backgroundImage: `linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.05), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.05))` }}
      />
    </div>
  );
}
