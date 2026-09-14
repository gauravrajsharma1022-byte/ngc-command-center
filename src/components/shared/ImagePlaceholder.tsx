"use client";

import { ImageIcon } from "lucide-react";
import Image from "next/image";

interface ImagePlaceholderProps {
  label?: string;
  hint?: string;          // e.g. "Recommended: 1440×900px, landscape"
  aspectRatio?: string;   // tailwind aspect class e.g. "aspect-video"
  className?: string;
  src?: string;           // if provided, renders a real image
  alt?: string;
  priority?: boolean;
}

export default function ImagePlaceholder({
  label = "Image",
  hint,
  aspectRatio = "aspect-video",
  className = "",
  src,
  alt = "",
  priority = false,
}: ImagePlaceholderProps) {
  if (src) {
    return (
      <div className={`relative overflow-hidden rounded-xl ${aspectRatio} ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    );
  }

  return (
    <div
      className={`
        relative rounded-xl overflow-hidden flex flex-col items-center justify-center
        bg-gradient-to-br from-[#0c1945] to-[#1e3a5f]
        border-2 border-dashed border-[#3d5ad9]/40
        placeholder-shimmer ${aspectRatio} ${className}
      `}
    >
      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(3,105,161,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(3,105,161,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-3 px-6 text-center">
        <div className="w-12 h-12 rounded-xl bg-[#3d5ad9]/20 border border-[#3d5ad9]/30 flex items-center justify-center">
          <ImageIcon size={22} className="text-[#3d5ad9]" />
        </div>
        <div>
          <p className="font-heading font-semibold text-sm text-white/80">{label}</p>
          {hint && (
            <p className="font-body text-xs text-white/40 mt-1 max-w-[220px] leading-relaxed">{hint}</p>
          )}
        </div>
        <div className="mt-1 px-3 py-1 rounded-full bg-[#05aff2]/20 border border-[#05aff2]/30">
          <span className="font-body text-[11px] font-medium text-[#05aff2]">Replace with real image</span>
        </div>
      </div>
    </div>
  );
}
