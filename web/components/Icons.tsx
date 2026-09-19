type P = { className?: string };
const base = "h-full w-full";

export function KeyIcon({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.4">
      <circle cx="8" cy="8" r="4" />
      <path d="M11 11l9 9M17 17l2-2M14 14l2-2" strokeLinecap="round" />
    </svg>
  );
}
export function ExpandIcon({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.4">
      <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
export function LeafIcon({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.4">
      <path d="M5 19C5 11 11 5 19 5c0 8-6 14-14 14z" strokeLinejoin="round" />
      <path d="M5 19c4-1 7-4 9-8" strokeLinecap="round" />
    </svg>
  );
}
export function StarIcon({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2l2.9 6.3 6.9.7-5.1 4.7 1.4 6.8L12 17.8 5.9 20.5l1.4-6.8L2.2 9l6.9-.7L12 2z" />
    </svg>
  );
}
export function ArrowIcon({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
export function PlayIcon({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
export function CloseIcon({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5">
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}
export function SendIcon({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.6">
      <path d="M4 12l16-8-6 16-3-6-7-2z" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}
export function ChatIcon({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5">
      <path d="M4 5h16v11H9l-4 3v-3H4z" strokeLinejoin="round" />
      <path d="M8 10h8M8 13h5" strokeLinecap="round" />
    </svg>
  );
}
export function PinIcon({ className = base }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.4">
      <path d="M12 21c5-5.5 7-9 7-12a7 7 0 10-14 0c0 3 2 6.5 7 12z" strokeLinejoin="round" />
      <circle cx="12" cy="9" r="2.4" />
    </svg>
  );
}

export const ICONS = {
  key: KeyIcon,
  expand: ExpandIcon,
  leaf: LeafIcon,
} as const;
