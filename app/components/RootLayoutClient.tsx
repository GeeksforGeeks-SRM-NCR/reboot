'use client';

import { useState } from "react";
import SmoothScroll from "./SmoothScroll";
import AudioManager from "./AudioManager";
import Preloader from "./Preloader";

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const [isRebooted, setIsRebooted] = useState(false);

  return (
    <>
      <Preloader onReboot={() => setIsRebooted(true)} />
      <AudioManager startMusic={isRebooted} />
      {isRebooted && (
        <SmoothScroll>
          {children}
        </SmoothScroll>
      )}
    </>
  );
}
