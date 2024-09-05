import React from 'react';
import { CheckmarkOutline } from '@carbon/icons-react';

interface PopupProps {
  heading: string;
  subHeading: string;
  buttonText: string;
  onButtonClick: () => void;
}

const Popup: React.FC<PopupProps> = ({ heading, subHeading, buttonText, onButtonClick }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <div className="flex flex-col items-center mt-4">
          <CheckmarkOutline className="text-green-500 w-16 h-16" />
          <h2 className="text-2xl font-bold text-gray-800 mt-4">{heading}</h2>
        </div>
        <p className="text-gray-600 mt-2 text-center">{subHeading}</p>
        <div className="flex justify-center mt-6">
          <button
            onClick={onButtonClick}
            className="bg-black text-white font-semibold py-2 px-4 rounded w-48"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
