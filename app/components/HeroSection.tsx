"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlitchText from "./ui/GlitchText";

export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // Initial red flash
            tl.fromTo(containerRef.current,
                { backgroundColor: "#1a0000" },
                { backgroundColor: "transparent", duration: 1, ease: "power2.out" }
            );

            // Text Reveal
            tl.fromTo(textRef.current,
                { opacity: 0, scale: 1.1 },
                { opacity: 1, scale: 1, duration: 0.8, ease: "rough({ template: none.out, strength: 1, points: 20, taper: 'none', randomize: true, clamp: false})" }
            );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
            <div ref={textRef} className="z-10 text-center flex flex-col items-center gap-6">
                <div className="border border-red-500/50 bg-red-900/10 px-4 py-2 text-red-500 font-mono text-sm tracking-widest uppercase mb-4 animate-pulse">
                    ⚠ Critical System Alert ⚠
                </div>

                <h1 id="reboot-main-text" className="text-8xl md:text-9xl font-bold font-heading tracking-tighter uppercase text-white mix-blend-difference">
                    RE:BOOT
                </h1>

                <h2 className="text-2xl md:text-3xl text-zinc-400 font-mono max-w-2xl mt-4">
                    <GlitchText text="Rethink." /> <GlitchText text="Redesign." /> <GlitchText text="Restart." />
                </h2>

                <p className="mt-8 text-lg md:text-xl text-red-400 font-mono max-w-lg">
                    Humanity failed to update.<br />
                    It's time to RE:BOOT the world.
                </p>
            </div>

            <div className="absolute bottom-12 animate-bounce opacity-50">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">Scroll to Initialize</span>
            </div>
        </section>
    );
}
