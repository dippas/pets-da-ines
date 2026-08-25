import { useTranslations } from 'use-intl'
import Button from '../../components/Button'
import { eur, type PriceBand } from '../../data/pricing'
import type { SupportedLanguage } from '../../i18n'
import { cn } from '../../lib/cn'
import { pagePath } from '../../routes/paths'
import type { PricingCalculator } from './usePricingCalculator'

interface PricingTableProps {
  calculator: PricingCalculator
  locale: SupportedLanguage
}

export default function PricingTable({
  calculator,
  locale,
}: PricingTableProps) {
  const t = useTranslations()
  const { service, stay, season, isBoarding, bands, band, dogs } = calculator

  const tableTitle = isBoarding
    ? t(stay === 'half' ? 'pricing.boardingHalf' : 'pricing.boardingFull')
    : t(service === 'sitting' ? 'pricing.sittingTitle' : 'pricing.walkingTitle')

  const dogsColumns = t.raw('pricing.dogsCol') as string[]

  return (
    <div className="mb-12">
      <h2 className="mb-2 text-2xl font-bold text-ink">{tableTitle}</h2>
      <p className="mb-6 text-sm text-ink-muted">
        {t(season === 'high' ? 'pricing.seasonHigh' : 'pricing.seasonLow')}
      </p>
      <div className="card overflow-x-auto">
        <table className="w-full min-w-md border-collapse text-left">
          <thead>
            <tr className="bg-panel">
              <th className="px-6 py-4 text-xs font-bold tracking-wider text-ink-muted uppercase">
                {t('pricing.frequency')}
              </th>
              {dogsColumns.map((label) => (
                <th
                  key={label}
                  className="px-6 py-4 text-right font-heading text-lg font-semibold"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bands.map((priceBand: PriceBand) => {
              const { id, row: prices } = priceBand
              const active = priceBand === band
              return (
                <tr
                  key={id}
                  className={cn(
                    'border-t border-ink-subtle',
                    active && 'bg-gold-subtle',
                  )}
                >
                  <td className="px-6 py-4 text-sm text-ink-secondary">
                    {t(`pricing.bands.${id}`)}
                  </td>
                  {prices.map((price, index) => (
                    <td
                      key={`${id}-${dogsColumns[index]}`}
                      className={cn(
                        'px-6 py-4 text-right',
                        active && dogs === index + 1
                          ? 'font-bold text-indigo'
                          : 'text-ink-secondary',
                      )}
                    >
                      {eur(price, locale)}€
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-6 rounded-2xl bg-panel px-6 py-4 text-sm prose">
        {t('pricing.sittingCatsNote')}
      </p>
      <p className="mt-6 text-sm leading-relaxed text-ink-muted">
        {t.rich('pricing.depositNote', {
          link: (chunks) => (
            <Button variant="link" to={pagePath('booking', locale)}>
              {chunks}
            </Button>
          ),
        })}
      </p>
    </div>
  )
}
