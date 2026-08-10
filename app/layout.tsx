import { Suspense } from "react";
import { Allura, Poppins, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import NextTopLoader from 'nextjs-toploader'
import type { Metadata, Viewport } from "next";
import { SITE_CONFIG } from "@/lib/site-config";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationSchema, websiteSchema } from "@/lib/structured-data";
import { MetaPixel } from "@/components/analytics/meta-pixel";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const allura = Allura({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-allura",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.siteUrl),
  title: {
    default: "Crochet Nook | Handmade Crochet Bouquets, Gajray & Gifts in Karachi",
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description:
    "Crochet Nook makes handmade crochet bouquets, gajray, baby items, plushies, keychains & custom gifts in Karachi, Pakistan. Order easily on WhatsApp.",
  applicationName: SITE_CONFIG.name,
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#5c2a52",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(poppins.variable, allura.variable, "font-sans", geist.variable)}
    >
      <body>
        <Suspense fallback={null}>
          <MetaPixel />
        </Suspense>
        <NextTopLoader color="var(--primary)" showSpinner={false} />
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        {children}
      </body>
    </html>
  );
}