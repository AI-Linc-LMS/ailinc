"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { useState } from "react";
import clsx from "clsx";
import { nav } from "@/lib/content";

/**
 * Static header — no entrance animation and no scroll-triggered
 * background or blur. It looks the same at every scroll position.
 */
export default function Nav() {
  const [open, setOpen] = useState(false);
  const onHome = usePathname() === "/";

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-70 flex justify-end px-4 pt-5 sm:pt-7">
        <nav className="flex items-center gap-2 rounded-full bg-ink-2/70 px-4 py-2 ring-1 ring-brand-soft/15 backdrop-blur-xl sm:gap-6 sm:px-5">
          <ul className="hidden items-center gap-6 md:flex">
            {nav.map((item) => (
              <NavLink key={item.href} {...item} onHome={onHome} />
            ))}
            <li>
              <Link
                href="/#contact"
                className="rounded-full bg-paper px-4 py-1.5 text-sm font-medium text-brand-deep"
              >
                Contact
              </Link>
            </li>
          </ul>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
            className="grid size-10 place-items-center rounded-full text-paper md:hidden"
          >
            <span className="relative block h-3 w-5">
              <span
                className={clsx(
                  "absolute inset-x-0 h-px bg-current",
                  open ? "top-1.5 rotate-45" : "top-0"
                )}
              />
              <span
                className={clsx(
                  "absolute inset-x-0 h-px bg-current",
                  open ? "top-1.5 -rotate-45" : "top-3"
                )}
              />
            </span>
          </button>
        </nav>
      </header>

      {/* mobile sheet */}
      <motion.div
        initial={false}
        animate={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-60 bg-ink/95 backdrop-blur-xl md:hidden"
      >
        <ul className="flex h-full flex-col items-center justify-center gap-7">
          {[...nav, { label: "Contact", href: "/#contact" }].map((item) => (
            <li key={item.href}>
              {item.href.includes("#") && onHome ? (
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="display text-4xl text-paper"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="display text-4xl text-paper"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </motion.div>
    </>
  );
}

function NavLink({
  label,
  href,
  onHome,
}: {
  label: string;
  href: string;
  onHome: boolean;
}) {
  const cls = "text-sm text-paper-2/75";
  // On the home page hash links are handled by SmoothScroll (plain anchors);
  // elsewhere they must be client-side navigations, not full reloads.
  return (
    <li>
      {href.includes("#") && onHome ? (
        <a href={href} className={cls}>
          {label}
        </a>
      ) : (
        <Link href={href} className={cls}>
          {label}
        </Link>
      )}
    </li>
  );
}
