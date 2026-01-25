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
        const ctx = gsap.context(() => {
            gsap.from(cardsRef.current, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top center",
                    end: "bottom center",
                    scrub: 1,
                },
                y: 100,
                opacity: 0,
                stagger: 0.1,
                rotateX: -15,
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="min-h-screen w-full py-24 px-4 md:px-12 bg-black/95 relative z-10 flex flex-col justify-center">
            <div className="mb-16">
                <h2 className="text-4xl md:text-6xl font-bold font-heading mb-4 text-zinc-100 uppercase">
                    Global Systems Diagnostics
                </h2>
                <div className="h-1 w-32 bg-red-600"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {systems.map((sys, idx) => (
                    <div
                        key={sys.id}
                        ref={(el) => { cardsRef.current[idx] = el; }}
                        className="group border border-white/10 bg-white/5 p-6 hover:bg-red-900/10 transition-colors duration-300 relative overflow-hidden backdrop-blur-sm"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <span className="font-mono text-xs text-zinc-500">{sys.id} // 0{idx + 1}</span>
                            <div className={cn("w-2 h-2 rounded-full animate-pulse", sys.status === "OFFLINE" ? "bg-red-500" : "bg-orange-500")} />
                        </div>

                        <h3 className="text-2xl font-bold mb-2 text-zinc-200 group-hover:text-red-400 transition-colors">{sys.name}</h3>

                        <p className={cn("font-mono font-bold tracking-wider", sys.color)}>
                            [{sys.status}]
                        </p>

                        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-red-500 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    </div>
                ))}
            </div>
        </section>
    );
}
