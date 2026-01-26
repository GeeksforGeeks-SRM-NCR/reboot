import HeroSection from "./components/HeroSection";
import SystemStatus from "./components/SystemStatus";
import MissionBrief from "./components/MissionBrief";
import DomainTracks from "./components/DomainTracks";
import WorkshopSection from "./components/WorkshopSection";
import RebootSequence from "./components/RebootSequence";
import BackgroundVideo from "./components/BackgroundVideo";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-black text-white overflow-x-hidden selection:bg-red-500 selection:text-black">
      {/* Background Video */}
      <BackgroundVideo />

      <HeroSection />
      <SystemStatus />
      <MissionBrief />
      <DomainTracks />
      <WorkshopSection />
      <RebootSequence />

      {/* Fixed Background Noise Overlay for entire site */}
      <div className="fixed inset-0 pointer-events-none z-[50] opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>
    </main>
  );
}
