import { useEffect, useRef } from 'react';

interface ColorBendsProps {
  colors?: string[];
  rotation?: number;
  speed?: number;
  scale?: number;
  frequency?: number;
  warpStrength?: number;
  mouseInfluence?: number;
  parallax?: number;
  noise?: number;
  transparent?: boolean;
}

export default function ColorBends({
  colors = ['#ff5c7a', '#8a5cff', '#00ffd1'],
  rotation = 30,
  speed = 0.3,
  scale = 1.2,
  frequency = 1.4,
  warpStrength = 1.2,
  mouseInfluence = 0.8,
  parallax = 0.6,
  noise = 0.08,
  transparent = false,
}: ColorBendsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0.5, y: 0.5 });
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      time += speed * 0.01;

      const gradient = ctx.createLinearGradient(
        0,
        0,
        rect.width * Math.cos((rotation * Math.PI) / 180),
        rect.height * Math.sin((rotation * Math.PI) / 180)
      );

      colors.forEach((color, index) => {
        const offset = (index / (colors.length - 1)) + Math.sin(time + index * frequency) * 0.2;
        gradient.addColorStop(Math.max(0, Math.min(1, offset)), color);
      });

      ctx.fillStyle = gradient;

      const waveX = Math.sin(time * warpStrength) * 50 * scale;
      const waveY = Math.cos(time * warpStrength * 0.8) * 50 * scale;

      const mouseOffsetX = (mousePos.current.x - 0.5) * mouseInfluence * 100;
      const mouseOffsetY = (mousePos.current.y - 0.5) * mouseInfluence * 100;

      ctx.save();
      ctx.translate(
        rect.width / 2 + waveX + mouseOffsetX * parallax,
        rect.height / 2 + waveY + mouseOffsetY * parallax
      );
      ctx.scale(scale, scale);
      ctx.rotate(time * 0.5);

      const baseRadius = Math.max(rect.width, rect.height) * 0.8;
      const noiseAmount = noise * 50;

      ctx.beginPath();
      for (let i = 0; i <= 360; i += 5) {
        const angle = (i * Math.PI) / 180;
        const radiusNoise = Math.sin(time * 2 + i * 0.1) * noiseAmount;
        const radius = baseRadius + radiusNoise;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.fill();

      ctx.restore();

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [colors, rotation, speed, scale, frequency, warpStrength, mouseInfluence, parallax, noise]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{
        opacity: transparent ? 0.6 : 1,
        mixBlendMode: transparent ? 'screen' : 'normal',
      }}
    />
  );
}
