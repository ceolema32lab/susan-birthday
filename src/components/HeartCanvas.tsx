import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';

export interface HeartCanvasHandle {
    burst: (count: number) => void;
}

const HeartCanvas = forwardRef<HeartCanvasHandle, {}>((_props, ref) => {
    const [hearts, setHearts] = useState<{ id: number; left: string; size: string; duration: string; delay?: string }[]>([]);

    const createHeart = (isBurst = false) => {
        const id = Math.random() + Date.now();
        return {
            id,
            left: Math.random() * 100 + 'vw',
            size: (20 + Math.random() * 30) + 'px',
            duration: (isBurst ? 2 + Math.random() * 2 : 5 + Math.random() * 5) + 's',
            delay: isBurst ? '0s' : '0s'
        };
    };

    useImperativeHandle(ref, () => ({
        burst: (count: number) => {
            const newHearts = Array.from({ length: count }).map(() => createHeart(true));
            setHearts((prev) => [...prev, ...newHearts]);

            setTimeout(() => {
                setHearts((prev) => prev.filter((h) => !newHearts.find(nh => nh.id === h.id)));
            }, 5000);
        }
    }));

    useEffect(() => {
        const interval = setInterval(() => {
            const newHeart = createHeart();
            setHearts((prev) => [...prev, newHeart]);

            setTimeout(() => {
                setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
            }, 10000);
        }, 600);

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'hidden', zIndex: 1 }}>
            {hearts.map((heart) => (
                <div
                    key={heart.id}
                    className="heart"
                    style={{
                        left: heart.left,
                        fontSize: heart.size,
                        animationDuration: heart.duration,
                        animationDelay: heart.delay
                    }}
                >
                    💖
                </div>
            ))}
        </div>
    );
});

export default HeartCanvas;
