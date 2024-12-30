import React from 'react';
import { Palette } from 'lucide-react';

interface ColorSettingsProps {
  backgroundColor: string;
  borderColor: string;
  onBackgroundColorChange: (color: string) => void;
  onBorderColorChange: (color: string) => void;
}

export const ColorSettings: React.FC<ColorSettingsProps> = ({
  backgroundColor,
  borderColor,
  onBackgroundColorChange,
  onBorderColorChange,
}) => {
  return (
    <div className="flex items-center gap-6 p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center gap-2">
        <Palette size={20} className="text-gray-600" />
        <span className="font-medium text-gray-700">Düzlem Renkleri:</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="backgroundColor" className="text-sm text-gray-600">
            Arkaplan:
          </label>
          <input
            type="color"
            id="backgroundColor"
            value={backgroundColor}
            onChange={(e) => onBackgroundColorChange(e.target.value)}
            className="w-8 h-8 rounded cursor-pointer"
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="borderColor" className="text-sm text-gray-600">
            Çerçeve:
          </label>
          <input
            type="color"
            id="borderColor"
            value={borderColor}
            onChange={(e) => onBorderColorChange(e.target.value)}
            className="w-8 h-8 rounded cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};