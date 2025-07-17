/**
 * Copyright (c) 2024-present mrofisr
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// src/App.jsx
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import MainContent from "@/pages/MainContent";
import LandingPage from "@/pages/LandingPage";
import { Helmet, HelmetProvider } from "react-helmet-async";
import config from "@/config/config";
import BackgroundSlider from "@/components/BackgroundSlider";
import ImagePreloader from "@/components/ImagePreloader";

// Optimized Background Component for App
const AppBackground = ({ imageSrc }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setLoaded(true);
    img.src = imageSrc;
  }, [imageSrc]);

  return (
    <div className="fixed inset-0 z-0">
      {!loaded && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse" />
      )}
      {loaded && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500"
          style={{
            backgroundImage: `url(${imageSrc})`,
            backgroundPosition: "center center",
          }}
        />
      )}
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-white/80" />
    </div>
  );
};

/**
 * App component serves as the root of the application.
 *
 * It manages the state to determine whether the invitation content should be shown.
 * Initially, the invitation is closed and the LandingPage component is rendered.
 * Once triggered, the Layout component containing MainContent is displayed.
 *
 * This component also uses HelmetProvider and Helmet to set up various meta tags:
 *   - Primary meta tags: title and description.
 *   - Open Graph tags for Facebook.
 *   - Twitter meta tags for summary and large image preview.
 *   - Favicon link and additional meta tags for responsive design and theme color.
 *
 * @component
 * @example
 * // Renders the App component
 * <App />
 */
function App() {
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);

  // Priority images for fast loading
  const priorityImages = [
    "/images/Saya/10.JPEG", // Main background
    "/images/Saya/1.JPEG", // Hero couple photo
    "/images/Saya/2.JPEG", // Landing page
  ];

  // All gallery images for preloading
  const galleryImages = [
    "/images/Saya/3.JPEG",
    "/images/Saya/4.JPEG",
    "/images/Saya/5.JPEG",
    "/images/Saya/6.JPEG",
    "/images/Saya/7.JPEG",
    "/images/Saya/8.JPEG",
    "/images/Saya/9.JPEG",
    "/images/Saya/11.jpg",
    "/images/Saya/12.jpg",
    "/images/Saya/13.jpg",
  ];

  return (
    <HelmetProvider>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{config.data.title}</title>
        <meta name="title" content={config.data.title} />
        <meta name="description" content={config.data.description} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:title" content={config.data.title} />
        <meta property="og:description" content={config.data.description} />
        <meta property="og:image" content={config.data.shareImages.ogImage} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={window.location.href} />
        <meta property="twitter:title" content={config.data.title} />
        <meta
          property="twitter:description"
          content={config.data.description}
        />
        <meta
          property="twitter:image"
          content={config.data.shareImages.ogImage}
        />

        {/* PWA / Mobile */}
        <link rel="apple-touch-icon" href={config.data.shareImages.thumbnail} />
        <meta name="theme-color" content="#FDA4AF" />

        {/* Favicon */}
        <link rel="icon" type="image/x-icon" href={config.data.favicon} />

        {/* Additional Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Custom Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <div className="min-h-screen relative overflow-hidden">
        {/* Image Preloading for Performance */}
        <ImagePreloader images={priorityImages} priority={true} />
        <ImagePreloader images={galleryImages} priority={false} />

        {/* Optimized Background Image */}
        <AppBackground imageSrc="/images/Saya/10.JPEG" />

        <AnimatePresence mode="wait">
          {!isInvitationOpen ? (
            <LandingPage onOpenInvitation={() => setIsInvitationOpen(true)} />
          ) : (
            <Layout>
              <MainContent />
            </Layout>
          )}
        </AnimatePresence>
      </div>
    </HelmetProvider>
  );
}

export default App;
