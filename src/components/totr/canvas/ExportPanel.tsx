'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useCanvasStore } from '@/hooks/useCanvasState';
import { useImageExport } from '@/hooks/useImageExport';
import { Download, Image, Sparkles, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';

interface ExportPanelProps {
  stageRef: React.RefObject<any>;
  className?: string;
}

export function ExportPanel({ stageRef, className }: ExportPanelProps) {
  const t = useTranslations('TotrMemeGenerator.exportPanel');
  const { exportSettings, updateExportSettings, template } = useCanvasStore();
  const { downloadImage } = useImageExport();
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  const handleExport = async (isPremium = false) => {
    if (!template) return;

    setIsExporting(true);
    setExportSuccess(false);

    try {
      const options = {
        format: exportSettings.format,
        quality: exportSettings.quality,
        scale: isPremium ? 2 : 1, // 2x scale for premium
        includeWatermark: !isPremium, // No watermark for premium
      };

      const success = await downloadImage(stageRef, undefined, options);

      if (success) {
        setExportSuccess(true);
        setTimeout(() => setExportSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleSettingChange = (key: string, value: any) => {
    updateExportSettings({ [key]: value });
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="w-5 h-5" />
          {t('title')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Format Selection */}
        <div className="space-y-2">
          <Label>{t('format')}</Label>
          <RadioGroup
            value={exportSettings.format}
            onValueChange={(value) => handleSettingChange('format', value)}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="png" id="png" />
              <Label htmlFor="png" className="cursor-pointer">
                {t('formatPng')}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="jpg" id="jpg" />
              <Label htmlFor="jpg" className="cursor-pointer">
                {t('formatJpg')}
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Quality Setting */}
        <div className="space-y-2">
          <Label>{t('quality')}</Label>
          <Select
            value={exportSettings.quality.toString()}
            onValueChange={(value) =>
              handleSettingChange('quality', Number.parseFloat(value))
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0.7">{t('qualityStandard')}</SelectItem>
              <SelectItem value="0.8">{t('qualityHigh')}</SelectItem>
              <SelectItem value="0.9">{t('qualitySuper')}</SelectItem>
              <SelectItem value="1.0">{t('qualityMax')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Watermark Setting */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>{t('watermark')}</Label>
            <Switch
              checked={exportSettings.includeWatermark}
              onCheckedChange={(checked) =>
                handleSettingChange('includeWatermark', checked)
              }
            />
          </div>
          <p className="text-xs text-muted-foreground">{t('watermarkNote')}</p>
        </div>

        {/* Export Buttons */}
        <div className="space-y-2">
          {/* Free Export */}
          <Button
            onClick={() => handleExport(false)}
            disabled={isExporting || !template}
            className="w-full h-9"
            variant="default"
            size="sm"
          >
            {isExporting ? (
              <>
                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2" />
                {t('generating')}
              </>
            ) : (
              <>
                <Image className="w-3 h-3 mr-2" />
                {t('freeExport')}
              </>
            )}
          </Button>

          {/* Premium Export */}
          <Button
            onClick={() => handleExport(true)}
            disabled={isExporting || !template}
            className="w-full h-9"
            variant="outline"
            size="sm"
          >
            <Sparkles className="w-3 h-3 mr-2" />
            {t('premiumExport')}
          </Button>

          {/* Success Message */}
          {exportSuccess && (
            <div className="text-center">
              <p className="text-xs text-green-600 font-medium">
                {t('exportSuccess')}
              </p>
            </div>
          )}
        </div>

        {/* Export Info - Collapsed */}
        <div className="bg-muted/30 rounded-lg p-2">
          <details className="group">
            <summary className="cursor-pointer flex items-center gap-2 text-sm font-medium">
              <Zap className="w-4 h-4" />
              {t('exportInfo.title')}
              <span className="ml-auto group-open:rotate-90 transition-transform">
                ▶
              </span>
            </summary>
            <div className="mt-2 space-y-1">
              <p className="text-xs text-muted-foreground">
                • {t('exportInfo.freeNote')}
              </p>
              <p className="text-xs text-muted-foreground">
                • {t('exportInfo.premiumNote')}
              </p>
            </div>
          </details>
        </div>

        {/* Payment Upgrade Hint - Compact */}
        <div className="border border-dashed border-primary/20 rounded-lg p-1 text-center">
          <p className="text-xs text-primary font-medium mb-1">
            {t('upgradeHint.title')}
          </p>
          <Button size="sm" variant="outline" className="text-xs h-6 px-2">
            {t('upgradeHint.learnMore')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
