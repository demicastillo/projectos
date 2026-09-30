// Logo original (recortado y escalado, sin alterar colores ni forma).
// Proporción del logo recortado: 1445 × 1128.
type Props = { width: number; priority?: boolean; className?: string };

export function Logo({ width, priority = false, className }: Props) {
  const height = Math.round((width * 1128) / 1445);
  return (
    <picture>
      <source type="image/webp" srcSet="/img/startes-logo-240.webp 240w, /img/startes-logo-480.webp 480w" sizes={`${width}px`} />
      <img
        src="/img/startes-logo-240.png"
        srcSet="/img/startes-logo-240.png 240w, /img/startes-logo-480.png 480w"
        sizes={`${width}px`}
        width={width}
        height={height}
        alt="StartEs"
        className={className}
        decoding="async"
        fetchPriority={priority ? "high" : undefined}
        loading={priority ? "eager" : "lazy"}
      />
    </picture>
  );
}
