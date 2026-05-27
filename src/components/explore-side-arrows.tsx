import Link from "next/link";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path d="M15.4 5.4 8.8 12l6.6 6.6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ExploreSideArrows() {
  return (
    <Link
      href="/"
      aria-label="Go back to home"
      className="inline-flex shrink-0 items-center justify-center rounded-full border border-slate-700/70 bg-slate-900/85 p-2 text-slate-300 shadow-sm transition-transform hover:-translate-y-0.5 hover:border-blue-300/70 hover:text-blue-200 hover:shadow-md focus-visible:-translate-y-0.5"
    >
      <ArrowIcon />
    </Link>
  );
}
