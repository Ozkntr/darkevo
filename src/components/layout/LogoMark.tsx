export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 72 88" aria-hidden>
      <defs>
        <linearGradient id="darkevo-ember" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f4c27a" />
          <stop offset="45%" stopColor="#e23a2f" />
          <stop offset="100%" stopColor="#6b1d18" />
        </linearGradient>
      </defs>
      <path
        fill="url(#darkevo-ember)"
        d="M36 4c8 10 18 16 28 18-2 22-10 40-28 62C18 62 10 44 8 22 18 20 28 14 36 4z"
      />
      <path
        fill="#120a0a"
        d="M36 18c5 7 12 11 19 12-1.4 14-7 26-19 41C25 56 19.4 44 18 30c7-1 14-5 18-12z"
        opacity="0.55"
      />
      <circle cx="36" cy="34" r="5" fill="#fff3d6" />
    </svg>
  );
}
