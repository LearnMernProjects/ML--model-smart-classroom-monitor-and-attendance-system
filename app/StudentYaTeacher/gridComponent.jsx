import React from 'react';

const gridComponent = () => {
  // Grid configuration
  const GRID_SIZE = 12; // 12x12 grid for better visualization
  const RED_ZONE_SIZE = 4; // 4x4 red zone in bottom-right
  const START_INDEX = GRID_SIZE - RED_ZONE_SIZE; // Index where red zone starts (8)

  // Function to determine if a cell should be red (low focus) or green (high focus)
  const getCellColor = (rowIndex, colIndex) => {
    // Check if cell is in bottom-right 4x4 quadrant
    const isInRedZone = rowIndex >= START_INDEX && colIndex >= START_INDEX;
    return isInRedZone ? 'cell-low-focus' : 'cell-high-focus';
  };

  // Generate grid cells
  const renderGrid = () => {
    const cells = [];
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        cells.push(
          <div
            key={`cell-${row}-${col}`}
            className={`grid-cell ${getCellColor(row, col)}`}
            title={`Row: ${row + 1}, Col: ${col + 1}`}
          >
            {/* Optional: Add cell coordinates for debugging */}
            {/* <span className="text-xs text-white opacity-70">{row},{col}</span> */}
          </div>
        );
      }
    }
    return cells;
  };

  return (
    <div className="grid-container">
      {/* Header */}
      <div className="grid-header">
        <h1 className="grid-title">
          Class Activeness Grid
        </h1>
        <div className="grid-description">
          <div className="legend-item">
            <span className="legend-color legend-color-green"></span>
            High Focus (Active Students)
          </div>
          <div className="legend-item">
            <span className="legend-color legend-color-red"></span>
            Low Focus (Distracted Students)
          </div>
        </div>
      </div>

      {/* 2D Grid Container */}
      <div className="grid-wrapper">
        <div 
          className="activity-grid"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`
          }}
        >
          {renderGrid()}
        </div>

        {/* Grid Labels */}
        <div className="grid-label grid-label-vertical">
          <span>Rows</span>
        </div>
        <div className="grid-label grid-label-horizontal">
          <span>Columns</span>
        </div>
      </div>

      {/* Statistics Panel */}
      <div className="stats-panel">
        <h3 className="stats-title">Statistics</h3>
        <div className="stats-grid">
          <div className="stat-item stat-item-green">
            <div className="stat-number stat-number-green">
              {GRID_SIZE * GRID_SIZE - RED_ZONE_SIZE * RED_ZONE_SIZE}
            </div>
            <div className="stat-label stat-label-green">Active Students</div>
          </div>
          <div className="stat-item stat-item-red">
            <div className="stat-number stat-number-red">
              {RED_ZONE_SIZE * RED_ZONE_SIZE}
            </div>
            <div className="stat-label stat-label-red">Distracted Students</div>
          </div>
          <div className="stat-item stat-item-blue">
            <div className="stat-number stat-number-blue">
              {Math.round(((GRID_SIZE * GRID_SIZE - RED_ZONE_SIZE * RED_ZONE_SIZE) / (GRID_SIZE * GRID_SIZE)) * 100)}%
            </div>
            <div className="stat-label stat-label-blue">Focus Rate</div>
          </div>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="controls">
        <button
          onClick={() => window.location.reload()}
          className="control-button control-button-blue"
        >
          Refresh Grid
        </button>
        <button
          onClick={() => {
            const grid = document.querySelector('.activity-grid');
            if (grid) {
              grid.style.transform = grid.style.transform === 'scale(1.2)' ? 'scale(1)' : 'scale(1.2)';
            }
          }}
          className="control-button control-button-green"
        >
          Toggle Zoom
        </button>
      </div>
    </div>
  );
};

export default gridComponent;