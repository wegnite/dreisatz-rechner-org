import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowRight,
  Clock,
  Download,
  Eye,
  Heart,
  Share2,
  Star,
  Trophy,
  User,
  Zap,
} from 'lucide-react';
import Link from 'next/link';

interface FeaturedImage {
  id: string;
  url: string;
  title: string;
  prompt: string;
  style: string;
  generationTime: string;
  views: number;
  likes: number;
  downloads: number;
  author: string;
  isPremium?: boolean;
  category: string;
}

const FEATURED_CREATIONS: FeaturedImage[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1502154882433-a614dba12819?auto=format&fit=crop&w=1200&q=80',
    title: 'Golden Hour Rooftop',
    prompt:
      'AI polaroid photo of friends silhouetted on a rooftop at sunset, handwritten caption “golden glow story”',
    style: 'Vintage Film Polaroid',
    generationTime: '0.8s',
    views: 15432,
    likes: 1092,
    downloads: 284,
    author: 'DreamLab',
    category: 'Lifestyle Polaroid',
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1612863217797-5f62b68fba65?auto=format&fit=crop&w=1200&q=80',
    title: 'Neon City Story',
    prompt:
      'AI polaroid photo of a neon Tokyo alley, rain-soaked pavement, neon pink caption “midnight run”',
    style: 'Retro Chrome Polaroid',
    generationTime: '1.1s',
    views: 11234,
    likes: 845,
    downloads: 318,
    author: 'NeonFox',
    isPremium: true,
    category: 'Travel Polaroid',
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1554304247-fdb3fdcf9d0c?auto=format&fit=crop&w=1200&q=80',
    title: 'Cozy Cafe Memory',
    prompt:
      'AI polaroid photo of a couple in a candlelit cafe, soft grain, caption “latte love”',
    style: 'Modern Minimal Polaroid',
    generationTime: '0.9s',
    views: 18652,
    likes: 1434,
    downloads: 512,
    author: 'CafeMuse',
    category: 'Lifestyle Polaroid',
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1607827447604-d9a8c439186e?auto=format&fit=crop&w=1200&q=80',
    title: 'Aurora Night Polaroid',
    prompt:
      'AI polaroid photo of northern lights over a frozen lake with handwritten caption “arctic glow”',
    style: 'Cinematic Polaroid',
    generationTime: '1.4s',
    views: 22451,
    likes: 1794,
    downloads: 702,
    author: 'SkyWatcher',
    isPremium: true,
    category: 'Adventure Polaroid',
  },
  {
    id: '5',
    url: 'https://images.unsplash.com/photo-1617643049028-0135c6a2678f?auto=format&fit=crop&w=1200&q=80',
    title: 'Studio Portrait Keepsake',
    prompt:
      'AI polaroid photo of a model with studio lighting, sharp eyes, caption “campaign day”',
    style: 'Editorial Polaroid',
    generationTime: '0.7s',
    views: 13221,
    likes: 923,
    downloads: 384,
    author: 'PortraitPro',
    category: 'Campaign Polaroid',
  },
  {
    id: '6',
    url: 'https://images.unsplash.com/photo-1602692095685-d571be22806c?auto=format&fit=crop&w=1200&q=80',
    title: 'Neo-Noir Night Run',
    prompt:
      'AI polaroid photo of a cyberpunk street racer, blue neon, caption “02:17 am”',
    style: 'Cyberpunk Polaroid',
    generationTime: '1.1s',
    views: 19873,
    likes: 1542,
    downloads: 612,
    author: 'CyberArtist',
    isPremium: true,
    category: 'Fandom Polaroid',
  },
];

const TESTIMONIALS = [
  {
    name: 'AIArtistPro',
    role: 'Digital Creator',
    initials: 'AP',
    gradient: 'from-cyan-400 to-blue-500',
    quote:
      'This AI polaroid editor completely changed my workflow. The character consistency across every frame is incredible.',
    rating: 5,
  },
  {
    name: 'ContentCreator',
    role: 'UGC Specialist',
    initials: 'CC',
    gradient: 'from-amber-400 to-orange-500',
    quote:
      'Creating consistent AI influencers has never been easier. Each polaroid drop keeps faces and styling perfectly aligned.',
    rating: 5,
  },
  {
    name: 'PhotoEditor',
    role: 'Professional Editor',
    initials: 'PE',
    gradient: 'from-fuchsia-400 to-purple-500',
    quote:
      'One-shot polaroid editing is basically solved here. The blending and film grain feel handcrafted every time.',
    rating: 5,
  },
];

export function FeaturedGallery() {
  return (
    <div className="space-y-16">
      {/* Featured Gallery Header */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white mb-4">
            <Trophy className="h-3.5 w-3.5 mr-2" />
            Polaroid Gallery
          </Badge>
          <h2 className="text-3xl font-serif font-bold mb-4 md:text-4xl">
            AI Polaroid Photo Gallery
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how creators turn simple prompts into AI polaroid photos with
            film-grade borders, captions, and nostalgic moods.
          </p>
        </div>

        {/* Featured Images Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {FEATURED_CREATIONS.map((image) => (
            <Card
              key={image.id}
              className="group hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>

                {/* Speed Badge */}
                <div className="absolute top-3 left-3">
                  <Badge className="bg-green-500 text-white text-xs">
                    <Zap className="h-3 w-3 mr-1" />
                    {image.generationTime}
                  </Badge>
                </div>

                {/* Premium Badge */}
                {image.isPremium && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs">
                      <Star className="h-3 w-3 mr-1" />
                      Pro
                    </Badge>
                  </div>
                )}

                {/* Category Badge */}
                <div className="absolute bottom-3 left-3">
                  <Badge variant="secondary" className="text-xs">
                    {image.category}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                  {image.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  "{image.prompt}"
                </p>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {image.views.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      {image.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <Download className="h-3 w-3" />
                      {image.downloads}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span>{image.author}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            See how fast you can develop your own AI polaroid photos
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Open the AI Polaroid Generator
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </section>

      {/* User Reviews Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              <Star className="h-3.5 w-3.5 mr-2" />
              User Reviews
            </Badge>
            <h2 className="text-3xl font-serif font-bold mb-4 md:text-4xl">
              What Creators Are Saying
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of creators who have transformed their workflow
              with our AI polaroid photo generator
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial, index) => (
              <Card
                key={index}
                className="relative overflow-hidden border border-white/10 bg-[#0b102d]/80 backdrop-blur transition-transform duration-300 hover:-translate-y-1"
              >
                <CardContent className="relative z-10 p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${testimonial.gradient} text-sm font-semibold text-white shadow-lg`}
                    >
                      {testimonial.initials}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs text-slate-300/80">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4 flex items-center gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400 drop-shadow-[0_0_8px_rgba(255,214,102,0.35)]"
                      />
                    ))}
                  </div>

                  <blockquote className="text-sm leading-relaxed text-slate-200/90">
                    “{testimonial.quote}”
                  </blockquote>
                </CardContent>
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,205,92,0.16),transparent_60%)] opacity-70" />
              </Card>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">500K+</div>
              <div className="text-sm text-muted-foreground">
                Images Generated
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">50K+</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                0.8s
              </div>
              <div className="text-sm text-muted-foreground">
                Avg. Generation Time
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">
                99.9%
              </div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
