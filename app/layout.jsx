import './globals.css';
import { Outfit, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata = {
  title: 'Katam Ganesh Reddy — Full-Stack Developer & Independent Builder',
  description:
    'Portfolio and dynamic web studio of Katam Ganesh Reddy. Creator of TomeSphere (bookgarden.tomesphere.in) and modern full-stack web applications.',
  metadataBase: new URL('https://tomesphere.in'),
  openGraph: {
    title: 'Katam Ganesh Reddy — Full-Stack Developer & Independent Builder',
    description:
      'Portfolio and digital sanctuary at tomesphere.in. Crafting digital experiences at the intersection of design, code & systems.',
    url: 'https://tomesphere.in',
    siteName: 'Katam Ganesh Reddy Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: '#07080d',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <div className="ambient-wrapper" aria-hidden="true">
          <div className="ambient-grid" />
          <div className="ambient-orb orb-primary" />
          <div className="ambient-orb orb-secondary" />
          <div className="ambient-orb orb-tertiary" />
        </div>
        {children}
      </body>
    </html>
  );
}
