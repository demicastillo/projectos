// Composición propia inspirada en el gesto del logo (no es un redibujo del logo).
// Negro = color de texto (se adapta al tema), rojo y dorado de marca.

type Props = { className?: string; animate?: boolean; variant?: "hero" | "band" | "corner" };

export function BrandCurves({ className, animate = false, variant = "hero" }: Props) {
  const draw = animate ? "curve curve--draw" : "curve";
  if (variant === "band") {
    return (
      <svg viewBox="0 0 520 300" className={className} aria-hidden="true" focusable="false">
        <path className="curve" d="M20 290 C 120 170, 300 90, 510 60" stroke="#A11312" strokeWidth="16" />
        <path className="curve" d="M90 300 C 190 200, 340 130, 520 110" stroke="#EABF34" strokeWidth="16" />
      </svg>
    );
  }
  if (variant === "corner") {
    return (
      <svg viewBox="0 0 400 300" className={className} aria-hidden="true" focusable="false">
        <path className="curve" d="M30 250 C 90 130, 220 60, 390 40" stroke="var(--text)" strokeWidth="10" />
        <path className="curve" d="M70 280 C 140 170, 260 100, 400 80" stroke="#A11312" strokeWidth="12" />
        <path className="curve" d="M120 300 C 190 210, 290 150, 400 124" stroke="#EABF34" strokeWidth="12" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 500 500" className={className} aria-hidden="true" focusable="false">
      <path className={draw} style={{ ["--len" as string]: 520 }} d="M62 318 C 58 180, 170 72, 318 70" stroke="var(--text)" strokeWidth="14" />
      <path className={draw} style={{ ["--len" as string]: 560 }} d="M84 372 C 118 236, 262 124, 452 102" stroke="var(--text)" strokeWidth="12" />
      <path className={draw} style={{ ["--len" as string]: 620 }} d="M126 424 C 170 276, 318 158, 478 118" stroke="#A11312" strokeWidth="18" />
      <path
        className={draw}
        style={{ ["--len" as string]: 1000 }}
        d="M486 128 C 342 176, 212 318, 214 404 C 216 464, 282 474, 340 440 C 396 406, 418 330, 396 268"
        stroke="#EABF34"
        strokeWidth="20"
      />
    </svg>
  );
}
