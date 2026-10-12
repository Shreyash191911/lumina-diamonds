import React from 'react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ diamond }) {
  const { setSelectedDiamond } = useCart();

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: diamond.currency || 'USD',
    maximumFractionDigits: 0
  }).format(diamond.priceCents / 100);

  // Elegant geometric diamond wireframe SVG fallback
  const fallbackSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23FBF9F5"/><stop offset="100%" stop-color="%23F4F0EA"/></linearGradient></defs><rect width="100%" height="100%" fill="url(%23g)"/><g transform="translate(100, 50) scale(2)" stroke="%239E8160" stroke-width="0.8" fill="none" stroke-linejoin="round"><path d="M50 15 L75 35 L50 85 L25 35 Z" opacity="0.8"/><path d="M35 35 L50 15 L65 35 L50 85 Z" opacity="0.6"/><path d="M25 35 L75 35 M35 35 L65 35" opacity="0.6"/></g><text x="50%" y="85%" dominant-baseline="middle" text-anchor="middle" font-family="serif" font-size="12" letter-spacing="2" fill="%239E8160">${diamond.name.toUpperCase()}</text></svg>`;

  return (
    <div className="product-card">
      <div className="product-card-image-wrapper">
        <img
          src={diamond.image}
          alt={diamond.name}
          className="product-card-image"
          onError={(e) => {
            e.target.src = fallbackSvg;
          }}
        />
        <div className="product-card-overlay">
          <button
            className="btn-card-action"
            onClick={() => setSelectedDiamond(diamond)}
            aria-label={`View Spec ${diamond.name}`}
          >
            View Specifications
          </button>
        </div>
      </div>
      
      <div className="product-card-info">
        <div className="product-card-header">
          <h3 className="product-card-title">{diamond.name}</h3>
          <span className="product-card-price">{formattedPrice}</span>
        </div>
        
        <div className="product-card-specs">
          <div className="spec-pill"><span>Carat</span><strong>{diamond.carat}</strong></div>
          <div className="spec-pill"><span>Cut</span><strong>{diamond.cut}</strong></div>
          <div className="spec-pill"><span>Color</span><strong>{diamond.color}</strong></div>
          <div className="spec-pill"><span>Clarity</span><strong>{diamond.clarity}</strong></div>
        </div>

        <button
          className="btn-secondary-outline full-width"
          onClick={() => setSelectedDiamond(diamond)}
          aria-label={`View Spec ${diamond.name}`}
        >
          View Spec {diamond.name}
        </button>
      </div>
    </div>
  );
}
