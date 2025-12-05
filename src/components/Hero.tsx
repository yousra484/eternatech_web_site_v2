import { useEffect, useRef } from 'react';

export default function Hero() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;
        let mouse = { x: 0, y: 0 };
        
        interface Particle {
            x: number;
            y: number;
            originX: number;
            originY: number;
            vx: number;
            vy: number;
            size: number;
            color: string;
        }
        
        const particles: Particle[] = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        };

        const init = () => {
            particles.length = 0;
            const count = Math.floor((canvas.width * canvas.height) / 8000);
            for (let i = 0; i < count; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                particles.push({
                    x,
                    y,
                    originX: x,
                    originY: y,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                    size: Math.random() * 2 + 0.5,
                    color: Math.random() > 0.5 ? '#3b82f6' : '#8b5cf6',
                });
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p, i) => {
                // Mouse interaction
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const maxDist = 150;
                
                if (dist < maxDist) {
                    const force = (maxDist - dist) / maxDist;
                    p.x -= dx * force * 0.02;
                    p.y -= dy * force * 0.02;
                }

                // Smooth return to origin
                p.x += (p.originX - p.x) * 0.01 + p.vx;
                p.y += (p.originY - p.y) * 0.01 + p.vy;

                // Boundary wrap
                if (p.originX < 0 || p.originX > canvas.width) p.vx *= -1;
                if (p.originY < 0 || p.originY > canvas.height) p.vy *= -1;
                p.originX += p.vx;
                p.originY += p.vy;

                // Draw glow
                const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
                gradient.addColorStop(0, p.color);
                gradient.addColorStop(1, 'transparent');
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();

                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();

                // Draw connections
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx2 = p.x - p2.x;
                    const dy2 = p.y - p2.y;
                    const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
                    
                    if (dist2 < 100) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        const opacity = (1 - dist2 / 100) * 0.5;
                        ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            });

            animationId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        resize();
        animate();
        
        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <section id="accueil" className="min-h-screen flex items-center justify-center pt-20 px-4 relative overflow-hidden bg-darker">
            {/* Animated canvas background */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent opacity-50" />

            <div className="max-w-6xl mx-auto text-center relative z-10 px-4">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 leading-tight tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Innovation Technologique
                    <br />
                    pour un Avenir Durable
                </h1>

                <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-4xl mx-auto leading-relaxed font-light tracking-wide animate-fade-in-delay">
                    Découvrez des solutions technologiques avancées pour <span className="text-white font-medium">transformer votre entreprise</span> et vous propulser vers l'avenir.
                </p>

                <div className="flex flex-col sm:flex-row gap-5 justify-center animate-fade-in-delay-2">
                    <a
                        href="#solutions"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-bold text-lg tracking-wide hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                    >
                        Nos Solutions
                    </a>
                    <a
                        href="#contact"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-10 py-4 bg-white/5 backdrop-blur-sm border-2 border-white/20 text-white rounded-xl font-bold text-lg tracking-wide hover:bg-white/10 hover:border-purple-400 transition-all duration-300 hover:-translate-y-1"
                    >
                        En savoir plus
                    </a>
                </div>
            </div>

            {/* Animated particles background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute w-96 h-96 -top-48 -left-48 bg-primary/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>
        </section>
    );
}
