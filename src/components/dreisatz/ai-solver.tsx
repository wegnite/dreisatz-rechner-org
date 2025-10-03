'use client';

import { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Loader2, Sparkles, Copy, Share2, CheckCircle2, AlertCircle, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useCallback } from 'react';

type DreisatzType = 'proportional' | 'antiproportional';

interface DreisatzSummaryEntry {
  value: number;
  formatted: string;
  unit: string | null;
}

interface DreisatzStep {
  title: string;
  description: string;
}

interface DreisatzSolution {
  type: DreisatzType;
  analysis: string;
  summary: Record<'a1' | 'b1' | 'a2' | 'b2', DreisatzSummaryEntry>;
  steps: DreisatzStep[];
  answer: string;
  formula: string;
}

interface SolveResponse {
  success: boolean;
  data?: DreisatzSolution;
  code?: string;
  message?: string;
}

interface DreisatzAiSolverProps {
  mode: 'ai' | 'classic';
  onModeChange: (mode: 'ai' | 'classic') => void;
}

export function DreisatzAiSolver({ mode, onModeChange }: DreisatzAiSolverProps) {
  const t = useTranslations();
  const locale = useLocale();
  const { toast } = useToast();

  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DreisatzSolution | null>(null);
  const [feedbackChoice, setFeedbackChoice] = useState<'up' | 'down' | null>(null);
  const [feedbackNote, setFeedbackNote] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const isActiveMode = mode === 'ai';

  const handleSubmit = async () => {
    setError(null);
    setFeedbackChoice(null);
    setFeedbackNote('');
    setFeedbackSubmitted(false);

    if (question.trim().length < 12) {
      setError(t('errorTooShort'));
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/dreisatz/solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, locale }),
      });
      const payload = (await response.json()) as SolveResponse;

      if (!response.ok || !payload.success || !payload.data) {
        const code = (payload.code ?? '').toLowerCase();
        let mapped: string | undefined;
        if (code) {
          try {
            mapped = t(`apiErrors.${code}` as any);
          } catch {
            mapped = undefined;
          }
        }

        setError(mapped ?? payload.message ?? t('errorGeneric'));
        setResult(null);
        return;
      }

      setResult(payload.data);
    } catch (fetchError) {
      console.error('[dreisatz:solve-client]', fetchError);
      setError(t('errorGeneric'));
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = useCallback(() => {
    if (!result) return;
    const analysisHeading = t('result.analysisHeading');
    const valuesHeading = t('result.valuesHeading');
    const stepsHeading = t('result.stepsHeading');
    const answerHeading = t('result.answerHeading');

    const summary = [
      `${t('result.valueA1')}: ${result.summary.a1.formatted} ${result.summary.a1.unit ?? ''}`.trim(),
      `${t('result.valueB1')}: ${result.summary.b1.formatted} ${result.summary.b1.unit ?? ''}`.trim(),
      `${t('result.valueA2')}: ${result.summary.a2.formatted} ${result.summary.a2.unit ?? ''}`.trim(),
      `${t('result.valueB2')}: ${result.summary.b2.formatted} ${result.summary.b2.unit ?? ''}`.trim(),
    ].join('\n');

    const stepsText = result.steps
      .map((step, index) => `${index + 1}. ${step.title}: ${step.description}`)
      .join('\n');

    const copyText = `${analysisHeading}: ${result.analysis}\n\n${valuesHeading}:\n${summary}\n\n${stepsHeading}:\n${stepsText}\n\n${answerHeading}: ${result.answer}\n${result.formula}`;

    navigator.clipboard
      .writeText(copyText)
      .then(() => {
        toast({ description: t('result.copySuccess'), variant: 'default' });
      })
      .catch(() => {
        toast({ description: t('result.copyError'), variant: 'destructive' });
      });
  }, [result, t, toast]);

  const handleShare = useCallback(() => {
    if (!result) return;
    const summary = `${result.summary.a2.formatted} ${result.summary.a2.unit ?? ''} → ${result.summary.b2.formatted} ${result.summary.b2.unit ?? ''}`.trim();
    const text = `${result.analysis}\n${summary}\n${result.answer}`;

    if (navigator.share) {
      navigator
        .share({
          title: 'Dreisatz Lösung',
          text,
        })
        .catch(() => {
          toast({ description: t('result.shareError'), variant: 'destructive' });
        });
      return;
    }

    toast({ description: t('result.shareError'), variant: 'destructive' });
  }, [result, t, toast]);

  const handleFeedback = (choice: 'up' | 'down') => {
    setFeedbackChoice(choice);
    if (choice === 'up') {
      setFeedbackSubmitted(true);
      toast({ description: t('feedback.positive') });
    } else {
      setFeedbackSubmitted(false);
    }
  };

  const submitFeedback = () => {
    setFeedbackSubmitted(true);
    toast({ description: t('feedback.submitted') });
  };

  const typeBadge = useMemo(() => {
    if (!result) return null;
    return result.type === 'proportional'
      ? t('result.badge.proportional')
      : t('result.badge.antiproportional');
  }, [result, t]);

  return (
    <Card className={cn('border-2 border-primary/20 bg-primary/5 transition-opacity', !isActiveMode && 'opacity-75')}>
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <CardTitle className="text-xl font-semibold">
              {t('title')}
            </CardTitle>
            <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
              {t('description')}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={mode === 'ai' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onModeChange('ai')}
            >
              {t('tabs.ai')}
            </Button>
            <Button
              variant={mode === 'classic' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onModeChange('classic')}
            >
              {t('tabs.classic')}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className={cn('space-y-3', !isActiveMode && 'pointer-events-none select-none')}>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <Label htmlFor="dreisatz-ai-input" className="text-sm font-medium">
              {t('textareaLabel')}
            </Label>
          </div>
          <Textarea
            id="dreisatz-ai-input"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder={t('textareaPlaceholder')}
            rows={6}
            disabled={loading || !isActiveMode}
            className="min-h-[140px] resize-none"
          />
          <p className="text-xs text-muted-foreground">{t('helper')}</p>
        </div>

        {error && isActiveMode && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{t('tabs.ai')}</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <Button
            onClick={handleSubmit}
            disabled={loading || !isActiveMode}
            className="gap-2"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {loading ? t('loading') : t('submit')}
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setQuestion('');
              setResult(null);
              setError(null);
              setFeedbackChoice(null);
              setFeedbackNote('');
              setFeedbackSubmitted(false);
            }}
            disabled={loading && !question}
          >
            {t('clear')}
          </Button>
        </div>

        {result && (
          <div className="space-y-6 rounded-xl border border-primary/30 bg-background/80 p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  {t('result.title')}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground whitespace-pre-line">
                  {result.analysis}
                </p>
              </div>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {typeBadge}
              </Badge>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2">
                {t('result.valuesHeading')}
              </h4>
              <div className="grid gap-3 md:grid-cols-2">
                {(['a1', 'b1', 'a2', 'b2'] as Array<keyof DreisatzSolution['summary']>).map((key) => (
                  <div
                    key={key}
                    className="rounded-lg border border-border/60 bg-muted/40 p-3"
                  >
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      {t(`result.${
                        key === 'a1'
                          ? 'valueA1'
                          : key === 'b1'
                            ? 'valueB1'
                            : key === 'a2'
                              ? 'valueA2'
                              : 'valueB2'
                      }` as const)}
                    </p>
                    <p className="text-base font-semibold">
                      {result.summary[key].formatted}
                      {result.summary[key].unit ? ` ${result.summary[key].unit}` : ''}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-foreground">
                {t('result.stepsHeading')}
              </h4>
              <div className="space-y-3">
                {result.steps.map((step, index) => (
                  <div key={step.title} className="rounded-lg border bg-muted/30 p-4">
                    <p className="text-sm font-semibold text-primary">
                      {index + 1}. {step.title}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground whitespace-pre-line">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-foreground">
                {t('result.answerHeading')}
              </h4>
              <p className="rounded-lg border border-primary/30 bg-primary/5 p-4 text-sm font-medium text-primary">
                {result.answer}
                <br />
                <span className="text-xs text-muted-foreground">{result.formula}</span>
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button variant="outline" size="sm" className="gap-2" onClick={handleCopy}>
                <Copy className="h-4 w-4" />
                {t('result.copy')}
              </Button>
              <Button variant="outline" size="sm" className="gap-2" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
                {t('result.share')}
              </Button>
            </div>

            <div className="rounded-lg border border-dashed border-border/60 p-4">
              <p className="text-sm font-medium text-foreground mb-3">
                {t('feedback.question')}
              </p>
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant={feedbackChoice === 'up' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleFeedback('up')}
                  className="gap-2"
                >
                  <ThumbsUp className={cn('h-4 w-4', feedbackChoice === 'up' && 'fill-current')} />
                  {t('feedback.up')}
                </Button>
                <Button
                  type="button"
                  variant={feedbackChoice === 'down' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleFeedback('down')}
                  className="gap-2"
                >
                  <ThumbsDown className={cn('h-4 w-4', feedbackChoice === 'down' && 'fill-current')} />
                  {t('feedback.down')}
                </Button>
              </div>

              {feedbackChoice === 'down' && !feedbackSubmitted && (
                <div className="mt-4 space-y-3">
                  <Textarea
                    value={feedbackNote}
                    onChange={(event) => setFeedbackNote(event.target.value)}
                    placeholder={t('feedback.placeholder')}
                    rows={4}
                  />
                  <Button
                    type="button"
                    size="sm"
                    onClick={submitFeedback}
                    disabled={feedbackNote.trim().length < 3}
                  >
                    {t('feedback.submit')}
                  </Button>
                </div>
              )}

              {feedbackSubmitted && (
                <p className="mt-3 text-xs text-muted-foreground">
                  {feedbackChoice === 'up' ? t('feedback.positive') : t('feedback.submitted')}
                </p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
