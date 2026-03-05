import { useEffect, useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

function ConstellationCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId, t = 0;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Warm-toned stars
    const stars = Array.from({ length: 180 }, () => ({
      x:       Math.random(),
      y:       Math.random(),
      r:       Math.random() * 1.2 + 0.3,
      phase:   Math.random() * Math.PI * 2,
      speed:   Math.random() * 0.5 + 0.15,
      opacity: Math.random() * 0.55 + 0.25,
    }));

    // Pairs for constellation lines (static index pairs)
    const pairs = [];
    for (let i = 0; i < 30; i++) {
      const a = Math.floor(Math.random() * stars.length);
      const b = Math.floor(Math.random() * stars.length);
      const dx = stars[a].x - stars[b].x;
      const dy = stars[a].y - stars[b].y;
      if (Math.sqrt(dx*dx+dy*dy) < 0.18) pairs.push([a, b]);
    }

    // Aurora blobs (warm gold + rose palette)
    const blobs = [
      { cx: 0.7, cy: 0.35, r: 340, color: '201,169,102', phase: 0 },
      { cx: 0.25, cy: 0.65, r: 280, color: '196,135,138', phase: Math.PI },
      { cx: 0.5,  cy: 0.15, r: 220, color: '210,180,100', phase: Math.PI * 0.7 },
      { cx: 0.85, cy: 0.75, r: 200, color: '180,120,100', phase: Math.PI * 1.4 },
    ];

    const draw = () => {
      t += 0.0025;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Aurora blobs
      blobs.forEach(b => {
        const x = (b.cx + Math.sin(t + b.phase) * 0.055) * canvas.width;
        const y = (b.cy + Math.cos(t * 0.65 + b.phase) * 0.055) * canvas.height;
        const g = ctx.createRadialGradient(x, y, 0, x, y, b.r);
        g.addColorStop(0,   `rgba(${b.color},0.09)`);
        g.addColorStop(0.5, `rgba(${b.color},0.035)`);
        g.addColorStop(1,   `rgba(${b.color},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      // Constellation lines
      ctx.strokeStyle = 'rgba(201,169,102,0.12)';
      ctx.lineWidth = 0.5;
      pairs.forEach(([a, b]) => {
        ctx.beginPath();
        ctx.moveTo(stars[a].x * canvas.width, stars[a].y * canvas.height);
        ctx.lineTo(stars[b].x * canvas.width, stars[b].y * canvas.height);
        ctx.stroke();
      });

      // Stars
      stars.forEach(s => {
        const x = s.x * canvas.width;
        const y = s.y * canvas.height;
        const twinkle = Math.sin(t * s.speed + s.phase) * 0.35 + 0.65;
        ctx.beginPath();
        ctx.arc(x, y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240,225,195,${s.opacity * twinkle})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}

export default function Hero({ onStartChat }) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'var(--warmblack)' }}
    >
      <ConstellationCanvas />

      {/* Warm background bloom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 70% at 68% 40%, rgba(201,169,102,0.12) 0%, transparent 65%)',
          zIndex: 1,
        }}
      />

      <div
        className="relative max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-10 items-center pt-28 pb-20"
        style={{ zIndex: 2 }}
      >
        {/* Left: Text */}
        <div className="order-2 md:order-1">
          <div
            className="flex items-center gap-2 mb-7 animate-fade-up"
            style={{ animationDelay: '0.1s', opacity: 0 }}
          >
            <span style={{ color: 'var(--gold)', fontSize: '12px' }}>✦</span>
            <span
              className="text-xs tracking-widest uppercase"
              style={{ color: 'var(--gold)', fontFamily: 'DM Sans', fontWeight: 500 }}
            >
              AI Solutions
            </span>
          </div>

          <h1
            className="font-display font-normal leading-tight mb-6 animate-fade-up"
            style={{
              fontSize: 'clamp(2.6rem, 5vw, 4.5rem)',
              color: 'var(--ivory)',
              animationDelay: '0.2s',
              opacity: 0,
            }}
          >
            Where Intelligence
            <br />
            <span
              className="italic"
              style={{ color: 'var(--gold)', fontWeight: 400 }}
            >
              Meets Elegance
            </span>
          </h1>

          <p
            className="text-base font-light leading-relaxed mb-10 max-w-md animate-fade-up"
            style={{
              color: 'rgba(240,228,210,0.65)',
              fontFamily: 'DM Sans',
              animationDelay: '0.35s',
              opacity: 0,
            }}
          >
            AI-powered portfolios, websites, brand identities, and automation
            for brands that refuse to blend in. Your vision, elevated.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 animate-fade-up"
            style={{ animationDelay: '0.5s', opacity: 0 }}
          >
            <button onClick={onStartChat} className="btn-gold text-sm py-3.5 px-7">
              Design My Brand with AI
              <ArrowRight size={15} />
            </button>
            <a href="#services" className="btn-white text-sm py-3.5">
              See What's Possible
            </a>
          </div>

          {/* Stats */}
          <div
            className="flex items-center gap-8 mt-12 pt-8 border-t animate-fade-up"
            style={{
              borderColor: 'rgba(201,169,102,0.15)',
              animationDelay: '0.65s',
              opacity: 0,
            }}
          >
            {[
              { value: '48 hrs', label: 'First Concepts' },
              { value: '6 Tracks', label: 'AI Services' },
              { value: '50+', label: 'Projects Delivered' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div
                  className="font-display text-base font-normal"
                  style={{ color: 'var(--gold)' }}
                >
                  {value}
                </div>
                <div
                  className="text-xs mt-0.5"
                  style={{ color: 'rgba(240,228,210,0.4)', fontFamily: 'DM Sans' }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Constellation woman image */}
        <div
          className="order-1 md:order-2 flex justify-center md:justify-end animate-fade-up"
          style={{ animationDelay: '0.3s', opacity: 0 }}
        >
          <div className="relative animate-float">
            {/* Outer glow ring */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(201,169,102,0.18) 0%, transparent 70%)',
                transform: 'scale(1.3)',
              }}
            />
            {/* Pulse rings */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                border: '1px solid rgba(201,169,102,0.2)',
                animation: 'pulseRing 3s ease-out infinite',
              }}
            />
            <img
              src="/images/gold-silhouette.png"
              alt="Luxury AI Design"
              className="relative rounded-2xl"
              style={{
                width: 'clamp(280px, 38vw, 460px)',
                height: 'auto',
                objectFit: 'cover',
                filter: 'drop-shadow(0 0 40px rgba(201,169,102,0.25))',
                zIndex: 1,
              }}
            />
            {/* Sparkle badge */}
            <div
              className="absolute -top-3 -right-3 glass-dark rounded-xl px-3 py-2 flex items-center gap-1.5"
              style={{ zIndex: 2 }}
            >
              <span style={{ color: 'var(--gold)', fontSize: 13 }}>✦</span>
              <span
                className="text-xs font-medium"
                style={{ color: 'var(--gold)', fontFamily: 'DM Sans', letterSpacing: '0.05em' }}
              >
                AI-Crafted
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-shimmer"
        style={{ zIndex: 2 }}
      >
        <div className="w-px h-8 bg-gradient-to-b" style={{ background: 'linear-gradient(to bottom, rgba(201,169,102,0.5), transparent)' }} />
        <span className="text-xs tracking-widest uppercase" style={{ color: 'rgba(201,169,102,0.4)', fontFamily: 'DM Sans' }}>Scroll</span>
      </div>
    </section>
  );
}
