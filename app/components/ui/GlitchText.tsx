"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils"; // Assuming a utility file exists, need to create if not.

// Simplistic implementation if utils doesn't exist yet
function classNames(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).join(" ");
}

interface GlitchTextProps {
    text: string;
    className?: string;
    as?: any;
}

export default function GlitchText({ text, className, as: Component = "span" }: GlitchTextProps) {
    const textRef = useRef<HTMLSpanElement>(null);
    const originalText = text;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";

    useEffect(() => {
        if (!textRef.current) return;

        const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 + Math.random() * 3 });

        // Random glitch effect
        tl.to(textRef.current, {
            duration: 0.1,
            text: () => originalText.split("").map((char) => Math.random() > 0.5 ? chars[Math.floor(Math.random() * chars.length)] : char).join(""),
            ease: "none",
        })
            .to(textRef.current, {
                duration: 0.05,
                opacity: 0.5,
                x: -2,
                color: "red",
            })
            .to(textRef.current, {
                duration: 0.05,
                opacity: 1,
                x: 0,
                color: "inherit",
                text: originalText,
            });

    }, [text]);

    return (
        <Component ref={textRef} className={classNames("relative inline-block", className)}>
            {text}
        </Component>
    );
}
