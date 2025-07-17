import { useState, useEffect } from "react";

/**
 * WebP Support Detector and Fallback Image Component
 * Automatically chooses WebP format if supported, otherwise falls back to JPEG/PNG
 */
const SmartImage = ({
  src,
  alt,
  className = "",
  style = {},
  onClick,
  priority = false,
  placeholder = true,
}) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [webpSupported, setWebpSupported] = useState(null);

  // Check WebP support
  useEffect(() => {
    const checkWebPSupport = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 1;
      canvas.height = 1;
      const ctx = canvas.getContext("2d");
      const imageData = ctx.getImageData(0, 0, 1, 1);
      canvas.toBlob((blob) => {
        setWebpSupported(blob && blob.type === "image/webp");
      }, "image/webp");
    };

    if (webpSupported === null) {
      checkWebPSupport();
    }
  }, [webpSupported]);

  // Determine optimal image source
  useEffect(() => {
    if (webpSupported !== null && src) {
      // Try to convert JPEG/PNG to WebP path
      const webpSrc = src.replace(/\.(jpe?g|png)$/i, ".webp");
      const finalSrc = webpSupported && webpSrc !== src ? webpSrc : src;
      setImageSrc(finalSrc);
    }
  }, [src, webpSupported]);

  // Preload image
  useEffect(() => {
    if (!imageSrc) return;

    const img = new Image();

    if (priority) {
      img.fetchPriority = "high";
    }

    img.onload = () => {
      setLoaded(true);
      setError(false);
    };

    img.onerror = () => {
      // Fallback to original if WebP fails
      if (imageSrc !== src) {
        setImageSrc(src);
      } else {
        setError(true);
      }
    };

    img.src = imageSrc;
  }, [imageSrc, src, priority]);

  if (error) {
    return (
      <div
        className={`bg-gray-200 flex items-center justify-center text-gray-500 text-sm ${className}`}
        style={style}
      >
        Сурет жүктелмеді
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      {/* Animated placeholder */}
      {placeholder && !loaded && (
        <div
          className={`absolute inset-0 image-placeholder ${className}`}
          style={style}
        />
      )}

      {/* Optimized image */}
      {loaded && imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          className={`${className} transition-opacity duration-300`}
          style={style}
          onClick={onClick}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onError={() => {
            if (imageSrc !== src) {
              setImageSrc(src);
            } else {
              setError(true);
            }
          }}
        />
      )}
    </div>
  );
};

export default SmartImage;
