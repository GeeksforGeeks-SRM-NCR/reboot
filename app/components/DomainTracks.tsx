"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

const domains = [
    { title: "AI GOVERNANCE", desc: "Decentralized decision frameworks for the autonomous age.", color: "text-cyan-500", borderColor: "border-cyan-500/30" },
    { title: "CLIMATE TECH", desc: "Bio-engineered sustainability and atmospheric restoration.", color: "text-green-500", borderColor: "border-green-500/30" },
    { title: "SECURE EDTECH", desc: "Knowledge encryption protocol for secure learning.", color: "text-yellow-500", borderColor: "border-yellow-500/30" },
    { title: "ENERGY GRIDS", desc: "Neural power distribution and fusion management.", color: "text-orange-500", borderColor: "border-orange-500/30" },
    { title: "CYBER DEFENSE", desc: "Recursive firewalling and threat neutralization.", color: "text-red-500", borderColor: "border-red-500/30" },
];

export default function DomainTracks() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const pinWidth = triggerRef.current?.offsetWidth || 0;
            const horizontalScrollLength = pinWidth - window.innerWidth;

            if (horizontalScrollLength > 0) {
                gsap.to(triggerRef.current, {
                    x: -horizontalScrollLength,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top top",
                        end: `+=${pinWidth}`,
                        pin: true,
                        scrub: 1,
                        invalidateOnRefresh: true,
                    },
                });
            }

            // Staggered reveal for domain titles
            gsap.from(".domain-card", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top center",
                    toggleActions: "play none none reverse",
                },
                opacity: 0,
                y: 50,
                stagger: 0.1,
                duration: 1,
                ease: "power4.out"
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="bg-black overflow-hidden">
            <div className="min-h-screen flex flex-col justify-center">

                {/* Header Content */}
                <div className="container mx-auto px-6 mb-12">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="h-[1px] w-12 bg-red-600" />
                        <span className="font-mono text-[10px] tracking-[0.6em] text-red-500 uppercase">Initialization_Tracks</span>
                    </div>
                    <h2 className="text-5xl md:text-[8rem] font-black font-heading text-white uppercase leading-none tracking-tighter">
                        REBOOT <br /> <span className="text-zinc-800">DOMAINS</span>
                    </h2>
                </div>

                {/* Horizontal Scroll Track */}
                <div className="relative overflow-visible pb-24">
                    <div
                        ref={triggerRef}
                        className="flex gap-8 px-6 md:px-24 w-max"
                    >
                        {domains.map((d, i) => (
                            <div
                                key={i}
                                className={cn(
                                    "domain-card group relative w-[300px] md:w-[500px] aspect-[16/10] bg-zinc-900/10 border p-8 md:p-12 flex flex-col justify-end transition-all duration-700 hover:bg-zinc-900/30",
                                    d.borderColor
                                )}
                            >
                                {/* Tech Decorations */}
                                <div className="absolute top-6 right-8 text-[9px] font-mono text-zinc-700 tracking-widest uppercase">
                                    Track_ID: 0x0{i + 1}
                                </div>
                                <div className="absolute top-0 left-0 w-8 h-[1px] bg-current opacity-20" />
                                <div className="absolute top-0 left-0 w-[1px] h-8 bg-current opacity-20" />

                                <div className="relative z-10 space-y-4">
                                    <h3 className={cn("text-3xl md:text-5xl font-black font-heading leading-tight transition-transform duration-500 group-hover:-translate-y-2", d.color)}>
                                        {d.title}
                                    </h3>
                                    <p className="text-zinc-500 font-mono text-sm md:text-base leading-relaxed max-w-sm">
                                        {d.desc}
                                    </p>
                                    <div className="pt-4 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                        <span className="font-mono text-[9px] tracking-widest text-zinc-300">INITIALIZE PROTOCOL</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Status Bar */}   
                <div className="container mx-auto px-6 flex justify-between items-center opacity-20 mt-12">
                    <div className="font-mono text-[8px] tracking-[0.4em] uppercase">Scanning across sectors...</div>
                    <div className="flex gap-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="w-1 h-3 bg-white" />
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .w-max {
                    width: max-content;
                }
            `}</style>
        </section>
    );
}
