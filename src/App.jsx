// src/App.js
import React, { useState } from 'react';
import TechniqueMenu from './components/TechniqueMenu';
import BreathingTechnique from './components/BreathingTechnique';

function App() {
  const [selectedTechnique, setSelectedTechnique] = useState(null);

  const handleSelectTechnique = (technique) => {
    setSelectedTechnique(technique);
  };

  const handleBackToMenu = () => {
    setSelectedTechnique(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center text-gray-900">
      {selectedTechnique ? (
        <BreathingTechnique technique={selectedTechnique} onBack={handleBackToMenu} />
      ) : (
        <TechniqueMenu onSelect={handleSelectTechnique} />
      )}
    </div>
  );
}

export default App;
