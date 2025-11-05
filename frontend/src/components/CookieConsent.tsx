'use client';

import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    personalization: false,
  });

  const initializePersonalization = () => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            timestamp: new Date().toISOString(),
          };
          localStorage.setItem('userLocation', JSON.stringify(location));
        },
        (error) => {
          console.log('Location access denied:', error);
        }
      );
    }
  };

  const initializeAnalytics = () => {
    // Track user behavior
    const userActivity = {
      visits: parseInt(localStorage.getItem('visitCount') || '0') + 1,
      lastVisit: new Date().toISOString(),
    };
    localStorage.setItem('visitCount', userActivity.visits.toString());
    localStorage.setItem('lastVisit', userActivity.lastVisit);
  };

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    } else {
      const savedPreferences = JSON.parse(consent);
      setPreferences(savedPreferences);
      
      // Initialize tracking if user has consented
      if (savedPreferences.personalization) {
        initializePersonalization();
      }
      if (savedPreferences.analytics) {
        initializeAnalytics();
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      personalization: true,
    };
    localStorage.setItem('cookieConsent', JSON.stringify(allAccepted));
    setPreferences(allAccepted);
    initializePersonalization();
    initializeAnalytics();
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      personalization: false,
    };
    localStorage.setItem('cookieConsent', JSON.stringify(onlyNecessary));
    setPreferences(onlyNecessary);
    setShowBanner(false);
  };

  const handleCustomize = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    if (preferences.personalization) {
      initializePersonalization();
    }
    if (preferences.analytics) {
      initializeAnalytics();
    }
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-fade-in">
      <div className="bg-white dark:bg-slate-800 shadow-2xl border-t-4 border-indigo-600 dark:border-indigo-400">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-lg font-display font-bold text-gray-900 dark:text-white mb-2">
                🍪 We Value Your Privacy
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 font-sans mb-4">
                We use cookies to enhance your shopping experience, provide personalized recommendations based on your location and interests, and analyze site traffic. 
                By accepting, you agree to our use of cookies for analytics and personalization.
              </p>
              
              {/* Cookie Preferences */}
              <div className="space-y-2">
                <label className="flex items-center space-x-3 text-sm">
                  <input
                    type="checkbox"
                    checked={preferences.necessary}
                    disabled
                    className="w-4 h-4 text-indigo-600 rounded"
                  />
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Necessary Cookies</strong> (Always Active) - Required for website functionality
                  </span>
                </label>
                
                <label className="flex items-center space-x-3 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                    className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
                  />
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Analytics Cookies</strong> - Help us understand how you use our site
                  </span>
                </label>
                
                <label className="flex items-center space-x-3 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.personalization}
                    onChange={(e) => setPreferences({ ...preferences, personalization: e.target.checked })}
                    className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
                  />
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Personalization Cookies</strong> - Location & interest-based product recommendations
                  </span>
                </label>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <button
                onClick={handleRejectAll}
                className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
              >
                Reject All
              </button>
              <button
                onClick={handleCustomize}
                className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
              >
                Save Preferences
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
