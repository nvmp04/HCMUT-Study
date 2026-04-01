/**
 * Subtle Grid Pattern Overlay
 * Creates a light grid effect for technical aesthetic
 */
export default function GridPattern({ opacity = 0.05, size = 40 }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(0deg, transparent 24%, rgba(79, 70, 229, ${opacity}) 25%, rgba(79, 70, 229, ${opacity}) 26%, transparent 27%, transparent 74%, rgba(79, 70, 229, ${opacity}) 75%, rgba(79, 70, 229, ${opacity}) 76%, transparent 77%, transparent),
          linear-gradient(90deg, transparent 24%, rgba(79, 70, 229, ${opacity}) 25%, rgba(79, 70, 229, ${opacity}) 26%, transparent 27%, transparent 74%, rgba(79, 70, 229, ${opacity}) 75%, rgba(79, 70, 229, ${opacity}) 76%, transparent 77%, transparent)
        `,
        backgroundSize: `${size}px ${size}px`,
      }}
    />
  );
}
