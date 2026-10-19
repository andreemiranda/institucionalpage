import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://goiania.go.gov.br'
  ),
  title: {
    default: 'Prefeitura de Goiânia • Portal Oficial',
    template: '%s • Prefeitura de Goiânia',
  },
  description:
    'Portal Oficial da Prefeitura Municipal de Goiânia. Acesso a notícias, serviços ao cidadão, IPTU, saúde, agendamentos, transparência pública, diário oficial e ouvidoria.',
  keywords: [
    'Prefeitura de Goiânia',
    'Goiânia',
    'Goiás',
    'IPTU Goiânia',
    'Atende Fácil',
    'Saúde Goiânia',
    'Notícias Goiânia',
    'Transparência Goiânia',
    'Ouvidoria 156',
    'Portal do Cidadão',
    'Diário Oficial Goiânia',
  ],
  authors: [
    {
      name: 'Prefeitura Municipal de Goiânia',
      url: 'https://goiania.go.gov.br',
    },
  ],
  creator: 'Prefeitura Municipal de Goiânia',
  publisher: 'Secretaria Municipal de Comunicação • Secom Goiânia',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/favicon.svg',
    apple: '/brasao.png',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://goiania.go.gov.br',
    title: 'Prefeitura de Goiânia • Portal Oficial',
    description:
      'Portal Oficial da Prefeitura Municipal de Goiânia. Acesso a notícias, serviços ao cidadão, IPTU, saúde, transparência e ouvidoria.',
    siteName: 'Prefeitura Municipal de Goiânia',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Prefeitura Municipal de Goiânia - Capital de Goiás',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prefeitura de Goiânia • Portal Oficial',
    description:
      'Portal Oficial da Prefeitura Municipal de Goiânia. Acesso a notícias, serviços ao cidadão, IPTU, transparência e ouvidoria.',
    site: '@prefeiturago',
    creator: '@prefeiturago',
    images: ['/og-image.png'],
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'GovernmentOrganization',
  name: 'Prefeitura Municipal de Goiânia',
  alternateName: 'Prefeitura de Goiânia',
  url: 'https://goiania.go.gov.br',
  logo: 'https://goiania.go.gov.br/brasao.png',
  image: 'https://goiania.go.gov.br/og-image.png',
  description:
    'Portal Oficial do Poder Executivo Municipal da cidade de Goiânia, capital do estado de Goiás.',
  address: {
    '@type': 'PostalAddress',
    streetAddress:
      'Palácio das Campinas Venerando de Freitas Borges - Av. do Cerrado, nº 999, Park Lozandes',
    addressLocality: 'Goiânia',
    addressRegion: 'GO',
    postalCode: '74884-900',
    addressCountry: 'BR',
  },
  telephone: '+55-62-3524-1000',
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+55-62-3524-1000',
      contactType: 'customer service',
      areaServed: 'BR',
      availableLanguage: 'Portuguese',
    },
    {
      '@type': 'ContactPoint',
      telephone: '156',
      contactType: 'emergency and citizen assistance',
      areaServed: 'BR-GO',
      availableLanguage: 'Portuguese',
    },
  ],
  sameAs: [
    'https://www.instagram.com/prefeituradegoiania/',
    'https://www.facebook.com/prefeituradegoiania',
    'https://www.youtube.com/user/PrefeituraDeGoiania',
    'https://twitter.com/prefeiturago',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={poppins.variable} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="flex flex-col min-h-screen bg-[#E1E5E7] text-[#2A454A] font-sans antialiased"
        suppressHydrationWarning
      >
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
