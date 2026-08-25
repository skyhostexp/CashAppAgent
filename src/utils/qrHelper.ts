/**
 * Deterministic SVG QR-like visual pattern generator for crypto payment addresses.
 * Provides a crisp, high-contrast, authentic QR-code visual for each cryptocurrency.
 */
export function generateCryptoQrSvg(address: string, size = 180): string {
  // Simple deterministic visual matrix based on address character codes
  const matrixSize = 25; // 25x25 grid
  const cellSize = size / matrixSize;
  const rects: string[] = [];

  // Corner Position Markers (Standard QR Finder Patterns)
  const drawFinderPattern = (startX: number, startY: number) => {
    // 7x7 outer square
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4)) {
          const x = (startX + c) * cellSize;
          const y = (startY + r) * cellSize;
          rects.push(`<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="#000" />`);
        }
      }
    }
  };

  drawFinderPattern(0, 0); // Top-left
  drawFinderPattern(matrixSize - 7, 0); // Top-right
  drawFinderPattern(0, matrixSize - 7); // Bottom-left

  // Deterministic data cells using address char codes
  let charIdx = 0;
  for (let r = 0; r < matrixSize; r++) {
    for (let c = 0; c < matrixSize; c++) {
      // Skip finder patterns
      if (
        (r < 8 && c < 8) ||
        (r < 8 && c >= matrixSize - 8) ||
        (r >= matrixSize - 8 && c < 8)
      ) {
        continue;
      }

      const charCode = address.charCodeAt(charIdx % address.length);
      charIdx++;
      
      // Hash formula for balanced black/white distribution
      const isFilled = ((charCode * (r + 1) + c * 31) % 7) < 3.8;
      if (isFilled) {
        const x = c * cellSize;
        const y = r * cellSize;
        rects.push(`<rect x="${x}" y="${y}" width="${cellSize - 0.2}" height="${cellSize - 0.2}" rx="1" fill="#000" />`);
      }
    }
  }

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" class="rounded-lg bg-white p-2 shadow-inner">
      <rect width="${size}" height="${size}" fill="#FFFFFF" />
      ${rects.join('')}
    </svg>
  `;
}
