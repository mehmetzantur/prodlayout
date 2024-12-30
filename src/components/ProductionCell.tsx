import React from 'react';
import type { ProductionCell as ProductionCellType } from '../types/ProductionCell';
import { Type, Trash2, Lock, Unlock } from 'lucide-react';

interface Props {
  cell: ProductionCellType;
  onDelete: (id: string) => void;
  onTextRotate: (id: string) => void;
  onToggleLock: (id: string) => void;
  borderColor: string;
}

export const ProductionCell: React.FC<Props> = ({ 
  cell, 
  onDelete, 
  onTextRotate,
  onToggleLock,
  borderColor 
}) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(cell.id);
  };

  const handleTextRotate = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onTextRotate(cell.id);
  };

  const handleToggleLock = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleLock(cell.id);
  };

  return (
    <div 
      className="h-full w-full rounded-lg shadow-lg relative print:border-0"
      style={{ 
        backgroundColor: cell.backgroundColor,
        border: `2px solid ${borderColor}`,
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <h3 
          className="text-lg font-semibold text-center transition-transform duration-300"
          style={{ 
            color: cell.textColor,
            transform: `rotate(${cell.textRotation}deg)`
          }}
        >
          {cell.name}
        </h3>
      </div>

      <div className="absolute top-2 right-2 flex gap-2 no-print">
        <button 
          onClick={handleToggleLock}
          onMouseDown={(e) => e.stopPropagation()}
          className="p-1 rounded-full bg-white hover:bg-gray-100 transition-colors shadow-sm"
          title={cell.isLocked ? "Kilidi aç" : "Kilitle"}
        >
          {cell.isLocked ? <Lock size={20} className="text-blue-500" /> : <Unlock size={20} />}
        </button>
        <button 
          onClick={handleTextRotate}
          onMouseDown={(e) => e.stopPropagation()}
          className="p-1 rounded-full bg-white hover:bg-gray-100 transition-colors shadow-sm"
          title="Metni döndür"
        >
          <Type size={20} />
        </button>
        <button 
          onClick={handleDelete}
          onMouseDown={(e) => e.stopPropagation()}
          className="p-1 rounded-full bg-white hover:bg-red-100 transition-colors shadow-sm"
          title="Sil"
        >
          <Trash2 size={20} className="text-red-500" />
        </button>
      </div>
    </div>
  );
};