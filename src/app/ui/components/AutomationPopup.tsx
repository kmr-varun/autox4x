import React, { useState } from 'react';

interface AutomationPopUpProps {
  onSave: (option: any) => void;
  onDiscard: () => void;
}

const AutomationPopup: React.FC<AutomationPopUpProps> = ({ onSave, onDiscard }) => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleSave = () => {
    onSave({name: name, desc: description});
  };

  const handleDiscard = () => {
    setName('');
    setDescription('');
    onDiscard();
  };

  return (
    <div className="p-4 bg-white rounded-lg max-w-lg mx-auto">
      <h2 className="text-2xl text-center font-semibold text-black m-4">Automation Settings</h2>
      <div className='m-10'>
        
        <div className="mb-4">
          <label className="block text-black mb-2" htmlFor="name">
            Name*
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border text-black border-black rounded-md focus:outline-none"
            placeholder="Name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-black mb-2" htmlFor="description">
            Description
          </label>
          <input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border text-black border-black rounded-md focus:outline-none"
            placeholder="Type..."
          />
        </div>
        <div className="flex justify-end my-8 space-x-4">
          <button
            className="text-black border border-black w-1/2 px-4 py-2 rounded-md "
            onClick={handleDiscard}
          >
            Discard
          </button>
          <button
            className="bg-black text-white w-1/2 px-4 py-2 rounded-md"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AutomationPopup;
