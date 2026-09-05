import { useTranslations } from 'use-intl'
import { useLocale } from '../../hooks/useLocale'
import PricingTable from './PricingTable'
import Simulator from './Simulator'
import TransportTable from './TransportTable'
import { usePricingCalculator } from './usePricingCalculator'

export default function Pricing() {
  const t = useTranslations()
  const locale = useLocale()
  const calculator = usePricingCalculator()

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 tabular-nums sm:px-8 sm:py-16">
      <h1 className="mb-4 text-4xl font-bold tracking-tight text-ink sm:text-6xl">
        {t('pricing.heading')}
      </h1>
      <p className="mb-10 max-w-measure text-lg prose">{t('pricing.intro')}</p>

      <h2 className="section-heading">{t('pricing.calculator.heading')}</h2>
      <Simulator calculator={calculator} locale={locale} />

      <PricingTable calculator={calculator} locale={locale} />
      <TransportTable />
    </div>
  )
}
