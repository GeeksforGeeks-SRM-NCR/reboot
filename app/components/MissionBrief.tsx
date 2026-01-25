"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function MissionBrief() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<SVGPathElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Draw SVG Line
            if (lineRef.current) {
                const length = lineRef.current.getTotalLength();
                gsap.set(lineRef.current, { strokeDasharray: length, strokeDashoffset: length });

                gsap.to(lineRef.current, {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top center",
                        end: "bottom center",
                        scrub: 1,
                    },
                    strokeDashoffset: 0,
                    ease: "none",
                });
            }

            // Parallax text
            gsap.to(".parallax-text", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
                y: -100,
                ease: "none",
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="min-h-screen w-full relative flex items-center justify-center overflow-hidden bg-slate-950 py-24">
            {/* Background Grid - CSS based ideally, using simplistic dots here */}
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] opacity-20"></div>

            <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                    <h2 className="text-5xl md:text-7xl font-bold font-heading text-blue-500/80 uppercase">
                        Enter the <br /> Mainframe
                    </h2>
                    <p className="text-xl md:text-2xl text-zinc-400 font-mono parallax-text">
               <span className="text-white bg-blue-900/30 px-2">ENGINEER</span><br />
               <span className="text-white bg-blue-900/30 px-2">Objective: Restore System Integrity.</span><br />
                        Teams are not just attendees. You are the patch. You are the update.
                    </p>
                </div>

                <div className="relative h-[400px] border border-blue-900/30 bg-blue-950/10 backdrop-blur-md p-8 rounded-lg">
                    {/* Animated schematic effect */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50" xmlns="http://www.w3.org/2000/svg">
                        <path
                            ref={lineRef}
                            d="M 50 50 L 300 50 L 300 200 L 50 200 Z"
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="2"
                        />
                    </svg>

                    <div className="absolute top-4 right-4 text-xs font-mono text-blue-400 animate-pulse">
                        STATUS: CONNECTING...
                    </div>

                    <div className="flex items-center justify-center h-full">
                        <div className="text-center space-y-2">
                            <div className="w-16 h-16 border-2 border-blue-500 rounded-full mx-auto flex items-center justify-center animate-spin-slow">
                                <span className="text-xs">LOAD</span>
                            </div>
                            <p className="text-xs text-blue-300 font-mono">Initializing Protocol 7...</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
