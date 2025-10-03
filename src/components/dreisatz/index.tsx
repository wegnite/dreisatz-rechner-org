
'use client';

import { useCallback, useState } from 'react';
import { DreisatzCalculator } from './calculator';
import { QuickExamples, type DreisatzExample } from './quick-examples';
import { EducationalContent } from './educational-content';
import { DreisatzFAQ } from './faq';
import { TypeGuide } from './type-guide';

export function DreisatzHomepage() {
  const [selectedExample, setSelectedExample] = useState<DreisatzExample | null>(null);

  const handleExampleClick = useCallback((example: DreisatzExample) => {
    setSelectedExample(example);
    requestAnimationFrame(() => {
      const calculatorElement = document.getElementById('rechner');
      calculatorElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white py-8">
        <div className="container mx-auto max-w-5xl px-4">
          <h1 className="text-4xl font-bold text-gray-900">
            Dreisatz Rechner
            <small className="ml-3 text-lg font-normal text-gray-500">Online & Kostenlos</small>
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Der beste Online Dreisatz Rechner für proportionale und antiproportionale Berechnungen
          </p>
        </div>
      </header>

      {/* Main Calculator */}
      <section id="rechner" className="py-12">
        <div className="container mx-auto max-w-5xl px-4">
          <DreisatzCalculator example={selectedExample ?? undefined} />
        </div>
      </section>

      {/* Quick Examples */}
      <section className="border-t bg-gray-50 py-12">
        <div className="container mx-auto max-w-5xl px-4">
          <QuickExamples onExampleClick={handleExampleClick} />
        </div>
      </section>

      {/* Type Guide */}
      <section className="border-t py-12">
        <div className="container mx-auto max-w-5xl px-4">
          <TypeGuide />
        </div>
      </section>

      {/* Educational Content */}
      <section id="leitfaden" className="border-t bg-gray-50 py-12">
        <div className="container mx-auto max-w-5xl px-4">
          <EducationalContent />
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t bg-gray-50 py-12">
        <div className="container mx-auto max-w-5xl px-4">
          <DreisatzFAQ />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto max-w-5xl px-4">
          <p className="text-center text-sm text-gray-600">
            © 2025 Dreisatz Rechner - Kostenloser Online Dreisatz Rechner für alle Dreisatz-Aufgaben
          </p>
        </div>
      </footer>
    </div>
  );
}

// Export all components
export { DreisatzHero } from './hero';
export { DreisatzCalculator } from './calculator';
export { QuickExamples } from './quick-examples';
export { EducationalContent } from './educational-content';
export { DreisatzFAQ } from './faq';
export { TypeGuide } from './type-guide';
