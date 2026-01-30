"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlitchText from "./ui/GlitchText";

export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // Logo reveal
            tl.fromTo(logoRef.current,
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, duration: 1, ease: "power2.out" }
            );

            // Text Reveal
            tl.fromTo(textRef.current,
                { opacity: 0, scale: 1.1 },
                { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }
            );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
            {/* Official Logo */}
            <div ref={logoRef} className="fixed top-6 left-6 z-[100] group">
                <div className="relative border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center transition-all duration-300 group-hover:border-red-600/30 overflow-hidden">
                    {/* Corner accents for the logo box */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-red-600/50" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-red-600/50" />

                    <img
                        src="/logo.png"
                        alt="RE:BOOT Official Logo"
                        className="h-12 md:h-20 w-auto object-contain brightness-110 transition-all duration-300 p-1"
                    />
                </div>
                {/* Micro tech label below logo */}
                <div className="mt-2 font-mono text-[7px] tracking-[0.4em] text-zinc-600 uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                    Authorized_System_Chassis
                </div>
            </div>

            <div ref={textRef} className="z-10 text-center flex flex-col items-center gap-6 px-6">
                <div className="border border-red-500/50 bg-red-900/10 px-4 py-2 text-red-500 font-mono text-sm tracking-widest uppercase mb-4 animate-pulse">
                    ⚠ Critical System Alert ⚠
                </div>

                <h1 className="text-8xl md:text-[10rem] font-black font-heading tracking-tighter uppercase text-white leading-none">
                    RE:BOOT
                </h1>

                <h2 className="text-2xl md:text-3xl text-zinc-400 font-mono mt-4">
                    <GlitchText text="Rethink." /> <GlitchText text="Redesign." /> <GlitchText text="Restart." />
                </h2>

                <p className="mt-8 text-lg md:text-xl text-red-400 font-mono max-w-lg leading-relaxed">
                    Humanity failed to update.<br />
                    It's time to RE:BOOT the world.
                </p>
            </div>

            <div className="absolute bottom-12 animate-bounce opacity-30 flex flex-col items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-500">Scroll to Initialize</span>
                <div className="w-[1px] h-12 bg-zinc-800" />
            </div>
        </section>
    );
}
