"use client";

import { useEffect, useState } from "react";
import styles from "./MotionToggle.module.css";

export type MotionToggleProps = { labels: { pause: string } };

// The third small script: it only toggles data-motion-paused on <html>. CSS pauses the looping animations from there.
export function MotionToggle({ labels }: MotionToggleProps) {
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    document.documentElement.toggleAttribute("data-motion-paused", paused);
    return () => document.documentElement.removeAttribute("data-motion-paused");
  }, [paused]);
  return (
    <button type="button" className={styles.toggle} aria-pressed={paused} onClick={() => setPaused(!paused)}>
      {labels.pause}
    </button>
  );
}
