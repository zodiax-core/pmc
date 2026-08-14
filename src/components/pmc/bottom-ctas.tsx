import { Play, Smartphone } from "lucide-react";
import bankAlfalah from "@/assets/partners-logos/bank-alfalah-logo.png";
import cda from "@/assets/partners-logos/cda-logo.png";
import faysalBank from "@/assets/partners-logos/faysal-bank-logo.png";
import habibMetro from "@/assets/partners-logos/Habib-motors.png";
import lda from "@/assets/partners-logos/Lda-logo.png";
import meezanBank from "@/assets/partners-logos/meezan-bank-logo.png";
import plra from "@/assets/partners-logos/plra-logo.png";
import ubl from "@/assets/partners-logos/ubl-logo.svg";

export function AppCta() {
  return (
    <section id="get-app" className="mx-auto max-w-[1240px] scroll-mt-24 px-4 py-20 sm:px-6">
      <div className="grid gap-6 rounded-[28px] bg-ink p-6 text-background sm:p-9 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div>
          <span className="label-eyebrow text-background/55">PMC app</span>
          <h2 className="mt-3 max-w-[18ch] text-[clamp(1.8rem,3.2vw,2.5rem)] leading-[1.04] font-semibold text-background">
            Get the PMC app from Google Play.
          </h2>
          <p className="mt-3 max-w-[44ch] text-[14px] leading-relaxed text-background/60">
            Inspections on the go, saved searches, rent reminders and 3D tours — take the entire
            property record with you.
          </p>
        </div>

        <div className="flex flex-col items-start gap-3 lg:items-end">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="morph-fast group flex items-center gap-3 rounded-[16px] bg-background px-5 py-3 text-ink shadow-lift hover:bg-brand hover:text-brand-foreground"
          >
            <Play className="h-6 w-6 fill-current" strokeWidth={0} />
            <span className="text-left">
              <span className="block text-[9.5px] font-semibold uppercase tracking-[0.18em] text-ink-soft group-hover:text-brand-foreground/70">
                Get it on
              </span>
              <span className="block text-[16px] font-semibold leading-tight">Google Play</span>
            </span>
          </a>
          <span className="flex items-center gap-1.5 text-[11.5px] text-background/50">
            <Smartphone className="h-3.5 w-3.5" strokeWidth={2} />
            Coming soon to the App Store
          </span>
        </div>
      </div>
    </section>
  );
}

const PARTNERS = [
  { name: "Meezan Bank", logo: meezanBank },
  { name: "UBL", logo: ubl },
  { name: "Bank Alfalah", logo: bankAlfalah },
  { name: "Faysal Bank", logo: faysalBank },
  { name: "Habib Metro", logo: habibMetro },
  { name: "Punjab Land Records", logo: plra },
  { name: "LDA", logo: lda },
  { name: "CDA", logo: cda },
] as const;

export function Partners() {
  return (
    <section id="partners" className="mx-auto max-w-[1240px] scroll-mt-24 px-4 pb-20 sm:px-6">
      <div className="rounded-[26px] bg-sand/70 p-6 sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <span className="label-eyebrow">Our partners</span>
            <h2 className="mt-2 text-[clamp(1.5rem,2.6vw,2rem)] font-semibold text-ink">
              Trusted by Pakistan's leading institutions.
            </h2>
          </div>
          <span className="meta">Banks · land records · civic authorities</span>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2.5">
          {PARTNERS.map((p) => (
            <span
              key={p.name}
              title={p.name}
              className="morph-fast flex h-14 items-center rounded-[14px] bg-surface-raised px-4 shadow-soft hover:shadow-lift"
            >
              <img
                src={p.logo}
                alt={p.name}
                className="max-h-7 w-auto max-w-[120px] object-contain"
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
