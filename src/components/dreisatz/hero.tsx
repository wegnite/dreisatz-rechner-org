import { Calculator } from 'lucide-react';

export function DreisatzHero() {
  return (
    <div className="relative overflow-hidden border-b bg-gradient-to-b from-background to-muted/20 py-16">
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]" />

      <div className="relative mx-auto max-w-5xl px-4 text-center">
        <div className="mb-6 inline-flex items-center justify-center rounded-full bg-primary/10 p-4">
          <Calculator className="h-12 w-12 text-primary" />
        </div>

        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Dreisatz-Rechner
        </h1>

        <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Dreisatz online berechnen – einfach & präzise
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span>Kostenlos</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span>Ohne Anmeldung</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span>Mit Rechenweg</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span>Sofort verfügbar</span>
          </div>
        </div>
      </div>
    </div>
  );
}
