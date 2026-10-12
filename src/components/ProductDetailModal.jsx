import React from 'react';
import { useCart } from '../context/CartContext';
import { X, ShieldCheck } from 'lucide-react';

export default function ProductDetailModal() {
  const { selectedDiamond, setSelectedDiamond, addToCart } = useCart();

  if (!selectedDiamond) return null;

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: selectedDiamond.currency || 'USD',
    maximumFractionDigits: 0
  }).format(selectedDiamond.priceCents / 100);

  const fallbackSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23FBF9F5"/><stop offset="100%" stop-color="%23F4F0EA"/></linearGradient></defs><rect width="100%" height="100%" fill="url(%23g)"/><g transform="translate(125, 100) scale(2.5)" stroke="%239E8160" stroke-width="0.8" fill="none" stroke-linejoin="round"><path d="M50 15 L75 35 L50 85 L25 35 Z" opacity="0.8"/><path d="M35 35 L50 15 L65 35 L50 85 Z" opacity="0.6"/><path d="M25 35 L75 35 M35 35 L65 35" opacity="0.6"/></g><text x="50%" y="85%" dominant-baseline="middle" text-anchor="middle" font-family="serif" font-size="14" letter-spacing="2" fill="%239E8160">${selectedDiamond.name.toUpperCase()}</text></svg>`;

  return (
    <div className="modal-backdrop" onClick={() => setSelectedDiamond(null)}>
      <div className="modal-container max-w-3xl" onClick={(e) => e.stopPropagation()}>
        <button 
          className="modal-close-btn" 
          onClick={() => setSelectedDiamond(null)}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="modal-grid">
          <div className="modal-image-section">
            <img
              src={selectedDiamond.image}
              alt={selectedDiamond.name}
              className="modal-image"
              onError={(e) => {
                e.target.src = fallbackSvg;
              }}
            />
            <div className="gemological-seal">
              <ShieldCheck size={14} />
              <span>GIA Certified Natural</span>
            </div>
          </div>

          <div className="modal-info-section">
            <span className="modal-subtitle">{selectedDiamond.shape} • {selectedDiamond.carat} Carat</span>
            <h2 className="modal-title">{selectedDiamond.name}</h2>
            <p className="modal-price">{formattedPrice}</p>
            
            <p className="modal-description">{selectedDiamond.description}</p>

            <div className="specs-table">
              <div className="specs-row">
                <span>Certificate</span>
                <strong>{selectedDiamond.certificate}</strong>
              </div>
              <div className="specs-row">
                <span>Cut Grade</span>
                <strong>{selectedDiamond.cut}</strong>
              </div>
              <div className="specs-row">
                <span>Color Grade</span>
                <strong>{selectedDiamond.color}</strong>
              </div>
              <div className="specs-row">
                <span>Clarity Grade</span>
                <strong>{selectedDiamond.clarity}</strong>
              </div>
              <div className="specs-row">
                <span>Polish</span>
                <strong>{selectedDiamond.polish}</strong>
              </div>
              <div className="specs-row">
                <span>Symmetry</span>
                <strong>{selectedDiamond.symmetry}</strong>
              </div>
              <div className="specs-row">
                <span>Dimensions</span>
                <strong>{selectedDiamond.dimensions}</strong>
              </div>
              <div className="specs-row">
                <span>Origin</span>
                <strong>{selectedDiamond.origin}</strong>
              </div>
            </div>

            <button 
              className="btn-primary full-width" 
              onClick={() => {
                addToCart(selectedDiamond);
                setSelectedDiamond(null);
              }}
            >
              Acquire Diamond
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
