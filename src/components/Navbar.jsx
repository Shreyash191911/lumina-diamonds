import React from 'react';
import { useCart } from '../context/CartContext';
import ThemeToggle from './ThemeToggle';
import { ShoppingBag, Calendar, Sparkles } from 'lucide-react';

export default function Navbar() {
  const { cart, setIsCartOpen, setIsConsultationOpen } = useCart();
  const totalItems = cart.length;

  return (
    <header className="navbar-container">
      <div className="navbar-inner">
        <div className="navbar-brand">
          <Sparkles className="brand-icon" size={18} />
          <h1 className="brand-title">Lumina Diamonds</h1>
        </div>
        
        <nav className="navbar-nav">
          <ThemeToggle />
          <button 
            className="nav-btn-link" 
            onClick={() => setIsConsultationOpen(true)}
            aria-label="Book Consultation"
          >
            <Calendar size={16} />
            <span>Private Consultation</span>
          </button>
          
          <button 
            className="nav-cart-trigger" 
            onClick={() => setIsCartOpen(true)}
            aria-label="Open Cart"
          >
            <ShoppingBag size={18} />
            <span className="cart-badge-text">Private Collection ({totalItems})</span>
          </button>
        </nav>
      </div>
    </header>
  );
}