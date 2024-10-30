// src/components/TechniqueMenu.js
import React from 'react';
import { techniques } from '../data/techniques';

function TechniqueMenu({ onSelect }) {
  return (
    <div className="text-center p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Breathing Techniques</h2>
      <ul className="space-y-4">
        {techniques.map((technique, index) => (
          <li key={index}>
            <button
              onClick={() => onSelect(technique)}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {technique.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TechniqueMenu;
