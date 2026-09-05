import { useTranslations } from 'use-intl'
import Label from '../../components/Label'
import { useLocale } from '../../hooks/useLocale'
import PricingTable from './PricingTable'
import Simulator from './Simulator'
import TransportTable from './TransportTable'
import { usePricingCalculator } from './usePricingCalculator'

export default function Pricing() {
  const t = useTranslations()
  const locale = useLocale()
  const calculator = usePricingCalculator()
  const highSeasonDates = t.raw('pricing.highSeasonDates') as string[]

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 tabular-nums sm:px-8 sm:py-16">
      <h1 className="mb-4 text-4xl font-bold tracking-tight text-ink sm:text-6xl">
        {t('pricing.heading')}
      </h1>
      <p className="mb-10 max-w-measure text-lg prose">{t('pricing.intro')}</p>

      <h2 className="mb-6 text-2xl font-bold text-ink">
        {t('pricing.calculator.heading')}
      </h2>
      <Simulator calculator={calculator} locale={locale} />

      <div className="mb-6 rounded-2xl bg-panel px-6 py-6">
        <Label className="mb-3 text-gold-dark">
          {t('pricing.highSeasonLabel')}
        </Label>
        <div className="flex flex-wrap gap-3">
          {highSeasonDates.map((range) => (
            <span
              key={range}
              className="rounded-full border border-ink-subtle bg-white px-4 py-2 text-sm text-ink-secondary"
            >
              {range}
            </span>
          ))}
        </div>
      </div>

      <PricingTable calculator={calculator} locale={locale} />
      <TransportTable />
    </div>
  )
}
