import type {Metadata} from 'next';
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
  title: 'Prefeitura de Goiânia • Portal Oficial',
  description: 'Portal Oficial de Notícias e Serviços da Prefeitura Municipal de Goiânia.',
  openGraph: {
    title: 'Prefeitura de Goiânia • Portal Oficial',
    description: 'Portal Oficial de Notícias e Serviços da Prefeitura Municipal de Goiânia.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prefeitura de Goiânia • Portal Oficial',
    description: 'Portal Oficial de Notícias e Serviços da Prefeitura Municipal de Goiânia.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR" className={poppins.variable} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen bg-[#E1E5E7] text-[#2A454A] font-sans antialiased" suppressHydrationWarning>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
