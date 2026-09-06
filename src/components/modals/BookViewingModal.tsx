import React, { useState } from 'react';
import { Property } from '../../types/property';
import { X, Calendar, Clock, Car, ShieldCheck, MapPin, User } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BookViewingModalProps {
  isOpen: boolean;
  property: Property | null;
  onClose: () => void;
  onShowToast: (title: string, message: string, type: 'success' | 'error' | 'info') => void;
}

export const BookViewingModal: React.FC<BookViewingModalProps> = ({
  isOpen,
  property,
  onClose,
  onShowToast
}) => {
  if (!isOpen) return null;

  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [selectedDate, setSelectedDate] = useState('2026-08-25');
  const [selectedSlot, setSelectedSlot] = useState('10:30 AM - Morning VIP');
  const [pickupOption, setPickupOption] = useState<'luxury-chauffeur' | 'self-drive' | 'airport-vip'>('luxury-chauffeur');
  const [pickupAddress, setPickupAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phoneNumber) {
      onShowToast('Incomplete Form', 'Please provide your name and phone number.', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      onShowToast(
        'Private Tour Scheduled',
        `Thank you ${fullName}. Your private viewing appointment on ${selectedDate} (${selectedSlot}) has been confirmed. Our executive chauffeur will reach out prior to arrival.`,
        'success'
      );
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-arwin-gold/30 my-8">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-arwin-navy-deep to-arwin-navy p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-2 text-arwin-gold text-xs font-mono uppercase tracking-widest mb-1">
            <Car className="w-4 h-4" />
            <span>White-Glove Chauffeur Site Tour</span>
          </div>

          <h3 className="text-xl font-serif font-bold">
            Schedule Private Inspection
          </h3>
          {property && (
            <p className="text-xs text-gray-300 mt-1">
              Visiting: <strong className="text-white">{property.title}</strong> ({property.location})
            </p>
          )}
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="Dr. / Mr. / Ms. Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-300 text-xs font-semibold text-arwin-navy outline-none focus:ring-2 focus:ring-arwin-gold"
              />
            </div>

            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-700 mb-1">
                Mobile / WhatsApp *
              </label>
              <input
                type="tel"
                required
                placeholder="+91 / +1 / +971"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-300 text-xs font-semibold text-arwin-navy outline-none focus:ring-2 focus:ring-arwin-gold"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-300 text-xs font-semibold text-arwin-navy outline-none focus:ring-2 focus:ring-arwin-gold"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-700 mb-1">
                Preferred Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-300 text-xs font-semibold text-arwin-navy outline-none focus:ring-2 focus:ring-arwin-gold"
              />
            </div>

            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-700 mb-1">
                Preferred Time Slot
              </label>
              <select
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(e.target.value)}
                className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-300 text-xs font-semibold text-arwin-navy outline-none focus:ring-2 focus:ring-arwin-gold"
              >
                <option value="10:00 AM - Morning VIP">10:00 AM - Morning VIP</option>
                <option value="02:30 PM - Afternoon Briefing">02:30 PM - Afternoon Briefing</option>
                <option value="05:00 PM - Sunset Lakeview Viewing">05:00 PM - Sunset Lakeview Viewing</option>
              </select>
            </div>
          </div>

          {/* Transit / Chauffeur Preference */}
          <div>
            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-700 mb-1.5">
              Transportation & Chauffeur Preference
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPickupOption('luxury-chauffeur')}
                className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                  pickupOption === 'luxury-chauffeur'
                    ? 'border-arwin-gold bg-arwin-gold/10 text-arwin-navy font-bold'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                Mercedes / BMW Chauffeur
              </button>

              <button
                type="button"
                onClick={() => setPickupOption('airport-vip')}
                className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                  pickupOption === 'airport-vip'
                    ? 'border-arwin-gold bg-arwin-gold/10 text-arwin-navy font-bold'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                RGIA Airport VIP Pickup
              </button>

              <button
                type="button"
                onClick={() => setPickupOption('self-drive')}
                className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                  pickupOption === 'self-drive'
                    ? 'border-arwin-gold bg-arwin-gold/10 text-arwin-navy font-bold'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                Direct Site Arrival
              </button>
            </div>
          </div>

          {pickupOption !== 'self-drive' && (
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-700 mb-1">
                Pickup Address / Flight Details in Hyderabad
              </label>
              <input
                type="text"
                placeholder="e.g. ITC Kohenur, HITEC City or Flight AI 126"
                value={pickupAddress}
                onChange={(e) => setPickupAddress(e.target.value)}
                className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-300 text-xs font-semibold text-arwin-navy outline-none focus:ring-2 focus:ring-arwin-gold"
              />
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-gradient-to-r from-arwin-gold to-arwin-gold-dark hover:from-arwin-gold-bright hover:to-arwin-gold text-arwin-navy-deep font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-gold-glow transition-all"
            >
              {isSubmitting ? 'Confirming Tour...' : 'Confirm Private Chauffeur Site Visit'}
            </button>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-400 text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Strict Client Confidentiality & NDA Protected</span>
          </div>
        </form>
      </div>
    </div>
  );
};
