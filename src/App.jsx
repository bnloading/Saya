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
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import MainContent from "@/pages/MainContent";
import LandingPage from "@/pages/LandingPage";
import { Helmet, HelmetProvider } from "react-helmet-async";
import config from "@/config/config";

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

      <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="fixed inset-0 bg-[url('/images/bg-pattern.png')] opacity-5 pointer-events-none" />
        <div className="fixed top-0 right-0 w-1/3 h-1/3 bg-gradient-to-b from-rose-200/20 to-transparent rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4" />
        <div className="fixed bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-t from-pink-200/20 to-transparent rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4" />

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
