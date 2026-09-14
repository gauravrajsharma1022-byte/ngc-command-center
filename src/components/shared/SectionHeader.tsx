import { FadeUp } from "./AnimatedText";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;       // white text for dark backgrounds
  className?: string;
  titleClassName?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
  light = false,
  className = "",
  titleClassName = "",
}: SectionHeaderProps) {
  const centerClass = align === "center" ? "text-center items-center" : "items-start";
  const textColor   = light ? "text-white" : "text-[#0c1945]";
  const subColor    = light ? "text-white/60" : "text-[#334155]/70";

  return (
    <div className={`flex flex-col gap-4 ${centerClass} ${className}`}>
      {eyebrow && (
        <FadeUp>
          <span className="inline-flex items-center gap-2 font-body text-xs font-semibold tracking-[0.15em] uppercase text-[#05aff2]">
            {eyebrow}
          </span>
        </FadeUp>
      )}

      <FadeUp delay={0.1}>
        <h2
          className={`font-heading font-bold leading-tight ${textColor} ${titleClassName}`}
          style={{ fontSize: "clamp(1.75rem, 3.5vw, 3rem)" }}
        >
          {title}
        </h2>
      </FadeUp>

      {subtitle && (
        <FadeUp delay={0.2}>
          <p
            className={`font-body leading-relaxed max-w-2xl ${subColor}`}
            style={{ fontSize: "clamp(1rem, 1.5vw, 1.125rem)" }}
          >
            {subtitle}
          </p>
        </FadeUp>
      )}
    </div>
  );
}
