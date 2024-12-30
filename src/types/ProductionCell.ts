export interface ProductionCell {
  id: string;
  name: string;
  x: number;
  y: number;
  w: number;
  h: number;
  rotation: number;
  textRotation: number;
  backgroundColor: string;
  textColor: string;
  isLocked?: boolean;
}