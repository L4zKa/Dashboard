export interface DisplayBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface DisplaySize {
  width: number;
  height: number;
}

export interface Display {
  id: number;
  internal: boolean;
  detected: boolean;
  label: string;
  displayFrequency: number;
  rotation: number;
  scaleFactor: number;
  monochrome: boolean;
  colorDepth: number;
  depthPerComponent: number;
  accelerometerSupport: "available" | "unavailable" | "unknown";
  touchSupport: "available" | "unavailable" | "unknown";
  colorSpace: {
    primaries: string;
    transfer: string;
    matrix: string;
    range: string;
  };
  bounds: DisplayBounds;
  workArea: DisplayBounds;
  size: DisplaySize;
  workAreaSize: DisplaySize;
  maximumCursorSize: DisplaySize;
  nativeOrigin: { x: number; y: number };
  idVendor?: number;
  idProduct?: number;
}
export interface DisplayInfoMessage {
  index: number;
  allDisplays: Display[];
  currentDisplay: Display;
}
