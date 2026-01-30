"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

const systems = [
    { id: "GOV", name: "Governance", status: "OFFLINE", color: "text-red-500" },
    { id: "COM", name: "Communication", status: "ERR_404", color: "text-orange-500" },
    { id: "HLT", name: "Healthcare", status: "CRITICAL", color: "text-red-600" },
    { id: "SEC", name: "Cybersecurity", status: "BREACHED", color: "text-red-500" },
    { id: "EDU", name: "Education", status: "OUTDATED", color: "text-yellow-500" },
    { id: "TRN", name: "Transportation", status: "GRIDLOCK", color: "text-orange-600" },
    { id: "NRG", name: "Energy", status: "UNSTABLE", color: "text-red-400" },
    { id: "ENV", name: "Environment", status: "TOXIC", color: "text-green-900" },
];

export default function SystemStatus() {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            gsap.from(cardsRef.current, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
                y: 50,
                opacity: 0,
                stagger: 0.1,
                rotateX: -10,
                duration: 0.8,
                ease: "power2.out",
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="min-h-screen w-full py-24 px-4 md:px-12 bg-black relative z-10 flex flex-col justify-center">
            <div className="mb-16">
                <div className="flex items-center gap-4 mb-4">
                    <span className="h-[2px] w-12 bg-red-600" />
                    <span className="font-mono text-[10px] tracking-[0.6em] text-red-500 uppercase">System_Diagnostics</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black font-heading text-white uppercase leading-none tracking-tighter">
                    GLOBAL <br /> <span className="text-zinc-800">SYSTEMS</span>
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {systems.map((sys, idx) => (
                    <div
                        key={sys.id}
                        ref={(el) => { cardsRef.current[idx] = el; }}
                        className="group border border-white/10 bg-white/5 p-8 hover:bg-red-900/10 transition-colors duration-300 relative overflow-hidden backdrop-blur-sm cursor-pointer"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <span className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase">{sys.id} // 0{idx + 1}</span>
                            <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", sys.status === "OFFLINE" ? "bg-red-500" : "bg-orange-500")} />
                        </div>

                        <h3 className="text-3xl font-black font-heading mb-3 text-zinc-100 group-hover:text-red-400 transition-colors uppercase">{sys.name}</h3>

                        <p className={cn("font-mono text-sm font-bold tracking-[0.2em] uppercase", sys.color)}>
                            [{sys.status}]
                        </p>

                        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-red-600 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    </div>
                ))}
            </div>
        </section>
    );
}
