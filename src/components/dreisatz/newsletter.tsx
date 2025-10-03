'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');

  return (
    <section id="newsletter" className="py-16 bg-muted/20">
      <div className="container text-center space-y-6">
        <span className="text-sm font-medium text-primary uppercase tracking-wide">
          Lernupdates &amp; Arbeitsblätter
        </span>
        <h2 className="text-3xl font-serif font-bold md:text-4xl">
          Dreisatz Rechner-Newsletter für Lehrkräfte und Lernende
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Erhalten Sie monatlich neue Dreisatz Rechner Aufgaben, Lösungswege, PDF-Übungsblätter und Tipps
          für den Einsatz unseres Dreisatz Rechners im Unterricht. Keine Werbung – nur didaktisch aufbereitete Dreisatz Rechner Inhalte
          aufbereitete Inhalte.
        </p>

        <form
          className="mx-auto flex w-full max-w-xl flex-col gap-3 sm:flex-row"
          onSubmit={(event) => {
            event.preventDefault();
            setEmail('');
            // Hinweis: Formularhandling/Wunschintegration kann später ergänzt werden
          }}
        >
          <Input
            id="dreisatz-newsletter"
            type="email"
            placeholder="E-Mail-Adresse für Dreisatz Tipps"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <Button type="submit" className="shrink-0">
            Anmelden
          </Button>
        </form>

        <p className="text-xs text-muted-foreground">
          Mit der Anmeldung erklären Sie sich mit unserer Datenschutzrichtlinie einverstanden. Sie können den Newsletter jederzeit abbestellen. Der Dreisatz Rechner informiert nur über relevante Inhalte.
        </p>
      </div>
    </section>
  );
}

