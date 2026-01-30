"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlitchText from "./ui/GlitchText";
import { cn } from "@/lib/utils";

const systemLogs = [
    "ACQUIRING_SYSTEM_KERNEL...",
    "DECRYPTING_SOCIAL_FABRIC...",
    "FLUSHING_LEGACY_BIAS...",
    "OPTIMIZING_NEURAL_NODES...",
    "REWRITING_HISTORY_LOGS...",
    "SYNCHRONIZING_FUTURE..."
];

export default function RebootSequence() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);
    const [complete, setComplete] = useState(false);
    const [currentLog, setCurrentLog] = useState(systemLogs[0]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // Main Timeline for the Reboot
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=200%",
                    pin: true,
                    scrub: true,
                    onUpdate: (self) => {
                        const p = Math.floor(self.progress * 100);
                        setProgress(p);

                        // Update log based on progress
                        const logIndex = Math.floor(self.progress * (systemLogs.length - 1));
                        setCurrentLog(systemLogs[logIndex]);

                        if (p >= 99) {
                            setComplete(true);
                        } else {
                            setComplete(false);
                        }
                    }
                }
            });

            // Animated background fade
            tl.to(".reboot-bg", {
                backgroundColor: "#ffffff",
                opacity: 0.1,
                duration: 2,
            }, 0.8);

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="min-h-screen w-full flex flex-col items-center justify-center bg-black relative overflow-hidden">

            {/* Background Glitch Layer */}
            <div className={cn(
                "reboot-bg absolute inset-0 transition-opacity duration-1000 pointer-events-none z-0",
                progress > 50 ? "opacity-20" : "opacity-5"
            )}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:20px_20px]" />
            </div>

            {!complete ? (
                <div className="relative z-10 w-full max-w-2xl px-6 flex flex-col items-center gap-16">

                    {/* Header with Glitch */}
                    <div className="text-center space-y-4">
                        <div className="flex items-center justify-center gap-4 opacity-40">
                            <span className="h-[1px] w-8 bg-white" />
                            <span className="font-mono text-[10px] tracking-[0.6em] uppercase">Status: Overwriting</span>
                            <span className="h-[1px] w-8 bg-white" />
                        </div>
                        <h2 className="text-4xl md:text-7xl font-black font-heading text-white tracking-widest">
                            {progress < 80 ? "INITIATING" : "REWRITING"} <br />
                            <span className="text-zinc-600">SYSTEM</span>
                        </h2>
                    </div>

                    {/* Circular Progress Container */}
                    <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90">
                            <circle
                                cx="50%"
                                cy="50%"
                                r="45%"
                                className="stroke-zinc-900 fill-none"
                                strokeWidth="2"
                            />
                            <circle
                                cx="50%"
                                cy="50%"
                                r="45%"
                                className="stroke-white fill-none transition-all duration-300"
                                strokeWidth="4"
                                strokeDasharray="283%"
                                strokeDashoffset={`${283 - (progress * 2.83)}%`}
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl md:text-6xl font-black font-heading text-white">{progress}%</span>
                            <span className="font-mono text-[10px] tracking-[0.4em] text-zinc-500 uppercase mt-2">Sync</span>
                        </div>
                    </div>

                    {/* Dynamic System Logs */}
                    <div className="w-full max-w-sm">
                        <div className="flex justify-between font-mono text-[9px] text-zinc-500 mb-2 uppercase tracking-widest">
                            <span>Sector: 0x9FF</span>
                            <span>Speed: Max</span>
                        </div>
                        <div className="h-12 flex items-center justify-center border border-white/10 bg-white/[0.02] p-4 overflow-hidden">
                            <GlitchText text={currentLog} className="font-mono text-xs text-white" />
                        </div>
                    </div>

                </div>
            ) : (
                <div className="absolute inset-0 bg-white z-50 flex items-center justify-center animate-in fade-in duration-1000 text-black">
                    <div className="text-center space-y-12 p-8">
                        <div className="space-y-4">
                            <div className="font-mono text-[12px] tracking-[1em] text-black/40 uppercase mb-8">System Rebooted</div>
                            <h1 className="text-7xl md:text-[12rem] font-bold font-heading text-black tracking-tighter leading-none">
                                RE:BOOT
                            </h1>
                        </div>

                        <div className="inline-block border-2 border-black px-8 py-3 font-mono text-sm tracking-[0.8em] font-black uppercase text-black hover:bg-black hover:text-white transition-all cursor-pointer">
                            Welcome Home
                        </div>

                        <p className="max-w-md mx-auto font-mono text-sm text-zinc-500 tracking-tight leading-relaxed pt-12">
                            Societal optimization complete. Humanity version 2.0 active. <br />
                            Please proceed with caution in the new reality.
                        </p>
                    </div>
                </div>
            )}

            {/* Micro Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-20">
                <span className="font-mono text-[8px] tracking-[0.4em] uppercase text-white">Scroll to rewrite</span>
                <div className="w-[1px] h-12 bg-white" />
            </div>

        </section>
    );
}
