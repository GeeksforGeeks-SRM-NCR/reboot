"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

const domains = [
    { title: "AI GOVERNANCE", desc: "Decentralized decision frameworks.", color: "border-cyan-500" },
    { title: "CLIMATE TECH", desc: "Bio-engineered sustainability.", color: "border-green-500" },
    { title: "SECURE EDTECH", desc: "Knowledge encryption protocol.", color: "border-yellow-500" },
    { title: "ENERGY GRIDS", desc: "Neural power distribution.", color: "border-orange-500" },
];

export default function DomainTracks() {
    const containerRef = useRef<HTMLDivElement>(null);
    const panelsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Horizontal scroll effect logic or simple staggered reveal
            // Let's go with a vertical accordion-like slide up

            panelsRef.current.forEach((panel, i) => {
                gsap.from(panel, {
                    scrollTrigger: {
                        trigger: panel,
                        start: "top bottom-=100",
                        end: "top center",
                        toggleActions: "play none none reverse",
                    },
                    x: i % 2 === 0 ? -100 : 100, // Slide from left/right
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                });
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="min-h-screen w-full py-24 bg-zinc-950 relative z-20 overflow-hidden text-zinc-100">
            <div className="container mx-auto px-6 mb-16">
                <h2 className="text-4xl md:text-6xl font-heading uppercase mb-8">
                    Reboot Domains
                </h2>
                <p className="max-w-xl text-zinc-400 font-mono">
                    Select your sector. Initialize repair protocols.
                </p>
            </div>

            <div className="container mx-auto px-6 space-y-4">
                {domains.map((d, i) => (
                    <div
                        key={i}
                        ref={(el) => { panelsRef.current[i] = el }}
                        role="button"
                        className={cn("group relative p-8 md:p-12 border-l-4 bg-zinc-900/50 hover:bg-zinc-800 transition-colors cursor-pointer", d.color)}
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                            <span className="font-mono text-xs border border-white/20 px-2 py-1">ACCESS GRANTED</span>
                        </div>

                        <h3 className="text-3xl md:text-5xl font-bold font-heading mb-2 group-hover:translate-x-4 transition-transform duration-300">
                            {d.title}
                        </h3>
                        <p className="text-zinc-500 font-mono md:text-xl group-hover:text-zinc-300 transition-colors">
                            {d.desc}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
