import {
  index,
  layout,
  prefix,
  type RouteConfig,
  route,
} from '@react-router/dev/routes'

export default [
  layout('routes/SiteLayout.tsx', { id: 'pt-layout' }, [
    index('pages/Home/index.tsx', { id: 'pt-home' }),
    route('sobre', 'pages/About/index.tsx', { id: 'pt-about' }),
    route('servicos', 'pages/ServicesHub/index.tsx', { id: 'pt-services' }),
    route('precario', 'pages/Pricing/index.tsx', { id: 'pt-pricing' }),
    route('condicoes-reserva', 'pages/BookingConditions/index.tsx', {
      id: 'pt-booking',
    }),
    route('contactos', 'pages/Contacts/index.tsx', { id: 'pt-contact' }),
  ]),
  ...prefix('en', [
    layout('routes/SiteLayout.tsx', { id: 'en-layout' }, [
      index('pages/Home/index.tsx', { id: 'en-home' }),
      route('about', 'pages/About/index.tsx', { id: 'en-about' }),
      route('services', 'pages/ServicesHub/index.tsx', { id: 'en-services' }),
      route('pricing', 'pages/Pricing/index.tsx', { id: 'en-pricing' }),
      route('booking-conditions', 'pages/BookingConditions/index.tsx', {
        id: 'en-booking',
      }),
      route('contact', 'pages/Contacts/index.tsx', { id: 'en-contact' }),
    ]),
  ]),
] satisfies RouteConfig
