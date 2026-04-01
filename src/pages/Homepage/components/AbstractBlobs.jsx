import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Interactive Abstract Blobs with parallax effect
 * Moves based on mouse position
 */
export default function AbstractBlobs({ className = '', count = 3, opacity = 0.15 }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20,
        y: (e.clientY / window.innerHeight) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const blobs = Array.from({ length: count }).map((_, i) => ({
    id: i,
    size: Math.random() * 300 + 150,
    top: Math.random() * 60 - 20,
    left: Math.random() * 100 - 20,
    duration: Math.random() * 20 + 20,
    delay: i * 2,
  }));

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {blobs.map((blob) => (
        <motion.div
          key={blob.id}
          animate={{
            x: mousePosition.x,
            y: mousePosition.y,
          }}
          transition={{ type: 'spring', stiffness: 30, damping: 20 }}
          className="absolute"
          style={{
            top: `${blob.top}%`,
            left: `${blob.left}%`,
            width: blob.size,
            height: blob.size,
          }}
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: blob.duration,
              repeat: Infinity,
              delay: blob.delay,
            }}
            className="w-full h-full rounded-full bg-gradient-to-br from-primary-200 to-blue-200 blur-3xl"
            style={{ opacity }}
          />
        </motion.div>
      ))}
    </div>
  );
}
