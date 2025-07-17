import { useEffect } from 'react';

/**
 * ImagePreloader компоненті аса маңызды суреттерді алдын ала жүктейді
 * Бұл нашар интернет байланысында пайдаланушы тәжірибесін жақсартады
 */
const ImagePreloader = ({ images = [], priority = false }) => {
  useEffect(() => {
    if (!images.length) return;

    const preloadImages = async () => {
      const promises = images.map((imageSrc) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          
          // High priority images load first
          if (priority) {
            img.fetchPriority = 'high';
          }
          
          img.onload = () => resolve(imageSrc);
          img.onerror = () => {
            console.warn(`Failed to preload image: ${imageSrc}`);
            resolve(imageSrc); // Continue with other images
          };
          
          img.src = imageSrc;
        });
      });

      try {
        await Promise.allSettled(promises);
        console.log(`Preloaded ${images.length} images successfully`);
      } catch (error) {
        console.warn('Some images failed to preload:', error);
      }
    };

    // Start preloading after a small delay to not block initial render
    const timer = setTimeout(preloadImages, priority ? 0 : 100);
    
    return () => clearTimeout(timer);
  }, [images, priority]);

  // This component doesn't render anything visible
  return null;
};

export default ImagePreloader;
