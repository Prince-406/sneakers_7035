'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { XMarkIcon } from '@heroicons/react/24/outline';
import AppLogo from '@/components/ui/AppLogo';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
}

export default function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-foreground/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 bottom-0 z-50 w-80 max-w-full bg-card shadow-2xl transition-transform duration-500 ease-spring lg:hidden flex flex-col`}
        style={{ transform: open ? 'translateX(0)' : 'translateX(-100%)' }}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div className="flex items-center gap-2.5">
            <AppLogo size={32} />
            <span className="font-bold text-lg tracking-tight text-foreground">Sneakers</span>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-muted transition-colors"
            aria-label="Close menu"
          >
            <XMarkIcon className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 px-6 py-8 flex flex-col gap-2">
          {links.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-4 rounded-xl font-semibold text-lg text-foreground hover:bg-muted hover:text-primary transition-all duration-200"
              style={{ transitionDelay: open ? `${i * 60}ms` : '0ms' }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="px-6 pb-8">
          <Link
            href="/checkout"
            onClick={onClose}
            className="block w-full py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-center text-base hover:bg-accent transition-colors duration-200"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </>
  );
}