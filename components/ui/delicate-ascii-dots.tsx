'use client';

import { useEffect, useRef, useCallback } from 'react';

interface DelicateAsciiDotsProps {
  backgroundColor?: string;
  textColor?: string;
  gridSize?: number;
  animationSpeed?: number;
  targetCellSize?: number; // Target cell size in pixels for consistent sizing across devices
}

interface Wave {
  x: number;
  y: number;
  frequency: number;
  amplitude: number;
  phase: number;
  speed: number;
}

interface GridCell {
  char: string;
  opacity: number;
}

const DelicateAsciiDots = ({
  backgroundColor = '#0f0f0f',
  textColor = '255, 255, 255',
  gridSize = 60,
  animationSpeed = 0.5,
  targetCellSize,
}: DelicateAsciiDotsProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wavesRef = useRef<Wave[]>([]);
  const timeRef = useRef<number>(0);
  const animationFrameId = useRef<number | null>(null);
  const dimensionsRef = useRef({ width: 0, height: 0 });
  const effectiveGridSizeRef = useRef({ cols: gridSize, rows: gridSize });

  const CHARS =
    '⣧⣩⣪⣫⣬⣭⣮⣯⣱⣲⣳⣴⣵⣶⣷⣹⣺⣻⣼⣽⣾⣿⣧⣩⣪⣫⣬⣭⣮⣯⣱⣲⣳⣴⣵⣶⣷⣹⣺⣻⣼⣽⣾⣿⣧⣩⣪⣫⣬⣭⣮⣯⣱⣲⣳⣴⣵⣶⣷⣹⣺⣻⣼⣽⣾⣿⣧⣩⣪⣫⣬⣭⣮⣯⣱⣲⣳⣴⣵⣶⣷⣹⣺⣻⣼⣽⣾⣿⣧⣩⣪⣫⣬⣭⣮⣯⣱⣲⣳⣴⣵⣶⣷⣹⣺⣻⣼⣽⣾⣿⣧⣩⣪⣫⣬⣭⣮⣯⣱⣲⣳⣴⣵⣶⣷⣹⣺⣻⣼⣽⣾⣿⠁⠂⠄⠈⠐⠠⡀⢀⠃⠅⠘⠨⠊⠋⠌⠍⠎⠏⠑⠒⠓⠔⠕⠖⠗⠙⠚⠛⠜⠝⠞⠟⠡⠢⠣⠤⠥⠦⠧⠩⠪⠫⠬⠭⠮⠯⠱⠲⠳⠴⠵⠶⠷⠹⠺⠻⠼⠽⠾⠿⡁⡂⡃⡄⡅⡆⡇⡉⡊⡋⡌⡍⡎⡏⡑⡒⡓⡔⡕⡖⡗⡙⡚⡛⡜⡝⡞⡟⡡⡢⡣⡤⡥⡦⡧⡩⡪⡫⡬⡭⡮⡯⡱⡲⡳⡴⡵⡶⡷⡹⡺⡻⡼⡽⡾⡿⢁⢂⢃⢄⢅⢆⢇⢉⢊⢋⢌⢍⢎⢏⢑⢒⢓⢔⢕⢖⢗⢙⢚⢛⢜⢝⢞⢟⢡⢢⢣⢤⢥⢦⢧⢩⢪⢫⢬⢭⢮⢯⢱⢲⢳⢴⢵⢶⢷⢹⢺⢻⢼⢽⢾⢿⣀⣁⣂⣃⣄⣅⣆⣇⣉⣊⣋⣌⣍⣎⣏⣑⣒⣓⣔⣕⣖⣗⣙⣚⣛⣜⣝⣞⣟⣡⣢⣣⣤⣥⣦⣧⣩⣪⣫⣬⣭⣮⣯⣱⣲⣳⣴⣵⣶⣷⣹⣺⣻⣼⣽⣾⣿';

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const containerRect = container.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;

    dimensionsRef.current = { width, height };

    // Calculate effective grid size based on targetCellSize for consistent dot sizing
    if (targetCellSize) {
      const cols = Math.max(5, Math.floor(width / targetCellSize));
      const rows = Math.max(5, Math.floor(height / targetCellSize));
      effectiveGridSizeRef.current = { cols, rows };
    } else {
      effectiveGridSizeRef.current = { cols: gridSize, rows: gridSize };
    }

    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
  }, [targetCellSize, gridSize]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    timeRef.current += animationSpeed * 0.016;

    const { width, height } = dimensionsRef.current;
    if (width === 0 || height === 0) return;

    const { cols, rows } = effectiveGridSizeRef.current;

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    const newGrid: (GridCell | null)[][] = Array(rows)
      .fill(0)
      .map(() => Array(cols).fill(null));

    const cellWidth = width / cols;
    const cellHeight = height / rows;

    // Scale factor to adjust wave positions to current grid size
    const scaleX = cols / gridSize;
    const scaleY = rows / gridSize;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        let totalWave = 0;

        wavesRef.current.forEach((wave) => {
          // Scale wave position to match current grid size
          const scaledWaveX = wave.x * scaleX;
          const scaledWaveY = wave.y * scaleY;
          const dx = x - scaledWaveX;
          const dy = y - scaledWaveY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const falloff = 1 / (1 + dist * 0.1);
          const value =
            Math.sin(
              dist * wave.frequency - timeRef.current * wave.speed + wave.phase
            ) *
            wave.amplitude *
            falloff;

          totalWave += value;
        });

        const normalizedWave = (totalWave + 2) / 4;
        if (Math.abs(totalWave) > 0.15) {
          const charIndex = Math.min(
            CHARS.length - 1,
            Math.max(0, Math.floor(normalizedWave * (CHARS.length - 1)))
          );
          const opacity = Math.min(
            0.12,
            Math.max(0.03, 0.03 + normalizedWave * 0.09)
          );

          newGrid[y][x] = {
            char: CHARS[charIndex] || CHARS[0],
            opacity: opacity,
          };
        }
      }
    }

    const fontSize = Math.min(cellWidth, cellHeight) * 0.85;
    ctx.font = `${fontSize}px monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const cell = newGrid[y][x];
        if (cell && cell.char && CHARS.includes(cell.char)) {
          ctx.fillStyle = `rgba(${textColor}, ${cell.opacity})`;
          ctx.fillText(
            cell.char,
            x * cellWidth + cellWidth / 2,
            y * cellHeight + cellHeight / 2
          );
        }
      }
    }

    animationFrameId.current = requestAnimationFrame(animate);
  }, [backgroundColor, textColor, animationSpeed, gridSize]);

  useEffect(() => {
    const waves: Wave[] = [];
    const numWaves = 3;

    for (let i = 0; i < numWaves; i++) {
      waves.push({
        x: gridSize * (0.25 + Math.random() * 0.5),
        y: gridSize * (0.25 + Math.random() * 0.5),
        frequency: 0.15 + Math.random() * 0.2,
        amplitude: 0.4 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.4,
      });
    }

    wavesRef.current = waves;

    const canvas = canvasRef.current;
    if (!canvas) return;

    resizeCanvas();

    window.addEventListener('resize', resizeCanvas);

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);

      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
      timeRef.current = 0;
      wavesRef.current = [];
    };
  }, [animate, resizeCanvas, gridSize]);

  return (
    <div
      ref={containerRef}
      className='absolute inset-0 overflow-hidden pointer-events-none'
      style={{ backgroundColor }}
    >
      <canvas ref={canvasRef} className='block w-full h-full' />
    </div>
  );
};

export default DelicateAsciiDots;
