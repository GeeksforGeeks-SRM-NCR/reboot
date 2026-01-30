'use client';

import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { cn } from '@/lib/utils';

interface PreloaderProps {
  onReboot: () => void;
}

export default function Preloader({ onReboot }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('ESTABLISHING SECURE CONNECTION...');
  const [isReady, setIsReady] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const ring1Ref = useRef<SVGSVGElement>(null);
  const ring2Ref = useRef<SVGSVGElement>(null);
  const ring3Ref = useRef<SVGSVGElement>(null);
  const shockwaveRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const ctx = gsap.context(() => {
      // 1. Initial rings rotation
      gsap.to(ring1Ref.current, { rotation: 360, duration: 10, repeat: -1, ease: "none" });
      gsap.to(ring2Ref.current, { rotation: -360, duration: 15, repeat: -1, ease: "none" });
      gsap.to(ring3Ref.current, { rotation: 180, duration: 8, repeat: -1, ease: "none" });

      // 2. Progress Simulation
      const progressObj = { value: 0 };
      gsap.to(progressObj, {
        value: 100,
        duration: 4,
        ease: "power2.inOut",
        onUpdate: () => setProgress(Math.floor(progressObj.value)),
        onComplete: triggerCompletion
      });

      // 3. Status Text Cycling
      const statusStates = [
        "ESTABLISHING SECURE CONNECTION...",
        "DECRYPTING CORE PROTOCOLS...",
        "INITIALIZING NEURAL OVERLAY...",
        "SYSTEM PRE-FLIGHT CHECK...",
        "SYNCING QUANTUM STATE..."
      ];

      let stateIndex = 0;
      const statusInterval = setInterval(() => {
        if (stateIndex < statusStates.length - 1) {
          stateIndex++;
          setStatus(statusStates[stateIndex]);
        }
      }, 800);

      function triggerCompletion() {
        clearInterval(statusInterval);
        setStatus("CONNECTION COMPLETE");
        setIsReady(true);

        // Pause for dramatic effect
        setTimeout(() => {
          // Shockwave effect
          if (shockwaveRef.current) {
            gsap.fromTo(shockwaveRef.current,
              { scale: 0.5, opacity: 1 },
              { scale: 4, opacity: 0, duration: 1, ease: "power4.out" }
            );
          }

          // Background distortion flicker
          gsap.to(containerRef.current, {
            filter: "hue-rotate(90deg) brightness(1.5)",
            duration: 0.1,
            repeat: 3,
            yoyo: true,
            onComplete: () => {
              gsap.set(containerRef.current, { filter: "none" });
              setShowButton(true);
            }
          });
        }, 500);
      }
    });

    return () => ctx.revert();
  }, []);

  const [isExited, setIsExited] = useState(false);

  const handleReboot = () => {
    // Mount the site behind the preloader IMMEDIATELY
    onReboot();

    // Cinematic zoom and fade (NO BLUR)
    gsap.to(containerRef.current, {
      scale: 1.5,
      opacity: 0,
      duration: 1.2,
      ease: "power4.inOut",
      onComplete: () => {
        setIsExited(true);
      }
    });
  };

  if (isExited) return null;

  return (
    <div
      ref={containerRef}
      className={cn(
        "fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center overflow-hidden transition-colors duration-1000",
        isReady ? "bg-black/95" : "bg-black"
      )}
    >
      {/* --- BACKGROUND EFFECTS --- */}
      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-screen bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.05] select-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
        <div className="absolute top-0 left-0 w-full h-1/4 bg-gradient-to-b from-transparent via-red-500/10 to-transparent animate-scanline" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {isMounted && [...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-red-500/20"
            style={{
              width: Math.random() * 4 + 1 + 'px',
              height: Math.random() * 4 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `-${Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* --- CONTENT STACK --- */}
      <div className="relative flex flex-col items-center justify-center gap-12 max-w-2xl w-full px-6">

        {/* --- CENTRAL CORE --- */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
          {/* Holographic Rings */}
          {/* Outer Ring */}
          <svg ref={ring1Ref} className="absolute w-full h-full opacity-40" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-red-900" />
            <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="1, 15" className="text-red-600" />
          </svg>

          {/* Middle Ring */}
          <svg ref={ring2Ref} className="absolute w-[80%] h-[80%] opacity-60" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-cyan-900/30" />
            <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="20, 180" className="text-cyan-400/50" />
            <path d="M 50,2 A 48,48 0 0,1 98,50" fill="none" stroke="currentColor" strokeWidth="1" className="text-red-500" />
          </svg>

          {/* Inner Ring (Pulse) */}
          <svg ref={ring3Ref} className="absolute w-[60%] h-[60%] opacity-80" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-red-800" />
            <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="2, 58" className="text-red-500 animate-pulse" />
          </svg>

          {/* Percentage Counter */}
          <div className="absolute flex flex-col items-center">
            <span className="text-5xl md:text-6xl font-heading font-bold text-white tracking-widest relative">
              {progress}<span className="text-2xl opacity-50">%</span>
              <span className="absolute inset-0 text-red-500 opacity-0 group-hover:opacity-100 animate-glitch-active pointer-events-none">
                {progress}%
              </span>
            </span>
            <div className="mt-2 flex gap-1">
              <div className={cn("w-1 h-3 bg-red-600 transition-opacity", progress > 20 ? "opacity-100" : "opacity-20")} />
              <div className={cn("w-1 h-3 bg-red-600 transition-opacity", progress > 40 ? "opacity-100" : "opacity-20")} />
              <div className={cn("w-1 h-3 bg-red-600 transition-opacity", progress > 60 ? "opacity-100" : "opacity-20")} />
              <div className={cn("w-1 h-3 bg-red-600 transition-opacity", progress > 80 ? "opacity-100" : "opacity-20")} />
            </div>
          </div>

          {/* Shockwave Element */}
          <div
            ref={shockwaveRef}
            className="absolute rounded-full border border-red-500/50 opacity-0 pointer-events-none"
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        {/* --- STATUS LINE --- */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative overflow-hidden px-4 py-1">
            <div className="absolute inset-0 bg-red-500/5" />
            <div className="flex items-center gap-4">
              <span className={cn(
                "text-[10px] font-mono tracking-widest px-2 py-0.5 rounded",
                progress < 100 ? "bg-red-500/20 text-red-400 animate-pulse" : "bg-green-500/20 text-green-400"
              )}>
                {progress < 100 ? (progress < 10 ? 'READY' : 'SYNCING') : 'COMPLETE'}
              </span>
              <p className="font-mono text-[11px] tracking-[0.3em] text-zinc-400 uppercase">
                {status}
              </p>
            </div>
            {/* Scanning Beam */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-red-500/40 animate-scan-horizontal" />
          </div>
        </div>

        {/* --- REBOOT BUTTON --- */}
        <div className={cn(
          "flex flex-col items-center gap-8 transition-all duration-1000",
          showButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
        )}>
          <button
            onClick={handleReboot}
            className="group relative px-12 py-5 transition-all duration-500 active:scale-95"
          >
            {/* Button Frame */}
            <div className="absolute inset-0 border border-white/10 transition-colors duration-500 group-hover:border-red-600/50" />

            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-red-600 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-red-600 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-red-600 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-red-600 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0" />

            {/* Neon Glow Outline (Only on hover) */}
            <div className="absolute inset-0 border border-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_15px_rgba(220,38,38,0.3),inset_0_0_15px_rgba(220,38,38,0.1)]" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center gap-1">
              <span className="text-3xl md:text-4xl font-heading font-black tracking-[0.4em] text-white transition-all duration-300 group-hover:text-red-500 group-hover:tracking-[0.5em]">
                REBOOT
              </span>
              <div className="flex items-center gap-3 opacity-30 group-hover:opacity-60 transition-opacity">
                <span className="h-[1px] w-8 bg-red-600" />
                <span className="font-mono text-[9px] text-zinc-300 tracking-[0.3em] uppercase">Initialize</span>
                <span className="h-[1px] w-8 bg-red-600" />
              </div>
            </div>
          </button>

          {/* Sub-Indicators */}
          <div className="flex gap-12 opacity-20 group-hover:opacity-50 transition-opacity">
            {['ENCRYPTED', 'SECURED', 'AUTHORIZED'].map((label) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <div className="w-1 h-1 bg-red-600" />
                <span className="font-mono text-[8px] tracking-[0.4em] text-zinc-400">{label}</span>
              </div>
            ))}
          </div>

          <p className="font-mono text-[10px] text-zinc-600 tracking-[0.8em] animate-pulse uppercase">
            System Ready for Initialization
          </p>
        </div>

      </div>

      {/* GLOBAL CSS FOR ANIMATIONS */}
      <style jsx global>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(400%); }
        }
        @keyframes float {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% { transform: translateY(-100vh) translateX(50px); opacity: 0; }
        }
        @keyframes scan-horizontal {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes glitch-active {
          0% { clip: rect(44px, 450px, 56px, 0); transform: skew(0.5deg); opacity: 0; }
          10% { clip: rect(62px, 450px, 12px, 0); transform: skew(0.3deg); opacity: 0.5; }
          20% { opacity: 0; }
          100% { opacity: 0; }
        }
        .animate-scanline {
          animation: scanline 8s linear infinite;
        }
        .animate-scan-horizontal {
          animation: scan-horizontal 2s linear infinite;
        }
      `}</style>
    </div>
  );
}
