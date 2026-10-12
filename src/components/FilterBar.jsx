import React from 'react';

const SHAPES = ['All', 'Round', 'Oval', 'Marquise', 'Emerald', 'Princess', 'Pear'];
const CARATS = ['All', '2.0+ Carat', '2.5+ Carat', '3.0+ Carat'];
const CLARITIES = ['All', 'FL/IF', 'VVS1/VVS2', 'VS1/VS2'];
const COLORS = ['All', 'D', 'E', 'F', 'G'];

export default function FilterBar({
  selectedShape,
  setSelectedShape,
  selectedCarat,
  setSelectedCarat,
  selectedClarity,
  setSelectedClarity,
  selectedColor,
  setSelectedColor,
  resetFilters
}) {
  return (
    <div className="filter-bar-container">
      <div className="filter-header">
        <h3 className="filter-title">Refine Collection</h3>
        <button className="btn-text-link" onClick={resetFilters}>Clear All Filters</button>
      </div>

      <div className="filter-grid">
        {/* Shape Filter Buttons */}
        <div className="filter-group full-width">
          <span className="filter-label">Shape</span>
          <div className="shape-buttons">
            {SHAPES.map(shape => (
              <button
                key={shape}
                className={`shape-btn ${selectedShape === shape ? 'active' : ''}`}
                onClick={() => setSelectedShape(shape)}
                aria-label={`Filter ${shape}`}
              >
                {shape}
              </button>
            ))}
          </div>
        </div>

        {/* Carat Filter */}
        <div className="filter-group">
          <label htmlFor="carat-select" className="filter-label">Minimum Carat Weight</label>
          <select
            id="carat-select"
            className="filter-select"
            value={selectedCarat}
            onChange={(e) => setSelectedCarat(e.target.value)}
          >
            {CARATS.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Clarity Filter */}
        <div className="filter-group">
          <label htmlFor="clarity-select" className="filter-label">Clarity Grade</label>
          <select
            id="clarity-select"
            className="filter-select"
            value={selectedClarity}
            onChange={(e) => setSelectedClarity(e.target.value)}
          >
            {CLARITIES.map(cl => (
              <option key={cl} value={cl}>{cl}</option>
            ))}
          </select>
        </div>

        {/* Color Filter */}
        <div className="filter-group">
          <label htmlFor="color-select" className="filter-label">Color Grade</label>
          <select
            id="color-select"
            className="filter-select"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
          >
            {COLORS.map(col => (
              <option key={col} value={col}>{col}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
