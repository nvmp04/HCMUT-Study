/**
 * Mesh Gradient - Blended gradient from multiple colors at corners
 * Creates a dreamy, hopeful atmosphere
 */
export default function MeshGradient({ opacity = 0.08 }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Top Left - Blue to Purple */}
      <div
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
          opacity,
        }}
      />
      {/* Top Right - Teal to Blue */}
      <div
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(34, 197, 235, 0.3) 0%, transparent 70%)',
          opacity,
        }}
      />
      {/* Bottom Left - Purple to Pink */}
      <div
        className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 70%)',
          opacity,
        }}
      />
      {/* Bottom Right - Blue to Indigo */}
      <div
        className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(79, 70, 229, 0.2) 0%, transparent 70%)',
          opacity,
        }}
      />
      {/* Center - Soft glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(147, 197, 253, 0.1) 0%, transparent 70%)',
          opacity,
        }}
      />
    </div>
  );
}
