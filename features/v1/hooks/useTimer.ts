import { useState, useEffect, useCallback } from "react";

export function useTimer(startTime: number = 0) {
  const [time, setTime] = useState(startTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning && !isPaused) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 10); // Increment by 10ms
      }, 10); // Run every 10ms
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isRunning, isPaused]);

  const start = useCallback(() => {
    setIsRunning(true);
    setIsPaused(false);
  }, []);

  const stop = useCallback(() => {
    setIsRunning(false);
    setIsPaused(false);
  }, []);

  const pause = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resume = useCallback(() => {
    setIsPaused(false);
  }, []);

  const restart = useCallback(() => {
    setIsRunning(false);
    setIsPaused(false);
    setTime(0);
  }, []);

  return { time, isRunning, isPaused, start, stop, pause, resume, restart };
}
