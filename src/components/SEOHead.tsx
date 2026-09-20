import React, { useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import { FeaturedProject } from '../types';
import { NewsArticle } from '../data/news';
import { CustomPage } from '../types/admin';

interface SEOHeadProps {
  currentPage: string;
  activeProject?: FeaturedProject | null;
  selectedArticle?: NewsArticle | null;
  activeCustomPage?: CustomPage | null;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  currentPage,
  activeProject,
  selectedArticle,
  activeCustomPage
}) => {
  const { seoSettings, settings } = useContent();

  useEffect(() => {
    if (!seoSettings) return;

    // 1. Determine active page key and overrides
    let pageKey = currentPage;
    if (currentPage === 'nri-connect') pageKey = 'nriConnect';

    const pageOverride = seoSettings.pageOverrides?.[pageKey];

    // 2. Compute dynamic title
    let title = '';
    if (currentPage === 'admin') {
      title = `CMS Admin Studio | ${seoSettings.siteTitle || 'ARWIN RISE'}`;
    } else if (activeProject) {
      title = `${activeProject.name} — ${activeProject.location} | ${seoSettings.siteTitle || 'ARWIN RISE'}`;
    } else if (selectedArticle) {
      title = `${selectedArticle.title} | Market Intelligence | ${seoSettings.siteTitle || 'ARWIN RISE'}`;
    } else if (activeCustomPage) {
      title = `${activeCustomPage.seoTitle || activeCustomPage.title} | ${seoSettings.siteTitle || 'ARWIN RISE'}`;
    } else if (pageOverride?.title) {
      title = pageOverride.title;
    } else {
      const pageNames: Record<string, string> = {
        home: 'Life Starts Here · Private Luxury Property Advisory',
        about: 'About Us · Advisory Heritage',
        'she-rise': 'SHE RISE · Empowering Women in Wealth, Leadership & Asset Ownership',
        'golden-circle': 'The Golden Circle · Private Syndicate & Elite Investor Club',
        residences: 'Curated Residences & Sky Villas',
        investors: 'Investor Advantage & High-Growth Corridors',
        nriConnect: 'NRI Connect & Cross-Border Wealth Advisory',
        contact: 'Contact & Private Client Desks',
        news: 'Market Intelligence'
      };
      const subtitle = pageNames[pageKey] || 'Private Property Advisory';
      title = `${seoSettings.siteTitle || 'ARWIN RISE'}${seoSettings.titleSeparator || ' | '}${subtitle}`;
    }

    // 3. Compute dynamic description
    let description = '';
    if (activeProject) {
      description = `${activeProject.name} in ${activeProject.location}. Starting at ${activeProject.priceStarting}. ${activeProject.description || ''}`.trim();
    } else if (selectedArticle) {
      description = selectedArticle.excerpt || selectedArticle.title;
    } else if (activeCustomPage) {
      description = activeCustomPage.seoDescription || activeCustomPage.heroSubtitle || activeCustomPage.title;
    } else if (pageOverride?.description) {
      description = pageOverride.description;
    } else {
      description = seoSettings.siteDescription;
    }

    // 4. Compute keywords
    const keywords = pageOverride?.keywords || (activeCustomPage?.category ? `${activeCustomPage.category}, luxury real estate, Arwin Rise` : seoSettings.siteKeywords);

    // 5. Compute canonical & OG URL
    const baseUrl = (seoSettings.canonicalBaseUrl || 'https://arwinrise.com').replace(/\/+$/, '');
    let pagePath = '';
    if (currentPage === 'admin') {
      pagePath = '#admin';
    } else if (activeProject) {
      pagePath = `#project-${activeProject.id}`;
    } else if (selectedArticle) {
      pagePath = `#article-${selectedArticle.id}`;
    } else if (activeCustomPage) {
      pagePath = `#page-${activeCustomPage.slug}`;
    } else if (currentPage !== 'home') {
      pagePath = `#${currentPage}`;
    }
    const currentUrl = pageOverride?.canonicalUrl || (pagePath ? `${baseUrl}/${pagePath}` : baseUrl);

    // 6. Compute OG & Social Image
    let ogImage = pageOverride?.ogImage || seoSettings.ogDefaultImage || '/images/hero-luxury-penthouse.jpg';
    if (activeProject?.image) {
      ogImage = activeProject.image;
    } else if (selectedArticle?.image) {
      ogImage = selectedArticle.image;
    } else if (activeCustomPage?.heroImage) {
      ogImage = activeCustomPage.heroImage;
    }
    if (ogImage && !ogImage.startsWith('http')) {
      ogImage = `${baseUrl}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`;
    }

    // 7. Compute Robots directive
    const isNoIndex = !seoSettings.allowIndexing || pageOverride?.noIndex || currentPage === 'admin';
    const robotsContent = isNoIndex
      ? 'noindex, nofollow'
      : `${seoSettings.allowIndexing ? 'index' : 'noindex'}, ${seoSettings.allowFollow ? 'follow' : 'nofollow'}`;

    // Apply to Document
    document.title = title;

    const setMetaTag = (selector: string, attrName: string, attrValue: string, content: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const setLinkTag = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    // Standard SEO Tags
    setMetaTag('meta[name="description"]', 'name', 'description', description);
    if (keywords) setMetaTag('meta[name="keywords"]', 'name', 'keywords', keywords);
    setMetaTag('meta[name="robots"]', 'name', 'robots', robotsContent);
    setMetaTag('meta[name="author"]', 'name', 'author', seoSettings.authorName || 'ARWIN RISE');
    setLinkTag('canonical', currentUrl);

    // Open Graph Tags
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', currentUrl);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', ogImage);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', activeProject || selectedArticle ? 'article' : 'website');
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', seoSettings.ogSiteName || 'ARWIN RISE');

    // Twitter Card Tags
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', seoSettings.twitterCardType || 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);
    if (seoSettings.twitterHandle) {
      setMetaTag('meta[name="twitter:site"]', 'name', 'twitter:site', seoSettings.twitterHandle);
    }

    // Webmaster Verification
    if (seoSettings.googleSearchConsoleTag) {
      setMetaTag('meta[name="google-site-verification"]', 'name', 'google-site-verification', seoSettings.googleSearchConsoleTag);
    }
    if (seoSettings.bingWebmasterTag) {
      setMetaTag('meta[name="msvalidate.01"]', 'name', 'msvalidate.01', seoSettings.bingWebmasterTag);
    }

    // 8. Dynamic Schema.org JSON-LD
    if (seoSettings.schemaEnabled) {
      let schemaScript = document.getElementById('arwin-seo-jsonld') as HTMLScriptElement | null;
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = 'arwin-seo-jsonld';
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }

      const organizationSchema: any = {
        '@context': 'https://schema.org',
        '@type': seoSettings.businessType || 'RealEstateAgent',
        'name': seoSettings.siteTitle || 'ARWIN RISE',
        'url': baseUrl,
        'logo': `${baseUrl}${settings.logoDarkUrl || '/images/arwin-rise-lockup.png'}`,
        'description': seoSettings.siteDescription,
        'telephone': settings.primaryPhone || '+91 84649 54321',
        'email': settings.publicContactEmail || 'concierge@arwinrise.com',
        'priceRange': seoSettings.priceRange || '₹1.5 Cr – ₹35 Cr+',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': seoSettings.streetAddress || 'Level 14, Galaxy Towers, Knowledge City, HITEC City',
          'addressLocality': seoSettings.addressLocality || 'Hyderabad',
          'addressRegion': seoSettings.addressRegion || 'Telangana',
          'postalCode': seoSettings.postalCode || '500081',
          'addressCountry': seoSettings.addressCountry || 'IN'
        },
        'openingHours': seoSettings.openingHours || 'Mo-Sa 09:00-19:00',
        'sameAs': [
          settings.instagramUrl,
          settings.linkedinUrl,
          settings.youtubeUrl
        ].filter(Boolean)
      };

      if (seoSettings.geoLatitude && seoSettings.geoLongitude) {
        organizationSchema.geo = {
          '@type': 'GeoCoordinates',
          'latitude': seoSettings.geoLatitude,
          'longitude': seoSettings.geoLongitude
        };
      }

      if (activeProject) {
        const projectSchema = {
          '@context': 'https://schema.org',
          '@type': 'SingleFamilyResidence',
          'name': activeProject.name,
          'description': activeProject.description,
          'image': ogImage,
          'address': {
            '@type': 'PostalAddress',
            'addressLocality': activeProject.location,
            'addressCountry': 'IN'
          },
          'offers': {
            '@type': 'Offer',
            'price': activeProject.priceStarting,
            'priceCurrency': 'INR',
            'availability': 'https://schema.org/InStock'
          }
        };
        schemaScript.textContent = JSON.stringify([organizationSchema, projectSchema]);
      } else {
        schemaScript.textContent = JSON.stringify(organizationSchema);
      }
    }

    // 9. Analytics & Tracking Scripts
    if (seoSettings.ga4MeasurementId) {
      const gaScriptId = 'ga4-gtag-script';
      if (!document.getElementById(gaScriptId)) {
        const gaScript = document.createElement('script');
        gaScript.id = gaScriptId;
        gaScript.async = true;
        gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${seoSettings.ga4MeasurementId}`;
        document.head.appendChild(gaScript);

        const gaConfig = document.createElement('script');
        gaConfig.id = 'ga4-init-script';
        gaConfig.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${seoSettings.ga4MeasurementId}');
        `;
        document.head.appendChild(gaConfig);
      }
    }

  }, [currentPage, activeProject, selectedArticle, seoSettings, settings]);

  return null;
};
