import { notFound } from 'next/navigation';
import LandingPage from '../../components/landing-page';
import { locales, pageContent } from '../../components/site-data';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://taxi-james.it';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export function generateMetadata({ params }) {
  const locale = params.locale;
  if (!locales.includes(locale)) return {};
  const t = pageContent[locale].meta;
  return {
    title: t.title,
    description: t.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'it-IT': '/it',
        'de-IT': '/de',
        'en-IT': '/en'
      }
    },
    openGraph: {
      title: t.title,
      description: t.description,
      url: `${siteUrl}/${locale}`,
      locale: locale === 'de' ? 'de_IT' : locale === 'en' ? 'en_IT' : 'it_IT'
    }
  };
}

export default function LocalePage({ params }) {
  const locale = params.locale;
  if (!locales.includes(locale)) notFound();
  return <LandingPage locale={locale} />;
}
