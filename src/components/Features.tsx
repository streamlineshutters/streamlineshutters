import React from 'react';
import { Droplets, Paintbrush, Wrench, Ruler, CircleDollarSign, MapPinned, IterationCw, Wind } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    { name: "Water Resistant", icon: <Droplets size={48} /> },
    { name: "Elegant Finishes", icon: <Paintbrush size={48} /> },
    { name: "Premium Materials", icon: <Wrench size={48} /> },
    { name: "Custom Sizes", icon: <Ruler size={48} /> },
    { name: "Versatile Products", icon: <IterationCw size={48} /> },
    { name: "70% Better Insulation", icon: <Wind size={48} /> },
  ];

  return (
    <section className="pt-8 pb-24 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12"><span className="highlight-text">Key Features</span></h2>
        <div className="grid grid-cols-2 gap-8 text-center">
          {features.map((feature, index) => (
            <div key={index} className="py-8 group">
              <div className="flex flex-col items-center gap-4">
                <div className="text-gray-900 transition-transform duration-500 group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold relative">
                  <span className="relative z-10">
                    {feature.name}
                    <span className="absolute inset-x-0 -bottom-1 h-3 bg-[#ADE9BC] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 -z-10" />
                  </span>
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;