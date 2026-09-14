import Image from "next/image";
import { Arc } from "@/components/shared/Arc";

const PANELS: { img?: string; gradient: string }[] = [
  {
    img: "/images/Far left.jpg",
    gradient: "linear-gradient(150deg,rgba(61,90,217,0.12),rgba(12,25,69,0.22))",
  },
  {
    img: "/images/Left.jpg",
    gradient: "linear-gradient(155deg,rgba(28,61,143,0.12),rgba(10,22,64,0.22))",
  },
  {
    gradient:
      "radial-gradient(90% 80% at 50% 42%,rgba(5,175,242,0.18),transparent 62%),linear-gradient(150deg,rgba(20,58,134,0.38),rgba(10,20,56,0.48))",
  },
  {
    img: "/images/Right.jpg",
    gradient: "linear-gradient(155deg,rgba(28,61,143,0.12),rgba(10,22,64,0.22))",
  },
  {
    img: "/images/Far Right.jpg",
    gradient: "linear-gradient(150deg,rgba(61,90,217,0.12),rgba(12,25,69,0.22))",
  },
];

export default function ProofBand() {
  return (
    <section
      className="relative bg-white pb-[clamp(64px,8vw,150px)] border-0 -mt-px"
    >
      <div className="px-6 pt-[clamp(8px,2vw,28px)] pb-[clamp(34px,4vw,56px)] text-center">
        <div className="mb-[18px] font-mono text-[12.5px] tracking-[0.28em] text-blue">
          SEEN IN THE ROOM
        </div>
        <h2
          className="mx-auto m-0 max-w-[18ch] text-balance font-display font-extrabold leading-[1.04] tracking-[-0.03em] text-navy"
          style={{ fontSize: "clamp(30px,4vw,54px)" }}
        >
          Strategy you can watch take shape.
        </h2>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="grid h-[clamp(280px,42vw,580px)] grid-cols-3 gap-2 lg:grid-cols-[1fr_1.15fr_1.6fr_1.15fr_1fr]">
          {PANELS.map((panel, i) => (
            <div
              key={i}
              className={`relative overflow-hidden shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)] ${
                i === 0 || i === 4 ? "hidden lg:block" : ""
              }`}
            >
              {panel.img && (
                <Image
                  src={panel.img}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                  alt=""
                />
              )}
              {i === 2 && (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="absolute inset-0 h-full w-full object-cover"
                >
                  <source src="/videos/Center.mp4" type="video/mp4" />
                </video>
              )}
              {/* gradient overlay */}
              <div
                className="absolute inset-0"
                style={{ background: panel.gradient }}
              />
            </div>
          ))}
        </div>

        <Arc
          variant="concaveTop"
          fill="#ffffff"
          className="pointer-events-none absolute left-0 top-[-1px] w-full"
        />
        <Arc
          variant="concaveBottom"
          fill="#ffffff"
          className="pointer-events-none absolute bottom-[-1px] left-0 w-full"
        />
      </div>
    </section>
  );
}
