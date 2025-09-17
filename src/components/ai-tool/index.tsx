import { AiPolaroidEditor } from './ai-polaroid-editor';
import { SeoContentSections } from './seo-content-sections';
import { FeaturedGallery } from './featured-gallery';

export function AiToolHomepage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Main AI Tool Section */}
      <AiPolaroidEditor />
      
      {/* SEO Content Sections */}
      <SeoContentSections />
      
      {/* Featured Gallery & Social Proof */}
      <FeaturedGallery />
    </div>
  );
}

export { AiPolaroidEditor, SeoContentSections, FeaturedGallery };