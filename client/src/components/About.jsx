import { ArrowRight, Linkedin, Github, Instagram, Mail } from 'lucide-react';

const CALENDLY = import.meta.env.VITE_CALENDLY_LINK || 'https://calendly.com/aiosolutions';

const TEAM = [
  {
    name: 'Claire Lindstrom',
    title: 'Co-Founder · AI Design Engineer',
    image: '/images/laptop-beach.png',
    bio: 'Claire leads the design and branding side of AIO Solutions, combining high-end aesthetics with AI-powered precision. She specializes in building brand identities and digital experiences that are impossible to ignore.',
    social: [
      { icon: Linkedin,  href: 'https://linkedin.com/in/clairelindstrom', label: 'LinkedIn' },
      { icon: Github,    href: 'https://github.com/clairelindstrom',      label: 'GitHub' },
      { icon: Instagram, href: 'https://instagram.com/aiosolutions',      label: 'Instagram' },
      { icon: Mail,      href: 'mailto:moonravendigital@gmail.com',       label: 'Email' },
    ],
  },
  {
    name: 'Michael Smith',
    title: 'Co-Founder · AI Engineer',
    image: '/images/office-woman.png',
    bio: 'Michael drives the engineering and AI infrastructure at AIO Solutions. He architects custom AI integrations, lead automation systems, and cloud infrastructure that power the intelligent solutions our clients depend on.',
    social: [
      { icon: Linkedin,  href: 'https://linkedin.com/in/michaelsmith',    label: 'LinkedIn' },
      { icon: Github,    href: 'https://github.com/aiosolutions',         label: 'GitHub' },
      { icon: Mail,      href: 'mailto:moonravendigital@gmail.com',       label: 'Email' },
    ],
  },
];

export default function About({ onStartChat }) {
  return (
    <section id="about" className="py-28 px-6" style={{ background: 'var(--ivory)' }}>
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <span className="label-gold mb-5 block mx-auto w-fit">The Team</span>
          <h2 className="font-display text-4xl md:text-5xl font-normal mb-4" style={{ color: 'var(--warm-900)' }}>
            Meet the Minds Behind
            <br />
            <span className="italic" style={{ color: 'var(--gold)' }}>AIO Solutions</span>
          </h2>
          <p
            className="text-base font-light max-w-xl mx-auto mt-5"
            style={{ color: 'var(--taupe)', fontFamily: 'DM Sans' }}
          >
            AIO Solutions (Alpha Omega Solutions) is a boutique AI engineering studio built for
            entrepreneurs and businesses who demand more than generic results.
          </p>
          <div className="divider-gold mt-6" />
        </div>

        {/* Team grid */}
        <div className="grid md:grid-cols-2 gap-10 mb-20">
          {TEAM.map(({ name, title, image, bio, social }) => (
            <div key={name} className="relative">
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{ boxShadow: '0 20px 60px rgba(42,26,16,0.15)' }}
              >
                <img
                  src={image}
                  alt={name}
                  className="w-full object-cover"
                  style={{ maxHeight: '400px' }}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(22,16,13,0.55) 0%, transparent 55%)' }}
                />
                <div className="absolute bottom-5 left-5">
                  <p className="font-display text-xl font-normal text-white mb-0.5">{name}</p>
                  <p className="text-sm" style={{ color: 'var(--gold)', fontFamily: 'DM Sans' }}>{title}</p>
                </div>
              </div>
              {/* Gold accent corner */}
              <div
                className="absolute -bottom-3 -right-3 w-20 h-20 rounded-xl -z-10"
                style={{ background: 'var(--blush)', border: '1px solid rgba(196,135,138,0.3)' }}
              />

              {/* Bio + Social */}
              <div className="mt-6 px-1">
                <p className="text-base leading-relaxed mb-5" style={{ color: 'var(--taupe)', fontFamily: 'DM Sans' }}>
                  {bio}
                </p>
                <div className="flex items-center gap-3">
                  {social.map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith('mailto') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                      style={{
                        background: 'var(--champagne)',
                        border: '1px solid rgba(201,169,102,0.2)',
                        color: 'var(--taupe)',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.borderColor = 'var(--gold)'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'var(--taupe)'; e.currentTarget.style.borderColor = 'rgba(201,169,102,0.2)'; }}
                    >
                      <Icon size={15} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Studio pillars */}
        <div className="grid md:grid-cols-3 gap-5 mb-20">
          {[
            {
              icon: '✦',
              title: 'AI-Powered',
              text: "We build every solution with cutting-edge AI at its core — from websites and apps to lead automation and custom model integrations.",
            },
            {
              icon: '◈',
              title: 'Engineer-Built',
              text: "Every system is architected from the ground up by our team — technically precise, scalable, and built to deliver real business results.",
            },
            {
              icon: '◇',
              title: 'Boutique Always',
              text: 'Limited clients at a time. No assembly line, no compromise. You get strategic, personal, and extraordinary attention to your goals.',
            },
          ].map(({ icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl p-8"
              style={{ background: 'var(--champagne)', border: '1px solid rgba(201,169,102,0.15)' }}
            >
              <div className="text-2xl mb-4" style={{ color: 'var(--gold)' }}>{icon}</div>
              <h4 className="font-display text-lg font-normal mb-2" style={{ color: 'var(--warm-900)' }}>{title}</h4>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--taupe)', fontFamily: 'DM Sans' }}>{text}</p>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{ boxShadow: '0 20px 60px rgba(42,26,16,0.12)' }}
        >
          {/* Background image */}
          <img
            src="/images/paris-woman.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, rgba(22,16,13,0.82) 0%, rgba(42,26,16,0.65) 100%)' }}
          />

          <div className="relative px-8 md:px-14 py-14 md:py-16 text-center" style={{ zIndex: 1 }}>
            <span className="text-3xl" style={{ color: 'var(--gold)' }}>✦</span>
            <h3 className="font-display text-2xl md:text-3xl font-normal mt-4 mb-3 text-white">
              Ready to transform your business with AI?
            </h3>
            <p
              className="text-base font-light mb-8 max-w-lg mx-auto"
              style={{ color: 'rgba(240,228,210,0.7)', fontFamily: 'DM Sans' }}
            >
              Start with a free AI assessment — our team will ask a few questions
              and create a custom recommendation tailored to your goals.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={onStartChat} className="btn-gold text-base py-3.5 px-7">
                Start Free AI Assessment <ArrowRight size={15} />
              </button>
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-white text-base py-3.5"
              >
                Book a Discovery Call
              </a>
            </div>
            <p
              className="text-xs mt-6"
              style={{ color: 'rgba(240,228,210,0.35)', fontFamily: 'DM Sans' }}
            >
              moonravendigital@gmail.com · Replies within 24 hours
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
