import React from 'react';
import { ShieldCheck, Award, HelpCircle, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-trust-banners">
        <div className="trust-item">
          <ShieldCheck className="trust-icon" size={24} />
          <h4 className="trust-title">GIA Certified</h4>
          <p className="trust-desc">Every diamond is individually graded and certified by the Gemological Institute of America.</p>
        </div>
        <div className="trust-item">
          <Award className="trust-icon" size={24} />
          <h4 className="trust-title">Ethically Sourced</h4>
          <p className="trust-desc">Strict adherence to the Kimberley Process ensures conflict-free, responsible origins.</p>
        </div>
        <div className="trust-item">
          <HelpCircle className="trust-icon" size={24} />
          <h4 className="trust-title">Bespoke Concierge</h4>
          <p className="trust-desc">Our master gemologists are available for private consultations and custom settings.</p>
        </div>
      </div>

      <div className="footer-main">
        <div className="footer-brand-col">
          <div className="footer-brand">
            <Sparkles className="brand-icon" size={16} />
            <span className="footer-brand-title">Lumina Diamonds</span>
          </div>
          <p className="footer-tagline">The ultimate expression of light, fire, and absolute clarity.</p>
        </div>

        <div className="footer-links-col">
          <h5 className="footer-col-title">The Collection</h5>
          <ul className="footer-links">
            <li><a href="#" onClick={(e) => e.preventDefault()}>Round Brilliant</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Fancy Shapes</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>The Private Reserve</a></li>
          </ul>
        </div>

        <div className="footer-links-col">
          <h5 className="footer-col-title">Services</h5>
          <ul className="footer-links">
            <li><a href="#" onClick={(e) => e.preventDefault()}>Bespoke Design</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Lifetime Warranty</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Insured Shipping</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">&copy; {new Date().getFullYear()} Lumina Diamonds. All rights reserved.</p>
        <p className="footer-disclaimer">Demo Mode Active. All transactions are simulated for presentation purposes.</p>
      </div>
    </footer>
  );
}
