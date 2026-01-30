"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

export default function WorkshopSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // 1. Cinematic Entry: Scale and reveal
            gsap.fromTo(cardRef.current,
                {
                    scale: 0.9,
                    opacity: 0,
                    y: 50,
                },
                {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        end: "center center",
                        scrub: 1.5,
                    },
                    scale: 1,
                    opacity: 1,
                    y: 0,
                    ease: "power2.out",
                }
            );

            // 2. Parallax floating text in background
            gsap.to(".floating-text", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 2,
                },
                y: -60,
                rotate: 3,
                ease: "none",
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="min-h-[60vh] w-full flex items-center justify-center bg-black relative overflow-hidden py-24 border-y border-white/5 perspective-2000">
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="floating-text absolute top-1/4 left-1/4 text-[15vw] font-black text-white/[0.015] font-heading select-none uppercase">
                    Sync
                </div>
                <div className="floating-text absolute bottom-1/4 right-1/4 text-[15vw] font-black text-white/[0.01] font-heading select-none uppercase">
                    0x7F
                </div>

                {/* Tech particles */}
                {isMounted && [...Array(10)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-blue-500/10"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                    />
                ))}
            </div>

            <div
                ref={cardRef}
                className="relative z-10 w-full max-w-2xl px-6"
            >
                <div className="bg-zinc-950/60 border border-white/10 p-10 md:p-16 text-center space-y-10 backdrop-blur-md relative transition-all duration-700 hover:border-blue-500/30">

                    {/* Decorative Ticks */}
                    <div className="absolute top-0 left-0 w-6 h-[1px] bg-blue-500/50" />
                    <div className="absolute top-0 left-0 w-[1px] h-6 bg-blue-500/50" />
                    <div className="absolute bottom-0 right-0 w-6 h-[1px] bg-blue-500/50" />
                    <div className="absolute bottom-0 right-0 w-[1px] h-6 bg-blue-500/50" />

                    <div className="space-y-3">
                        <div className="flex items-center justify-center gap-3 mb-2 opacity-40">
                            <span className="h-[1px] w-6 bg-blue-500/50" />
                            <span className="font-mono text-[8px] tracking-[0.6em] text-blue-400 uppercase">Pre-Event Protocol</span>
                            <span className="h-[1px] w-6 bg-blue-500/50" />
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black font-heading text-white uppercase leading-tight tracking-tight">
                            SYSTEM <br /> <span className="text-blue-500">CALIBRATION</span>
                        </h2>
                    </div>

                    <p className="text-lg md:text-xl font-mono text-zinc-400 max-w-md mx-auto leading-relaxed tracking-tight">
                        A moment of controlled calm. Prepare your codebase before the final reboot sequence. <br />
                        <span className="inline-block mt-4 px-3 py-1 bg-white/5 border border-white/10 text-[10px] text-white tracking-[0.2em] uppercase">
                            Lead By: [REDACTED]
                        </span>
                    </p>

                    {/* System indicators */}
                    <div className="pt-8 flex justify-center gap-8 opacity-40">
                        {['LATENCY: MIN', 'BUFFER: CLEAR', 'STATUS_SYNC'].map(label => (
                            <div key={label} className="flex flex-col items-center gap-2">
                                <div className="w-1 h-3 bg-blue-500/50" />
                                <span className="font-mono text-[7px] tracking-[0.2em]">{label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Scanline effect */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
                        <div className="absolute inset-x-0 h-20 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent -translate-y-full animate-scanline" />
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes scanline {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(500%); }
                }
                .animate-scanline {
                    animation: scanline 8s linear infinite;
                }
            `}</style>
        </section>
    );
}
