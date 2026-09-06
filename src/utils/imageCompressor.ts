/**
 * Utility to compress client-uploaded images to optimized WebP/JPEG data URLs
 * Keeps file sizes lightweight (< 250KB) while retaining crisp luxury sharpness.
 */
export async function compressImageFile(file: File, maxDimension = 1920, quality = 0.84): Promise<{ url: string; sizeFormatted: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (event) => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return resolve({
            url: event.target?.result as string,
            sizeFormatted: `${Math.round(file.size / 1024)} KB`
          });
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Try WebP first, fallback to JPEG
        let dataUrl = canvas.toDataURL('image/webp', quality);
        if (!dataUrl.startsWith('data:image/webp')) {
          dataUrl = canvas.toDataURL('image/jpeg', quality);
        }

        const approxBytes = Math.round((dataUrl.length * 3) / 4);
        const sizeFormatted = approxBytes > 1024 * 1024 
          ? `${(approxBytes / (1024 * 1024)).toFixed(1)} MB` 
          : `${Math.round(approxBytes / 1024)} KB`;

        resolve({ url: dataUrl, sizeFormatted });
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}
