import React, { useState, useRef } from 'react';
import { ImagePickerModal } from './ImagePickerModal';
import { useContent } from '../../context/ContentContext';
import { ImageIcon, Upload, Eye, Loader2, Sparkles } from 'lucide-react';

interface ImageInputWithPickerProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  helperText?: string;
}

export const ImageInputWithPicker: React.FC<ImageInputWithPickerProps> = ({
  label,
  value,
  onChange,
  helperText
}) => {
  const { uploadImageFile } = useContent();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const quickInputRef = useRef<HTMLInputElement | null>(null);

  const handleQuickUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const newUrl = await uploadImageFile(file, 'uploads');
      onChange(newUrl);
    } catch {
      alert('Error processing image upload.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-1.5 text-xs">
      <label className="block text-neutral-300 font-medium">{label}</label>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        
        {/* Preview Thumbnail Box */}
        <div 
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-24 h-20 sm:h-16 bg-neutral-900 border border-neutral-700 rounded-xl overflow-hidden relative group cursor-pointer shrink-0 shadow-inner flex items-center justify-center"
          title="Click to change image"
        >
          {value ? (
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          ) : (
            <ImageIcon className="w-5 h-5 text-neutral-600" />
          )}

          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] text-[#C5A880] font-bold uppercase tracking-wider">
            Change
          </div>
        </div>

        {/* Input & Action Buttons */}
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="e.g. /images/hero-scene.jpg or https://..."
              className="flex-1 px-3 py-2 bg-[#141210] border border-neutral-700 rounded-lg text-neutral-100 placeholder-neutral-500 text-xs focus:outline-none focus:border-[#C5A880]"
            />

            {/* Browse Gallery Button */}
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="px-3.5 py-2 bg-[#771722] hover:bg-[#8E1E2C] text-[#FAF7F2] rounded-lg text-xs font-semibold tracking-wider transition-colors flex items-center gap-1.5 whitespace-nowrap shadow-sm"
              title="Open Photo Gallery"
            >
              <ImageIcon className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Browse Gallery</span>
            </button>

            {/* Quick Upload from Device Button */}
            <input
              ref={quickInputRef}
              type="file"
              accept="image/*"
              onChange={handleQuickUpload}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => quickInputRef.current?.click()}
              disabled={isUploading}
              className="p-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg transition-colors border border-neutral-700 shrink-0"
              title="Upload new image directly"
            >
              {isUploading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Upload className="w-3.5 h-3.5 text-emerald-400" />
              )}
            </button>
          </div>

          {helperText && (
            <p className="text-[10.5px] text-neutral-500">{helperText}</p>
          )}
        </div>

      </div>

      {/* Gallery Modal Picker */}
      <ImagePickerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectImage={onChange}
        currentValue={value}
        title={`Choose Photo for ${label}`}
      />
    </div>
  );
};
