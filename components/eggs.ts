import type { Egg } from "./EasterEggs";

const EGG_LABEL = "Easter egg";
const TAPS_NEEDED: Record<string, number> = { star: 5 };
const TAP_WINDOW_MS = 2000;
const SHOW_MS = 4000;

export function tapCounter(needed: number, windowMs: number) {
  let times: number[] = [];
  return (now: number): boolean => {
    times = [...times.filter((t) => now - t < windowMs), now];
    if (times.length < needed) return false;
    times = [];
    return true;
  };
}

type Parts = { eggs: readonly Egg[]; toast: HTMLElement; flyer: HTMLElement };

export function attach({ eggs, toast, flyer }: Parts): () => void {
  const root = document.documentElement;
  const slots = eggs.map((egg) => ({ egg, tapped: tapCounter(TAPS_NEEDED[egg.id] ?? 1, TAP_WINDOW_MS) }));
  let timer: number | undefined;

  // roles stay for the page lifetime: the effect only re-attaches with the same eggs
  for (const { egg } of slots) {
    for (const el of document.querySelectorAll<HTMLElement | SVGElement>(egg.target)) {
      el.tabIndex = 0;
      el.setAttribute("role", "button");
      el.setAttribute("aria-label", `${EGG_LABEL}: ${egg.id}`);
      el.removeAttribute("aria-hidden");
    }
  }

  const play = ({ id, message }: Egg, from: Element) => {
    const box = from.getBoundingClientRect();
    flyer.style.setProperty("--x0", `${box.left + box.width / 2}px`);
    flyer.style.setProperty("--y0", `${box.top + box.height / 2}px`);
    root.setAttribute("data-egg-play", id);
    toast.textContent = message;
    toast.setAttribute("data-open", "");
    timer = window.setTimeout(() => {
      root.removeAttribute("data-egg-play");
      toast.removeAttribute("data-open");
      toast.textContent = "";
    }, SHOW_MS);
  };

  const onClick = (event: MouseEvent) => {
    if (root.hasAttribute("data-egg-play") || !(event.target instanceof Element)) return;
    for (const slot of slots) {
      const hit = event.target.closest(slot.egg.target);
      if (hit && slot.tapped(event.timeStamp)) play(slot.egg, hit);
    }
  };

  const onKeyDown = (event: KeyboardEvent) => {
    const el = event.target;
    if ((event.key !== "Enter" && event.key !== " ") || event.repeat || event.ctrlKey || event.metaKey || event.altKey || !(el instanceof Element)) return;
    if (!slots.some(({ egg }) => el.matches(egg.target))) return;
    event.preventDefault();
    el.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  };

  document.addEventListener("click", onClick);
  document.addEventListener("keydown", onKeyDown);
  return () => {
    document.removeEventListener("click", onClick);
    document.removeEventListener("keydown", onKeyDown);
    window.clearTimeout(timer);
    root.removeAttribute("data-egg-play");
    toast.removeAttribute("data-open");
    toast.textContent = "";
  };
}
