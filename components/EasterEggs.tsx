"use client";

import { useEffect, useRef } from "react";
import styles from "./EasterEggs.module.css";

export type Egg = { id: string; target: string; message: string };

export function EasterEggs({ eggs }: { eggs: readonly Egg[] }) {
  const toast = useRef<HTMLDivElement>(null);
  const flyer = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let detach: (() => void) | undefined;
    let gone = false;
    const load = () =>
      import("./eggs").then(({ attach }) => {
        if (!gone && toast.current && flyer.current) detach = attach({ eggs, toast: toast.current, flyer: flyer.current });
      });
    // ponytail: Safari lacks the idle hook; a short timeout is the same "after first paint" intent
    const idleCallback: ((callback: () => void) => number) | undefined = window.requestIdleCallback;
    if (idleCallback) idleCallback(load);
    else window.setTimeout(load, 1500);
    return () => {
      gone = true;
      detach?.();
    };
  }, [eggs]);

  return (
    <>
      <div ref={toast} className={styles.toast} role="status" aria-live="polite" />
      <span ref={flyer} className={styles.flyer} data-flyer aria-hidden="true">
        <svg viewBox="0 0 200 200">
          <circle cx={100} cy={100} r={94} />
          <circle cx={100} cy={100} r={58} />
        </svg>
      </span>
    </>
  );
}
