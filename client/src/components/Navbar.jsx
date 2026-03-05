import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Services',  href: '#services' },
  { label: 'Work',      href: '#portfolio' },
  { label: 'About',     href: '#about' },
];

export default function Navbar({ onStartChat }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const go = (href) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled
            ? 'py-3 border-b'
            : 'py-5'
        }`}
        style={{
          background: scrolled ? 'rgba(250,247,242,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderColor: 'rgba(201,169,102,0.15)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 no-underline group">
            <span
              className="text-xl animate-sparkle"
              style={{ color: 'var(--gold)', lineHeight: 1 }}
            >✦</span>
            <span
              className="font-display text-lg font-medium tracking-wide"
              style={{ color: 'var(--warm-900)' }}
            >
              OAI Solutions
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <button
                key={href}
                onClick={() => go(href)}
                className="text-sm transition-colors duration-200"
                style={{ color: 'var(--taupe)', fontFamily: 'DM Sans' }}
                onMouseEnter={e => (e.target.style.color = 'var(--gold-dim)')}
                onMouseLeave={e => (e.target.style.color = 'var(--taupe)')}
              >
                {label}
              </button>
            ))}
            <button onClick={onStartChat} className="btn-gold text-sm py-2.5 px-5">
              Begin Your Project
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden transition-colors"
            style={{ color: 'var(--taupe)' }}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col pt-24 px-8 md:hidden animate-fade-in"
          style={{ background: 'rgba(250,247,242,0.97)', backdropFilter: 'blur(20px)' }}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <button
              key={href}
              onClick={() => go(href)}
              className="text-left font-display text-3xl font-normal py-5 border-b transition-colors"
              style={{ color: 'var(--warm-900)', borderColor: 'var(--border-warm)' }}
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => { setMenuOpen(false); onStartChat(); }}
            className="btn-gold mt-8 w-full justify-center text-base"
          >
            Begin Your Project
          </button>
        </div>
      )}
    </>
  );
}
