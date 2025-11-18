'use client';

import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => (
  <header className="sticky top-0 z-50 border-b border-slate-200 bg-slate-50/90 backdrop-blur">
    <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:flex-nowrap sm:px-6">
      <Link href="/" className="flex items-center gap-3">
        <Image src="/logo.svg" alt="ParhaiPlay" width={40} height={40} priority />
        <span className="text-lg font-bold text-slate-800 sm:text-xl">ParhaiPlay</span>
      </Link>
      <button
        type="button"
        className="w-full rounded-full border border-emerald-600 bg-white px-5 py-2 text-sm font-semibold text-emerald-600 transition hover:bg-emerald-50 sm:w-auto"
      >
        Sign in with Google
      </button>
    </div>
  </header>
);

export default Navbar;
