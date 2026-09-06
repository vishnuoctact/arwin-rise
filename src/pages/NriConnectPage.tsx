import React, { useState } from 'react';
import { PageHero } from '../components/PageHero';
import { Globe, Video, FileCheck, ShieldCheck, Clock, ArrowRight, DollarSign, CheckCircle2, Phone, Calendar } from 'lucide-react';
import { useContent } from '../context/ContentContext';

interface NriConnectPageProps {
  onRequestPreview: () => void;
  onNavigateHome: () => void;
}

const FALLBACK_STEPS = [
  {
    id: 'step-1',
    step: '01',
    title: 'Virtual 4K Site & Drone Tour',
    desc: 'Experience high-definition 360° architectural tours, live floor plan previews, and real-time sunset balcony view simulations with our senior architects.'
  },
  {
    id: 'step-2',
    step: '02',
    title: 'FEMA & Banking Structuring',
    desc: 'Seamless guidance on setting up NRE/NRO accounts, wire transfers in compliance with Reserve Bank of India (RBI) guidelines, and tax optimization.'
  },
  {
    id: 'step-3',
    step: '03',
    title: 'Digital Legal Diligence & PoA',
    desc: 'Complete transparent legal verification. Consular Power of Attorney (PoA) attestation and registration handled end-to-end without requiring physical travel.'
  },
  {
    id: 'step-4',
    step: '04',
    title: 'Turnkey Asset & Tenant Management',
    desc: 'From key handover to bespoke luxury interior fit-outs, tenant screening, rental collection, and maintenance—managed by your dedicated client partner.'
  }
];

const DEFAULT_RATES: Record<string, number> = {
  USD: 87.2,
  AED: 23.7,
  GBP: 110.5,
  EUR: 91.8,
  SGD: 64.8,
  CAD: 61.2
};

export const NriConnectPage: React.FC<NriConnectPageProps> = ({
  onRequestPreview,
  onNavigateHome
}) => {
  const { nriPage } = useContent();

  const heroTag = nriPage?.heroTag || "GLOBAL NRI DESK";
  const heroTitle = nriPage?.heroTitle || "Closer to Home. Always.";
  const heroSubtitle = nriPage?.heroSubtitle || "Trusted by 300+ NRI patrons across North America, Europe, the Middle East, and Asia for effortless, transparent real estate investments in Hyderabad.";

  const featureTag = nriPage?.featureTag || "SEAMLESS CROSS-BORDER INVESTMENT";
  const featureTitle = nriPage?.featureTitle || "Invest in India's #1 Real Estate Market from Anywhere in the World";
  const featureDescription = nriPage?.featureDescription || "Hyderabad’s rapid infrastructure growth and stable currency appreciation make it the prime investment destination for global Indians. We eliminate the complexities of remote buying through verified legal compliance and timezone-dedicated advisors.";
  const featureBullets = nriPage?.featureBullets || [
    "Zero Physical Travel Required",
    "100% Repatriable Capital Guidance",
    "Consular PoA Assistance",
    "24/7 Global NRI Concierge Desk"
  ];
  const featureCtaText = nriPage?.featureCtaText || "BOOK 1-ON-1 NRI CONSULTATION";
  const featureImage = nriPage?.featureImage || "/images/nri-exec.jpg";

  const calculatorTag = nriPage?.calculatorTag || "FINANCIAL TOOLS";
  const calculatorTitle = nriPage?.calculatorTitle || "Global Currency Estimator";
  const calculatorSubtitle = nriPage?.calculatorSubtitle || "Estimate your investment equivalent across major international currencies.";
  const rates = nriPage?.exchangeRates || DEFAULT_RATES;

  const stepsTag = nriPage?.stepsTag || "STEP-BY-STEP PROCESS";
  const stepsTitle = nriPage?.stepsTitle || "How Remote Property Acquisition Works";
  const nriSteps = nriPage?.steps?.length ? nriPage.steps : FALLBACK_STEPS;

  const timezoneTag = nriPage?.timezoneTag || "24/7 TIMEZONE-ALIGNED CONCIERGE";
  const timezoneTitle = nriPage?.timezoneTitle || "Connect at your local business hours.";
  const timezoneDescription = nriPage?.timezoneDescription || "Our NRI desk operates aligned with US (PST / EST), UK (GMT), Gulf (GST), and Singapore (SGT) hours for uninterrupted advisory.";
  const timezoneCtaText = nriPage?.timezoneCtaText || "SCHEDULE PRIVATE VIDEO CALL";

  const [selectedCurrency, setSelectedCurrency] = useState<'USD' | 'AED' | 'GBP' | 'EUR' | 'SGD' | 'CAD'>('USD');
  const [amountInr, setAmountInr] = useState<number>(25000000); // 2.5 Cr

  const currentRate = rates[selectedCurrency] || DEFAULT_RATES[selectedCurrency] || 87.2;
  const convertedAmount = Math.round(amountInr / currentRate).toLocaleString();

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Page Hero */}
      <PageHero
        tag={heroTag}
        title={heroTitle}
        subtitle={heroSubtitle}
        breadcrumbs={['NRI Connect']}
        onNavigateHome={onNavigateHome}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20 space-y-16 lg:space-y-20">
        
        {/* Top Banner Feature Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-[#EAE3DA] p-6 sm:p-10 shadow-sm">
          <div className="lg:col-span-7 space-y-6">
            <div className="text-[10px] font-sans font-semibold tracking-[0.2em] text-[#C5A880] uppercase">
              {featureTag}
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#222222] font-normal leading-tight">
              {featureTitle}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed">
              {featureDescription}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {featureBullets.map((bullet, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-sans text-[#333333]">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A880] flex-shrink-0" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={onRequestPreview}
                className="group inline-flex items-center gap-2 bg-[#771722] hover:bg-[#8E1E2C] text-white px-6 py-3 text-xs font-sans font-semibold tracking-wider uppercase rounded-sm shadow-md transition-all cursor-pointer"
              >
                <span>{featureCtaText}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C5A880] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative aspect-[4/3] bg-neutral-100 overflow-hidden border border-[#EAE3DA]">
            <img
              src={featureImage}
              alt="NRI Business Executive"
              className="w-full h-full object-cover object-center filter brightness-[1.01]"
            />
          </div>
        </div>

        {/* Currency Converter & Investment Brackets */}
        <div className="bg-white border border-[#EAE3DA] p-6 sm:p-10 shadow-sm">
          <div className="max-w-xl mb-6">
            <div className="text-[10px] font-sans font-semibold tracking-[0.2em] text-[#C5A880] uppercase mb-1">
              {calculatorTag}
            </div>
            <h3 className="font-serif text-2xl text-[#222222] font-normal">
              {calculatorTitle}
            </h3>
            <p className="text-xs text-neutral-500 font-sans mt-1">
              {calculatorSubtitle}
            </p>
          </div>

          {/* Currency Pill Selector */}
          <div className="flex flex-wrap gap-2 mb-6">
            {(['USD', 'AED', 'GBP', 'EUR', 'SGD', 'CAD'] as const).map(curr => (
              <button
                key={curr}
                onClick={() => setSelectedCurrency(curr)}
                className={`px-4 py-2 text-xs font-sans font-semibold rounded-sm transition-all cursor-pointer ${
                  selectedCurrency === curr
                    ? 'bg-[#771722] text-white shadow-sm'
                    : 'bg-[#FAF7F2] text-neutral-600 hover:bg-neutral-200 border border-[#EAE3DA]'
                }`}
              >
                {curr} ({curr === 'USD' ? '$' : curr === 'AED' ? 'AED' : curr === 'GBP' ? '£' : curr === 'EUR' ? '€' : '$'})
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center p-6 bg-[#FAF7F2] border border-[#EAE3DA]">
            <div>
              <label className="text-[10.5px] font-sans font-bold uppercase text-neutral-600 block mb-1.5">
                Select Indian Property Bracket (INR)
              </label>
              <select
                value={amountInr}
                onChange={(e) => setAmountInr(Number(e.target.value))}
                className="w-full p-3 bg-white border border-[#EAE3DA] text-xs font-sans text-[#222222] font-semibold rounded-sm focus:outline-none focus:border-[#C5A880] cursor-pointer"
              >
                <option value={12500000}>₹ 1.25 Crore (Signature High-Rise)</option>
                <option value={18500000}>₹ 1.85 Crore (Zenith Towers 3 BHK)</option>
                <option value={25000000}>₹ 2.50 Crore (Private Residence Suite)</option>
                <option value={34000000}>₹ 3.40 Crore (Shankarpally Luxury Villa)</option>
                <option value={55000000}>₹ 5.50 Crore (Legacy Signature Estate)</option>
              </select>
            </div>

            <div className="text-center p-4 bg-white border border-[#C5A880]/50 shadow-sm">
              <div className="text-[10px] text-neutral-400 font-sans uppercase tracking-wider">
                Approximate Value in {selectedCurrency}
              </div>
              <div className="font-serif text-3xl font-semibold text-[#771722] mt-1">
                ~ {selectedCurrency} ${convertedAmount}
              </div>
              <div className="text-[10px] text-[#C5A880] font-sans mt-0.5">
                Calculated at current live indicative exchange rate (1 {selectedCurrency} = ₹{currentRate})
              </div>
            </div>
          </div>
        </div>

        {/* 4-Step Seamless NRI Buying Journey */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="text-[10px] font-sans font-semibold tracking-[0.2em] text-[#C5A880] uppercase mb-1">
              {stepsTag}
            </div>
            <h2 className="font-serif text-3xl text-[#222222] font-normal">
              {stepsTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {nriSteps.map((s, idx) => (
              <div key={s.id || idx} className="bg-white border border-[#EAE3DA] p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
                <div>
                  <div className="text-2xl font-serif font-bold text-[#C5A880] mb-3">{s.step || `0${idx + 1}`}</div>
                  <h4 className="font-serif text-lg font-normal text-[#222222] mb-2">{s.title}</h4>
                  <p className="text-xs text-neutral-600 font-sans leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timezone Support Box */}
        <div className="bg-[#771722] text-white p-8 sm:p-10 border border-[#C5A880]/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <div className="text-[10px] font-sans font-semibold tracking-widest text-[#C5A880] uppercase">
              {timezoneTag}
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-light">
              {timezoneTitle}
            </h3>
            <p className="text-xs text-neutral-300 font-sans max-w-lg">
              {timezoneDescription}
            </p>
          </div>

          <div className="flex-shrink-0">
            <button
              onClick={onRequestPreview}
              className="bg-[#C5A880] hover:bg-[#D4B993] text-[#2D1B22] px-6 py-3 text-xs font-sans font-bold tracking-wider uppercase rounded-sm shadow-md transition-colors cursor-pointer"
            >
              {timezoneCtaText}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
