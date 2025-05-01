import React from 'react';
import ScrollReveal from './ScrollReveal';

const Testimonial: React.FC = () => {
  return (
    <section className="py-24 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-16">What Clients Say</h2>
            <blockquote className="text-xl md:text-2xl font-light italic text-gray-700 mb-8">
              "Streamline Shutters transformed our home with their elegant designs and exceptional quality. The precision craftsmanship and attention to detail exceeded our expectations."
            </blockquote>
            <div className="flex items-center justify-center">
              <div className="w-14 h-14 bg-gray-300 rounded-full overflow-hidden mr-4">
                <img 
                  src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Customer" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <p className="font-medium">Emma Richardson</p>
                <p className="text-sm text-gray-500">San Francisco, CA</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Testimonial;