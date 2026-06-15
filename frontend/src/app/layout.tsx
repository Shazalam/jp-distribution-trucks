import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppCTA } from "@/components/layout/WhatsAppCTA";

export const metadata: Metadata = {
  metadataBase: new URL('https://jpdistributiontrucks.com'),
  title: {
    default: "JP Distribution | Toyota Hilux Trucks, Custom Builds & Genuine Parts",
    template: "%s | JP Distribution Trucks"
  },
  description: "Global exporter of Toyota commercial vehicles, specialized fleet custom builds, and genuine Toyota Hilux parts. Explore our inventory of Revo, Vigo, and Overland builds.",
  keywords: ["Toyota Hilux", "Hilux Revo", "Hilux Vigo", "Truck Exporter", "Commercial Vehicles", "Overland Builds", "Genuine Toyota Parts"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jpdistributiontrucks.com",
    siteName: "JP Distribution Trucks",
    title: "JP Distribution | Custom Toyota Hilux Trucks & Parts",
    description: "Global exporter of Toyota commercial vehicles, specialized fleet custom builds, and genuine Toyota Hilux parts.",
    images: [
      {
        url: "https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498050/jp-distribution/home/hero/cinematic-hilux-hero.jpg",
        width: 1200,
        height: 630,
        alt: "JP Distribution Trucks Hero Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JP Distribution | Custom Toyota Hilux Trucks & Parts",
    description: "Global exporter of Toyota commercial vehicles and genuine Toyota parts.",
    images: ["https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498050/jp-distribution/home/hero/cinematic-hilux-hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Global Schema structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://jpdistributiontrucks.com/#organization",
        "name": "JP Distribution Trucks",
        "url": "https://jpdistributiontrucks.com",
        "logo": "https://jpdistributiontrucks.com/logo.png",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+5978520700",
          "contactType": "customer service",
          "availableLanguage": ["English", "Dutch"]
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://jpdistributiontrucks.com/#website",
        "url": "https://jpdistributiontrucks.com",
        "name": "JP Distribution Trucks",
        "publisher": {
          "@id": "https://jpdistributiontrucks.com/#organization"
        }
      }
    ]
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <head>
        <Script
          id="json-ld-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google Analytics Placeholder */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
        {/* Meta Pixel Placeholder */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'XXXXXXXXXXXXXXX');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col pt-20 md:pt-24 bg-background">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppCTA />
      </body>
    </html>
  );
}

