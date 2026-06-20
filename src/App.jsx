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
import { AnimatePresence, motion } from "framer-motion";
import Layout from "@/components/Layout";
import MainContent from "@/pages/MainContent";
import LandingPage from "@/pages/LandingPage";
import { Helmet, HelmetProvider } from "react-helmet-async";
import config from "@/config/config";

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
  const priorityImages = config.data.media.preloaderPriority;
  const galleryImages = config.data.media.preloaderGallery;
  const shareImageUrl = new URL(
    config.data.shareImages.ogImage,
    window.location.origin,
  ).href;
  const currentUrl = window.location.href;

  const pageVariants = {
    landingInitial: { opacity: 0, scale: 1.02, filter: "blur(10px)" },
    landingVisible: { opacity: 1, scale: 1, filter: "blur(0px)" },
    landingExit: { opacity: 0, scale: 0.94, y: -28, filter: "blur(16px)" },
    invitationInitial: { opacity: 0, scale: 1.04, y: 44, filter: "blur(18px)" },
    invitationVisible: { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" },
  };

  const openInvitation = () => {
    setIsInvitationOpen(true);
    window.setTimeout(
      () => window.scrollTo({ top: 0, behavior: "smooth" }),
      80,
    );
  };

  return (
    <HelmetProvider>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{config.data.title}</title>
        <meta name="title" content={config.data.title} />
        <meta name="description" content={config.data.description} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:title" content={config.data.title} />
        <meta property="og:description" content={config.data.description} />
        <meta property="og:image" content={shareImageUrl} />
        <meta property="og:image:secure_url" content={shareImageUrl} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Тойға шақыру" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={currentUrl} />
        <meta property="twitter:title" content={config.data.title} />
        <meta
          property="twitter:description"
          content={config.data.description}
        />
        <meta property="twitter:image" content={shareImageUrl} />
        <meta property="twitter:image:alt" content="Тойға шақыру" />

        {/* PWA / Mobile */}
        <link rel="apple-touch-icon" href={config.data.shareImages.thumbnail} />
        <meta name="theme-color" content="#374151" />

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
        <AppBackground imageSrc={config.data.media.appBackground} />

        <AnimatePresence mode="wait">
          {!isInvitationOpen ? (
            <motion.div
              key="landing-page"
              variants={pageVariants}
              initial="landingInitial"
              animate="landingVisible"
              exit="landingExit"
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 min-h-screen"
            >
              <LandingPage onOpenInvitation={openInvitation} />
            </motion.div>
          ) : (
            <motion.div
              key="invitation-page"
              variants={pageVariants}
              initial="invitationInitial"
              animate="invitationVisible"
              transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 min-h-screen"
            >
              <Layout>
                <MainContent />
              </Layout>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </HelmetProvider>
  );
}

export default App;
