import React from 'react';
import { X } from 'lucide-react';

interface FAQModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FAQModal: React.FC<FAQModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const faqs = [
    {
      question: "What materials are your shutters made from?",
      answer: "We offer three premium materials: Fusion Plus (polymer), Element 13 (aluminum), and Sovereign (basswood)."
    },
    {
      question: "How long is the warranty period?",
      answer: "All our shutters come with a comprehensive warranty covering materials and workmanship. The warrenty period differs per product."
    },
    {
      question: "Do you offer custom sizes?",
      answer: "Yes, all our shutters are custom-made to your exact specifications."
    },
    {
      question: "What is the lead time for orders?",
      answer: "Typical lead times are 8-12 weeks, depending on the material and complexity of the order."
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden relative">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQModal;