import React, { useState, useEffect, useRef } from 'react';
import { ArwinLogo } from './ArwinLogo';
import { Menu, X, ArrowRight, User as UserIcon, Plus, Building2, LogOut, ChevronDown } from 'lucide-react';
import { useContent } from '../context/ContentContext';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenPreview?: () => void;
  onOpenAuth?: () => void;
  onOpenDashboard?: () => void;
  onOpenListModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentPage, 
  onNavigate, 
  onOpenAuth,
  onOpenDashboard,
  onOpenListModal
}) => {
  const { customPages, currentUser, userLogout, listingSubmissions } = useContent();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Standard core links
  const baseNavLinks = [
    { label: 'HOME', page: 'home' },
    { label: 'ABOUT US', page: 'about' },
    { label: 'RESIDENCES', page: 'residences' },
    { label: 'GOLDEN CIRCLE', page: 'golden-circle' },
    { label: 'NRI CONNECT', page: 'nri-connect' },
    { label: 'CONTACT', page: 'contact' },
  ];

  // Dynamically include published custom pages enabled for Navbar
  const dynamicCustomNavLinks = (customPages || [])
    .filter(cp => cp.isPublished && cp.showInNav)
    .map(cp => ({
      label: cp.title.toUpperCase(),
      page: `page-${cp.slug}`
    }));

  const navLinks = [...baseNavLinks, ...dynamicCustomNavLinks];

  const handleNavClick = (page: string) => {
    onNavigate(page);
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };

  const isTransparent = currentPage === 'home' && !isScrolled;

  const userSubmissionsCount = currentUser
    ? listingSubmissions.filter(
        s => s.userId === currentUser.id || s.email?.toLowerCase() === currentUser.email?.toLowerCase()
      ).length
    : 0;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent
          ? 'bg-[#FAF7F2]/95 backdrop-blur-md py-3 sm:py-3.5 border-b border-[#EAE3DA]/60'
          : 'bg-[#FAF7F2] py-2.5 sm:py-3 shadow-md border-b border-[#EAE3DA]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo Brand */}
          <button 
            onClick={() => handleNavClick('home')} 
            className="flex items-center group transition-transform duration-200 hover:scale-[1.01] text-left flex-shrink-0"
          >
            <ArwinLogo variant="dark" size="md" />
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center space-x-6 2xl:space-x-8">
            {navLinks.map((link) => {
              if (link.page === 'about') {
                return (
                  <div 
                    key={link.label}
                    className="relative group py-2"
                  >
                    <button
                      onClick={() => handleNavClick('about')}
                      className={`text-[11px] font-sans font-medium tracking-[0.16em] uppercase transition-all duration-200 relative flex items-center gap-1 cursor-pointer ${
                        currentPage === 'about' || currentPage === 'she-rise'
                          ? 'text-[#771722] font-semibold'
                          : 'text-[#55504A] group-hover:text-[#771722]'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown className="w-3 h-3 text-[#C5A880] transition-transform duration-200 group-hover:rotate-180" />
                      {(currentPage === 'about' || currentPage === 'she-rise') && (
                        <span className="absolute -bottom-1 left-0 w-full h-[1.6px] bg-[#C5A880]" />
                      )}
                    </button>

                    {/* Clean Dropdown Menu */}
                    <div className="absolute top-full left-0 w-60 bg-[#FAF7F2] border border-[#EAE3DA] shadow-xl py-1.5 z-50 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 translate-y-1 group-hover:translate-y-0">
                      <button
                        onClick={() => handleNavClick('about')}
                        className={`w-full text-left px-4 py-2.5 text-[11px] font-sans tracking-[0.14em] uppercase transition-colors cursor-pointer ${
                          currentPage === 'about'
                            ? 'bg-[#771722]/8 text-[#771722] font-bold'
                            : 'text-[#55504A] hover:bg-[#F0EBE1] hover:text-[#771722]'
                        }`}
                      >
                        Our Heritage & Leadership
                      </button>

                      <div className="my-1 border-t border-[#EAE3DA]/70" />

                      <button
                        onClick={() => handleNavClick('she-rise')}
                        className={`w-full text-left px-4 py-2.5 text-[11px] font-sans tracking-[0.14em] uppercase transition-colors cursor-pointer ${
                          currentPage === 'she-rise'
                            ? 'bg-[#771722]/8 text-[#771722] font-bold'
                            : 'text-[#55504A] hover:bg-[#F0EBE1] hover:text-[#771722]'
                        }`}
                      >
                        SHE RISE
                      </button>
                    </div>
                  </div>
                );
              }

              if (link.page === 'golden-circle') {
                return (
                  <div 
                    key={link.label}
                    className="relative group py-2"
                  >
                    <button
                      onClick={() => handleNavClick('golden-circle')}
                      className={`text-[11px] font-sans font-medium tracking-[0.16em] uppercase transition-all duration-200 relative flex items-center gap-1 cursor-pointer ${
                        currentPage === 'golden-circle' || currentPage === 'investors'
                          ? 'text-[#771722] font-semibold'
                          : 'text-[#55504A] group-hover:text-[#771722]'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown className="w-3 h-3 text-[#C5A880] transition-transform duration-200 group-hover:rotate-180" />
                      {(currentPage === 'golden-circle' || currentPage === 'investors') && (
                        <span className="absolute -bottom-1 left-0 w-full h-[1.6px] bg-[#C5A880]" />
                      )}
                    </button>

                    {/* Clean Dropdown Menu */}
                    <div className="absolute top-full left-0 w-56 bg-[#FAF7F2] border border-[#EAE3DA] shadow-xl py-1.5 z-50 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 translate-y-1 group-hover:translate-y-0">
                      <button
                        onClick={() => handleNavClick('golden-circle')}
                        className={`w-full text-left px-4 py-2.5 text-[11px] font-sans tracking-[0.14em] uppercase transition-colors cursor-pointer ${
                          currentPage === 'golden-circle'
                            ? 'bg-[#771722]/8 text-[#771722] font-bold'
                            : 'text-[#55504A] hover:bg-[#F0EBE1] hover:text-[#771722]'
                        }`}
                      >
                        Golden Circle Club
                      </button>

                      <div className="my-1 border-t border-[#EAE3DA]/70" />

                      <button
                        onClick={() => handleNavClick('investors')}
                        className={`w-full text-left px-4 py-2.5 text-[11px] font-sans tracking-[0.14em] uppercase transition-colors cursor-pointer ${
                          currentPage === 'investors'
                            ? 'bg-[#771722]/8 text-[#771722] font-bold'
                            : 'text-[#55504A] hover:bg-[#F0EBE1] hover:text-[#771722]'
                        }`}
                      >
                        Investors
                      </button>
                    </div>
                  </div>
                );
              }

              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.page)}
                  className={`text-[11px] font-sans font-medium tracking-[0.16em] uppercase transition-all duration-200 relative py-1 cursor-pointer ${
                    currentPage === link.page
                      ? 'text-[#771722] font-semibold'
                      : 'text-[#55504A] hover:text-[#771722]'
                  }`}
                >
                  {link.label}
                  {currentPage === link.page && (
                    <span className="absolute -bottom-1 left-0 w-full h-[1.6px] bg-[#C5A880]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop Right Action CTAs */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            
            {/* Post Luxury Property Quick Trigger */}
            <button
              onClick={onOpenListModal}
              className="group inline-flex items-center gap-1.5 bg-[#771722] hover:bg-[#8E1E2C] text-white px-4 py-2 text-[10.5px] font-sans font-bold tracking-widest uppercase shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-[#C5A880] group-hover:rotate-90 transition-transform duration-200" />
              <span>POST PROPERTY</span>
            </button>

            {/* Patron / Seller User Profile Trigger */}
            {currentUser ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#141210] border border-[#C5A880]/50 text-[#FAF7F2] text-[10.5px] font-medium tracking-wider rounded-lg hover:border-[#C5A880] transition-all shadow-sm cursor-pointer"
                >
                  <div className="w-5 h-5 rounded-full bg-[#C5A880] text-[#141210] flex items-center justify-center font-bold text-[9px]">
                    {currentUser.name.slice(0, 1).toUpperCase()}
                  </div>
                  <span className="truncate max-w-[90px]">{currentUser.name.split(' ')[0]}</span>
                  {userSubmissionsCount > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full bg-[#771722] text-[9px] text-white font-mono">
                      {userSubmissionsCount}
                    </span>
                  )}
                  <ChevronDown className="w-3 h-3 text-[#C5A880]" />
                </button>

                {/* Profile Dropdown */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#141210] border border-[#C5A880]/40 rounded-xl shadow-2xl p-2 z-50 text-[#FAF7F2] animate-fadeIn">
                    <div className="px-3 py-2 border-b border-white/10 mb-1">
                      <div className="text-xs font-serif font-medium text-white truncate">{currentUser.name}</div>
                      <div className="text-[10px] text-[#C5A880] truncate">{currentUser.email}</div>
                    </div>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        if (onOpenDashboard) onOpenDashboard();
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 text-xs text-[#FAF7F2] flex items-center justify-between transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Building2 className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span>My Submissions</span>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white font-mono">
                        {userSubmissionsCount}
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        if (onOpenListModal) onOpenListModal();
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 text-xs text-[#FAF7F2] flex items-center gap-2 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>Submit New Property</span>
                    </button>

                    <div className="my-1 border-t border-white/10" />

                    <button
                      onClick={() => {
                        userLogout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-950/40 text-xs text-red-400 flex items-center gap-2 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-[10.5px] font-sans font-medium tracking-wider uppercase text-[#141210] hover:text-[#771722] transition-colors cursor-pointer"
                title="Patron Sign In"
              >
                <UserIcon className="w-3.5 h-3.5 text-[#771722]" />
                <span>SIGN IN</span>
              </button>
            )}

          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center lg:hidden flex-shrink-0 gap-2">
            <button
              onClick={onOpenListModal}
              className="p-1.5 text-[10px] uppercase font-bold tracking-wider text-[#771722] bg-[#771722]/10 border border-[#771722]/30 px-2.5"
            >
              + Post
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#771722] hover:bg-neutral-200/50 rounded-none focus:outline-none flex items-center justify-center cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 stroke-[2.2]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-t border-[#EAE3DA] shadow-2xl px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-1.5">
            {navLinks.map((link) => {
              if (link.page === 'about') {
                return (
                  <div key={link.label} className="space-y-1">
                    <button
                      onClick={() => handleNavClick('about')}
                      className={`text-xs font-sans tracking-widest uppercase py-2.5 px-3 rounded-none flex items-center justify-between text-left w-full transition-colors cursor-pointer ${
                        currentPage === 'about'
                          ? 'bg-[#771722]/10 text-[#771722] font-bold border-l-2 border-[#771722]'
                          : 'text-[#4A4A4A] hover:bg-[#F0EBE1]'
                      }`}
                    >
                      <span>ABOUT US</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]" />
                    </button>
                    
                    {/* SHE RISE Mobile Sub-link */}
                    <button
                      onClick={() => handleNavClick('she-rise')}
                      className={`text-xs font-sans tracking-widest uppercase py-2 pl-6 pr-3 rounded-none flex items-center justify-between text-left w-full transition-colors cursor-pointer ${
                        currentPage === 'she-rise'
                          ? 'bg-[#771722]/10 text-[#771722] font-bold border-l-2 border-[#771722]'
                          : 'text-[#55504A] hover:bg-[#F0EBE1] hover:text-[#771722]'
                      }`}
                    >
                      <span>SHE RISE</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]" />
                    </button>
                  </div>
                );
              }

              if (link.page === 'golden-circle') {
                return (
                  <div key={link.label} className="space-y-1">
                    <button
                      onClick={() => handleNavClick('golden-circle')}
                      className={`text-xs font-sans tracking-widest uppercase py-2.5 px-3 rounded-none flex items-center justify-between text-left w-full transition-colors cursor-pointer ${
                        currentPage === 'golden-circle'
                          ? 'bg-[#771722]/10 text-[#771722] font-bold border-l-2 border-[#771722]'
                          : 'text-[#4A4A4A] hover:bg-[#F0EBE1]'
                      }`}
                    >
                      <span>GOLDEN CIRCLE</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]" />
                    </button>
                    
                    {/* Golden Circle Club Mobile Sub-link */}
                    <button
                      onClick={() => handleNavClick('golden-circle')}
                      className={`text-xs font-sans tracking-widest uppercase py-2 pl-6 pr-3 rounded-none flex items-center justify-between text-left w-full transition-colors cursor-pointer ${
                        currentPage === 'golden-circle'
                          ? 'bg-[#771722]/10 text-[#771722] font-bold border-l-2 border-[#771722]'
                          : 'text-[#55504A] hover:bg-[#F0EBE1] hover:text-[#771722]'
                      }`}
                    >
                      <span>GOLDEN CIRCLE CLUB</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]" />
                    </button>

                    {/* Investors Mobile Sub-link */}
                    <button
                      onClick={() => handleNavClick('investors')}
                      className={`text-xs font-sans tracking-widest uppercase py-2 pl-6 pr-3 rounded-none flex items-center justify-between text-left w-full transition-colors cursor-pointer ${
                        currentPage === 'investors'
                          ? 'bg-[#771722]/10 text-[#771722] font-bold border-l-2 border-[#771722]'
                          : 'text-[#55504A] hover:bg-[#F0EBE1] hover:text-[#771722]'
                      }`}
                    >
                      <span>INVESTORS</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]" />
                    </button>
                  </div>
                );
              }

              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.page)}
                  className={`text-xs font-sans tracking-widest uppercase py-2.5 px-3 rounded-none flex items-center justify-between text-left w-full transition-colors cursor-pointer ${
                    currentPage === link.page
                      ? 'bg-[#771722]/10 text-[#771722] font-bold border-l-2 border-[#771722]'
                      : 'text-[#4A4A4A] hover:bg-[#F0EBE1]'
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]" />
                </button>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-[#EAE3DA] flex flex-col gap-2.5">
            {/* Post Property Mobile CTA */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenListModal) onOpenListModal();
              }}
              className="w-full bg-[#771722] hover:bg-[#8E1E2C] text-white py-3 px-4 text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#C5A880]" />
              <span>POST LUXURY PROPERTY</span>
            </button>

            {/* Patron Auth / Dashboard Portal Mobile */}
            {currentUser ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenDashboard) onOpenDashboard();
                }}
                className="w-full bg-[#141210] text-[#C5A880] py-3 px-4 text-xs font-medium tracking-wider uppercase flex items-center justify-between border border-[#C5A880]/40 rounded-lg"
              >
                <div className="flex items-center gap-2 truncate">
                  <UserIcon className="w-4 h-4 text-[#C5A880]" />
                  <span className="truncate">{currentUser.name}</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#C5A880]/20 text-[#C5A880]">
                  {userSubmissionsCount} Listings &rarr;
                </span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenAuth) onOpenAuth();
                }}
                className="w-full py-2.5 text-xs text-[#55504A] hover:text-[#771722] font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5"
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span>Patron & Seller Sign In</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
