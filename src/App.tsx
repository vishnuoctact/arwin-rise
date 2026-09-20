import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Preloader } from './components/Preloader';
import { SEOHead } from './components/SEOHead';

// Context
import { ContentProvider, useContent } from './context/ContentContext';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ResidencesPage } from './pages/ResidencesPage';
import { InvestorsPage } from './pages/InvestorsPage';
import { NriConnectPage } from './pages/NriConnectPage';
import { ContactPage } from './pages/ContactPage';
import { SheRisePage } from './pages/SheRisePage';
import { GoldenCirclePage } from './pages/GoldenCirclePage';
import { ProjectLandingPage } from './pages/ProjectLandingPage';
import { NewsArticlePage } from './pages/NewsArticlePage';
import { CustomDynamicPage } from './pages/CustomDynamicPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';

// Modals
import { PrivatePreviewModal } from './components/modals/PrivatePreviewModal';
import { VideoStoryModal } from './components/modals/VideoStoryModal';
import { PropertyDetailModal } from './components/modals/PropertyDetailModal';
import { NriConsultModal } from './components/modals/NriConsultModal';
import { InvestorRoiModal } from './components/modals/InvestorRoiModal';
import { CareerApplyModal } from './components/modals/CareerApplyModal';
import { ListPropertyModal } from './components/modals/ListPropertyModal';
import { AuthModal } from './components/modals/AuthModal';
import { SellerDashboardModal } from './components/modals/SellerDashboardModal';

import { CollectionTier, FeaturedProject } from './types';
import { NewsArticle } from './data/news';
import { CustomPage } from './types/admin';

function MainApp() {
  const { featuredProjects, newsArticles, customPages } = useContent();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [activeProject, setActiveProject] = useState<FeaturedProject | null>(null);
  const [activeCustomPage, setActiveCustomPage] = useState<CustomPage | null>(null);

  // Modals state
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isNriModalOpen, setIsNriModalOpen] = useState(false);
  const [isInvestorModalOpen, setIsInvestorModalOpen] = useState(false);
  const [isCareerModalOpen, setIsCareerModalOpen] = useState(false);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isDashboardModalOpen, setIsDashboardModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  // Selected item for modal inspection
  const [selectedCollection, setSelectedCollection] = useState<CollectionTier | null>(null);

  // Hash route listener
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      
      if (hash === 'admin') {
        setCurrentPage('admin');
        setActiveProject(null);
        setSelectedArticle(null);
        setActiveCustomPage(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (hash.startsWith('project-')) {
        const projectId = hash.replace('project-', '');
        const found = featuredProjects.find(p => p.id === projectId);
        if (found) {
          setActiveProject(found);
          setActiveCustomPage(null);
          setCurrentPage('project-landing');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      }

      if (hash.startsWith('article-')) {
        const articleId = hash.replace('article-', '');
        const found = newsArticles.find(a => a.id === articleId);
        if (found) {
          setSelectedArticle(found);
          setActiveProject(null);
          setActiveCustomPage(null);
          setCurrentPage('news-article');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      }

      // Check dynamic custom pages (#page-{slug} or direct #{slug})
      if (hash.startsWith('page-')) {
        const slug = hash.replace('page-', '');
        const found = (customPages || []).find(p => p.slug === slug);
        if (found) {
          setActiveCustomPage(found);
          setActiveProject(null);
          setSelectedArticle(null);
          setCurrentPage('custom-page');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      }

      const directCustomPage = (customPages || []).find(p => p.slug === hash);
      if (directCustomPage) {
        setActiveCustomPage(directCustomPage);
        setActiveProject(null);
        setSelectedArticle(null);
        setCurrentPage('custom-page');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const validPages = ['home', 'about', 'she-rise', 'golden-circle', 'residences', 'investors', 'nri-connect', 'contact', 'admin'];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
        setActiveProject(null);
        setActiveCustomPage(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [featuredProjects, newsArticles, customPages]);

  const navigateToPage = (page: string) => {
    if (page.startsWith('page-')) {
      const slug = page.replace('page-', '');
      const found = (customPages || []).find(p => p.slug === slug);
      if (found) {
        setActiveCustomPage(found);
      }
      setCurrentPage('custom-page');
      setActiveProject(null);
      setSelectedArticle(null);
      window.location.hash = page;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const directCustomPage = (customPages || []).find(p => p.slug === page);
    if (directCustomPage) {
      setActiveCustomPage(directCustomPage);
      setCurrentPage('custom-page');
      setActiveProject(null);
      setSelectedArticle(null);
      window.location.hash = `page-${directCustomPage.slug}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setCurrentPage(page);
    setActiveProject(null);
    setActiveCustomPage(null);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCollection = (item: CollectionTier) => {
    setSelectedCollection(item);
    setActiveProject(null);
  };

  // When clicking a project, navigate to its dedicated landing page!
  const handleSelectProject = (project: FeaturedProject) => {
    setActiveProject(project);
    setActiveCustomPage(null);
    setCurrentPage('project-landing');
    window.location.hash = `project-${project.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // When clicking a news article, navigate to its dedicated article page!
  const handleSelectArticle = (article: NewsArticle) => {
    setSelectedArticle(article);
    setActiveProject(null);
    setActiveCustomPage(null);
    setCurrentPage('news-article');
    window.location.hash = `article-${article.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dedicated Admin Screen View
  if (currentPage === 'admin') {
    return (
      <>
        <SEOHead 
          currentPage={currentPage} 
          activeProject={activeProject} 
          selectedArticle={selectedArticle} 
          activeCustomPage={activeCustomPage} 
        />
        <AdminDashboard onNavigateHome={() => navigateToPage('home')} />
      </>
    );
  }

  return (
    <>
      {/* Dynamic SEO & Meta Management */}
      <SEOHead 
        currentPage={currentPage} 
        activeProject={activeProject} 
        selectedArticle={selectedArticle} 
        activeCustomPage={activeCustomPage} 
      />

      {/* Minimal Luxury Preloader */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      <div className="min-h-screen bg-[#FAF7F2] text-[#222222] font-sans selection:bg-[#771722] selection:text-[#C5A880] relative flex flex-col justify-between">
        
        {/* Top Sticky Navbar */}
        <Navbar 
          currentPage={currentPage}
          onNavigate={navigateToPage}
          onOpenPreview={() => setIsPreviewModalOpen(true)}
          onOpenAuth={() => setIsAuthModalOpen(true)}
          onOpenDashboard={() => setIsDashboardModalOpen(true)}
          onOpenListModal={() => setIsListModalOpen(true)}
        />

        {/* Dynamic Page Views with Smooth Load Animation */}
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage + (activeProject ? `-${activeProject.id}` : '') + (selectedArticle ? `-${selectedArticle.id}` : '')}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {currentPage === 'home' && (
                <HomePage
                  onExploreCollections={() => {
                    const el = document.getElementById('collections');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  onWatchStory={() => setIsVideoModalOpen(true)}
                  onSelectCollection={handleSelectCollection}
                  onSelectProject={handleSelectProject}
                  onRequestPreview={() => setIsPreviewModalOpen(true)}
                  onOpenNriModal={() => setIsNriModalOpen(true)}
                  onOpenInvestorModal={() => setIsInvestorModalOpen(true)}
                  onNavigatePage={navigateToPage}
                  onSelectArticle={handleSelectArticle}
                  onOpenListModal={() => setIsListModalOpen(true)}
                  onOpenCareerModal={() => setIsCareerModalOpen(true)}
                  isLoaded={!loading}
                />
              )}

              {currentPage === 'project-landing' && activeProject && (
                <ProjectLandingPage
                  project={activeProject}
                  onNavigateHome={() => navigateToPage('home')}
                  onNavigateResidences={() => navigateToPage('residences')}
                  onRequestPreview={() => setIsPreviewModalOpen(true)}
                  onWatchVideo={() => setIsVideoModalOpen(true)}
                />
              )}

              {currentPage === 'news-article' && selectedArticle && (
                <NewsArticlePage
                  article={selectedArticle}
                  onNavigateHome={() => navigateToPage('home')}
                  onSelectArticle={handleSelectArticle}
                  onRequestPreview={() => setIsPreviewModalOpen(true)}
                />
              )}

              {currentPage === 'about' && (
                <AboutPage
                  onRequestPreview={() => setIsPreviewModalOpen(true)}
                  onNavigateHome={() => navigateToPage('home')}
                />
              )}

              {currentPage === 'she-rise' && (
                <SheRisePage
                  onRequestPreview={() => setIsPreviewModalOpen(true)}
                  onNavigateHome={() => navigateToPage('home')}
                />
              )}

              {currentPage === 'golden-circle' && (
                <GoldenCirclePage
                  onRequestPreview={() => setIsPreviewModalOpen(true)}
                  onNavigateHome={() => navigateToPage('home')}
                />
              )}

              {currentPage === 'residences' && (
                <ResidencesPage
                  onSelectCollection={handleSelectCollection}
                  onSelectProject={handleSelectProject}
                  onRequestPreview={() => setIsPreviewModalOpen(true)}
                  onNavigateHome={() => navigateToPage('home')}
                />
              )}

              {currentPage === 'investors' && (
                <InvestorsPage
                  onRequestPreview={() => setIsPreviewModalOpen(true)}
                  onOpenRoiModal={() => setIsInvestorModalOpen(true)}
                  onNavigateHome={() => navigateToPage('home')}
                />
              )}

              {currentPage === 'nri-connect' && (
                <NriConnectPage
                  onRequestPreview={() => setIsPreviewModalOpen(true)}
                  onNavigateHome={() => navigateToPage('home')}
                />
              )}

              {currentPage === 'contact' && (
                <ContactPage
                  onNavigateHome={() => navigateToPage('home')}
                />
              )}

              {currentPage === 'custom-page' && activeCustomPage && (
                <CustomDynamicPage
                  page={activeCustomPage}
                  onNavigateHome={() => navigateToPage('home')}
                  onOpenPreview={() => setIsPreviewModalOpen(true)}
                  onNavigate={navigateToPage}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Comprehensive Footer */}
        <Footer
          onNavigate={navigateToPage}
          onOpenPreview={() => setIsPreviewModalOpen(true)}
        />

        {/* Interactive Modals */}
        <PrivatePreviewModal
          isOpen={isPreviewModalOpen}
          onClose={() => setIsPreviewModalOpen(false)}
        />

        <VideoStoryModal
          isOpen={isVideoModalOpen}
          onClose={() => setIsVideoModalOpen(false)}
        />

        <PropertyDetailModal
          isOpen={!!selectedCollection}
          collectionData={selectedCollection}
          projectData={null}
          onClose={() => setSelectedCollection(null)}
          onBookPreview={() => {
            setSelectedCollection(null);
            setIsPreviewModalOpen(true);
          }}
        />

        <NriConsultModal
          isOpen={isNriModalOpen}
          onClose={() => setIsNriModalOpen(false)}
          onBookPass={() => {
            setIsNriModalOpen(false);
            setIsPreviewModalOpen(true);
          }}
        />

        <InvestorRoiModal
          isOpen={isInvestorModalOpen}
          onClose={() => setIsInvestorModalOpen(false)}
          onRequestInvestorBrief={() => {
            setIsInvestorModalOpen(false);
            setIsPreviewModalOpen(true);
          }}
        />

        <CareerApplyModal
          isOpen={isCareerModalOpen}
          onClose={() => setIsCareerModalOpen(false)}
        />

        <ListPropertyModal
          isOpen={isListModalOpen}
          onClose={() => setIsListModalOpen(false)}
          onOpenDashboard={() => setIsDashboardModalOpen(true)}
        />

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />

        <SellerDashboardModal
          isOpen={isDashboardModalOpen}
          onClose={() => setIsDashboardModalOpen(false)}
          onOpenSubmitModal={() => setIsListModalOpen(true)}
          onViewLiveProperty={(projectId) => {
            if (projectId) {
              const found = featuredProjects.find(p => p.id === projectId);
              if (found) {
                handleSelectProject(found);
                return;
              }
            }
            navigateToPage('residences');
          }}
        />

      </div>
    </>
  );
}

export function App() {
  return (
    <ContentProvider>
      <MainApp />
    </ContentProvider>
  );
}

export default App;
