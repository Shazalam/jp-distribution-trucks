export interface LeadPayload {
  formType: string;
  
  // Source Tracking
  sourcePage?: string;
  sourceSection?: string;
  sourceCard?: string;
  selectedVehicle?: string;
  selectedPart?: string;
  selectedBuild?: string;
  selectedProduct?: string;
  clickedButton?: string;
  
  // Customer Details
  customerName: string;
  email: string;
  phone: string;
  country?: string;
  city?: string;
  companyName?: string;
  customerType?: string;

  // Request Details
  message?: string;
  requestDetails?: any;
  quantity?: number;
  preferredModel?: string;
  vehicleYear?: string;
  partNumber?: string;
  usageType?: string;
  budgetRange?: string;
  timeline?: string;
  shippingRequirement?: string;
}

export async function submitLead(payload: LeadPayload) {
  try {
    // Automatically capture URL and Referrer from the browser
    const extendedPayload = {
      ...payload,
      currentUrl: window.location.href,
      referrerUrl: document.referrer || "",
      // Capture UTM parameters if available
      utmSource: new URLSearchParams(window.location.search).get("utm_source") || undefined,
      utmMedium: new URLSearchParams(window.location.search).get("utm_medium") || undefined,
      utmCampaign: new URLSearchParams(window.location.search).get("utm_campaign") || undefined,
    };

    const response = await fetch("/api/requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(extendedPayload),
    });

    const data = await response.json();

    if (!response.ok) {
      if (data.errors && Array.isArray(data.errors)) {
        const errorMessages = data.errors.map((err: any) => `${err.path.join('.')}: ${err.message}`).join(", ");
        throw new Error(`Validation Error: ${errorMessages}`);
      }
      throw new Error(data.message || "Failed to submit request");
    }

    return data;
  } catch (error: any) {
    console.error("submitLead Error:", error);
    throw error;
  }
}
