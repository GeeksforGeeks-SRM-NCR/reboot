"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function WorkshopSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(containerRef.current,
                { opacity: 0, filter: "blur(10px)" },
                {
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top center",
                        end: "center center",
                        scrub: 1
                    },
                    opacity: 1,
                    filter: "blur(0px)",
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="min-h-[60vh] w-full flex items-center justify-center bg-zinc-900 border-y border-zinc-800 relative">
            <div className="absolute inset-0 bg-blue-500/5 mix-blend-overlay pointer-events-none" />

            <div className="text-center space-y-6 max-w-2xl px-6 relative z-10">
                <div className="inline-block px-3 py-1 rounded-full border border-blue-400/30 text-blue-300 text-xs font-mono uppercase tracking-widest mb-4">
                    Pre-Event Protocol
                </div>

                <h2 className="text-4xl md:text-5xl font-heading text-white">
                    System Calibration Workshop
                </h2>

                <p className="text-lg text-zinc-400 leading-relaxed font-sans">
                    A moment of controlled calm. Prepare your codebase before the final reboot sequence.
                    Session led by <span className="text-white font-bold bg-white/10 px-2 rounded">[REDACTED]</span>.
                </p>

                <button className="px-8 py-3 bg-white text-black font-bold uppercase tracking-wide hover:bg-zinc-200 transition-colors mt-8">
                    Register Interest
                </button>
            </div>
        </section>
    );
}
