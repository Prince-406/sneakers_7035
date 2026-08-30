import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo + Links */}
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
            <div className="flex items-center gap-2">
              <AppLogo size={28} />
              <span className="font-bold text-base text-foreground">Sneakers</span>
            </div>
            <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2">
              {[
                { href: '/collections', label: 'Collections' },
                { href: '/men', label: 'Men' },
                { href: '/women', label: 'Women' },
                { href: '/about', label: 'About' },
                { href: '/contact', label: 'Contact' },
              ]?.map((link) => (
                <Link
                  key={link?.href}
                  href={link?.href}
                  className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors duration-200 min-h-[44px] flex items-center"
                >
                  {link?.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Legal */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground transition-colors font-medium min-h-[44px] flex items-center">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors font-medium min-h-[44px] flex items-center">
              Terms
            </Link>
            <span className="font-medium">© 2026 Sneakers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}