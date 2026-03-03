import { useEffect, useRef } from "react";

export default function AnimatedBackground({ darkMode }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Resize canvas dynamically
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create dots with slower motion
    const dots = [];
    const numDots = 100;
    for (let i = 0; i < numDots; i++) {
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.2, // slower motion
        vy: (Math.random() - 0.5) * 0.2,
      });
    }

    const mouse = { x: null, y: null };
    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    window.addEventListener("mouseleave", () => {
      mouse.x = null;
      mouse.y = null;
    });

    function draw() {
      // Background based on dark mode
      ctx.fillStyle = darkMode ? "#000000" : "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Dot color
      const dotColor = darkMode
        ? "rgba(0, 150, 255, 0.8)"
        : "rgba(0, 100, 255, 0.8)";

      dots.forEach((dot) => {
        // Move dots slowly
        dot.x += dot.vx;
        dot.y += dot.vy;

        // Bounce off edges
        if (dot.x < 0 || dot.x > canvas.width) dot.vx *= -1;
        if (dot.y < 0 || dot.y > canvas.height) dot.vy *= -1;

        // Draw dot
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
        ctx.fillStyle = dotColor;
        ctx.fill();

        // Connect nearby dots
        dots.forEach((other) => {
          const dx = dot.x - other.x;
          const dy = dot.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.strokeStyle = darkMode
              ? `rgba(0, 150, 255, ${1 - dist / 120})`
              : `rgba(0, 100, 255, ${1 - dist / 120})`;
            ctx.lineWidth = 0.4;
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        });

        // 🧲 Mouse repel interaction
        if (mouse.x && mouse.y) {
          const dx = dot.x - mouse.x;
          const dy = dot.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const force = Math.max(0, 150 - dist);
          if (force > 0) {
            const angle = Math.atan2(dy, dx);
            dot.vx += Math.cos(angle) * (force / 1200);
            dot.vy += Math.sin(angle) * (force / 1200);
          }
        }
      });

      requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [darkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 transition-colors duration-700"
    />
  );
}
