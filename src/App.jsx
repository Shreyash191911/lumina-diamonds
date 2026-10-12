import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FilterBar from './components/FilterBar';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import ConsultationModal from './components/ConsultationModal';
import Footer from './components/Footer';
import { DIAMONDS } from './data/diamonds';
import { Sparkles, Info } from 'lucide-react';
import './styles/app.css';

function MainApp() {
  const [selectedShape, setSelectedShape] = useState('All');
  const [selectedCarat, setSelectedCarat] = useState('All');
  const [selectedClarity, setSelectedClarity] = useState('All');
  const [selectedColor, setSelectedColor] = useState('All');

  const resetFilters = () => {
    setSelectedShape('All');
    setSelectedCarat('All');
    setSelectedClarity('All');
    setSelectedColor('All');
  };

  const filteredDiamonds = DIAMONDS.filter(diamond => {
    if (selectedShape !== 'All' && diamond.shape !== selectedShape) return false;
    if (selectedCarat !== 'All') {
      const minCarat = parseFloat(selectedCarat.replace('+ Carat', ''));
      if (diamond.carat < minCarat) return false;
    }
    if (selectedClarity !== 'All') {
      if (selectedClarity === 'FL/IF') {
        if (diamond.clarity !== 'FL' && diamond.clarity !== 'IF') return false;
      } else if (selectedClarity === 'VVS1/VVS2') {
        if (diamond.clarity !== 'VVS1' && diamond.clarity !== 'VVS2') return false;
      } else if (selectedClarity === 'VS1/VS2') {
        if (diamond.clarity !== 'VS1' && diamond.clarity !== 'VS2') return false;
      }
    }
    if (selectedColor !== 'All' && diamond.color !== selectedColor) return false;
    return true;
  });

  return (
    <div className="app-container">
      <div className="demo-banner">
        <Info size={14} />
        <span>Lumina Diamonds Demo Mode — Simulated GIA inventory & secure checkout integration.</span>
      </div>

      <Navbar />
      <Hero />

      <main className="main-content" id="diamond-catalog">
        <div className="catalog-header">
          <span className="catalog-subtitle">CURATED SELECTION</span>
          <h2 className="catalog-title">The Diamond Gallery</h2>
          <p className="catalog-desc">
            Explore our current inventory of certified loose diamonds. Filter by shape, carat weight, color, and clarity to find your perfect stone.
          </p>
        </div>

        <FilterBar
          selectedShape={selectedShape}
          setSelectedShape={setSelectedShape}
          selectedCarat={selectedCarat}
          setSelectedCarat={setSelectedCarat}
          selectedClarity={selectedClarity}
          setSelectedClarity={setSelectedClarity}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          resetFilters={resetFilters}
        />

        <div className="results-count">
          Showing {filteredDiamonds.length} of {DIAMONDS.length} exceptional diamonds
        </div>

        {filteredDiamonds.length === 0 ? (
          <div className="no-results">
            <Sparkles size={24} className="no-results-icon" />
            <h3>No matching diamonds found</h3>
            <p>Try adjusting your filters or request a custom search from our gemologists.</p>
            <button className="btn-secondary" onClick={resetFilters}>Reset All Filters</button>
          </div>
        ) : (
          <div className="products-grid">
            {filteredDiamonds.map(diamond => (
              <ProductCard key={diamond.id} diamond={diamond} />
            ))}
          </div>
        )}
      </main>

      <Footer />

      <ProductDetailModal />
      <CartDrawer />
      <ConsultationModal />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <ThemeProvider>
        <MainApp />
      </ThemeProvider>
    </CartProvider>
  );
}