import React, { useState, Suspense } from 'react';
import { ChevronDown } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, AccumulativeShadows, RandomizedLight, SoftShadows } from '@react-three/drei';
import ShutterModel from './ShutterModel';

const Hero: React.FC = () => {
  const [activeProduct, setActiveProduct] = useState<'fusion' | 'element' | 'sovereign'>('fusion');
  const [panelOpenAngle, setPanelOpenAngle] = useState(0);
  const [slatAngle, setSlatAngle] = useState(0);
  
  const products = [
    { id: 'fusion', name: 'Fusion Plus' },
    { id: 'element', name: 'Element 13' },
    { id: 'sovereign', name: 'Sovereign Basswood' }
  ];

  return (
    <section className="min-h-screen flex flex-col items-center justify-start pt-32 px-4 relative">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-4">
          Premium <span className="highlight-text">Quality</span>. Competitive <span className="highlight-text">Pricing</span>.
        </h1>
      </div>

      <div className="w-full max-w-5xl mx-auto">
        <div className="aspect-[16/9] bg-gradient-to-b from-gray-50 to-white rounded-3xl shadow-lg mb-8 overflow-hidden">
          <Canvas shadows>
            <SoftShadows size={2.5} samples={16} focus={0.5} />
            <PerspectiveCamera makeDefault position={[0, 0, 8]} />
            <color attach="background" args={['#f8fafc']} />
            
            <ambientLight intensity={0.5} />
            <directionalLight
              position={[5, 5, 5]}
              intensity={1}
              castShadow
              shadow-mapSize={[1024, 1024]}
            />
            <directionalLight
              position={[-5, 5, -5]}
              intensity={0.5}
              castShadow
              shadow-mapSize={[1024, 1024]}
            />
            
            <Suspense fallback={null}>
              <ShutterModel 
                type={activeProduct} 
                panelOpenAngle={panelOpenAngle}
                slatAngle={slatAngle}
              />
              <Environment preset="sunset" />
              
              {/* Ground plane for shadows */}
              <mesh 
                rotation={[-Math.PI / 2, 0, 0]} 
                position={[0, -3.5, 0]} 
                receiveShadow
              >
                <planeGeometry args={[50, 50]} />
                <shadowMaterial transparent opacity={0.4} />
              </mesh>
            </Suspense>

            <OrbitControls 
              enableZoom={false}
              minPolarAngle={Math.PI / 2.5}
              maxPolarAngle={Math.PI / 2.5}
            />
          </Canvas>
        </div>

        <div className="flex flex-col items-center gap-8">
          <div className="flex justify-center gap-4 flex-wrap">
            {products.map((product) => (
              <button
                key={product.id}
                onClick={() => setActiveProduct(product.id as 'fusion' | 'element' | 'sovereign')}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeProduct === product.id
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {product.name}
              </button>
            ))}
          </div>
          
          <div className="w-full max-w-md space-y-6">
            <div className="space-y-2">
              <label className="flex justify-between items-center text-sm font-medium text-gray-700">
                <span>Panel Opening</span>
                <span className="text-gray-500">{panelOpenAngle}°</span>
              </label>
              <input
                type="range"
                min="0"
                max="120"
                value={panelOpenAngle}
                onChange={(e) => setPanelOpenAngle(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Closed</span>
                <span>Open</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="flex justify-between items-center text-sm font-medium text-gray-700">
                <span>Slat Angle</span>
                <span className="text-gray-500">{slatAngle}°</span>
              </label>
              <input
                type="range"
                min="0"
                max="90"
                value={slatAngle}
                onChange={(e) => setSlatAngle(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Closed</span>
                <span>Open</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;