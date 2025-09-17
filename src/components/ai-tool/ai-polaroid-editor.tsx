'use client';

import { useState, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  Upload,
  Wand2,
  Image as ImageIcon,
  Sparkles,
  Camera,
  Clock,
  Star,
  Download,
  Share2,
  Copy,
  Palette,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface StyleTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
  isPro?: boolean;
}

interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: Date;
  style: string;
}

const STYLE_TEMPLATES: StyleTemplate[] = [
  {
    id: 'vintage-polaroid',
    name: 'Vintage Polaroid',
    description: 'Classic instant camera aesthetic with warm tones',
    preview: '/api/placeholder/120/80',
  },
  {
    id: 'retro-film',
    name: 'Retro Film',
    description: '70s film photography with grain and faded colors',
    preview: '/api/placeholder/120/80',
  },
  {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    description: 'Clean, contemporary style with crisp edges',
    preview: '/api/placeholder/120/80',
    isPro: true,
  },
  {
    id: 'artistic-sketch',
    name: 'Artistic Sketch',
    description: 'Hand-drawn illustration style',
    preview: '/api/placeholder/120/80',
    isPro: true,
  },
];

const SAMPLE_GALLERY: GeneratedImage[] = [
  {
    id: '1',
    url: '/api/placeholder/300/400',
    prompt: 'A sunny beach vacation memory',
    timestamp: new Date(),
    style: 'Vintage Polaroid',
  },
  {
    id: '2',
    url: '/api/placeholder/300/400',
    prompt: 'City skyline at golden hour',
    timestamp: new Date(),
    style: 'Retro Film',
  },
  {
    id: '3',
    url: '/api/placeholder/300/400',
    prompt: 'Cozy coffee shop moment',
    timestamp: new Date(),
    style: 'Modern Minimal',
  },
];

export function AiPolaroidEditor() {
  const [selectedTab, setSelectedTab] = useState<'image-to-image' | 'text-to-image'>('image-to-image');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('vintage-polaroid');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('A futuristic city powered by nano technology, golden hour lighting, ultra detailed...');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>(SAMPLE_GALLERY);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setProgress(0);
    
    // Simulate generation progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const selectedTemplateData = STYLE_TEMPLATES.find(t => t.id === selectedTemplate);

  return (
    <div className="w-full">
      {/* Main Tool Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="bg-blue-600 hover:bg-blue-700 text-white mb-4">
              <Sparkles className="h-3.5 w-3.5 mr-2" />
              Get Started
            </Badge>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Try The AI Editor
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Experience the power of nano-banana's natural language image editing.
              Transform any photo with simple text commands
            </p>
          </div>

          {/* Two-Column Layout */}
          <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* Left Column - Input Controls */}
            <div className="space-y-6">
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2">
                    <Wand2 className="h-5 w-5 text-amber-400" />
                    <CardTitle className="text-white text-lg">Prompt Engine</CardTitle>
                  </div>
                  <CardDescription className="text-slate-400">
                    Transform your image with AI-powered editing
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Mode Selection */}
                  <Tabs value={selectedTab} onValueChange={(value) => setSelectedTab(value as any)} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-slate-700/50">
                      <TabsTrigger 
                        value="image-to-image" 
                        className="data-[state=active]:bg-amber-500 data-[state=active]:text-slate-900"
                      >
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Image to Image
                      </TabsTrigger>
                      <TabsTrigger 
                        value="text-to-image"
                        className="data-[state=active]:bg-slate-600 data-[state=active]:text-white"
                      >
                        <Palette className="h-4 w-4 mr-2" />
                        Text to Image
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="image-to-image" className="mt-6 space-y-6">
                      {/* Batch Processing Banner */}
                      <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-white font-medium">Batch Processing</span>
                            <Badge className="bg-amber-500 text-slate-900 text-xs">Pro</Badge>
                          </div>
                          <Button size="sm" variant="outline" className="border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-slate-900">
                            <Star className="h-3 w-3 mr-1" />
                            Upgrade
                          </Button>
                        </div>
                        <p className="text-slate-400 text-sm mt-2">
                          Enable batch mode to process multiple images at once
                        </p>
                      </div>

                      {/* Reference Image Upload */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <ImageIcon className="h-4 w-4 text-slate-400" />
                          <Label className="text-white font-medium">Reference Image</Label>
                          <Badge variant="outline" className="text-xs">0/9</Badge>
                        </div>
                        
                        <div 
                          className="border-2 border-dashed border-amber-500/30 rounded-lg p-8 text-center hover:border-amber-500/50 transition-colors cursor-pointer"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          {uploadedImage ? (
                            <img 
                              src={uploadedImage} 
                              alt="Uploaded" 
                              className="max-h-32 mx-auto rounded-lg object-cover"
                            />
                          ) : (
                            <div className="space-y-3">
                              <Upload className="h-8 w-8 text-amber-400 mx-auto" />
                              <div>
                                <p className="text-white font-medium">Add Image</p>
                                <p className="text-slate-400 text-sm">Max 50MB</p>
                              </div>
                            </div>
                          )}
                        </div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="text-to-image" className="mt-6">
                      <div className="text-center py-8 text-slate-400">
                        <Palette className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Text to Image mode - Create images from descriptions</p>
                      </div>
                    </TabsContent>
                  </Tabs>

                  {/* Main Prompt */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-slate-400" />
                      <Label className="text-white font-medium">Main Prompt</Label>
                    </div>
                    <Textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Describe how you want to transform your image..."
                      className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 min-h-[100px] resize-none"
                    />
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-slate-400 hover:text-white"
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Copy
                    </Button>
                  </div>

                  {/* Generate Button */}
                  <Button 
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold py-6 text-lg"
                  >
                    {isGenerating ? (
                      <>
                        <Clock className="h-5 w-5 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5 mr-2" />
                        Generate Now
                      </>
                    )}
                  </Button>

                  {isGenerating && (
                    <div className="space-y-2">
                      <Progress value={progress} className="h-2" />
                      <p className="text-sm text-slate-400 text-center">
                        Processing your request... {progress}%
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Output Gallery */}
            <div className="space-y-6">
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2">
                    <Camera className="h-5 w-5 text-blue-400" />
                    <CardTitle className="text-white text-lg">Output Gallery</CardTitle>
                  </div>
                  <CardDescription className="text-slate-400">
                    Your ultra-fast AI creations appear here instantly
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {generatedImages.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4">
                      {generatedImages.map((image) => (
                        <div key={image.id} className="group relative">
                          <img
                            src={image.url}
                            alt={image.prompt}
                            className="w-full aspect-[3/4] object-cover rounded-lg border border-slate-600"
                          />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                            <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="absolute bottom-2 left-2 right-2">
                            <div className="bg-black/80 rounded px-2 py-1">
                              <p className="text-white text-xs truncate">{image.prompt}</p>
                              <p className="text-slate-400 text-xs">{image.style}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <ImageIcon className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                      <h3 className="text-white text-lg font-medium mb-2">
                        Ready for instant generation
                      </h3>
                      <p className="text-slate-400">
                        Enter your prompt and unleash the power
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Style Templates */}
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-white text-lg">Style Templates</CardTitle>
                  <CardDescription className="text-slate-400">
                    Choose from professional presets
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {STYLE_TEMPLATES.map((template) => (
                      <div
                        key={template.id}
                        className={cn(
                          "border rounded-lg p-3 cursor-pointer transition-all",
                          selectedTemplate === template.id
                            ? "border-amber-500 bg-amber-500/10"
                            : "border-slate-600 hover:border-slate-500"
                        )}
                        onClick={() => setSelectedTemplate(template.id)}
                      >
                        <img
                          src={template.preview}
                          alt={template.name}
                          className="w-full aspect-[3/2] object-cover rounded mb-2"
                        />
                        <div className="space-y-1">
                          <div className="flex items-center gap-1">
                            <h4 className="text-white text-sm font-medium truncate">
                              {template.name}
                            </h4>
                            {template.isPro && (
                              <Badge className="bg-blue-600 text-white text-xs px-1">Pro</Badge>
                            )}
                          </div>
                          <p className="text-slate-400 text-xs">
                            {template.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}