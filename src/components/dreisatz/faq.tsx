'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'Wann verwende ich proportionalen Dreisatz?',
    answer:
      'Proportionaler Dreisatz wird verwendet, wenn beide Größen in die gleiche Richtung verändern. Das bedeutet: "Je mehr A, desto mehr B" oder "Je weniger A, desto weniger B". Typische Beispiele sind Einkaufspreise (mehr Äpfel = mehr Kosten), Entfernungen (mehr Zeit = mehr km) oder Mengenumrechnungen.',
  },
  {
    question: 'Wie rechne ich antiproportionalen Dreisatz?',
    answer:
      'Beim antiproportionalen Dreisatz verändern sich die Größen entgegengesetzt: "Je mehr A, desto weniger B". Beispiel: Je mehr Arbeiter an einer Aufgabe arbeiten, desto weniger Zeit wird benötigt. Die Berechnung erfolgt durch Multiplikation der bekannten Werte und Division durch die neue Größe.',
  },
  {
    question: 'Was ist der Unterschied zur Prozentrechnung?',
    answer:
      'Prozentrechnung ist ein Spezialfall des proportionalen Dreisatzes, bei dem eine Größe immer auf 100% (den Grundwert) bezogen wird. Der Dreisatz ist allgemeiner und kann für beliebige Verhältnisse verwendet werden, nicht nur für Prozentangaben.',
  },
  {
    question: 'Kann ich den Dreisatz für Rezepte verwenden?',
    answer:
      'Ja, der Dreisatz ist ideal für Rezepte! Wenn ein Rezept für 4 Personen ist und Sie für 6 Personen kochen möchten, können Sie mit dem proportionalen Dreisatz alle Zutatenmengen entsprechend anpassen. Beispiel: 200g Mehl für 4 Personen → X Gramm für 6 Personen.',
  },
  {
    question: 'Wie funktioniert der Dreisatz bei Arbeitszeit?',
    answer:
      'Bei Arbeitszeit verwendet man meist den antiproportionalen Dreisatz. Beispiel: 3 Maler streichen eine Wand in 5 Stunden. Wie lange brauchen 5 Maler? Mehr Arbeiter bedeuten weniger Zeit, daher rechnet man: (3 × 5) ÷ 5 = 3 Stunden.',
  },
  {
    question: 'Welche Einheiten kann ich verwenden?',
    answer:
      'Sie können beliebige Einheiten verwenden: Gramm, Kilogramm, Liter, Meter, Euro, Dollar, Stunden, Minuten, etc. Wichtig ist nur, dass Sie auf beiden Seiten des Verhältnisses die gleichen Einheiten verwenden (z.B. beide Seiten in Gramm oder beide in Kilogramm).',
  },
  {
    question: 'Was mache ich bei sehr großen oder kleinen Zahlen?',
    answer:
      'Der Dreisatzrechner arbeitet mit allen Zahlengrößen. Bei sehr großen Zahlen (z.B. Kilometer) oder sehr kleinen Zahlen (z.B. Milligramm) achten Sie darauf, die Einheiten konsistent zu halten. Gegebenenfalls können Sie die Zahlen vor der Berechnung umrechnen (z.B. km in m).',
  },
  {
    question: 'Kann ich den Dreisatz auch umgekehrt anwenden?',
    answer:
      'Ja! Wenn Sie das Ergebnis kennen und eine andere Größe suchen, können Sie die Werte einfach entsprechend vertauschen. Der Dreisatz funktioniert in beide Richtungen. Beispiel: Wenn 200g 1,54€ kosten, können Sie ausrechnen, wie viel Gramm Sie für 3€ bekommen.',
  },
];

export function DreisatzFAQ() {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="mb-8 text-center">
        <div className="mb-4 flex justify-center">
          <div className="rounded-full bg-primary/10 p-3">
            <HelpCircle className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h2 className="mb-2 text-3xl font-bold">Häufig gestellte Fragen</h2>
        <p className="text-muted-foreground">
          Alles, was Sie über den Dreisatz wissen müssen
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
