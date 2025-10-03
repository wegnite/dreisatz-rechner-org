'use client';

import { useState } from 'react';
import { DreisatzHero } from './hero';
import { DreisatzCalculator } from './calculator';
import { QuickExamples } from './quick-examples';
import { EducationalContent } from './educational-content';
import { DreisatzFAQ } from './faq';

export function DreisatzHomepage() {
  const [calculatorKey, setCalculatorKey] = useState(0);

  const handleExampleClick = (example: any) => {
    // Scroll to calculator
    const calculatorElement = document.getElementById('calculator');
    if (calculatorElement) {
      calculatorElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Reload calculator with example data
    // This would be handled by passing props to DreisatzCalculator
    setCalculatorKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <DreisatzHero />

      {/* Main Calculator */}
      <section id="calculator" className="py-16">
        <div className="container px-4">
          <DreisatzCalculator key={calculatorKey} />
        </div>
      </section>

      {/* Quick Examples */}
      <section className="bg-muted/30 py-16">
        <div className="container px-4">
          <QuickExamples onExampleClick={handleExampleClick} />
        </div>
      </section>

      {/* Educational Content */}
      <section className="py-16">
        <div className="container px-4">
          <EducationalContent />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted/30 py-16">
        <div className="container px-4">
          <DreisatzFAQ />
        </div>
      </section>

      {/* Footer CTA */}
      <section className="border-t py-12">
        <div className="container px-4 text-center">
          <h2 className="mb-4 text-2xl font-bold">
            Bereit für Ihre nächste Berechnung?
          </h2>
          <p className="mb-6 text-muted-foreground">
            Nutzen Sie unseren kostenlosen Dreisatz-Rechner jederzeit
          </p>
          <button
            onClick={() => {
              const calculatorElement = document.getElementById('calculator');
              calculatorElement?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
            }}
            className="inline-flex items-center rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Jetzt berechnen →
          </button>
        </div>
      </section>
    </div>
  );
}

// Export all components
export { DreisatzHero } from './hero';
export { DreisatzCalculator } from './calculator';
export { CalculationSteps } from './calculation-steps';
export { QuickExamples } from './quick-examples';
export { EducationalContent } from './educational-content';
export { DreisatzFAQ } from './faq';
