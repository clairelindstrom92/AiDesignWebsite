import { ArrowUpRight } from 'lucide-react';

const CASES = [
  {
    id: 'influencer-portfolio',
    title: 'Beauty Influencer Personal Brand',
    industry: 'Personal Brand',
    service: 'AI Portfolio Design',
    description: 'A beauty creator with 80k followers had no website — just a link tree. We built her a full personal brand site with AI-generated editorial visuals, a press kit, and a brand partnership inquiry flow.',
    result: 'Landed 3 brand deals in first 30 days',
    stats: [
      { label: 'Brand deals', value: '3' },
      { label: 'Delivery',    value: '2 weeks' },
      { label: 'Bounce rate', value: '–42%' },
    ],
    img: '/images/business-woman.png',
    accent: '#c9a966',
  },
  {
    id: 'real-estate',
    title: 'Luxury Real Estate Brand',
    industry: 'Real Estate',
    service: 'AI Website Design',
    description: 'A luxury real estate agent was losing high-net-worth clients to agencies with bigger branding budgets. We built her a stunning AI-designed property showcase site that positions her as the premium choice.',
    result: 'Average listing price increased by 28%',
    stats: [
      { label: 'Avg listing ↑', value: '+28%' },
      { label: 'Inquiries/mo', value: '3×' },
      { label: 'Delivery',      value: '3 weeks' },
    ],
    img: '/images/villa.png',
    accent: '#c4878a',
  },
  {
    id: 'boutique-identity',
    title: 'Luxury Boutique Brand Identity',
    industry: 'Fashion & Retail',
    service: 'AI Art & Brand Identity',
    description: 'A new luxury skincare boutique needed a full visual identity — logo, packaging concepts, color system, and social media kit — before her launch date. AI delivered a complete brand world in 10 days.',
    result: 'Sold out launch weekend',
    stats: [
      { label: 'Launch result', value: 'Sold out' },
      { label: 'Assets created', value: '40+' },
      { label: 'Delivery',       value: '10 days' },
    ],
    img: '/images/flatlay.png',
    accent: '#c9a966',
  },
  {
    id: 'lifestyle-brand',
    title: 'Fashion & Lifestyle Social Brand',
    industry: 'Lifestyle',
    service: 'AI Social Media Design',
    description: 'A fashion blogger wanted her Instagram and Pinterest to finally look like a magazine. We created a complete AI visual system — templates, color codes, and a 90-day content aesthetic guide.',
    result: '+5,800 followers in 60 days',
    stats: [
      { label: 'New followers', value: '+5.8k' },
      { label: 'Engagement ↑', value: '3.2×' },
      { label: 'Delivery',      value: '1 week' },
    ],
    img: '/images/car-woman.png',
    accent: '#c4878a',
  },
];

function CaseCard({ item }) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden flex flex-col group transition-all duration-300 hover:-translate-y-1.5"
      style={{ background: '#fff', border: '1px solid rgba(201,169,102,0.12)', boxShadow: '0 4px 24px rgba(42,26,16,0.08)' }}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={item.img}
          alt={item.title}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(22,16,13,0.7) 0%, transparent 60%)' }}
        />
        {/* Service badge */}
        <div className="absolute bottom-3 left-4">
          <span className="label-gold" style={{ fontSize: '0.65rem' }}>{item.service}</span>
        </div>
        <div className="absolute top-3 right-3">
          <span
            className="text-xs px-2 py-1 rounded-full"
            style={{
              background: 'rgba(255,255,255,0.15)',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.2)',
              fontFamily: 'DM Sans',
              backdropFilter: 'blur(8px)',
            }}
          >
            {item.industry}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-display text-xl font-normal mb-3" style={{ color: 'var(--warm-900)' }}>
          {item.title}
        </h3>
        <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: 'var(--taupe)', fontFamily: 'DM Sans' }}>
          {item.description}
        </p>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          {item.stats.map(({ label, value }) => (
            <div
              key={label}
              className="rounded-lg p-2.5 text-center"
              style={{ background: 'var(--champagne)', border: '1px solid rgba(201,169,102,0.12)' }}
            >
              <div
                className="font-display text-sm font-normal"
                style={{ color: item.accent }}
              >
                {value}
              </div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--taupe-light)', fontFamily: 'DM Sans' }}>
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Result */}
        <div
          className="rounded-lg px-4 py-3 flex items-center justify-between text-sm"
          style={{
            background: `${item.accent}12`,
            border: `1px solid ${item.accent}30`,
            color: 'var(--warm-900)',
            fontFamily: 'DM Sans',
          }}
        >
          <span className="font-medium">{item.result}</span>
          <ArrowUpRight size={14} style={{ color: item.accent }} />
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-28 px-6" style={{ background: 'var(--champagne)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="label-gold mb-5 block mx-auto w-fit">Client Stories</span>
          <h2 className="font-display text-4xl md:text-5xl font-normal mb-4" style={{ color: 'var(--warm-900)' }}>
            Real Clients.
            <br />
            <span className="italic" style={{ color: 'var(--gold)' }}>Real Transformations.</span>
          </h2>
          <div className="divider-gold mt-6 mb-6" />
          <p className="text-base font-light max-w-lg mx-auto" style={{ color: 'var(--taupe)', fontFamily: 'DM Sans' }}>
            From personal brands to luxury businesses — this is what happens when AI-powered design meets genuine ambition.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {CASES.map(item => <CaseCard key={item.id} item={item} />)}
        </div>
      </div>
    </section>
  );
}
