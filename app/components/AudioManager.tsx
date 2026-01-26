'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

export default function AudioManager() {
  // Start with sound ON (true) which means music will play
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [preloaderComplete, setPreloaderComplete] = useState(false);
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const hoverSoundRef = useRef<HTMLAudioElement | null>(null);
  const hoverListenersRef = useRef<Map<Element, () => void>>(new Map());
  const hasAttemptedPlayRef = useRef(false);

  // Listen for preloader completion
  useEffect(() => {
    const timer = setTimeout(() => {
      setPreloaderComplete(true);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

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

  useEffect(() => {
    // Initialize audio elements
    bgMusicRef.current = new Audio('/cinematic.mp3');
    bgMusicRef.current.loop = true;
    bgMusicRef.current.volume = 0.35;

    hoverSoundRef.current = new Audio('/bgaudio.mp3');
    hoverSoundRef.current.volume = 0.5;

    // Function to start music - music plays when soundEnabled is TRUE and preloader is complete
    const startMusic = () => {
      if (soundEnabled && preloaderComplete && bgMusicRef.current && bgMusicRef.current.paused && !hasAttemptedPlayRef.current) {
        hasAttemptedPlayRef.current = true;
        bgMusicRef.current.play()
          .then(() => {
            console.log('Music started successfully');
          })
          .catch(err => {
            console.log('Autoplay blocked, will retry on interaction:', err);
            hasAttemptedPlayRef.current = false;
          });
      }
    };

    // Add listeners for user interaction to start music
    const interactionHandler = () => {
      startMusic();
    };

    // Try multiple interaction types
    document.addEventListener('click', interactionHandler);
    document.addEventListener('touchstart', interactionHandler);
    document.addEventListener('keydown', interactionHandler);
    document.addEventListener('scroll', interactionHandler);
    document.addEventListener('mousemove', interactionHandler);

    // Try to start immediately after a brief delay
    const timer = setTimeout(() => {
      startMusic();
    }, 100);

    // Add hover listeners
    const hoverTimer = setTimeout(() => {
      addHoverListeners();
    }, 500);

    return () => {
      clearTimeout(timer);
      clearTimeout(hoverTimer);
      document.removeEventListener('click', interactionHandler);
      document.removeEventListener('touchstart', interactionHandler);
      document.removeEventListener('keydown', interactionHandler);
      document.removeEventListener('scroll', interactionHandler);
      document.removeEventListener('mousemove', interactionHandler);

      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
        bgMusicRef.current = null;
      }
      if (hoverSoundRef.current) {
        hoverSoundRef.current = null;
      }
      removeHoverListeners();
    };
  }, [soundEnabled, preloaderComplete, addHoverListeners, removeHoverListeners]);

  // Handle sound enable/disable
  useEffect(() => {
    if (!bgMusicRef.current || !preloaderComplete) return;

    if (soundEnabled) {
      // soundEnabled = true means music should play
      const playPromise = bgMusicRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Music playing');
          })
          .catch(err => {
            console.log('Play prevented:', err);
          });
      }
      addHoverListeners();
    } else {
      // soundEnabled = false means music should pause
      bgMusicRef.current.pause();
      removeHoverListeners();
    }
  }, [soundEnabled, preloaderComplete, addHoverListeners, removeHoverListeners]);

  // Periodically check for new elements
  useEffect(() => {
    if (!soundEnabled) return; // Only add listeners when sound is on (music playing)

    const interval = setInterval(() => {
      addHoverListeners();
    }, 2000);

    return () => clearInterval(interval);
  }, [soundEnabled, addHoverListeners]);

  const toggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);

    if (newState && bgMusicRef.current) {
      // When turning sound ON (newState = true), start playing music
      bgMusicRef.current.play().catch(err => console.log('Play error:', err));
    }
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
