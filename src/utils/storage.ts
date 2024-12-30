import { ProductionCell } from '../types/ProductionCell';

const STORAGE_KEY = 'production-cells';

export const saveLayout = (cells: ProductionCell[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cells));
};

export const loadLayout = (): ProductionCell[] | null => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : null;
};

export const clearLayout = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const exportToJson = (cells: ProductionCell[]): string => {
  return JSON.stringify(cells, null, 2);
};

export const importFromJson = (jsonString: string): ProductionCell[] => {
  try {
    const data = JSON.parse(jsonString);
    if (!Array.isArray(data)) {
      throw new Error('Geçersiz veri formatı');
    }
    return data;
  } catch (error) {
    throw new Error('JSON verisi ayrıştırılamadı');
  }
};