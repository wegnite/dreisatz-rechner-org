import { NextResponse } from 'next/server';

const SUPPORTED_LOCALES = ['de', 'en', 'zh'] as const;
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

type DreisatzType = 'proportional' | 'antiproportional';

interface UnitConfig {
  base: string;
  labels: Record<SupportedLocale, { singular: string; plural: string }>;
}

const UNIT_DICTIONARY: Record<string, UnitConfig> = {
  liter: {
    base: 'liter',
    labels: {
      de: { singular: 'Liter', plural: 'Liter' },
      en: { singular: 'liter', plural: 'liters' },
      zh: { singular: '升', plural: '升' },
    },
  },
  km: {
    base: 'km',
    labels: {
      de: { singular: 'Kilometer', plural: 'Kilometer' },
      en: { singular: 'kilometre', plural: 'kilometres' },
      zh: { singular: '千米', plural: '千米' },
    },
  },
  m: {
    base: 'm',
    labels: {
      de: { singular: 'Meter', plural: 'Meter' },
      en: { singular: 'metre', plural: 'metres' },
      zh: { singular: '米', plural: '米' },
    },
  },
  g: {
    base: 'g',
    labels: {
      de: { singular: 'Gramm', plural: 'Gramm' },
      en: { singular: 'gram', plural: 'grams' },
      zh: { singular: '克', plural: '克' },
    },
  },
  kg: {
    base: 'kg',
    labels: {
      de: { singular: 'Kilogramm', plural: 'Kilogramm' },
      en: { singular: 'kilogram', plural: 'kilograms' },
      zh: { singular: '千克', plural: '千克' },
    },
  },
  euro: {
    base: 'euro',
    labels: {
      de: { singular: 'Euro', plural: 'Euro' },
      en: { singular: 'euro', plural: 'euros' },
      zh: { singular: '欧元', plural: '欧元' },
    },
  },
  stunde: {
    base: 'stunde',
    labels: {
      de: { singular: 'Stunde', plural: 'Stunden' },
      en: { singular: 'hour', plural: 'hours' },
      zh: { singular: '小时', plural: '小时' },
    },
  },
  minute: {
    base: 'minute',
    labels: {
      de: { singular: 'Minute', plural: 'Minuten' },
      en: { singular: 'minute', plural: 'minutes' },
      zh: { singular: '分钟', plural: '分钟' },
    },
  },
  person: {
    base: 'person',
    labels: {
      de: { singular: 'Person', plural: 'Personen' },
      en: { singular: 'person', plural: 'people' },
      zh: { singular: '人', plural: '人' },
    },
  },
  kcal: {
    base: 'kcal',
    labels: {
      de: { singular: 'Kilokalorie', plural: 'Kilokalorien' },
      en: { singular: 'kcal', plural: 'kcal' },
      zh: { singular: '千卡', plural: '千卡' },
    },
  },
  einheit: {
    base: 'einheit',
    labels: {
      de: { singular: 'Einheit', plural: 'Einheiten' },
      en: { singular: 'unit', plural: 'units' },
      zh: { singular: '单位', plural: '单位' },
    },
  },
};

const UNIT_SYNONYMS: Record<string, string> = {
  liter: 'liter',
  litern: 'liter',
  litres: 'liter',
  litre: 'liter',
  liters: 'liter',
  l: 'liter',
  km: 'km',
  kilometer: 'km',
  kilometern: 'km',
  kilometres: 'km',
  kilometre: 'km',
  m: 'm',
  meter: 'm',
  metern: 'm',
  metres: 'm',
  metre: 'm',
  gramm: 'g',
  gram: 'g',
  grams: 'g',
  g: 'g',
  kilogramm: 'kg',
  kilogram: 'kg',
  kilograms: 'kg',
  kg: 'kg',
  euro: 'euro',
  euros: 'euro',
  eur: 'euro',
  '€': 'euro',
  stunde: 'stunde',
  stunden: 'stunde',
  std: 'stunde',
  hour: 'stunde',
  hours: 'stunde',
  minute: 'minute',
  minuten: 'minute',
  min: 'minute',
  mins: 'minute',
  minutes: 'minute',
  person: 'person',
  personen: 'person',
  people: 'person',
  workers: 'person',
  worker: 'person',
  maler: 'person',
  apfel: 'einheit',
  äpfel: 'einheit',
  apple: 'einheit',
  apples: 'einheit',
  kcal: 'kcal',
  kilokalorien: 'kcal',
  kalorien: 'kcal',
  calories: 'kcal',
  einheit: 'einheit',
  einheiten: 'einheit',
  unit: 'einheit',
  units: 'einheit',
};

const ANTIPROPORTIONAL_HINTS = [
  'antiproportional',
  'umgekehrt proportional',
  'inverse proportion',
  'je mehr',
  'desto weniger',
  'je weniger',
  'desto mehr',
  'umgekehrt',
];

interface NumberUnitPair {
  value: number;
  unit: string | null;
  rawUnit: string | null;
  index: number;
}

interface DreisatzStep {
  title: string;
  description: string;
}

interface DreisatzSummaryEntry {
  value: number;
  formatted: string;
  unit: string | null;
}

interface DreisatzSolution {
  type: DreisatzType;
  analysis: string;
  summary: Record<'a1' | 'b1' | 'a2' | 'b2', DreisatzSummaryEntry>;
  steps: DreisatzStep[];
  answer: string;
  formula: string;
}

const TEXTS: Record<SupportedLocale, {
  errors: Record<'parse' | 'missingNumbers' | 'unknown', string>;
  analysis: Record<DreisatzType, (base: string, target: string) => string>;
  stepTitles: Record<DreisatzType, [string, string]>;
  stepDescriptions: Record<DreisatzType, (
    params: {
      base: string;
      baseSingle: string;
      target: string;
      targetSingle: string;
      unitValue: string;
      b1: string;
      a1: string;
      a2: string;
      product: string;
      result: string;
    }
  ) => [string, string]>;
  answer: (args: { a2: string; base: string; result: string; target: string }) => string;
  formula: Record<DreisatzType, (args: {
    b1: string;
    a1: string;
    a2: string;
    result: string;
  }) => string>;
}> = {
  de: {
    errors: {
      parse: 'Wir konnten die Größen in dieser Aufgabe nicht erkennen.',
      missingNumbers: 'Bitte nennen Sie mindestens zwei bekannte Werte und eine gesuchte Größe.',
      unknown: 'Beim Lösen der Aufgabe ist ein Fehler aufgetreten.',
    },
    analysis: {
      proportional: (base, target) => `Da ${base} und ${target} gemeinsam steigen oder fallen, liegt ein proportionaler Dreisatz vor.`,
      antiproportional: (base, target) => `Da ${base} und ${target} gegenläufig sind, handelt es sich um einen antiproportionalen Dreisatz.`,
    },
    stepTitles: {
      proportional: ['Auf 1 Einheit zurückrechnen', 'Auf die gesuchte Menge hochrechnen'],
      antiproportional: ['Gesamtprodukt bilden', 'Durch neue Menge teilen'],
    },
    stepDescriptions: {
      proportional: ({ base, target, unitValue, b1, a1, a2, result, baseSingle }) => [
        `${b1} ${target} ÷ ${a1} ${base} = ${unitValue} ${target} pro ${baseSingle}`,
        `${unitValue} ${target} × ${a2} ${base} = ${result} ${target}`,
      ],
      antiproportional: ({ base, target, product, a2, result, a1, b1 }) => [
        `${a1} ${base} × ${b1} ${target} = ${product}`,
        `${product} ÷ ${a2} ${base} = ${result} ${target}`,
      ],
    },
    answer: ({ a2, base, result, target }) => `Antwort: ${a2} ${base} entsprechen ${result} ${target}.`,
    formula: {
      proportional: ({ b1, a1, a2, result }) => `Formel: B₂ = ${b1} × (${a2} ÷ ${a1}) = ${result}`,
      antiproportional: ({ a1, b1, a2, result }) => `Formel: B₂ = (${a1} × ${b1}) ÷ ${a2} = ${result}`,
    },
  },
  en: {
    errors: {
      parse: 'We could not understand the quantities in this task.',
      missingNumbers: 'Please provide at least two known values and one target quantity.',
      unknown: 'Something went wrong while solving the task.',
    },
    analysis: {
      proportional: (base, target) => `Because ${base} and ${target} increase together, this is a proportional Dreisatz.`,
      antiproportional: (base, target) => `Because ${base} and ${target} move in opposite directions, this is an antiproportional Dreisatz.`,
    },
    stepTitles: {
      proportional: ['Reduce to one unit', 'Scale to the target quantity'],
      antiproportional: ['Build the total product', 'Divide by the new quantity'],
    },
    stepDescriptions: {
      proportional: ({ base, target, unitValue, b1, a1, a2, result, baseSingle }) => [
        `${b1} ${target} ÷ ${a1} ${base} = ${unitValue} ${target} per ${baseSingle}`,
        `${unitValue} ${target} × ${a2} ${base} = ${result} ${target}`,
      ],
      antiproportional: ({ base, target, product, a2, result, a1, b1 }) => [
        `${a1} ${base} × ${b1} ${target} = ${product}`,
        `${product} ÷ ${a2} ${base} = ${result} ${target}`,
      ],
    },
    answer: ({ a2, base, result, target }) => `Answer: ${a2} ${base} require ${result} ${target}.`,
    formula: {
      proportional: ({ b1, a1, a2, result }) => `Formula: B₂ = ${b1} × (${a2} ÷ ${a1}) = ${result}`,
      antiproportional: ({ a1, b1, a2, result }) => `Formula: B₂ = (${a1} × ${b1}) ÷ ${a2} = ${result}`,
    },
  },
  zh: {
    errors: {
      parse: '无法识别题目中的数值和单位。',
      missingNumbers: '请至少提供两个已知值和一个目标值。',
      unknown: '解题过程中出现错误。',
    },
    analysis: {
      proportional: (base, target) => `因为 ${base} 和 ${target} 同向变化，这是一个正比例 Dreisatz。`,
      antiproportional: (base, target) => `因为 ${base} 和 ${target} 反向变化，这是一个反比例 Dreisatz。`,
    },
    stepTitles: {
      proportional: ['先求 1 个单位', '再乘以目标数量'],
      antiproportional: ['先求总乘积', '再除以新数量'],
    },
    stepDescriptions: {
      proportional: ({ base, target, unitValue, b1, a1, a2, result, baseSingle, targetSingle }) => [
        `${b1}${target} ÷ ${a1}${base} = 每 ${baseSingle} ${unitValue}${targetSingle}`,
        `${unitValue}${target} × ${a2}${base} = ${result}${target}`,
      ],
      antiproportional: ({ base, target, product, a2, result, a1, b1 }) => [
        `${a1}${base} × ${b1}${target} = ${product}`,
        `${product} ÷ ${a2}${base} = ${result}${target}`,
      ],
    },
    answer: ({ a2, base, result, target }) => `答案：${a2}${base} 需要 ${result}${target}。`,
    formula: {
      proportional: ({ b1, a1, a2, result }) => `公式：B₂ = ${b1} × (${a2} ÷ ${a1}) = ${result}`,
      antiproportional: ({ a1, b1, a2, result }) => `公式：B₂ = (${a1} × ${b1}) ÷ ${a2} = ${result}`,
    },
  },
};

function normalizeLocale(locale: unknown): SupportedLocale {
  if (typeof locale === 'string') {
    const candidate = locale.toLowerCase();
    if (SUPPORTED_LOCALES.includes(candidate as SupportedLocale)) {
      return candidate as SupportedLocale;
    }
  }
  return 'de';
}

function sanitizeToken(token: string): string {
  return token.replace(/[(),.;:?!\-]/g, '');
}

function parseNumberToken(token: string): number | null {
  const cleaned = token.replace(',', '.');
  return /^\d+(?:\.\d+)?$/.test(cleaned) ? parseFloat(cleaned) : null;
}

function normalizeUnitToken(token: string | null): string | null {
  if (!token) return null;
  const cleaned = token.toLowerCase();
  const stripped = cleaned.replace(/[^a-zäöüß€%]/gi, '');
  if (!stripped) return null;
  return UNIT_SYNONYMS[stripped] ?? null;
}

function detectType(text: string): DreisatzType {
  const lower = text.toLowerCase();
  return ANTIPROPORTIONAL_HINTS.some((hint) => lower.includes(hint))
    ? 'antiproportional'
    : 'proportional';
}

function formatNumber(value: number, locale: SupportedLocale): string {
  const formatter = new Intl.NumberFormat(
    locale === 'zh' ? 'zh-CN' : locale === 'de' ? 'de-DE' : 'en-US',
    {
      maximumFractionDigits: value % 1 === 0 ? 0 : 4,
      minimumFractionDigits: 0,
    }
  );
  return formatter.format(value);
}

function getUnitLabel(unit: string | null, locale: SupportedLocale, value: number): string {
  if (!unit) {
    return UNIT_DICTIONARY.einheit.labels[locale][value === 1 ? 'singular' : 'plural'];
  }
  const config = UNIT_DICTIONARY[unit];
  if (!config) {
    return UNIT_DICTIONARY.einheit.labels[locale][value === 1 ? 'singular' : 'plural'];
  }
  return config.labels[locale][value === 1 ? 'singular' : 'plural'];
}

function extractPairs(text: string): NumberUnitPair[] {
  const tokens = text.split(/\s+/).map(sanitizeToken);
  const pairs: NumberUnitPair[] = [];
  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i];
    if (!token) continue;

    let numberToken = token;
    let attachedUnit: string | null = null;

    const combinedMatch = token.match(/^(\d+(?:[.,]\d+)?)([a-zäöüß€%]+)$/i);
    if (combinedMatch) {
      numberToken = combinedMatch[1];
      attachedUnit = combinedMatch[2];
    }

    const value = parseNumberToken(numberToken);
    if (value == null) {
      continue;
    }

    let unit: string | null = normalizeUnitToken(attachedUnit);
    let rawUnit: string | null = attachedUnit ? attachedUnit.toLowerCase() : null;

    if (!unit) {
      // Look ahead for a standalone unit token within the next two tokens
      for (let offset = 1; offset <= 2; offset++) {
        const candidate = tokens[i + offset];
        if (!candidate) continue;
        const normalizedCandidate = normalizeUnitToken(candidate);
        if (normalizedCandidate) {
          unit = normalizedCandidate;
          rawUnit = candidate.toLowerCase();
          break;
        }
      }
    }

    if (!unit) {
      // Look behind (phrases like "in 100 km")
      for (let back = 1; back <= 2; back++) {
        const candidate = tokens[i - back];
        if (!candidate) continue;
        const normalizedCandidate = normalizeUnitToken(candidate);
        if (normalizedCandidate) {
          unit = normalizedCandidate;
          rawUnit = candidate.toLowerCase();
          break;
        }
      }
    }

    pairs.push({ value, unit, rawUnit, index: i });
  }
  return pairs;
}

function extractTargetUnit(text: string): string | null {
  const lower = text.toLowerCase();
  const match = lower.match(/(?:wie\s+(?:viele|viel)|wieviel|how\s+many|how\s+much)\s+([a-zäöüß€%]+)/);
  if (!match) return null;
  return normalizeUnitToken(match[1]);
}

function buildSolution(
  params: {
    a1: NumberUnitPair;
    b1: NumberUnitPair;
    a2: NumberUnitPair;
    type: DreisatzType;
    locale: SupportedLocale;
  }
): DreisatzSolution {
  const { a1, b1, a2, type, locale } = params;
  const baseUnitLabel = getUnitLabel(a1.unit, locale, 2);
  const baseUnitSingle = getUnitLabel(a1.unit, locale, 1);
  const targetUnitLabel = getUnitLabel(b1.unit, locale, 2);
  const targetUnitSingle = getUnitLabel(b1.unit, locale, 1);

  if (type === 'proportional') {
    const unitValue = b1.value / a1.value;
    const result = unitValue * a2.value;
    const formattedUnitValue = formatNumber(unitValue, locale);
    const formattedResult = formatNumber(result, locale);

    const summary = {
      a1: { value: a1.value, formatted: formatNumber(a1.value, locale), unit: baseUnitLabel },
      b1: { value: b1.value, formatted: formatNumber(b1.value, locale), unit: targetUnitLabel },
      a2: { value: a2.value, formatted: formatNumber(a2.value, locale), unit: baseUnitLabel },
      b2: { value: result, formatted: formattedResult, unit: targetUnitLabel },
    } satisfies Record<'a1' | 'b1' | 'a2' | 'b2', DreisatzSummaryEntry>;

    const [step1, step2] = TEXTS[locale].stepDescriptions.proportional({
      base: baseUnitLabel,
      baseSingle: baseUnitSingle,
      target: targetUnitLabel,
      targetSingle: targetUnitSingle,
      unitValue: formattedUnitValue,
      b1: summary.b1.formatted,
      a1: summary.a1.formatted,
      a2: summary.a2.formatted,
      result: formattedResult,
      product: '',
    });

    return {
      type,
      analysis: TEXTS[locale].analysis.proportional(baseUnitLabel, targetUnitLabel),
      summary,
      steps: [
        {
          title: TEXTS[locale].stepTitles.proportional[0],
          description: step1,
        },
        {
          title: TEXTS[locale].stepTitles.proportional[1],
          description: step2,
        },
      ],
      answer: TEXTS[locale].answer({
        a2: summary.a2.formatted,
        base: baseUnitLabel,
        result: formattedResult,
        target: targetUnitLabel,
      }),
      formula: TEXTS[locale].formula.proportional({
        b1: summary.b1.formatted,
        a1: summary.a1.formatted,
        a2: summary.a2.formatted,
        result: formattedResult,
      }),
    };
  }

  const product = a1.value * b1.value;
  const result = product / a2.value;
  const formattedProduct = formatNumber(product, locale);
  const formattedResult = formatNumber(result, locale);

  const summary = {
    a1: { value: a1.value, formatted: formatNumber(a1.value, locale), unit: baseUnitLabel },
    b1: { value: b1.value, formatted: formatNumber(b1.value, locale), unit: targetUnitLabel },
    a2: { value: a2.value, formatted: formatNumber(a2.value, locale), unit: baseUnitLabel },
    b2: { value: result, formatted: formattedResult, unit: targetUnitLabel },
  } satisfies Record<'a1' | 'b1' | 'a2' | 'b2', DreisatzSummaryEntry>;

  const [step1, step2] = TEXTS[locale].stepDescriptions.antiproportional({
    base: baseUnitLabel,
    baseSingle: baseUnitSingle,
    target: targetUnitLabel,
    targetSingle: targetUnitSingle,
    unitValue: '',
    b1: summary.b1.formatted,
    a1: summary.a1.formatted,
    a2: summary.a2.formatted,
    product: formattedProduct,
    result: formattedResult,
  });

  return {
    type,
    analysis: TEXTS[locale].analysis.antiproportional(baseUnitLabel, targetUnitLabel),
    summary,
    steps: [
      {
        title: TEXTS[locale].stepTitles.antiproportional[0],
        description: step1,
      },
      {
        title: TEXTS[locale].stepTitles.antiproportional[1],
        description: step2,
      },
    ],
    answer: TEXTS[locale].answer({
      a2: summary.a2.formatted,
      base: baseUnitLabel,
      result: formattedResult,
      target: targetUnitLabel,
    }),
    formula: TEXTS[locale].formula.antiproportional({
      a1: summary.a1.formatted,
      b1: summary.b1.formatted,
      a2: summary.a2.formatted,
      result: formattedResult,
    }),
  };
}

function resolvePairs(
  pairs: NumberUnitPair[],
  targetUnit: string | null
): { a1: NumberUnitPair; b1: NumberUnitPair; a2: NumberUnitPair } | null {
  if (pairs.length < 3) {
    return null;
  }

  const bCandidates = targetUnit
    ? pairs.filter((pair) => pair.unit === targetUnit)
    : [];

  const b1 = bCandidates[0] ?? pairs[0];
  const baseUnit = pairs.find((pair) => pair.index !== b1.index && pair.unit !== b1.unit)?.unit;
  if (!baseUnit) {
    return null;
  }

  const a1 = pairs.find((pair) => pair.unit === baseUnit);
  if (!a1) {
    return null;
  }

  const a2 = pairs.find(
    (pair) => pair.index !== a1.index && pair.unit === baseUnit && pair.index !== b1.index
  );

  if (!a2) {
    return null;
  }

  return { a1, b1, a2 };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { question?: unknown; locale?: unknown };
    const question = typeof body.question === 'string' ? body.question.trim() : '';
    const locale = normalizeLocale(body.locale);

    if (question.length < 12) {
      return NextResponse.json(
        {
          success: false,
          code: 'TOO_SHORT',
          message: TEXTS[locale].errors.parse,
        },
        { status: 400 }
      );
    }

    const pairs = extractPairs(question);
    if (pairs.length < 3) {
      return NextResponse.json(
        {
          success: false,
          code: 'MISSING_NUMBERS',
          message: TEXTS[locale].errors.missingNumbers,
        },
        { status: 400 }
      );
    }

    const targetUnit = extractTargetUnit(question);
    const resolved = resolvePairs(pairs, targetUnit);

    if (!resolved) {
      return NextResponse.json(
        {
          success: false,
          code: 'PARSE_ERROR',
          message: TEXTS[locale].errors.parse,
        },
        { status: 400 }
      );
    }

    const type = detectType(question);
    const solution = buildSolution({ ...resolved, type, locale });

    return NextResponse.json({ success: true, data: solution });
  } catch (error) {
    console.error('[dreisatz:solve]', error);
    return NextResponse.json(
      {
        success: false,
        code: 'UNKNOWN',
        message: TEXTS.de.errors.unknown,
      },
      { status: 500 }
    );
  }
}
