export type ThrottleCallback<A = void, R = void> = (...args: A[]) => R;

export function throttle<A, R>(cb: ThrottleCallback<A, R>, duration: number) {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return (...args: A[]) => {
    if (timeoutId === undefined) {
      cb(...args);
      timeoutId = setTimeout(() => {
        timeoutId = undefined;
      }, duration);
    }
  }
}
