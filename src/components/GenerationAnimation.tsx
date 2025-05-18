import React, { useEffect, useRef } from 'react';

interface GenerationAnimationProps {
  isLoading: boolean;
}

const GenerationAnimation: React.FC<GenerationAnimationProps> = ({ isLoading }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!isLoading || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size to match window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Animation parameters
    const squares = [];
    const numSquares = 20;
    const colors = ['#6366f1', '#8b5cf6', '#d946ef'];
    
    // Create initial squares
    for (let i = 0; i < numSquares; i++) {
      squares.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 30 + 10,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.3 + 0.1
      });
    }
    
    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      squares.forEach(square => {
        // Update position
        square.x += square.speedX;
        square.y += square.speedY;
        
        // Bounce off edges
        if (square.x <= 0 || square.x >= canvas.width - square.size) {
          square.speedX *= -1;
        }
        if (square.y <= 0 || square.y >= canvas.height - square.size) {
          square.speedY *= -1;
        }
        
        // Draw square
        ctx.fillStyle = square.color;
        ctx.globalAlpha = square.opacity;
        ctx.fillRect(square.x, square.y, square.size, square.size);
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isLoading]);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: isLoading ? 0.3 : 0, transition: 'opacity 0.5s ease' }}
    />
  );
};

export default GenerationAnimation;

