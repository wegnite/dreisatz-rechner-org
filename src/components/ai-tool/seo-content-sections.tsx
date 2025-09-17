import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Wand2,
  Zap,
  Shield,
  Users,
  Clock,
  Star,
  ArrowRight,
  CheckCircle,
  Camera,
  Palette,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

const CORE_FEATURES = [
  {
    icon: Camera,
    title: 'Natural Language Editing',
    description: 'Edit images using simple text prompts. Our AI understands complex instructions like GPT for images.',
  },
  {
    icon: Shield,
    title: 'Character Consistency',
    description: 'Maintain perfect character details across edits. This model excels at preserving faces and identities.',
  },
  {
    icon: Palette,
    title: 'Scene Blending',
    description: 'Seamlessly blend edits with original backgrounds. Superior scene fusion compared to other tools.',
  },
  {
    icon: Zap,
    title: 'One-Shot Editing',
    description: 'Perfect results in a single attempt. Our AI solves one-shot image editing challenges effortlessly.',
  },
  {
    icon: Users,
    title: 'Batch Processing',
    description: 'Process multiple images simultaneously. Support for advanced multi-image editing workflows.',
  },
  {
    icon: Star,
    title: 'AI Influencer Creation',
    description: 'Create consistent AI influencers and UGC content. Perfect for social media and marketing campaigns.',
  },
];

const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: 'Upload Your Image',
    description: 'Start by uploading any photo you want to transform. Our AI supports all common image formats.',
  },
  {
    step: 2,
    title: 'Describe Your Vision',
    description: 'Use natural language to describe the changes you want. Be as creative and detailed as you like.',
  },
  {
    step: 3,
    title: 'AI Magic Happens',
    description: 'Our advanced AI model processes your request and generates stunning results in seconds.',
  },
  {
    step: 4,
    title: 'Download & Share',
    description: 'Get your transformed image instantly. Download, share, or continue editing with new prompts.',
  },
];

const USE_CASES = [
  'Social Media Content Creation',
  'Professional Photography Enhancement',
  'Marketing Campaign Visuals',
  'AI Influencer Development',
  'E-commerce Product Photos',
  'Creative Art Projects',
  'Brand Identity Design',
  'Personal Photo Editing',
];

const BENEFITS = [
  'Save hours of manual editing time',
  'No technical skills required',
  'Consistent professional results',
  'Unlimited creative possibilities',
  'Cost-effective solution',
  'Real-time collaboration',
];

export function SeoContentSections() {
  return (
    <div className="space-y-16">
      {/* Core Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <Wand2 className="h-3.5 w-3.5 mr-2" />
            Core Features
          </Badge>
          <h2 className="text-3xl font-serif font-bold mb-4 md:text-4xl">
            Why Choose Our AI Editor?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the most advanced AI image editing technology. Our platform delivers 
            professional-grade results with simple text commands.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CORE_FEATURES.map((feature, index) => (
            <Card key={index} className="h-full border-l-4 border-l-blue-500">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                    <feature.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              <Clock className="h-3.5 w-3.5 mr-2" />
              How It Works
            </Badge>
            <h2 className="text-3xl font-serif font-bold mb-4 md:text-4xl">
              Transform Images in 4 Simple Steps
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our intuitive workflow makes professional image editing accessible to everyone. 
              No design experience needed.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {HOW_IT_WORKS_STEPS.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {step.step}
                  </div>
                  {index < HOW_IT_WORKS_STEPS.length - 1 && (
                    <ArrowRight className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 h-6 w-6 text-muted-foreground" />
                  )}
                </div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Sparkles className="h-4 w-4 mr-2" />
              Start Creating Now
            </Button>
          </div>
        </div>
      </section>

      {/* Use Cases & Benefits */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Use Cases */}
          <div>
            <Badge variant="outline" className="mb-4">
              <Users className="h-3.5 w-3.5 mr-2" />
              Use Cases
            </Badge>
            <h3 className="text-2xl font-serif font-bold mb-6">
              Perfect for Every Creative Need
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {USE_CASES.map((useCase, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">{useCase}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div>
            <Badge variant="outline" className="mb-4">
              <Star className="h-3.5 w-3.5 mr-2" />
              Benefits
            </Badge>
            <h3 className="text-2xl font-serif font-bold mb-6">
              Why Professionals Choose Us
            </h3>
            <div className="space-y-3">
              {BENEFITS.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Button variant="outline" className="group">
                Learn More About Benefits
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What Is AI Photo Editor Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-serif font-bold mb-4 md:text-4xl">
                What is AI Photo Editing?
              </h2>
              <p className="text-lg text-muted-foreground">
                Understanding the technology that's revolutionizing image creation
              </p>
            </div>

            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="text-muted-foreground mb-6">
                AI photo editing represents a groundbreaking shift in how we create and modify images. 
                Unlike traditional editing software that requires manual adjustments and technical expertise, 
                AI-powered tools use advanced machine learning models to understand and execute creative 
                instructions given in natural language.
              </p>

              <div className="grid md:grid-cols-2 gap-8 my-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Traditional Editing</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-muted-foreground">
                    <p>• Requires technical software knowledge</p>
                    <p>• Time-intensive manual processes</p>
                    <p>• Limited by user skill level</p>
                    <p>• Expensive professional software</p>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 dark:border-blue-800">
                  <CardHeader>
                    <CardTitle className="text-xl text-blue-600 dark:text-blue-400">
                      AI-Powered Editing
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>• Simple text-based instructions</p>
                    <p>• Instant professional results</p>
                    <p>• Accessible to all skill levels</p>
                    <p>• Cost-effective cloud solution</p>
                  </CardContent>
                </Card>
              </div>

              <p className="text-muted-foreground">
                Our AI model has been trained on millions of images and editing examples, enabling it to 
                understand complex creative concepts and execute them with precision. Whether you're adding 
                objects, changing backgrounds, adjusting lighting, or creating entirely new scenes, our AI 
                handles the technical complexity while you focus on your creative vision.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}