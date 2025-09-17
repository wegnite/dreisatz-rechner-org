'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCanvasStore } from '@/hooks/useCanvasState';
import { Redo, RotateCcw, Undo } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { type MutableRefObject, useRef } from 'react';
import { ExportPanel } from './canvas/ExportPanel';
import { KonvaStage } from './canvas/KonvaStage';
import { TemplateSelector } from './canvas/TemplateSelector';
import { TextEditor } from './canvas/TextEditor';

export function TotrMemeGenerator() {
  const t = useTranslations('TotrMemeGenerator');
  const stageRef = useRef(null);
  const { template, history, historyIndex, clearCanvas, undo, redo } =
    useCanvasStore();

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            🎨 {t('title')}
          </CardTitle>
          <p className="text-center text-muted-foreground">{t('subtitle')}</p>
        </CardHeader>
      </Card>

      {/* Main Layout */}
      <div className="space-y-6">
        {/* Top Row - Templates and Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <TemplateSelector />

          {/* Quick Actions */}
          {template && (
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-3">{t('quickActions.title')}</h3>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={undo}
                    disabled={!canUndo}
                    className="justify-center"
                  >
                    <Undo className="w-4 h-4 mr-1" />
                    {t('quickActions.undo')}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={redo}
                    disabled={!canRedo}
                    className="justify-center"
                  >
                    <Redo className="w-4 h-4 mr-1" />
                    {t('quickActions.redo')}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearCanvas}
                    className="justify-center text-destructive hover:text-destructive"
                  >
                    <RotateCcw className="w-4 h-4 mr-1" />
                    {t('quickActions.clearCanvas')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Main Content Row */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Canvas - Takes center position and more space */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <Card>
              <CardContent className="p-6">
                {template ? (
                  <div className="space-y-4">
                    <div className="text-center">
                      <h3 className="font-medium mb-2">{t('canvas.title')}</h3>
                      <p className="text-sm text-muted-foreground">
                        {t('canvas.description')}
                      </p>
                    </div>
                    <div className="flex justify-center">
                      <KonvaStage
                        className="mx-auto"
                        onStageRef={(ref) => {
                          if (stageRef.current !== ref) {
                            (stageRef as MutableRefObject<any>).current = ref;
                          }
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-96 border-2 border-dashed border-muted-foreground/20 rounded-lg">
                    <div className="text-center">
                      <p className="text-muted-foreground mb-2">
                        {t('canvas.selectTemplate')}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {t('canvas.selectTemplateHint')}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Text Editor and Export */}
          <div className="lg:col-span-1 order-1 lg:order-2 space-y-4 lg:max-h-[calc(100vh-12rem)] lg:overflow-y-auto lg:pr-2">
            <TextEditor />
            <ExportPanel stageRef={stageRef} />
          </div>
        </div>
      </div>

      {/* Tips */}
      {template && (
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-2">{t('tips.title')}</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>{t('tips.dragText')}</li>
              <li>{t('tips.clickEdit')}</li>
              <li>{t('tips.shortcuts')}</li>
              <li>{t('tips.styles')}</li>
              <li>{t('tips.watermark')}</li>
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
