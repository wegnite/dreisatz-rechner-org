import PricingSection from '@/components/blocks/pricing/pricing';
import { AiPolaroidEditor } from './ai-polaroid-editor';
import { FeaturedGallery } from './featured-gallery';
import { SeoContentSections } from './seo-content-sections';

export function AiToolHomepage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Main AI Tool Section */}
      <AiPolaroidEditor />

      {/* SEO Content Sections */}
      <SeoContentSections />

      {/* Featured Gallery & Social Proof */}
      <FeaturedGallery />

      {/* Pricing Plans */}
      <PricingSection />
    </div>
  );
}

export { AiPolaroidEditor, SeoContentSections, FeaturedGallery };
