'use client';

export default function BackgroundVideo() {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden">
            {/* Full Background Video */}
            <video
                className="absolute inset-0 w-full h-full object-cover opacity-30"
                autoPlay
                loop
                muted
                playsInline
                suppressHydrationWarning
            >
                <source src="/bgvdo.mp4" type="video/mp4" />
            </video>

            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/40" />
        </div>
    );
}
