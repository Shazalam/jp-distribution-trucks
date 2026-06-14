export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (typeof window !== "undefined") {
    // Google Analytics 4
    if ((window as any).gtag) {
      (window as any).gtag("event", eventName, eventParams);
    }
    
    // Meta Pixel
    if ((window as any).fbq) {
      // Map standard GA4 events to FB Pixel standard events where applicable
      let fbEventName = 'CustomEvent';
      if (eventName === 'form_submitted') fbEventName = 'Lead';
      if (eventName === 'quote_request_clicked') fbEventName = 'Contact';
      
      if (fbEventName === 'CustomEvent') {
        (window as any).fbq("trackCustom", eventName, eventParams);
      } else {
        (window as any).fbq("track", fbEventName, eventParams);
      }
    }
  }
};
