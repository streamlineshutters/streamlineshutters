import React from 'react';
import { Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-16 px-4 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-xl font-bold mb-4">Streamline Shutters</h2>
            <div className="flex items-start space-x-2 text-gray-600 mb-3">
              <MapPin size={20} className="mt-1 flex-shrink-0" />
              <p>
                15 Port Kembla Dr<br />
                Bibra Lake, WA, 3196
              </p>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Mail size={20} />
              <a href="mailto:orders@streamlineshutters.com.au" className="hover:text-gray-900">
                orders@streamlineshutters.com.au
              </a>
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <div className="space-x-6 text-gray-600">
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-[20vw] font-bold text-black/[0.05] select-none">
          Streamline
        </span>
      </div>
    </footer>
  );
};

export default Footer;