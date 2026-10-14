import { useEffect, useRef, useState } from "react";
import { useRouter } from "@tanstack/react-router";

/**
 * Page transition hook.
 * Returns `isLeaving` (true when route is changing → triggers exit animation)
 * and `key` (changes on each navigation → re-mounts enter animation).
 */
export function usePageTransition() {
  const router = useRouter();
  const [isLeaving, setIsLeaving] = useState(false);
  const [pageKey, setPageKey] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const unsub = router.subscribe("onBeforeNavigate", () => {
      setIsLeaving(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    });

    const unsubAfter = router.subscribe("onLoad", () => {
      setIsLeaving(false);
      setPageKey((k) => k + 1);
    });

    return () => {
      unsub();
      unsubAfter();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [router]);

  return { isLeaving, pageKey };
}

/**
 * Top progress bar hook.
 * Returns `progress` (0-100) and `active` boolean.
 * Simulates loading with fast start, slow middle, instant complete on route load.
 */
export function useProgressBar() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const start = router.subscribe("onBeforeNavigate", () => {
      setActive(true);
      setProgress(5);

      if (intervalRef.current) clearInterval(intervalRef.current);
      let current = 5;
      intervalRef.current = setInterval(() => {
        // Ease toward 85% — never reach 100% until done
        const remaining = 85 - current;
        const step = Math.max(0.5, remaining * 0.08);
        current = Math.min(85, current + step);
        setProgress(current);
      }, 80);
    });

    const done = router.subscribe("onLoad", () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setProgress(100);
      setTimeout(() => {
        setActive(false);
        setProgress(0);
      }, 400);
    });

    return () => {
      start();
      done();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [router]);

  return { progress, active };
}
