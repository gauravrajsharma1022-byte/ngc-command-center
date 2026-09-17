// Google Analytics Event Tracking
// Call these functions to track user actions

export const trackEvent = (eventName: string, eventParams?: Record<string, string | number>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

// Track blog article reads (when user scrolls to bottom)
export const trackBlogRead = (articleTitle: string) => {
  trackEvent('blog_read', {
    article_title: articleTitle,
    timestamp: Date.now(),
  });
};

// Track contact form submission
export const trackContactFormSubmission = (formType: string = 'contact_form') => {
  trackEvent('contact_form_submission', {
    form_type: formType,
    timestamp: Date.now(),
  });
};

// Track LinkedIn profile clicks
export const trackLinkedInClick = (source: string = 'footer') => {
  trackEvent('linkedin_profile_click', {
    source: source,
    timestamp: Date.now(),
  });
};

// Track external link clicks
export const trackExternalLinkClick = (url: string, label: string) => {
  trackEvent('external_link_click', {
    url: url,
    label: label,
    timestamp: Date.now(),
  });
};

// Track page views (automatic in GA4)
export const trackPageView = (pagePath: string, pageTitle: string) => {
  trackEvent('page_view', {
    page_path: pagePath,
    page_title: pageTitle,
  });
};

// Detect scroll to bottom of page
export const setupScrollTracking = (articleTitle: string) => {
  if (typeof window === 'undefined') return;

  const trackScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;

    // Trigger when user reaches 90% of the page
    if (scrollTop + windowHeight >= documentHeight * 0.9) {
      trackBlogRead(articleTitle);
      window.removeEventListener('scroll', trackScroll);
    }
  };

  window.addEventListener('scroll', trackScroll);
};

// Declare global gtag function for TypeScript
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}
