export const MOTION_OK = '(prefers-reduced-motion: no-preference)';
export const DESKTOP_MOTION = '(min-width: 1024px) and (prefers-reduced-motion: no-preference)';
export const MOBILE_MOTION = '(max-width: 1023px) and (prefers-reduced-motion: no-preference)';
export const DESKTOP_POINTER_MOTION = '(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)';
/** Sticky card stacks need a whole card in view: tablet width and a reasonably tall screen. */
export const STACK_MOTION = '(min-width: 768px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)';
export const PHONE = '(max-width: 767px), (pointer: coarse)';

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
