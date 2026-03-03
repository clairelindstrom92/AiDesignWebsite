import { Check, Clock, Zap, ArrowRight, Mail } from 'lucide-react';

function ComplexityBar({ score }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--blush)' }}>
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${(score / 10) * 100}%`,
            background: 'linear-gradient(90deg, var(--gold), var(--rose))',
          }}
        />
      </div>
      <span className="text-xs" style={{ color: 'var(--taupe-light)', fontFamily: 'DM Sans' }}>{score}/10</span>
    </div>
  );
}

export default function ProjectBrief({ brief, leadInfo, onDeposit, onTalkToClaire }) {
  if (!brief) return null;
  const deposit = Math.round(brief.estimatedPriceRange.low * 0.25);

  return (
    <div
      className="rounded-2xl overflow-hidden animate-fade-up"
      style={{
        background: '#fff',
        border: '1px solid rgba(201,169,102,0.25)',
        boxShadow: '0 8px 40px rgba(42,26,16,0.12)',
      }}
    >
      {/* Header */}
      <div
        className="px-5 py-4"
        style={{
          background: 'linear-gradient(135deg, var(--champagne), #fff)',
          borderBottom: '1px solid rgba(201,169,102,0.15)',
        }}
      >
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--gold)', fontFamily: 'DM Sans', fontWeight: 500 }}>
            ✦ Your Design Brief
          </span>
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{ background: 'rgba(201,169,102,0.1)', color: 'var(--gold-dim)', border: '1px solid rgba(201,169,102,0.2)', fontFamily: 'DM Sans' }}
          >
            AI-Generated
          </span>
        </div>
        <h3 className="font-display text-xl font-normal" style={{ color: 'var(--warm-900)' }}>
          {brief.serviceName}
        </h3>
      </div>

      <div className="px-5 py-4 flex flex-col gap-4">
        <p className="text-sm leading-relaxed" style={{ color: 'var(--taupe)', fontFamily: 'DM Sans' }}>
          {brief.description}
        </p>

        {/* Price + Timeline */}
        <div className="grid grid-cols-2 gap-3">
          {[
            {
              label: 'Investment',
              value: `$${brief.estimatedPriceRange.low.toLocaleString()} – $${brief.estimatedPriceRange.high.toLocaleString()}`,
            },
            {
              label: 'Timeline',
              value: brief.timeline,
              icon: <Clock size={11} style={{ color: 'var(--gold)' }} />,
            },
          ].map(({ label, value, icon }) => (
            <div
              key={label}
              className="rounded-xl p-3"
              style={{ background: 'var(--champagne)', border: '1px solid rgba(201,169,102,0.12)' }}
            >
              <div className="text-xs mb-1" style={{ color: 'var(--taupe-light)', fontFamily: 'DM Sans' }}>{label}</div>
              <div className="flex items-center gap-1.5 font-display text-base" style={{ color: 'var(--warm-900)' }}>
                {icon}{value}
              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div>
          <div className="text-xs mb-2 tracking-widest uppercase" style={{ color: 'var(--taupe-light)', fontFamily: 'DM Sans', fontWeight: 500 }}>
            Included
          </div>
          <ul className="flex flex-col gap-1.5">
            {(brief.keyFeatures || []).map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--taupe)', fontFamily: 'DM Sans' }}>
                <Check size={12} style={{ color: 'var(--gold)', marginTop: 3, flexShrink: 0 }} />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Complexity */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <div className="text-xs tracking-widest uppercase" style={{ color: 'var(--taupe-light)', fontFamily: 'DM Sans', fontWeight: 500 }}>
              Project Complexity
            </div>
            <Zap size={11} style={{ color: 'var(--gold)' }} />
          </div>
          <ComplexityBar score={brief.complexityScore} />
        </div>

        {/* Next step */}
        <div
          className="rounded-xl p-3 text-sm leading-relaxed"
          style={{ background: 'rgba(201,169,102,0.06)', border: '1px solid rgba(201,169,102,0.15)' }}
        >
          <span
            className="block text-xs mb-1 tracking-widest uppercase"
            style={{ color: 'var(--gold)', fontFamily: 'DM Sans', fontWeight: 500 }}
          >
            Next Step
          </span>
          <span style={{ color: 'var(--taupe)', fontFamily: 'DM Sans' }}>{brief.recommendedNextStep}</span>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-2 pt-1">
          <button onClick={onDeposit} className="btn-gold w-full justify-center text-sm py-3">
            Reserve My Project — ${deposit.toLocaleString()} Deposit
            <ArrowRight size={13} />
          </button>
          <button
            onClick={onTalkToClaire}
            className="btn-outline w-full justify-center text-sm py-2.5"
          >
            <Mail size={12} />
            Talk to Claire Directly
          </button>
        </div>

        <p
          className="text-center text-xs"
          style={{ color: 'var(--taupe-light)', fontFamily: 'DM Sans' }}
        >
          Deposit is 25% · Balance due on completion
        </p>
      </div>
    </div>
  );
}
