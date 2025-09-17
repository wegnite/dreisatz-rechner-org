import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Star,
  Clock,
  Eye,
  Heart,
  Download,
  Share2,
  ArrowRight,
  Zap,
  Trophy,
  User,
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
    url: '/api/placeholder/400/500',
    title: 'Ultra-Fast Mountain Generation',
    prompt: 'A majestic snow-capped mountain at sunrise with golden lighting',
    style: 'Photorealistic',
    generationTime: '0.8s',
    views: 12543,
    likes: 892,
    downloads: 234,
    author: 'AlexArt',
    category: 'Landscape',
  },
  {
    id: '2',
    url: '/api/placeholder/400/500',
    title: 'Instant Garden Creation',
    prompt: 'Lush tropical garden with exotic flowers and butterflies',
    style: 'Artistic',
    generationTime: '1.2s',
    views: 8921,
    likes: 645,
    downloads: 178,
    author: 'NatureGuru',
    isPremium: true,
    category: 'Nature',
  },
  {
    id: '3',
    url: '/api/placeholder/400/500',
    title: 'Real-time Beach Synthesis',
    prompt: 'Crystal clear beach with turquoise water and palm trees',
    style: 'HDR',
    generationTime: '0.9s',
    views: 15672,
    likes: 1234,
    downloads: 445,
    author: 'BeachLover',
    category: 'Travel',
  },
  {
    id: '4',
    url: '/api/placeholder/400/500',
    title: 'Rapid Aurora Generation',
    prompt: 'Northern lights dancing over a frozen lake with stars',
    style: 'Cinematic',
    generationTime: '1.5s',
    views: 20145,
    likes: 1567,
    downloads: 623,
    author: 'SkyWatcher',
    isPremium: true,
    category: 'Celestial',
  },
  {
    id: '5',
    url: '/api/placeholder/400/500',
    title: 'Instant Portrait Transform',
    prompt: 'Professional headshot with studio lighting and bokeh',
    style: 'Portrait',
    generationTime: '0.7s',
    views: 9834,
    likes: 743,
    downloads: 298,
    author: 'PortraitPro',
    category: 'Portrait',
  },
  {
    id: '6',
    url: '/api/placeholder/400/500',
    title: 'Lightning-Fast City Scene',
    prompt: 'Futuristic cyberpunk cityscape with neon lights at night',
    style: 'Cyberpunk',
    generationTime: '1.1s',
    views: 18923,
    likes: 1432,
    downloads: 567,
    author: 'CyberArtist',
    isPremium: true,
    category: 'Sci-Fi',
  },
];

const TESTIMONIALS = [
  {
    name: 'AIArtistPro',
    role: 'Digital Creator',
    avatar: '/api/placeholder/40/40',
    quote: 'This editor completely changed my workflow. The character consistency is incredible - miles ahead of other tools!',
    rating: 5,
  },
  {
    name: 'ContentCreator',
    role: 'UGC Specialist',
    avatar: '/api/placeholder/40/40',
    quote: 'Creating consistent AI influencers has never been easier. It maintains perfect face details across edits!',
    rating: 5,
  },
  {
    name: 'PhotoEditor',
    role: 'Professional Editor',
    avatar: '/api/placeholder/40/40',
    quote: 'One-shot editing is basically solved with this tool. The scene blending is so natural and realistic!',
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
            Showcase
          </Badge>
          <h2 className="text-3xl font-serif font-bold mb-4 md:text-4xl">
            Lightning-Fast AI Creations
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what our AI generates in milliseconds. Every image created with simple text prompts 
            and delivered at lightning speed.
          </p>
        </div>

        {/* Featured Images Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {FEATURED_CREATIONS.map((image) => (
            <Card key={image.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
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
            Experience the power of instant AI generation yourself
          </p>
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            Try Our AI Generator
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
              Join thousands of creators who have transformed their workflow with our AI editor
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial, index) => (
              <Card key={index} className="bg-background border-l-4 border-l-yellow-400">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-sm">{testimonial.name}</h4>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  <blockquote className="text-sm text-muted-foreground">
                    "{testimonial.quote}"
                  </blockquote>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">500K+</div>
              <div className="text-sm text-muted-foreground">Images Generated</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">50K+</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">0.8s</div>
              <div className="text-sm text-muted-foreground">Avg. Generation Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}