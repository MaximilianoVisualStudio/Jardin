import React, { useState, useCallback } from 'react';
import { FlowerType } from './types';
import { generateFlowerData } from './services/geminiService';
import Flower from './components/Flower';

const App: React.FC = () => {
  const [flowers, setFlowers] = useState<FlowerType[]>([]);

  const handleGrowClick = useCallback(() => {
    const { svg, color, size } = generateFlowerData();
    
    const newFlower: FlowerType = {
      id: self.crypto.randomUUID(),
      svg,
      color,
      size,
      position: {
        top: `${random(0, 85)}%`, // Avoid spawning right at the very bottom
        left: `${random(0, 95)}%`,// Avoid spawning right at the very edge
      }
    };

    setFlowers(prevFlowers => [...prevFlowers, newFlower]);
  }, []);

  const random = (min: number, max: number) => Math.random() * (max - min) + min;

  return (
    <div className="relative min-h-screen w-full bg-slate-900 text-slate-100 flex flex-col items-center p-4 overflow-hidden">
      <header className="w-full max-w-4xl text-center py-8 z-20">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400">
          Jardín Zen Digital
        </h1>
        <p className="mt-4 text-lg text-slate-300">
          Haz clic en 'Crecer' para cultivar tu jardín único y brillante.
        </p>
      </header>

      <div className="flex-grow w-full flex justify-center my-8 z-20">
          <button
            onClick={handleGrowClick}
            className="flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg rounded-full px-10 py-4 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Crecer
          </button>
      </div>
      
      {/* Container for absolutely positioned flowers */}
      <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
        {flowers.map(flower => (
           <div
            key={flower.id}
            className="absolute"
            style={{
              top: flower.position.top,
              left: flower.position.left,
              width: `${flower.size}px`,
              height: `${flower.size}px`,
            }}
          >
            <Flower flower={flower} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;