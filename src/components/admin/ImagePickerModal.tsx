import React, { useState, useRef } from 'react';
import { useContent } from '../../context/ContentContext';
import { MediaItem } from '../../types/admin';
import {
  X,
  Upload,
  Search,
  Check,
  Trash2,
  Image as ImageIcon,
  Sparkles,
  Plus,
  Loader2
} from 'lucide-react';

interface ImagePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (imageUrl: string) => void;
  currentValue?: string;
  title?: string;
}

export const ImagePickerModal: React.FC<ImagePickerModalProps> = ({
  isOpen,
  onClose,
  onSelectImage,
  currentValue,
  title = 'Select Image from Media Library'
}) => {
  const { mediaGallery, uploadImageFile, deleteMediaItem } = useContent();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'hero', label: 'Hero Banners' },
    { id: 'residences', label: 'Residences' },
    { id: 'collections', label: 'Collections' },
    { id: 'uploads', label: 'My Uploads' }
  ];

  const filteredMedia = mediaGallery.filter((item) => {
    const matchCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.url.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith('image/')) {
          const uploadedUrl = await uploadImageFile(file, 'uploads');
          // If only 1 file was uploaded, auto select it!
          if (files.length === 1) {
            onSelectImage(uploadedUrl);
            onClose();
            return;
          }
        }
      }
    } catch (err) {
      alert('Error uploading image. Please try another image file.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileUpload(e.dataTransfer.files);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 selection:bg-[#771722] selection:text-[#C5A880]">
      <div className="bg-[#181614] border border-[#C5A880]/30 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-neutral-200">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-[#1F1C18] border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#771722]/30 text-[#C5A880] rounded-xl border border-[#771722]/60">
              <ImageIcon className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-serif text-[#FAF7F2] font-semibold">{title}</h2>
              <p className="text-[11px] text-neutral-400">
                Click any image to select or upload a new photo from your device.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar: Upload Button, Search, Categories */}
        <div className="p-4 bg-[#141210] border-b border-neutral-800/80 space-y-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search photo library by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-[#1F1C18] border border-neutral-800 rounded-xl text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-[#C5A880]"
              />
            </div>

            {/* Direct Upload Button */}
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleFileUpload(e.target.files)}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="w-full sm:w-auto px-4 py-2 bg-[#771722] hover:bg-[#8E1E2C] text-[#FAF7F2] rounded-xl text-xs font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 shadow-md disabled:opacity-50"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Image</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1 rounded-lg transition-colors whitespace-nowrap text-xs font-medium ${
                  activeCategory === cat.id
                    ? 'bg-[#C5A880]/20 text-[#C5A880] border border-[#C5A880]/40'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid & Upload Dropzone Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          
          {/* Drag & Drop Zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-4 sm:p-5 text-center cursor-pointer transition-colors ${
              dragOver
                ? 'border-[#C5A880] bg-[#C5A880]/10'
                : 'border-neutral-800 hover:border-neutral-700 bg-[#141210]/60'
            }`}
          >
            <div className="flex flex-col items-center justify-center gap-1.5 text-xs text-neutral-400">
              <Upload className="w-5 h-5 text-[#C5A880]" />
              <span className="font-medium text-neutral-200">
                Drag & drop photos here, or <span className="text-[#C5A880] underline">browse device</span>
              </span>
              <span className="text-[10px] text-neutral-500">Supports JPG, PNG, WebP (Automatically optimized for mobile & desktop)</span>
            </div>
          </div>

          {/* Images Grid */}
          {filteredMedia.length === 0 ? (
            <div className="text-center py-12 text-xs text-neutral-500">
              No photos found matching your search.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {filteredMedia.map((item) => {
                const isSelected = currentValue === item.url;
                return (
                  <div
                    key={item.id}
                    className={`group relative bg-[#1F1C18] border rounded-xl overflow-hidden flex flex-col transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#C5A880] shadow-lg ring-2 ring-[#C5A880]/40'
                        : 'border-neutral-800 hover:border-neutral-600'
                    }`}
                  >
                    {/* Thumbnail Image */}
                    <div
                      onClick={() => {
                        onSelectImage(item.url);
                        onClose();
                      }}
                      className="relative aspect-[16/10] bg-neutral-900 overflow-hidden"
                    >
                      <img
                        src={item.url}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLElement).style.opacity = '0.3';
                        }}
                      />

                      {/* Selected Badge */}
                      {isSelected && (
                        <div className="absolute top-2 right-2 bg-[#771722] text-[#FAF7F2] p-1 rounded-full shadow-md border border-[#C5A880]/50">
                          <Check className="w-3 h-3 text-[#C5A880]" />
                        </div>
                      )}

                      {/* Select Overlay on hover */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="px-3 py-1 bg-[#771722] text-white text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-md">
                          Select Photo
                        </span>
                      </div>
                    </div>

                    {/* Metadata Footer */}
                    <div className="p-2 bg-[#181614] flex items-center justify-between text-[10px]">
                      <div className="truncate flex-1 pr-1 text-neutral-300 font-medium">
                        {item.name}
                      </div>

                      {item.category === 'uploads' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (window.confirm(`Delete ${item.name} from gallery?`)) {
                              deleteMediaItem(item.id);
                            }
                          }}
                          className="p-1 text-neutral-500 hover:text-red-400 transition-colors"
                          title="Delete image"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#1F1C18] border-t border-neutral-800 flex items-center justify-between text-xs">
          <div className="text-[11px] text-neutral-500">
            {filteredMedia.length} assets available
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-xl transition-colors"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};
