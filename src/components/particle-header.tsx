"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

export function ParticleHeader() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const overscan = 90;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    let rafId = 0;
    let width = 0;
    let height = 0;
    let visibleWidth = 0;
    let visibleHeight = 0;
    let mouseX = -9999;
    let mouseY = -9999;
    const particles: Particle[] = [];

    const createParticle = (): Particle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 1.4 + 0.6,
    });

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      visibleWidth = canvas.clientWidth;
      visibleHeight = canvas.clientHeight;
      width = visibleWidth + overscan * 2;
      height = visibleHeight + overscan * 2;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const targetCount = Math.max(78, Math.floor(width / 15));
      particles.length = 0;
      for (let i = 0; i < targetCount; i += 1) {
        particles.push(createParticle());
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = event.clientX - rect.left + overscan;
      mouseY = event.clientY - rect.top + overscan;
    };

    const handleMouseLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(148, 163, 184, 0.56)";
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 112) {
            const alpha = (1 - dist / 112) * 0.36;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(148, 163, 184, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      if (mouseX > -1000 && mouseY > -1000) {
        for (const p of particles) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 132) {
            const alpha = (1 - dist / 132) * 0.42;
            ctx.beginPath();
            ctx.moveTo(mouseX, mouseY);
            ctx.lineTo(p.x, p.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      rafId = window.requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <header id="top" className="relative z-0 avoid-cls">
      <div className="relative overflow-hidden avoid-cls particle-mask-fade" style={{ height: "300px" }}>
        <div className="overflow-hidden relative avoid-cls" style={{ height: "100%" }}>
          <div className="h-full w-full overflow-hidden" id="tsparticles">
            <canvas
              ref={canvasRef}
              style={{
                position: "absolute",
                left: `-${overscan}px`,
                top: `-${overscan}px`,
                width: `calc(100% + ${overscan * 2}px)`,
                height: `calc(100% + ${overscan * 2}px)`,
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
