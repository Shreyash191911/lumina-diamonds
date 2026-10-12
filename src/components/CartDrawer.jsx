import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2, Lock, Sparkles } from 'lucide-react';

export default function CartDrawer() {
  const {
    cart,
    removeFromCart,
    isCartOpen,
    setIsCartOpen,
    handleCheckout,
    checkoutLoading,
    checkoutError,
    setCheckoutError
  } = useCart();

  if (!isCartOpen) return null;

  const totalCents = cart.reduce((sum, item) => sum + item.priceCents, 0);
  const formattedTotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(totalCents / 100);

  return (
    <div className="drawer-backdrop" onClick={() => setIsCartOpen(false)}>
      <div className="drawer-container" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h2 className="drawer-title">Private Collection ({cart.length})</h2>
          <button 
            className="drawer-close-btn" 
            onClick={() => setIsCartOpen(false)}
            aria-label="Close Cart"
          >
            <X size={20} />
          </button>
        </div>

        <div className="drawer-content">
          {checkoutError && (
            <div className="checkout-error-banner">
              <p>{checkoutError}</p>
              <button className="btn-text-link" onClick={() => setCheckoutError(null)}>Dismiss</button>
            </div>
          )}

          {cart.length === 0 ? (
            <div className="empty-cart-state">
              <Sparkles size={32} className="empty-icon" />
              <p className="empty-text">Your private collection is currently empty.</p>
              <button 
                className="btn-primary"
                onClick={() => setIsCartOpen(false)}
              >
                Explore Diamonds
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cart.map(item => {
                const itemPrice = new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: item.currency || 'USD',
                  maximumFractionDigits: 0
                }).format(item.priceCents / 100);

                return (
                  <div key={item.id} className="cart-item">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item-image"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100%" height="100%" fill="%23F4F0EA"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="serif" font-size="10" fill="%239E8160">Diamond</text></svg>';
                      }}
                    />
                    <div className="cart-item-details">
                      <h4 className="cart-item-name">{item.name}</h4>
                      <p className="cart-item-specs">{item.shape} • {item.carat} ct • {item.color} • {item.clarity}</p>
                      <p className="cart-item-price">{itemPrice}</p>
                    </div>
                    <button
                      className="cart-item-remove"
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="drawer-footer">
            <div className="drawer-summary-row">
              <span>Estimated Total</span>
              <strong className="drawer-total-price">{formattedTotal}</strong>
            </div>
            <p className="drawer-disclaimer">
              Complimentary fully insured overnight shipping & bespoke presentation box included.
            </p>
            <button
              className="btn-primary full-width checkout-btn"
              onClick={handleCheckout}
              disabled={checkoutLoading}
            >
              {checkoutLoading ? 'Securing Session...' : 'Proceed to Secure Checkout'}
            </button>
            <div className="secure-badge">
              <Lock size={12} />
              <span>End-to-End Encrypted Checkout</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
