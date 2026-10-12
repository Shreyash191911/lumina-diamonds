import React from 'react';
import { useCart } from '../context/CartContext';

export default function Hero() {
  const { setIsConsultationOpen } = useCart();

  // Premium SVG fallback representing a high-end editorial diamond illustration
  const fallbackSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="100%" height="100%"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23FBF9F5"/><stop offset="50%" stop-color="%23F4F0EA"/><stop offset="100%" stop-color="%23E5DFD5"/></linearGradient></defs><rect width="100%" height="100%" fill="url(%23g)"/><g transform="translate(150, 75) scale(3)" stroke="%239E8160" stroke-width="0.8" fill="none" stroke-linejoin="round" stroke-linecap="round"><path d="M50 15 L75 35 L50 85 L25 35 Z" opacity="0.9"/><path d="M35 35 L50 15 L65 35 L50 85 Z" opacity="0.7"/><path d="M25 35 L75 35 M35 35 L65 35" opacity="0.7"/><circle cx="50" cy="50" r="1" fill="%239E8160" opacity="0.3"/></g><text x="50%" y="88%" dominant-baseline="middle" text-anchor="middle" font-family="serif" font-size="16" letter-spacing="4" fill="%239E8160">LUMINA DIAMONDS</text></svg>`;

  return (
    <section className="hero-section">
      <div className="hero-content">
        <span className="hero-subtitle">THE ART OF HIGH GEMOLOGY</span>
        <h2 className="hero-title">Peerless Fire. Absolute Clarity.</h2>
        <p className="hero-description">
          A curated collection of rare, ethically sourced diamonds of exceptional grade. 
          Each stone is hand-selected for its unique scintillation, certified by the GIA, 
          and presented with absolute transparency.
        </p>
        <div className="hero-actions">
          <button 
            className="btn-primary" 
            onClick={() => {
              const el = document.getElementById('diamond-catalog');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Explore Collection
          </button>
          <button 
            className="btn-secondary" 
            onClick={() => setIsConsultationOpen(true)}
          >
            Request Private Viewing
          </button>
        </div>
      </div>
      <div className="hero-image-container">
        <img 
          src="https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1200&q=80"
          alt="Exquisite Editorial Diamond on Warm Neutral Canvas"
          className="hero-image"
          onError={(e) => {
            e.target.src = fallbackSvg;
          }}
        />
      </div>
    </section>
  );
}
