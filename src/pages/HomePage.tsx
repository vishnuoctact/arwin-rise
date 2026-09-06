import React from 'react';
import { Hero } from '../components/Hero';
import { ValueProps } from '../components/ValueProps';
import { CollectionSection } from '../components/CollectionSection';
import { ServicesAndTestimonials } from '../components/ServicesAndTestimonials';
import { ReviewsSection } from '../components/ReviewsSection';
import { PostLuxuryPropertyBanner } from '../components/PostLuxuryPropertyBanner';
import { PartnerWithUsBanner } from '../components/PartnerWithUsBanner';
import { NewsSection } from '../components/NewsSection';
import { QuickEnquiryBanner } from '../components/QuickEnquiryBanner';
import { CollectionTier, FeaturedProject } from '../types';
import { NewsArticle } from '../data/news';

interface HomePageProps {
  onExploreCollections: () => void;
  onWatchStory: () => void;
  onSelectCollection: (c: CollectionTier) => void;
  onSelectProject: (p: FeaturedProject) => void;
  onRequestPreview: () => void;
  onOpenNriModal: () => void;
  onOpenInvestorModal: () => void;
  onNavigatePage: (page: string) => void;
  onSelectArticle: (article: NewsArticle) => void;
  onOpenListModal?: () => void;
  onOpenCareerModal?: () => void;
  isLoaded?: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({
  onExploreCollections,
  onWatchStory,
  onSelectCollection,
  onSelectProject,
  onRequestPreview,
  onOpenNriModal,
  onOpenInvestorModal,
  onNavigatePage,
  onSelectArticle,
  onOpenListModal,
  onOpenCareerModal,
  isLoaded = true
}) => {
  return (
    <>
      {/* Hero Section */}
      <Hero
        onExploreClick={onExploreCollections}
        onWatchStory={onWatchStory}
        isLoaded={isLoaded}
      />

      {/* 4 Pillars Value Proposition Ribbon */}
      <ValueProps
        onNriClick={() => onNavigatePage('nri-connect')}
        onInvestorClick={() => onNavigatePage('investors')}
        onTrustClick={() => onNavigatePage('about')}
      />

      {/* The Arwin Collection (Tiers 01, 02, 03) */}
      <CollectionSection
        onSelectCollection={onSelectCollection}
        onExploreAll={() => onNavigatePage('residences')}
        onOpenRoiModal={onOpenInvestorModal}
      />

      {/* Post Your Luxury Property ("Grade-A Luxury Residences Only") */}
      <PostLuxuryPropertyBanner
        onOpenListModal={onOpenListModal || onRequestPreview}
      />

      {/* Triptych Service Pillars & Global NRI Advisory ("Tailored for Discerning Clients") */}
      <ServicesAndTestimonials
        onNriClick={() => onNavigatePage('nri-connect')}
        onInvestorClick={() => onNavigatePage('investors')}
        onRequestPreview={onRequestPreview}
      />

      {/* Verified Client Reviews & Endorsements */}
      <ReviewsSection
        onRequestPreview={onRequestPreview}
      />

      {/* Panoramic Skyline Quick Enquiry Banner ("Request Confidential Portfolio Advisory") */}
      <QuickEnquiryBanner
        onRequestPreview={onRequestPreview}
      />

      {/* News & Industry Briefings Section */}
      <NewsSection
        onSelectArticle={onSelectArticle}
      />

      {/* Partner With Us - Careers & Strategic Partnerships (Directly Above Footer) */}
      <PartnerWithUsBanner
        onOpenCareerModal={onOpenCareerModal || onRequestPreview}
      />
    </>
  );
};
