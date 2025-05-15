import './globals.css';
import '../styles/index.css';
import { LanguageProvider } from '../context/LanguageContext';
import { ThemeProvider } from '../context/ThemeContext';
import { QuizProvider } from '../context/QuizContext';
import { SpeedInsights } from '@vercel/speed-insights/next';
import FacebookPixel from '../components/FacebookPixel';
import { Analytics } from "@vercel/analytics/next";
import GoogleAnalytics from '../components/GoogleAnalytics';

export const metadata = {
  title: 'QuizDodo',
  description: 'Подборка ТОП-10 проверенных объектов на Бали для отдыха и инвестиций',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <FacebookPixel />
        <GoogleAnalytics />
        <div className="fixed inset-0 pointer-events-none">
          <img 
            src="/images/palm.png" 
            alt="Palm tree" 
            className="absolute inset-0 w-full h-full object-cover opacity-[0.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-transparent" />
        </div>
        <ThemeProvider>
          <LanguageProvider>
            <QuizProvider>
              {children}
              <SpeedInsights />
              <Analytics />
            </QuizProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
} 