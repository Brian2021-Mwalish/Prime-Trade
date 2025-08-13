import React from 'react';

interface DisclaimerModalProps {
  isOpen: boolean;
  onAccept: () => void;
}

const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ isOpen, onAccept }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-red-800 rounded-lg max-w-2xl w-full p-6 shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-4">Risk Disclaimer</h2>
        <div className="prose prose-invert">
          <p className="text-gray-300 mb-4">
            The products offered on Deriv website are complex derivative products that carry a significant risk of potential loss. CFDs are complex instruments with a high risk of losing money rapidly due to leverage. You should consider whether you understand how these products work and whether you can afford to take the high risk of losing your money.
          </p>
        </div>
        <button
          onClick={onAccept}
          className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
        >
          I Understand and Accept the Risks
        </button>
      </div>
    </div>
  );
};

export default DisclaimerModal;