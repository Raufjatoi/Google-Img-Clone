import React, { useEffect, useRef } from 'react';

interface GenerationAnimationProps {
  isLoading: boolean;
}

const GenerationAnimation: React.FC<GenerationAnimationProps> = ({ isLoading }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create soft glowing squares
    const squares = Array.from({ length: 10 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 100 + Math.random() * 50,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      angle: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.01,
      baseAlpha: 0.04 + Math.random() * 0.05,
      hue: 220 + Math.random() * 30  // blue tones
    }));

    const animate = () => {
      if (!isLoading) {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      squares.forEach(square => {
        square.x += square.dx;
        square.y += square.dy;
        square.angle += square.rotationSpeed;

        if (square.x < -square.size) square.x = canvas.width + square.size;
        if (square.x > canvas.width + square.size) square.x = -square.size;
        if (square.y < -square.size) square.y = canvas.height + square.size;
        if (square.y > canvas.height + square.size) square.y = -square.size;

        ctx.save();
        ctx.translate(square.x, square.y);
        ctx.rotate(square.angle);

        const gradient = ctx.createLinearGradient(
          -square.size / 2, -square.size / 2,
          square.size / 2, square.size / 2
        );
        gradient.addColorStop(0, `hsla(${square.hue}, 100%, 70%, ${square.baseAlpha})`);
        gradient.addColorStop(1, `hsla(${square.hue}, 100%, 70%, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        const radius = 20;
        // Rounded square path
        ctx.moveTo(-square.size / 2 + radius, -square.size / 2);
        ctx.lineTo(square.size / 2 - radius, -square.size / 2);
        ctx.quadraticCurveTo(square.size / 2, -square.size / 2, square.size / 2, -square.size / 2 + radius);
        ctx.lineTo(square.size / 2, square.size / 2 - radius);
        ctx.quadraticCurveTo(square.size / 2, square.size / 2, square.size / 2 - radius, square.size / 2);
        ctx.lineTo(-square.size / 2 + radius, square.size / 2);
        ctx.quadraticCurveTo(-square.size / 2, square.size / 2, -square.size / 2, square.size / 2 - radius);
        ctx.lineTo(-square.size / 2, -square.size / 2 + radius);
        ctx.quadraticCurveTo(-square.size / 2, -square.size / 2, -square.size / 2 + radius, -square.size / 2);
        ctx.closePath();

        ctx.fill();
        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    if (isLoading) {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isLoading]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
      style={{ opacity: isLoading ? 1 : 0, transition: 'opacity 0.3s ease' }}
    />
  );
};

export default GenerationAnimation;
