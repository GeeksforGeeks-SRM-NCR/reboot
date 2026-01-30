'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { cn } from "@/lib/utils";

interface AudioManagerProps {
  startMusic?: boolean;
  onMusicReady?: () => void;
}

export default function AudioManager({ startMusic = false, onMusicReady }: AudioManagerProps) {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const hoverSoundRef = useRef<HTMLAudioElement | null>(null);
  const hoverListenersRef = useRef<Map<Element, () => void>>(new Map());

  const playHoverSound = useCallback(() => {
    // Play hover sound when soundEnabled is TRUE (music playing mode)
    if (soundEnabled && hoverSoundRef.current) {
      hoverSoundRef.current.currentTime = 0;
      hoverSoundRef.current.play().catch(err => console.log('Hover sound error:', err));
    }
  }, [soundEnabled]);

  const addHoverListeners = useCallback(() => {
    // Only target specific interactive elements (buttons, links) and the main reboot text
    const buttons = document.querySelectorAll('button, a[href], [role="button"]');
    const rebootText = document.querySelector('#reboot-main-text');

    const allElements = rebootText ? [...Array.from(buttons), rebootText] : Array.from(buttons);

    allElements.forEach(element => {
      if (!hoverListenersRef.current.has(element)) {
        const mouseenterHandler = () => playHoverSound();

        element.addEventListener('mouseenter', mouseenterHandler);

        hoverListenersRef.current.set(element, mouseenterHandler);
      }
    });
  }, [playHoverSound]);

  const removeHoverListeners = useCallback(() => {
    hoverListenersRef.current.forEach((handler, element) => {
      element.removeEventListener('mouseenter', handler);
    });
    hoverListenersRef.current.clear();
  }, []);

  // Initialize audio on mount
  useEffect(() => {
    bgMusicRef.current = new Audio('/cinematic.mp3');
    bgMusicRef.current.loop = true;
    bgMusicRef.current.volume = 0.35;

    hoverSoundRef.current = new Audio('/bgaudio.mp3');
    hoverSoundRef.current.volume = 0.5;

    // Notify that audio is ready
    if (onMusicReady) {
      onMusicReady();
    }

    // Add hover listeners after a short delay
    const hoverTimer = setTimeout(() => {
      addHoverListeners();
    }, 500);

    return () => {
      clearTimeout(hoverTimer);
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
        bgMusicRef.current = null;
      }
      if (hoverSoundRef.current) {
        hoverSoundRef.current = null;
      }
      removeHoverListeners();
    };
  }, [addHoverListeners, removeHoverListeners, onMusicReady]);

  const hasInitializedMusic = useRef(false);

  // Start music when startMusic prop changes - ONLY RUN ONCE
  useEffect(() => {
    if (startMusic && bgMusicRef.current && !hasInitializedMusic.current) {
      console.log('🚀 Initializing music from reboot trigger');
      hasInitializedMusic.current = true;
      setSoundEnabled(true);
    }
  }, [startMusic]);

  // Handle sound toggle
  useEffect(() => {
    if (!bgMusicRef.current) return;

    if (soundEnabled) {
      bgMusicRef.current.play()
        .then(() => {
          setIsPlaying(true);
          console.log('🔊 Music enabled');
        })
        .catch(err => console.log('Play error:', err));
      addHoverListeners();
    } else {
      bgMusicRef.current.pause();
      setIsPlaying(false);
      console.log('🔇 Music disabled');
      removeHoverListeners();
    }
  }, [soundEnabled, addHoverListeners, removeHoverListeners]);

  // Periodically check for new elements
  useEffect(() => {
    if (!soundEnabled) return; // Only add listeners when sound is on (music playing)

    const interval = setInterval(() => {
      addHoverListeners();
    }, 2000);

    return () => clearInterval(interval);
  }, [soundEnabled, addHoverListeners]);

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  return (
    <button
      onClick={toggleSound}
      className="fixed top-6 right-6 z-[100] group flex items-center gap-3 bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-red-500/50 px-5 py-2.5 transition-all duration-300 backdrop-blur-md active:scale-95"
      aria-label={soundEnabled ? 'Mute sound' : 'Unmute sound'}
    >
      <div className="relative w-2 h-2">
        <div className={cn(
          "absolute inset-0 rounded-full",
          soundEnabled ? "bg-red-500 animate-pulse" : "bg-zinc-600"
        )} />
        {soundEnabled && (
          <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-25" />
        )}
      </div>
      <span className={cn(
        "font-mono text-[10px] tracking-[0.3em] font-bold transition-colors",
        soundEnabled ? "text-red-500" : "text-zinc-500"
      )}>
        {soundEnabled ? 'SYSTEM_AUDIO: ON' : 'SYSTEM_AUDIO: OFF'}
      </span>
      {/* Corner Ticks */}
      <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/20 group-hover:border-red-500/50 transition-colors" />
      <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/20 group-hover:border-red-500/50 transition-colors" />
    </button>
  );
}
