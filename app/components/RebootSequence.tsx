"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlitchText from "./ui/GlitchText";

export default function RebootSequence() {
    const containerRef = useRef<HTMLDivElement>(null);
    const barRef = useRef<HTMLDivElement>(null);
    const [complete, setComplete] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top center",
                    end: "bottom bottom",
                    scrub: 0.5,
                    onLeave: () => setComplete(true), // Trigger final state
                    onEnterBack: () => setComplete(false),
                }
            });

            // Progress Bar Animation
            tl.fromTo(barRef.current, { width: "0%" }, { width: "100%", duration: 3, ease: "power1.inOut" });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="min-h-screen w-full flex flex-col items-center justify-center bg-black relative overflow-hidden">

            {!complete ? (
                <div className="w-full max-w-md px-6 text-center space-y-8">
                    <h2 className="text-2xl font-mono text-zinc-500 animate-pulse">
                        INITIATING SYSTEM REBOOT...
                    </h2>

                    <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden border border-zinc-700">
                        <div ref={barRef} className="h-full bg-white shadow-[0_0_20px_white]"></div>
                    </div>

                    <div className="font-mono text-xs text-zinc-600">
                        REWRITING KERNEL... <br />
                        OPTIMIZING SOCIETY... <br />
                        SAVING CHANGES...
                    </div>
                </div>
            ) : (
                <div className="absolute inset-0 bg-white text-black flex items-center justify-center animate-in fade-in duration-1000">
                    <div className="text-center p-12">
                        <h1 className="text-6xl md:text-9xl font-bold font-heading mb-4 tracking-tighter">
                            RE:BOOT
                        </h1>
                        <div className="bg-black text-white px-4 py-2 inline-block font-mono text-sm tracking-widest font-bold">
                            COMPLETE
                        </div>
                        <p className="mt-8 text-xl max-w-lg mx-auto font-sans text-zinc-600">
                            System Stable.<br />
                            Welcome to the future.
                        </p>
                    </div>
                </div>
            )}

        </section>
    );
}
