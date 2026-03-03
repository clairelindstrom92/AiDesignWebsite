import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';

export default function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const payment = params.get('payment');
    if (payment === 'success') { setPaymentStatus('success'); window.history.replaceState({}, '', '/'); }
    if (payment === 'cancelled') { setPaymentStatus('cancelled'); window.history.replaceState({}, '', '/'); }
  }, []);

  return (
    <div className="min-h-screen" style={{ background: 'var(--ivory)' }}>
      <Navbar onStartChat={() => setChatOpen(true)} />

      {/* Payment banners */}
      {paymentStatus === 'success' && (
        <div className="fixed top-20 left-0 right-0 z-50 flex justify-center px-4">
          <div className="glass-light rounded-xl px-6 py-4 flex items-center gap-3 animate-fade-up max-w-lg w-full">
            <span className="text-xl">✦</span>
            <div>
              <p className="text-warm-900 font-medium text-sm" style={{ fontFamily: 'DM Sans' }}>Deposit received — you're in!</p>
              <p className="text-taupe text-xs mt-0.5">Claire will be in touch within 24 hours to schedule your kickoff call.</p>
            </div>
            <button onClick={() => setPaymentStatus(null)} className="ml-auto text-taupe hover:text-warm-900 text-xl">×</button>
          </div>
        </div>
      )}
      {paymentStatus === 'cancelled' && (
        <div className="fixed top-20 left-0 right-0 z-50 flex justify-center px-4">
          <div className="glass-light rounded-xl px-6 py-4 flex items-center gap-3 animate-fade-up max-w-lg w-full">
            <p className="text-taupe text-sm flex-1">Payment cancelled — your project brief is still saved.</p>
            <button onClick={() => { setPaymentStatus(null); setChatOpen(true); }} className="text-gold text-xs underline">Resume chat</button>
            <button onClick={() => setPaymentStatus(null)} className="text-taupe hover:text-warm-900 text-xl ml-2">×</button>
          </div>
        </div>
      )}

      <main>
        <Hero onStartChat={() => setChatOpen(true)} />
        <Services onStartChat={() => setChatOpen(true)} />
        <Portfolio />
        <About onStartChat={() => setChatOpen(true)} />
      </main>
      <Footer onStartChat={() => setChatOpen(true)} />
      <ChatBot isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
}
