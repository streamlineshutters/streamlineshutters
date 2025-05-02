import React from 'react';

interface ProductCardProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  features: string[];
}

const ProductCard: React.FC<ProductCardProps> = ({ title, subtitle, imageUrl, features }) => {
  return (
    <div className="group w-full rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300">
      <div className="aspect-[4/3] overflow-hidden relative">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-lg text-gray-600 mb-6">{subtitle}</p>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
              <span className="text-black mt-1">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Products: React.FC = () => {
  const products = [
    {
      title: "Fusion Plus",
      subtitle: "Premium Choice For Durability & Style.",
      imageUrl: "/images/FusionPlus.jpg",
      features: [
        "Wide panels up to 1000mm",
        "Moisture-proof engineered polymer",
        "Pre-applied, low VOC paint for a consistent, lasting finish",
        "Lifetime warranty on extrusions"
      ]
    },
    {
      title: "Element 13 Aluminium",
      subtitle: "A Combination of Strength & Lightweight Aluminium.",
      imageUrl: "/images/Element13.jpg",
      features: [
        "Spans up to 1500mm wide",
        "Coated with AkzoNobel Interpon Powder",
        "Choose from 64mm, 89mm, and 114mm louvres with fixed or movable configurations",
        "10-year warranty on extrusions, components, and finishes"
      ]
    },
    {
      title: "Sovereign Basswood",
      subtitle: "A-Grade American Basswood.",
      imageUrl: "/images/Basswood.jpg",
      features: [
        "Louvres in 64mm, 89mm, and 114mm sizes",
        "Beaded and flat frame options to suit any style",
        "Minimal resin and tannin for a seamless, long-lasting finish",
        "Available in 9 paint colour and 10 natural stains"
      ]
    }
  ];

  return (
    <section className="py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-20"><span className="highlight-text">Our Products</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;