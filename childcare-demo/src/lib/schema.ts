import { ROUTES, ui, type Lang, type RouteKey } from '@/i18n';
export function breadcrumb(site: URL, lang: Lang, key: RouteKey, name: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: ui[lang].breadcrumbHome, item: new URL(ROUTES.home[lang], site).href },
      { '@type': 'ListItem', position: 2, name, item: new URL(ROUTES[key][lang], site).href },
    ],
  };
}
