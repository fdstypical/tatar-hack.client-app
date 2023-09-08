"use client";

import { useWatchPostion } from "@/hooks/geolocation/useWatchPosition";

export default function Home() {
  const { position } = useWatchPostion();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      test
    </main>
  );
}
