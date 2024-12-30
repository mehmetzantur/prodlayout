import React, { useState, useEffect, useRef } from 'react';
import GridLayout from 'react-grid-layout';
import html2canvas from 'html2canvas';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './grid-styles.css';
import { ProductionCell } from './components/ProductionCell';
import { AddCellForm } from './components/AddCellForm';
import { ColorSettings } from './components/ColorSettings';
import type { ProductionCell as ProductionCellType } from './types/ProductionCell';
import { Save, Download, Upload, Camera, Trash } from 'lucide-react';
import { saveLayout, loadLayout, exportToJson, importFromJson, clearLayout } from './utils/storage';

function App() {
  const [cells, setCells] = useState<ProductionCellType[]>([]);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [borderColor, setBorderColor] = useState('#93c5fd');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedLayout = loadLayout();
    if (savedLayout) {
      setCells(savedLayout);
    }
  }, []);

  const handleLayoutChange = (layout: any[]) => {
    setCells(prevCells => {
      return prevCells.map(cell => {
        const layoutItem = layout.find(item => item.i === cell.id);
        // Kilitli hücrelerin pozisyonunu koruyoruz
        if (cell.isLocked) return cell;
        if (layoutItem) {
          return {
            ...cell,
            x: layoutItem.x,
            y: layoutItem.y,
            w: layoutItem.w,
            h: layoutItem.h,
          };
        }
        return cell;
      });
    });
  };

  const handleTextRotate = (id: string) => {
    setCells(prevCells => 
      prevCells.map(cell => 
        cell.id === id 
          ? { ...cell, textRotation: (cell.textRotation + 90) % 360 }
          : cell
      )
    );
  };

  const handleToggleLock = (id: string) => {
    setCells(prevCells =>
      prevCells.map(cell =>
        cell.id === id
          ? { ...cell, isLocked: !cell.isLocked }
          : cell
      )
    );
  };

  const handleDelete = (id: string) => {
    setCells(prevCells => prevCells.filter(cell => cell.id !== id));
  };

  const handleSave = () => {
    saveLayout(cells);
    alert('Düzen kaydedildi!');
  };

  const handleClear = () => {
    if (window.confirm('Tüm düzen silinecek. Emin misiniz?')) {
      clearLayout();
      setCells([]);
      alert('Düzen temizlendi!');
    }
  };

  const handleExport = () => {
    const jsonString = exportToJson(cells);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'uretim-hatti-duzeni.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonString = e.target?.result as string;
        const importedCells = importFromJson(jsonString);
        setCells(importedCells);
        alert('Düzen başarıyla içe aktarıldı!');
      } catch (error) {
        alert('Dosya içe aktarılırken bir hata oluştu!');
      }
    };
    reader.readAsText(file);
  };

  const handleSaveAsPng = async () => {
    if (!gridRef.current) return;

    try {
      document.documentElement.classList.add('print-mode');

      const canvas = await html2canvas(gridRef.current, {
        backgroundColor: backgroundColor,
        scale: 2,
        removeContainer: true,
        ignoreElements: (element) => {
          return element.classList.contains('no-print');
        }
      });

      document.documentElement.classList.remove('print-mode');

      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = 'uretim-hatti-duzeni.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('PNG kaydetme hatası:', error);
      alert('PNG olarak kaydederken bir hata oluştu!');
    }
  };

  const addNewCell = (name: string, backgroundColor: string, textColor: string) => {
    const newCell: ProductionCellType = {
      id: Date.now().toString(),
      name,
      x: 0,
      y: Math.max(...cells.map(c => c.y + c.h), 0),
      w: 10,
      h: 10,
      rotation: 0,
      textRotation: 0,
      backgroundColor,
      textColor,
      isLocked: false,
    };

    setCells(prevCells => [...prevCells, newCell]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Wagner Layout Designer</h1>
          <div className="flex gap-4">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <Save size={20} />
              Kaydet
            </button>
            <button
              onClick={handleClear}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <Trash size={20} />
              Temizle
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Download size={20} />
              Json İndir
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              <Upload size={20} />
              JSON Yükle
            </button>
            <button
              onClick={handleSaveAsPng}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <Camera size={20} />
              PNG Olarak Kaydet
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </div>
        </div>
        
        <div className="space-y-4 mb-8">
          <AddCellForm onAdd={addNewCell} />
          <ColorSettings
            backgroundColor={backgroundColor}
            borderColor={borderColor}
            onBackgroundColorChange={setBackgroundColor}
            onBorderColorChange={setBorderColor}
          />
        </div>

        <div 
          ref={gridRef} 
          className="rounded-xl shadow-lg"
          style={{ backgroundColor }}
        >
          <GridLayout
            className="layout"
            layout={cells.map(cell => ({
              i: cell.id,
              x: cell.x,
              y: cell.y,
              w: cell.w,
              h: cell.h,
              isDraggable: !cell.isLocked,
              isResizable: !cell.isLocked,
            }))}
            cols={96}
            rowHeight={15}
            width={1200}
            margin={[1, 1]}
            containerPadding={[1, 1]}
            onLayoutChange={handleLayoutChange}
            isDraggable={true}
            isResizable={true}
            preventCollision={false}
            compactType={null}
            isBounded={false}
          >
            {cells.map(cell => (
              <div key={cell.id}>
                <ProductionCell 
                  cell={cell}
                  onDelete={handleDelete}
                  onTextRotate={handleTextRotate}
                  onToggleLock={handleToggleLock}
                  borderColor={borderColor}
                />
              </div>
            ))}
          </GridLayout>
        </div>
      </div>
    </div>
  );
}

export default App;