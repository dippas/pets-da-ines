import { useTranslations } from 'use-intl'
import Button from '../../components/Button'
import Label from '../../components/Label'
import { eur } from '../../data/pricing'
import type { SupportedLanguage } from '../../i18n'
import { cn } from '../../lib/cn'
import { pagePath } from '../../routes/paths'
import type { PricingCalculator } from './usePricingCalculator'

const WHATSAPP_HREF = 'https://wa.me/351927350019'

const pillClass = (
  active: boolean,
  activeBg = 'bg-indigo',
  activeFg = 'text-off-white',
) =>
  cn(
    'rounded-full border-2 px-6 py-3 text-sm font-semibold transition-colors duration-200',
    active
      ? `${activeBg} ${activeFg} border-transparent`
      : 'border-ink-strong text-ink hover:border-indigo',
  )

const secondaryPillClass = (
  active: boolean,
  activeBg = 'bg-indigo',
  activeFg = 'text-off-white',
) =>
  cn(
    'rounded-full border px-4 py-2 text-xs font-semibold transition-colors duration-200',
    active
      ? `${activeBg} ${activeFg} border-transparent`
      : 'border-ink-strong text-ink-secondary hover:border-indigo',
  )

interface SimulatorProps {
  calculator: PricingCalculator
  locale: SupportedLanguage
}

export default function Simulator({ calculator, locale }: SimulatorProps) {
  const t = useTranslations()
  const {
    service,
    setService,
    season,
    setSeason,
    stay,
    setStay,
    dogs,
    setDogs,
    times,
    setTimes,
    timesMax,
    isBoarding,
    band,
    unitPrice,
    weekTotal,
    unitTitleKey,
    unitLabelKey,
  } = calculator

  return (
    <div className="mb-16 grid gap-8 lg:grid-cols-2 lg:items-start">
      <div className="rounded-4xl border border-ink-subtle bg-white p-6 sm:p-10">
        <div className="mb-6">
          <Label className="mb-3 text-ink-muted">
            {t('pricing.calculator.service')}
          </Label>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="bare"
              active={service === 'boarding'}
              onClick={() => setService('boarding')}
              className={pillClass(service === 'boarding')}
            >
              {t('services.petBoarding.title')}
            </Button>
            <Button
              variant="bare"
              active={service === 'sitting'}
              onClick={() => setService('sitting')}
              className={pillClass(service === 'sitting')}
            >
              {t('services.petSitting.title')}
            </Button>
            <Button
              variant="bare"
              active={service === 'walking'}
              onClick={() => setService('walking')}
              className={pillClass(service === 'walking')}
            >
              {t('services.dogWalking.title')}
            </Button>
          </div>
        </div>

        <div className="mb-8 flex flex-wrap gap-6">
          <div>
            <Label className="mb-2 text-ink-muted">
              {t('pricing.calculator.season')}
            </Label>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="bare"
                active={season === 'low'}
                onClick={() => setSeason('low')}
                className={secondaryPillClass(
                  season === 'low',
                  'bg-gold-dark',
                  'text-off-white',
                )}
              >
                {t('pricing.seasonLow')}
              </Button>
              <Button
                variant="bare"
                active={season === 'high'}
                onClick={() => setSeason('high')}
                className={secondaryPillClass(
                  season === 'high',
                  'bg-gold-dark',
                  'text-off-white',
                )}
              >
                {t('pricing.seasonHigh')}
              </Button>
            </div>
          </div>
          {isBoarding && (
            <div>
              <Label className="mb-2 text-ink-muted">
                {t('pricing.calculator.stay')}
              </Label>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="bare"
                  active={stay === 'full'}
                  onClick={() => setStay('full')}
                  className={secondaryPillClass(
                    stay === 'full',
                    'bg-navy',
                    'text-cream',
                  )}
                >
                  {t('pricing.calculator.stayFull')}
                </Button>
                <Button
                  variant="bare"
                  active={stay === 'half'}
                  onClick={() => setStay('half')}
                  className={secondaryPillClass(
                    stay === 'half',
                    'bg-navy',
                    'text-cream',
                  )}
                >
                  {t('pricing.calculator.stayHalf')}
                </Button>
              </div>
            </div>
          )}
        </div>
        <div className="mb-8">
          <Label className="mb-4 text-ink-muted">
            {t('pricing.calculator.dogs')}
          </Label>
          <div className="mb-4 flex items-baseline justify-between">
            <span className="font-heading text-2xl tabular-nums text-indigo">
              {dogs}
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={3}
            step={1}
            value={dogs}
            onChange={({ target }) => setDogs(Number(target.value))}
            aria-label={t('pricing.calculator.dogs')}
            className="h-1.5 w-full accent-indigo"
          />
          <div className="mt-2 flex justify-between text-xs text-ink-muted">
            <span>1</span>
            <span>2</span>
            <span>3</span>
          </div>
        </div>
        <div>
          <div className="mb-4 flex items-baseline justify-between">
            <Label className="text-ink-muted">
              {t(`pricing.calculator.${unitLabelKey}`)}
            </Label>
            <span className="font-heading text-2xl tabular-nums text-indigo">
              {times}
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={timesMax}
            step={1}
            value={times}
            onChange={({ target }) => setTimes(Number(target.value))}
            aria-label={t(`pricing.calculator.${unitLabelKey}`)}
            className="h-1.5 w-full accent-indigo"
          />
          <div className="mt-2 text-xs text-ink-muted">
            {t(`pricing.bands.${band.id}`)}
          </div>
        </div>
      </div>

      <div className="rounded-4xl bg-navy p-6 text-cream sm:sticky sm:top-24 sm:p-10">
        <Label className="mb-6 text-gold">
          {t(`pricing.calculator.${unitTitleKey}`)}
        </Label>
        <div className="mb-2 flex items-baseline gap-2">
          <span className="font-heading text-6xl font-semibold tabular-nums">
            {eur(unitPrice, locale)}
          </span>
          <span className="font-heading text-3xl">€</span>
        </div>
        <div className="mb-6 text-sm text-off-white-secondary">
          {dogs} × {times} · {t(`pricing.bands.${band.id}`).toLowerCase()}
        </div>
        <div className="mb-6 flex items-baseline justify-between gap-4 border-t border-off-white-subtle pt-6">
          <span className="text-sm text-off-white-strong">
            {t('pricing.calculator.weekTotal')}
          </span>
          <span className="font-heading text-3xl font-semibold tabular-nums">
            {eur(weekTotal, locale)}€
          </span>
        </div>
        <div className="flex flex-col gap-3 border-t border-off-white-subtle pt-6 text-sm text-off-white-strong">
          <span>{t('pricing.calculator.assessment')}</span>
          <span>{t('pricing.calculator.deposit')}</span>
          <span>
            {t.rich('pricing.calculator.cancellation', {
              link: (chunks) => (
                <Button
                  variant="link"
                  to={pagePath('booking', locale)}
                  className="text-gold hover:text-cream"
                >
                  {chunks}
                </Button>
              ),
            })}
          </span>
        </div>
        <Button
          to={WHATSAPP_HREF}
          className="mt-8 w-full bg-gold text-ink hover:bg-cream hover:text-ink"
        >
          {t('pricing.calculator.requestQuote')}
        </Button>
      </div>
    </div>
  )
}
