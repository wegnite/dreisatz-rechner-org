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
    question: 'Wie funktioniert der Dreisatz Rechner?',
    answer:
      'Unser Dreisatz Rechner berechnet automatisch den gesuchten Wert aus drei bekannten Größen. Geben Sie einfach die Werte A, B und C ein, wählen Sie den Berechnungstyp (proportional oder antiproportional), und der Rechner zeigt Ihnen das Ergebnis mit allen Zwischenschritten. Die Dreisatz-Tabelle visualisiert jeden Rechenschritt, sodass Sie die Methode nachvollziehen können.',
  },
  {
    question: 'Wann verwende ich proportionalen Dreisatz?',
    answer:
      'Proportionaler Dreisatz wird verwendet, wenn beide Größen in die gleiche Richtung verändern. Das bedeutet: "Je mehr A, desto mehr B" oder "Je weniger A, desto weniger B". Typische Beispiele sind Einkaufspreise (mehr Äpfel = mehr Kosten), Entfernungen (mehr Zeit = mehr km) oder Mengenumrechnungen. Der Dreisatz Rechner erkennt diese Verhältnisse automatisch.',
  },
  {
    question: 'Wie rechne ich antiproportionalen Dreisatz mit dem Rechner?',
    answer:
      'Beim antiproportionalen Dreisatz verändern sich die Größen entgegengesetzt: "Je mehr A, desto weniger B". Beispiel: Je mehr Arbeiter an einer Aufgabe arbeiten, desto weniger Zeit wird benötigt. Wählen Sie im Dreisatz Rechner einfach die Option "Antiproportional", und der Rechner wendet automatisch die korrekte Formel an: X = (A1 × B1) ÷ A2.',
  },
  {
    question: 'Was ist der Unterschied zur Prozentrechnung?',
    answer:
      'Prozentrechnung ist ein Spezialfall des proportionalen Dreisatzes, bei dem eine Größe immer auf 100% (den Grundwert) bezogen wird. Der Dreisatz Rechner ist allgemeiner und kann für beliebige Verhältnisse verwendet werden, nicht nur für Prozentangaben. Sie können damit Preise, Mengen, Zeiten und viele andere Größen berechnen.',
  },
  {
    question: 'Kann ich den Dreisatz Rechner für Rezepte verwenden?',
    answer:
      'Ja, der Dreisatz Rechner ist ideal für Rezepte! Wenn ein Rezept für 4 Personen ist und Sie für 6 Personen kochen möchten, können Sie mit dem proportionalen Dreisatz alle Zutatenmengen entsprechend anpassen. Beispiel: 200g Mehl für 4 Personen → X Gramm für 6 Personen. Geben Sie einfach die Werte in den Rechner ein.',
  },
  {
    question: 'Wie funktioniert der Dreisatz bei Arbeitszeit?',
    answer:
      'Bei Arbeitszeit verwendet man meist den antiproportionalen Dreisatz. Beispiel: 3 Maler streichen eine Wand in 5 Stunden. Wie lange brauchen 5 Maler? Mehr Arbeiter bedeuten weniger Zeit, daher rechnet man: (3 × 5) ÷ 5 = 3 Stunden.',
  },
  {
    question: 'Welche Einheiten kann ich im Dreisatz Rechner verwenden?',
    answer:
      'Der Dreisatz Rechner arbeitet mit beliebigen Einheiten: Gramm, Kilogramm, Liter, Meter, Euro, Dollar, Stunden, Minuten, etc. Wichtig ist nur, dass Sie auf beiden Seiten des Verhältnisses die gleichen Einheiten verwenden (z.B. beide Seiten in Gramm oder beide in Kilogramm). Der Rechner zeigt Ihnen die Einheiten in der Dreisatz-Tabelle an.',
  },
  {
    question: 'Was mache ich bei sehr großen oder kleinen Zahlen im Rechner?',
    answer:
      'Der Dreisatz Rechner arbeitet problemlos mit allen Zahlengrößen. Bei sehr großen Zahlen (z.B. Kilometer) oder sehr kleinen Zahlen (z.B. Milligramm) achten Sie darauf, die Einheiten konsistent zu halten. Der Online Dreisatz Rechner zeigt bis zu 4 Dezimalstellen an, was für die meisten Anwendungen ausreichend genau ist.',
  },
  {
    question: 'Kann ich den Dreisatz Rechner auch umgekehrt anwenden?',
    answer:
      'Ja! Wenn Sie das Ergebnis kennen und eine andere Größe suchen, können Sie die Werte einfach entsprechend vertauschen. Der Dreisatz Rechner funktioniert in beide Richtungen. Beispiel: Wenn 200g 1,54€ kosten, können Sie mit dem Rechner ausrechnen, wie viel Gramm Sie für 3€ bekommen. Tauschen Sie einfach die Werte entsprechend.',
  },
];

export function DreisatzFAQ() {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold text-gray-900">
          Häufig gestellte Fragen zum Dreisatz Rechner
        </h2>
        <p className="text-sm text-gray-600">
          Antworten auf die wichtigsten Fragen zur Nutzung des Dreisatz Rechners und zur Dreisatz-Methode
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full space-y-2">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="rounded-lg border border-gray-200 bg-white px-4"
          >
            <AccordionTrigger className="text-left text-base font-medium text-gray-900 hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-gray-700 leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
