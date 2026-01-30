'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

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
      className="fixed top-6 right-6 z-[100] bg-red-600/20 hover:bg-red-600/40 border border-red-500/50 text-red-500 px-4 py-2 rounded font-mono text-sm transition-all duration-300 backdrop-blur-sm hover:scale-105"
      aria-label={soundEnabled ? 'Mute sound' : 'Unmute sound'}
    >
      {soundEnabled ? '🔊 SOUND ON' : '🔇 SOUND OFF'}
    </button>
  );
}
