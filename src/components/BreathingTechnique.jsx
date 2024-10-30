// src/components/BreathingTechnique.js
import React, { useState } from 'react';
import BreathingCircle from './BreathingCircle';

function BreathingTechnique({ technique, onBack }) {
  const [isStarted, setIsStarted] = useState(false);
  const [isPreparing, setIsPreparing] = useState(false);

  const handleStart = () => {
    setIsPreparing(true);
    setTimeout(() => {
      setIsPreparing(false);
      setIsStarted(true);
    }, 3000); // Pausa de preparación de 3 segundos
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <button
        onClick={onBack}
        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        Back to Menu
      </button>
      <h2 className="text-xl font-semibold">{technique.name}</h2>
      {!isStarted && !isPreparing && (
        <button
          onClick={handleStart}
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Start Breathing
        </button>
      )}
      {isPreparing && <p className="text-gray-700">Prepare yourself...</p>}
      {isStarted && (
        <BreathingCircle
          inhale={technique.inhale}
          hold={technique.hold}
          exhale={technique.exhale}
          wait={technique.wait}
          cycles={technique.cycles}
        />
      )}
    </div>
  );
}

export default BreathingTechnique;
