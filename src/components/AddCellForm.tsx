import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface AddCellFormProps {
  onAdd: (name: string, backgroundColor: string, textColor: string) => void;
}

export const AddCellForm: React.FC<AddCellFormProps> = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#000000');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    onAdd(name, backgroundColor, textColor);
    setName('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 items-end">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Hat İsmi</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Yeni hat ismi"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Kutu Rengi</label>
        <input
          type="color"
          value={backgroundColor}
          onChange={(e) => setBackgroundColor(e.target.value)}
          className="w-20 h-9 rounded cursor-pointer"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Yazı Rengi</label>
        <input
          type="color"
          value={textColor}
          onChange={(e) => setTextColor(e.target.value)}
          className="w-20 h-9 rounded cursor-pointer"
        />
      </div>

      <button
        type="submit"
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors h-[38px]"
      >
        <Plus size={20} />
        Hat Ekle
      </button>
    </form>
  );
};