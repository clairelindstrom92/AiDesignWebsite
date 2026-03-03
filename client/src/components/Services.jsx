import { ArrowRight, Check, Globe, Palette, Camera, Instagram, Bot, Gem } from 'lucide-react';

const SERVICES = [
  {
    icon: Camera,
    name: 'AI Portfolio Design',
    price: '$500 – $3,000',
    tagline: 'Your brand, beautifully alive.',
    description: 'AI-crafted personal brand websites, model portfolios, influencer hubs, and creator showcases that make the right people stop scrolling.',
    features: ['Personal brand strategy', 'AI-designed layouts', 'Professional copy', 'Photo curation', 'Mobile-perfect'],
    tag: 'Most Popular',
    tagType: 'gold',
    timeline: '1–3 weeks',
    accent: 'rgba(201,169,102,0.08)',
    border: 'rgba(201,169,102,0.2)',
  },
  {
    icon: Globe,
    name: 'AI Website Design',
    price: '$1,500 – $8,000',
    tagline: 'A site that sells while you sleep.',
    description: 'Full luxury websites for boutiques, coaches, real estate agents, salons, wedding vendors — designed by AI, refined by our studio.',
    features: ['Custom AI design', 'Brand-matched aesthetics', 'SEO foundation', 'Booking integration', 'Full mobile optimization'],
    tag: 'Best Value',
    tagType: 'rose',
    timeline: '2–5 weeks',
    accent: 'rgba(196,135,138,0.07)',
    border: 'rgba(196,135,138,0.2)',
  },
  {
    icon: Palette,
    name: 'AI Art & Brand Identity',
    price: '$300 – $2,000',
    tagline: 'A visual world entirely yours.',
    description: 'Custom AI-generated art, logos, color palettes, and complete visual identity systems — the look and feel that makes your brand unforgettable.',
    features: ['AI-generated logo concepts', 'Color & typography system', 'Brand mood board', 'Social media kit', 'Usage guidelines'],
    tag: null,
    timeline: '1–2 weeks',
    accent: 'rgba(250,247,242,0.5)',
    border: 'rgba(201,169,102,0.12)',
  },
  {
    icon: Instagram,
    name: 'AI Social Media Design',
    price: '$500 – $2,500',
    tagline: 'An aesthetic that stops the scroll.',
    description: 'Pinterest-perfect visual systems, Instagram template kits, and content style guides — so every post looks like it was shot by a professional team.',
    features: ['Pinterest aesthetic system', 'Instagram template kit', 'Color-coded content calendar', 'Story templates', 'Highlight covers'],
    tag: null,
    timeline: '1–2 weeks',
    accent: 'rgba(250,247,242,0.5)',
    border: 'rgba(201,169,102,0.12)',
  },
  {
    icon: Bot,
    name: 'Business Automation AI',
    price: '$2,000 – $10,000',
    tagline: 'Work less. Earn more.',
    description: 'AI chatbots, booking automation, client onboarding flows, and CRM integration for service businesses — so you can focus on the work you love.',
    features: ['Custom AI chatbot', 'Automated booking flow', 'Client intake automation', 'CRM integration', 'Email follow-up sequences'],
    tag: null,
    timeline: '3–6 weeks',
    accent: 'rgba(250,247,242,0.5)',
    border: 'rgba(201,169,102,0.12)',
  },
  {
    icon: Gem,
    name: 'Luxury Sales AI',
    price: '$3,000 – $15,000',
    tagline: 'High-ticket sales on autopilot.',
    description: 'AI-powered sales funnels, lead qualification bots, and automated luxury follow-up sequences — for real estate, fine jewelry, fashion, and premium services.',
    features: ['High-ticket sales funnel', 'AI lead qualification', 'Concierge booking bot', 'Automated luxury follow-up', 'Conversion analytics'],
    tag: 'Enterprise',
    tagType: 'gold',
    timeline: '4–8 weeks',
    accent: 'rgba(201,169,102,0.06)',
    border: 'rgba(201,169,102,0.18)',
  },
];

function ServiceCard({ s, onStartChat }) {
  const Icon = s.icon;
  return (
    <div
      className="relative flex flex-col rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1.5 group cursor-default"
      style={{
        background: s.accent,
        border: `1px solid ${s.border}`,
        boxShadow: '0 2px 20px rgba(42,26,16,0.06)',
      }}
    >
      {s.tag && (
        <div className="absolute top-5 right-5">
          <span className={`label-${s.tagType || 'gold'}`}>{s.tag}</span>
        </div>
      )}

      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
        style={{ background: 'rgba(201,169,102,0.1)', border: '1px solid rgba(201,169,102,0.2)' }}
      >
        <Icon size={19} style={{ color: 'var(--gold)' }} />
      </div>

      <h3 className="font-display text-xl font-normal mb-2" style={{ color: 'var(--warm-900)' }}>
        {s.name}
      </h3>
      <p className="font-italic text-base mb-3" style={{ color: 'var(--rose)', fontStyle: 'italic' }}>
        {s.tagline}
      </p>

      <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: 'var(--taupe)', fontFamily: 'DM Sans' }}>
        {s.description}
      </p>

      <ul className="flex flex-col gap-1.5 mb-6">
        {s.features.map(f => (
          <li key={f} className="flex items-center gap-2 text-xs" style={{ color: 'var(--taupe)', fontFamily: 'DM Sans' }}>
            <Check size={11} style={{ color: 'var(--gold-dim)', flexShrink: 0 }} />
            {f}
          </li>
        ))}
      </ul>

      <div
        className="flex items-center justify-between pt-4 border-t"
        style={{ borderColor: 'rgba(201,169,102,0.12)' }}
      >
        <span className="text-xs" style={{ color: 'var(--taupe-light)', fontFamily: 'DM Sans' }}>{s.timeline}</span>
        <button
          onClick={onStartChat}
          className="flex items-center gap-1.5 text-xs font-medium transition-all"
          style={{ color: 'var(--gold-dim)', fontFamily: 'DM Sans' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--warm-900)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--gold-dim)')}
        >
          Get a Quote <ArrowRight size={11} />
        </button>
      </div>
    </div>
  );
}

export default function Services({ onStartChat }) {
  return (
    <section id="services" className="py-28 px-6" style={{ background: 'var(--ivory)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="label-gold mb-5 block mx-auto w-fit">What We Create</span>
          <h2 className="font-display text-4xl md:text-5xl font-normal mb-4" style={{ color: 'var(--warm-900)' }}>
            Six Ways AI Can
            <br />
            <span className="italic" style={{ color: 'var(--gold)' }}>Elevate Your World</span>
          </h2>
          <div className="divider-gold mt-6 mb-6" />
          <p className="text-base font-light max-w-lg mx-auto leading-relaxed" style={{ color: 'var(--taupe)', fontFamily: 'DM Sans' }}>
            Every project starts with your vision. These are the tracks we use to turn it into something extraordinary — scoped to your timeline and budget.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map(s => (
            <ServiceCard key={s.name} s={s} onStartChat={onStartChat} />
          ))}
        </div>

        <div
          className="mt-14 rounded-2xl p-8 md:p-10 text-center"
          style={{
            background: 'linear-gradient(135deg, var(--champagne), var(--ivory))',
            border: '1px solid rgba(201,169,102,0.2)',
          }}
        >
          <span className="text-2xl">✦</span>
          <h3 className="font-display text-2xl font-normal mt-3 mb-2" style={{ color: 'var(--warm-900)' }}>
            Not sure where to start?
          </h3>
          <p className="text-sm mb-6" style={{ color: 'var(--taupe)', fontFamily: 'DM Sans' }}>
            Our AI consultant will ask you a few questions and generate a custom recommendation — free, and takes less than 5 minutes.
          </p>
          <button onClick={onStartChat} className="btn-gold">
            Get My AI Recommendation <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}
