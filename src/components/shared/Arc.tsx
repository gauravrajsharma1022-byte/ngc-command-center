type ArcVariant = "hero" | "concaveTop" | "concaveBottom";

const PATHS: Record<ArcVariant, { d: string; viewBox: string }> = {
  hero:          { d: "M0,120 L0,40 C460,128 980,128 1440,40 L1440,120 Z",           viewBox: "0 0 1440 120" },
  concaveTop:    { d: "M0,0 L1440,0 L1440,5 C980,128 460,128 0,5 Z",                  viewBox: "0 0 1440 110" },
  concaveBottom: { d: "M0,110 L1440,110 L1440,105 C980,-18 460,-18 0,105 Z",          viewBox: "0 0 1440 110" },
};

export function Arc({
  variant,
  fill = "#ffffff",
  className,
  heightClass = "h-[clamp(56px,7vw,118px)]",
}: {
  variant: ArcVariant;
  fill?: string;
  className?: string;
  heightClass?: string;
}) {
  const { d, viewBox } = PATHS[variant];
  return (
    <div className={`leading-[0] ${className ?? ""}`}>
      <svg viewBox={viewBox} preserveAspectRatio="none" className={`block w-full ${heightClass}`}>
        <path d={d} fill={fill} />
      </svg>
    </div>
  );
}
