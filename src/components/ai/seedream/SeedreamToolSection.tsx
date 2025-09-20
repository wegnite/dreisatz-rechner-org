'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ImageIcon, Sparkles, Upload } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';

export function SeedreamToolSection() {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('');
  const [aspectRatio, setAspectRatio] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const defaultPrompt = useMemo(
    () =>
      'Ultra-detailed cinematic photo, soft rim lighting, 35mm lens, 8k, Seedream 4.0 style — breathtaking composition, volumetric fog, intricate details, hyperreal texture',
    []
  );

  function handlePickFiles() {
    inputRef.current?.click();
  }

  function handleFilesSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const list = Array.from(e.target.files || []).slice(0, 5);
    setFiles(list);
  }

  function handleGenerate() {
    const finalPrompt = prompt.trim() ? prompt : defaultPrompt;
    if (!prompt.trim()) setPrompt(finalPrompt);
    // TODO: wire to actual generation action
  }

  return (
    <div className="space-y-8">
      {/* Centered headline above two-column layout */}
      <div className="text-center">
        <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-balance mb-3">
          Turn Your Dreams into Reality
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
          Seedream 4.0 transforms your imagination into stunning visual art.
          Upload a reference or start from text to bloom breathtaking images.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-10 items-start">
        {/* Left Column: Inputs */}
        <div className="space-y-6">
          <Card className="p-6 space-y-6">
            {/* Upload first */}
            <div className="space-y-2">
              <Label className="text-base font-medium">
                Image Upload (optional)
              </Label>
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFilesSelected}
              />
              <button
                type="button"
                className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer w-full"
                onClick={handlePickFiles}
                aria-label="Upload image"
              >
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Upload one or more inspiration images (max 5, PNG/JPG/WebP)
                </p>
                {files.length > 0 && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    {files.length} image(s) selected
                  </p>
                )}
              </button>
            </div>

            {/* Prompt second */}
            <div className="space-y-2">
              <Label
                htmlFor="seedream-prompt"
                className="text-base font-medium"
              >
                Describe your dream
              </Label>
              <Input
                id="seedream-prompt"
                placeholder={defaultPrompt}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="h-12"
              />
              <p className="text-xs text-muted-foreground">
                If left empty, a high-quality default prompt will be used.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-base font-medium">Style Preset</Label>
                <Select value={style} onValueChange={setStyle}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Choose a style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dreamlike">Dreamlike</SelectItem>
                    <SelectItem value="surreal">Surreal</SelectItem>
                    <SelectItem value="ethereal">Ethereal</SelectItem>
                    <SelectItem value="fantastical">Fantastical</SelectItem>
                    <SelectItem value="mystical">Mystical</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-base font-medium">Aspect Ratio</Label>
                <Select value={aspectRatio} onValueChange={setAspectRatio}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select ratio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1:1">Square (1:1)</SelectItem>
                    <SelectItem value="16:9">Landscape (16:9)</SelectItem>
                    <SelectItem value="9:16">Portrait (9:16)</SelectItem>
                    <SelectItem value="4:3">Standard (4:3)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full h-12 text-base font-medium"
              onClick={handleGenerate}
            >
              <Sparkles className="h-5 w-5 mr-2" />
              Generate with Seedream 4.0
            </Button>
          </Card>
        </div>

        {/* Right Column: Outputs */}
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">Your Dream Garden</h3>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Card
                  key={i}
                  className="aspect-square overflow-hidden group cursor-pointer"
                >
                  <CardContent className="p-0 h-full">
                    <div className="h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-secondary/30 transition-all">
                      <ImageIcon className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="p-6">
            <h4 className="font-medium mb-3">🌱 Dream Tips</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Let your imagination run wild with impossible scenarios</li>
              <li>• Combine unexpected elements for unique results</li>
              <li>• Use emotional words to set the mood</li>
              <li>• Think beyond reality - this is your dream world</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
