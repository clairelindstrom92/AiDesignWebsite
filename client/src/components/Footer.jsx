import { Mail, Linkedin, Github, Instagram, ArrowRight } from 'lucide-react';

const CALENDLY = import.meta.env.VITE_CALENDLY_LINK || 'https://calendly.com/luxuryaidesigns';

const SOCIAL = [
  { icon: Linkedin,  href: 'https://linkedin.com/in/clairelindstrom', label: 'LinkedIn' },
  { icon: Github,    href: 'https://github.com/clairelindstrom',       label: 'GitHub' },
  { icon: Instagram, href: 'https://instagram.com/luxuryaidesigns',    label: 'Instagram' },
  { icon: Mail,      href: 'mailto:moonravendigital@gmail.com',        label: 'Email' },
];

const SERVICES = [
  'AI Portfolio Design',
  'AI Website Design',
  'AI Art & Brand Identity',
  'AI Social Media Design',
  'Business Automation',
  'Luxury Sales AI',
];

export default function Footer({ onStartChat }) {
  const go = (href) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer style={{ background: 'var(--warmblack)', borderTop: '1px solid rgba(201,169,102,0.1)' }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span style={{ color: 'var(--gold)', fontSize: 18 }}>✦</span>
              <span className="font-display text-lg font-normal" style={{ color: 'var(--parchment)' }}>
                Luxury AI Designs
              </span>
            </div>
            <p
              className="text-sm font-light leading-relaxed mb-5"
              style={{ color: 'rgba(240,228,210,0.45)', fontFamily: 'DM Sans' }}
            >
              A boutique AI design studio for brands that refuse to blend in. Portfolios, websites, brand identity, and automation — built to convert.
            </p>
            <div className="flex items-center gap-2.5">
              {SOCIAL.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(201,169,102,0.15)',
                    color: 'rgba(240,228,210,0.4)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.borderColor = 'rgba(201,169,102,0.4)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(240,228,210,0.4)'; e.currentTarget.style.borderColor = 'rgba(201,169,102,0.15)'; }}
                >
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigate */}
          <div>
            <h4
              className="text-xs tracking-widest uppercase mb-5"
              style={{ color: 'var(--gold)', fontFamily: 'DM Sans', fontWeight: 500 }}
            >
              Navigate
            </h4>
            <ul className="flex flex-col gap-3">
              {[['#services','Services'],['#portfolio','Work'],['#about','About']].map(([href, label]) => (
                <li key={href}>
                  <button
                    onClick={() => go(href)}
                    className="text-sm transition-colors text-left"
                    style={{ color: 'rgba(240,228,210,0.45)', fontFamily: 'DM Sans' }}
                    onMouseEnter={e => (e.target.style.color = 'var(--parchment)')}
                    onMouseLeave={e => (e.target.style.color = 'rgba(240,228,210,0.45)')}
                  >
                    {label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={onStartChat}
                  className="text-sm transition-colors text-left"
                  style={{ color: 'rgba(240,228,210,0.45)', fontFamily: 'DM Sans' }}
                  onMouseEnter={e => (e.target.style.color = 'var(--parchment)')}
                  onMouseLeave={e => (e.target.style.color = 'rgba(240,228,210,0.45)')}
                >
                  AI Assessment
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4
              className="text-xs tracking-widest uppercase mb-5"
              style={{ color: 'var(--gold)', fontFamily: 'DM Sans', fontWeight: 500 }}
            >
              Services
            </h4>
            <ul className="flex flex-col gap-3">
              {SERVICES.map(s => (
                <li key={s}>
                  <button
                    onClick={onStartChat}
                    className="text-sm transition-colors text-left"
                    style={{ color: 'rgba(240,228,210,0.45)', fontFamily: 'DM Sans' }}
                    onMouseEnter={e => (e.target.style.color = 'var(--parchment)')}
                    onMouseLeave={e => (e.target.style.color = 'rgba(240,228,210,0.45)')}
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-xs tracking-widest uppercase mb-5"
              style={{ color: 'var(--gold)', fontFamily: 'DM Sans', fontWeight: 500 }}
            >
              Contact
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:moonravendigital@gmail.com"
                className="text-sm transition-colors"
                style={{ color: 'rgba(240,228,210,0.45)', fontFamily: 'DM Sans' }}
                onMouseEnter={e => (e.target.style.color = 'var(--parchment)')}
                onMouseLeave={e => (e.target.style.color = 'rgba(240,228,210,0.45)')}
              >
                moonravendigital@gmail.com
              </a>
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm transition-colors"
                style={{ color: 'var(--gold)', fontFamily: 'DM Sans' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                Book a Discovery Call <ArrowRight size={11} />
              </a>
              <button
                onClick={onStartChat}
                className="text-sm text-left transition-colors mt-1"
                style={{ color: 'rgba(240,228,210,0.45)', fontFamily: 'DM Sans' }}
                onMouseEnter={e => (e.target.style.color = 'var(--parchment)')}
                onMouseLeave={e => (e.target.style.color = 'rgba(240,228,210,0.45)')}
              >
                → Start AI Assessment
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(201,169,102,0.08)' }}>
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p
            className="text-xs"
            style={{ color: 'rgba(240,228,210,0.25)', fontFamily: 'DM Sans' }}
          >
            © {new Date().getFullYear()} Luxury AI Designs · Claire Lindstrom · All rights reserved
          </p>
          <div className="flex items-center gap-3">
            <span className="text-xs" style={{ color: 'rgba(201,169,102,0.4)', fontFamily: 'DM Sans' }}>
              Where Intelligence Meets Elegance
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
