import { useState, useEffect, useRef } from 'react';
import { X, Send, ArrowRight, Mail, RefreshCw } from 'lucide-react';
import { useChat } from '../hooks/useChat';
import { createCheckout, notifyDirect } from '../utils/api';
import ProjectBrief from './ProjectBrief';

function TypingIndicator() {
  return (
    <div className="flex items-end gap-1 px-4 py-3 bubble-ai w-fit">
      <span className="typing-dot" />
      <span className="typing-dot" />
      <span className="typing-dot" />
    </div>
  );
}

function PreChatForm({ onSubmit, isLoading }) {
  const [name,     setName]     = useState('');
  const [email,    setEmail]    = useState('');
  const [business, setBusiness] = useState('');

  return (
    <div
      className="flex flex-col h-full overflow-y-auto"
      style={{ background: `linear-gradient(160deg, var(--champagne) 0%, #fff 100%)` }}
    >
      {/* Hero image strip */}
      <div className="relative h-32 overflow-hidden shrink-0">
        <img
          src="/images/constellation-woman.png"
          alt=""
          className="w-full h-full object-cover object-top"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, transparent 30%, rgba(245,237,226,0.95) 100%)' }}
        />
      </div>

      <div className="px-6 py-6">
        <div className="text-center mb-6">
          <h3
            className="font-display text-2xl font-normal mb-1.5"
            style={{ color: 'var(--warm-900)' }}
          >
            Meet Your AI Design Consultant
          </h3>
          <p className="text-sm font-light" style={{ color: 'var(--taupe)', fontFamily: 'DM Sans' }}>
            Tell us a little about yourself and your vision — we'll help you find the perfect AI solution in minutes.
          </p>
        </div>

        <form
          onSubmit={e => { e.preventDefault(); if (name.trim() && email.trim()) onSubmit({ name: name.trim(), email: email.trim(), business: business.trim() }); }}
          className="flex flex-col gap-3"
        >
          {[
            { label: 'Your Name', value: name, set: setName, placeholder: 'Sophia', required: true, type: 'text' },
            { label: 'Email', value: email, set: setEmail, placeholder: 'sophia@yourbrand.com', required: true, type: 'email' },
            { label: 'Business or Brand', value: business, set: setBusiness, placeholder: 'e.g. Luxury skincare brand, personal coach…', required: false, type: 'text' },
          ].map(({ label, value, set, placeholder, required, type }) => (
            <div key={label}>
              <label
                className="block text-xs mb-1.5 tracking-widest uppercase"
                style={{ color: 'var(--gold-dim)', fontFamily: 'DM Sans', fontWeight: 500 }}
              >
                {label}{required && ' *'}
              </label>
              <input
                type={type}
                value={value}
                onChange={e => set(e.target.value)}
                placeholder={placeholder}
                required={required}
                className="w-full rounded-lg px-4 py-3 text-sm focus:outline-none transition-colors"
                style={{
                  background: 'rgba(255,255,255,0.7)',
                  border: '1px solid rgba(201,169,102,0.2)',
                  color: 'var(--warm-900)',
                  fontFamily: 'DM Sans',
                }}
                onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(201,169,102,0.2)')}
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={isLoading || !name.trim() || !email.trim()}
            className="btn-gold mt-2 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Starting your consultation…' : 'Begin My Design Journey'}
            {!isLoading && <ArrowRight size={14} />}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ChatBot({ isOpen, onClose }) {
  const [phase, setPhase] = useState('intro');
  const [input, setInput] = useState('');
  const endRef   = useRef(null);
  const inputRef = useRef(null);

  const { messages, brief, isLoading, error, sessionId, leadInfo, initSession, send } = useChat();

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isLoading]);
  useEffect(() => { if (phase === 'chat') setTimeout(() => inputRef.current?.focus(), 100); }, [phase]);
  useEffect(() => { if (brief) setPhase('brief'); }, [brief]);
  useEffect(() => { if (!isOpen) setTimeout(() => { if (!isOpen) setPhase('intro'); }, 400); }, [isOpen]);

  const handleStart = async (info) => { await initSession(info); setPhase('chat'); };

  const handleSend = () => {
    const t = input.trim();
    if (!t || isLoading) return;
    setInput('');
    send(t);
  };

  const handleDeposit = async () => {
    if (!brief) return;
    const amt = Math.round(brief.estimatedPriceRange.low * 0.25);
    try {
      const { url } = await createCheckout({ amount: amt, description: `${brief.serviceName} — Deposit`, customerEmail: leadInfo?.email, serviceName: brief.serviceName, sessionId });
      window.location.href = url;
    } catch (err) {
      alert(err.message || 'Payment not configured yet. Email moonravendigital@gmail.com to reserve your project.');
    }
  };

  const handleTalkToClaire = async () => {
    try {
      await notifyDirect({ leadInfo, transcript: messages, sessionId });
      alert('Message sent! Claire will reach out within 24 hours ✦');
    } catch {
      window.location.href = 'mailto:moonravendigital@gmail.com';
    }
  };

  if (!isOpen) return null;

  const isModelLoading = error?.includes('warming up') || error?.includes('MODEL_LOADING');

  return (
    <>
      <div
        className="fixed inset-0 bg-warm-900/40 backdrop-blur-sm z-40 md:hidden animate-fade-in"
        onClick={onClose}
      />

      <div
        className="fixed z-50 flex flex-col bottom-0 left-0 right-0 h-[92vh] rounded-t-2xl md:bottom-6 md:right-6 md:left-auto md:top-auto md:w-[420px] md:h-[650px] md:rounded-2xl animate-slide-up overflow-hidden"
        style={{
          background: '#fff',
          border: '1px solid rgba(201,169,102,0.2)',
          boxShadow: '0 24px 80px rgba(42,26,16,0.25)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 shrink-0"
          style={{ background: 'var(--champagne)', borderBottom: '1px solid rgba(201,169,102,0.15)' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full overflow-hidden"
              style={{ border: '1.5px solid rgba(201,169,102,0.3)' }}
            >
              <img src="/images/office-woman.png" alt="AI Consultant" className="w-full h-full object-cover object-top" />
            </div>
            <div>
              <div className="text-sm font-medium" style={{ color: 'var(--warm-900)', fontFamily: 'DM Sans' }}>
                AI Design Consultant
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#10b981' }} />
                <span className="text-xs" style={{ color: 'var(--taupe)', fontFamily: 'DM Sans' }}>
                  Luxury AI Designs
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {phase === 'chat' && (
              <button
                onClick={handleTalkToClaire}
                className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg transition-colors"
                style={{ color: 'var(--taupe)', fontFamily: 'DM Sans' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold-dim)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--taupe)')}
              >
                <Mail size={12} />
                <span className="hidden sm:inline">Talk to Claire</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full transition-all"
              style={{ color: 'var(--taupe)' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--blush)'; e.currentTarget.style.color = 'var(--warm-900)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--taupe)'; }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {phase === 'intro' && (
            <div className="flex-1 overflow-y-auto">
              <PreChatForm onSubmit={handleStart} isLoading={isLoading} />
            </div>
          )}

          {(phase === 'chat' || phase === 'brief') && (
            <>
              <div
                className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3"
                style={{ background: 'var(--ivory)' }}
              >
                {messages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}>
                    {msg.role === 'assistant' && (
                      <div
                        className="w-7 h-7 rounded-full overflow-hidden shrink-0 mb-1"
                        style={{ border: '1px solid rgba(201,169,102,0.2)' }}
                      >
                        <img src="/images/office-woman.png" alt="" className="w-full h-full object-cover object-top" />
                      </div>
                    )}
                    <div className={msg.role === 'user' ? 'bubble-user' : 'bubble-ai'}>
                      {msg.content}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start items-end gap-2">
                    <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 mb-1" style={{ border: '1px solid rgba(201,169,102,0.2)' }}>
                      <img src="/images/office-woman.png" alt="" className="w-full h-full object-cover object-top" />
                    </div>
                    <TypingIndicator />
                  </div>
                )}

                {/* AI error with retry */}
                {error && !isLoading && (
                  <div
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm"
                    style={{ background: 'rgba(201,169,102,0.08)', border: '1px solid rgba(201,169,102,0.15)' }}
                  >
                    <span style={{ color: 'var(--taupe)', fontFamily: 'DM Sans', flex: 1, fontSize: '0.8rem' }}>
                      {isModelLoading
                        ? '✦ AI is warming up (~20 sec). Please try again.'
                        : '✦ Something went wrong. Please try again.'}
                    </span>
                    {isModelLoading && (
                      <button
                        onClick={() => send(messages[messages.length - 2]?.content || 'Hello')}
                        className="flex items-center gap-1 text-xs rounded-lg px-3 py-1.5 transition-all"
                        style={{ background: 'var(--gold)', color: '#fff', fontFamily: 'DM Sans' }}
                      >
                        <RefreshCw size={11} /> Retry
                      </button>
                    )}
                  </div>
                )}

                {/* Project brief */}
                {brief && phase === 'brief' && (
                  <div className="mt-2">
                    <ProjectBrief
                      brief={brief}
                      leadInfo={leadInfo}
                      onDeposit={handleDeposit}
                      onTalkToClaire={handleTalkToClaire}
                    />
                  </div>
                )}

                <div ref={endRef} />
              </div>

              {/* Input */}
              {phase === 'chat' && (
                <div
                  className="px-4 py-3 shrink-0"
                  style={{ background: '#fff', borderTop: '1px solid rgba(201,169,102,0.12)' }}
                >
                  <div
                    className="flex items-end gap-2 rounded-xl px-4 py-2"
                    style={{ background: 'var(--champagne)', border: '1px solid rgba(201,169,102,0.2)' }}
                  >
                    <textarea
                      ref={inputRef}
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                      placeholder="Tell me about your vision…"
                      rows={1}
                      disabled={isLoading}
                      className="flex-1 bg-transparent text-sm resize-none focus:outline-none py-1.5 min-h-[36px] max-h-[100px]"
                      style={{ color: 'var(--warm-900)', fontFamily: 'DM Sans' }}
                    />
                    <button
                      onClick={handleSend}
                      disabled={!input.trim() || isLoading}
                      className="w-8 h-8 flex items-center justify-center rounded-lg transition-all shrink-0 disabled:opacity-30"
                      style={{ background: input.trim() && !isLoading ? 'var(--gold)' : 'transparent' }}
                    >
                      <Send size={13} style={{ color: input.trim() && !isLoading ? '#fff' : 'var(--taupe)' }} />
                    </button>
                  </div>
                  <p
                    className="text-center text-xs mt-2"
                    style={{ color: 'var(--taupe-light)', fontFamily: 'DM Sans' }}
                  >
                    Press Enter to send · Powered by AI
                  </p>
                </div>
              )}

              {/* Brief CTA footer */}
              {phase === 'brief' && (
                <div
                  className="px-4 py-3 shrink-0 flex gap-2"
                  style={{ background: '#fff', borderTop: '1px solid rgba(201,169,102,0.12)' }}
                >
                  <button onClick={() => setPhase('chat')} className="btn-outline text-xs py-2 flex-1 justify-center">
                    Continue Chat
                  </button>
                  <button onClick={handleDeposit} className="btn-gold text-xs py-2 flex-1 justify-center">
                    Reserve My Slot <ArrowRight size={12} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
