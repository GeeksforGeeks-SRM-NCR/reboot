"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function MissionBrief() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRevealRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<SVGPathElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // Text reveal animation (lines instead of characters for better impact)
            const lines = gsap.utils.toArray('.reveal-line');
            gsap.from(lines, {
                scrollTrigger: {
                    trigger: contentRevealRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                },
                opacity: 0,
                x: -30,
                stagger: 0.2,
                duration: 1,
                ease: "power4.out",
            });

            // SVG Path Drawing Animation
            if (lineRef.current) {
                const length = lineRef.current.getTotalLength();
                gsap.set(lineRef.current, { strokeDasharray: length, strokeDashoffset: length });

                gsap.to(lineRef.current, {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 60%",
                        end: "center center",
                        scrub: 1,
                    },
                    strokeDashoffset: 0,
                    ease: "none",
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="min-h-screen w-full relative flex items-center bg-black py-24 md:py-32 overflow-hidden">
            {/* Dark Tech Background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:60px_60px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)]" />
            </div>

            <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">

                {/* Visual Narrative Side */}
                <div ref={contentRevealRef} className="space-y-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="px-3 py-1 bg-white/10 border border-white/20 text-[10px] font-mono tracking-[0.4em] text-zinc-400 uppercase">Engineer</span>
                            <span className="px-3 py-1 bg-red-600/20 border border-red-600/30 text-[10px] font-mono tracking-[0.4em] text-red-500 uppercase">Objective</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black font-heading text-white uppercase leading-[0.9] tracking-[0.05em] max-w-lg">
                            <span className="reveal-line block">ENTER THE</span>
                            <span className="reveal-line text-blue-500 block mt-2 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">MAINFRAME</span>
                        </h2>
                    </div>

                    <div className="max-w-xl space-y-8">
                        <p className="reveal-line text-xl md:text-2xl font-mono text-zinc-400 leading-relaxed tracking-tight">
                            Teams are not just attendees. You are the <span className="text-white px-2 bg-white/5">patch</span>. You are the <span className="text-white px-2 bg-white/5">update</span>. Humanity failed to synchronize; we are here to overwrite.
                        </p>

                        <div className="reveal-line flex items-center gap-6 pt-4">
                            <div className="h-[1px] w-20 bg-zinc-800" />
                            <span className="font-mono text-[10px] tracking-[0.6em] text-zinc-500 uppercase">Sector_Sync_Authorization</span>
                        </div>
                    </div>
                </div>

                {/* Data Module Side */}
                <div className="relative group">
                    <div className="relative aspect-square w-full border border-white/10 bg-zinc-950/40 p-12 overflow-hidden transition-colors duration-700 group-hover:border-white/20 backdrop-blur-md">

                        {/* Micro Technical Details */}
                        <div className="absolute top-6 left-8 flex items-center gap-4">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                            <span className="font-mono text-[9px] tracking-[0.5em] text-zinc-500 uppercase">Authorized_System_Access</span>
                        </div>

                        {/* Schematic Grid Animation */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" viewBox="0 0 400 400">
                            <path
                                ref={lineRef}
                                d="M 50 100 L 350 100 L 350 300 L 50 300 Z"
                                fill="none"
                                stroke="#3b82f6"
                                strokeWidth="1"
                                strokeDasharray="5, 5"
                            />
                        </svg>

                        {/* Holographic Center Core */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="relative w-48 h-48 md:w-64 md:h-64">
                                {isMounted && (
                                    <>
                                        {/* Rotating technical rings */}
                                        <div className="absolute inset-0 border border-blue-500/20 rounded-full animate-[spin_20s_linear_infinite]" />
                                        <div className="absolute inset-4 border border-zinc-800 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                                        <div className="absolute inset-1 w-[2px] h-12 bg-blue-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full animate-ping" />
                                    </>
                                )}

                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center space-y-1">
                                        <div className="font-mono text-[8px] text-zinc-600 tracking-widest">SYNC_ID</div>
                                        <div className="text-2xl md:text-3xl font-bold font-mono text-white tracking-widest">0x7F2</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Metadata */}
                        <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                            <div className="font-mono text-[8px] text-zinc-600 space-y-1">
                                <p>MEM_MAP: STABLE</p>
                                <p>CACHE_SYN: 100%</p>
                            </div>
                            <div className="text-right">
                                <span className="font-mono text-[10px] text-white tracking-widest opacity-30">REBOOT_CORE_V1.1</span>
                            </div>
                        </div>
                    </div>

                    {/* Outer Frame Accents */}
                    <div className="absolute -top-4 -left-4 w-12 h-12 border-t border-l border-white/20" />
                    <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b border-r border-white/20" />
                </div>

            </div>
        </section>
    );
}
