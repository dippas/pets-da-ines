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
  const highSeasonDates = t.raw('pricing.highSeasonDates') as string[]
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
    <div className="mb-16 rounded-4xl border border-ink-subtle bg-white p-6 sm:p-10 lg:grid lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-x-8 lg:gap-y-0 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0">
      <div
        aria-live="polite"
        className="mb-8 flex flex-col gap-2 rounded-lg bg-navy px-6 py-4 text-cream sm:rounded-none lg:col-start-2 lg:mb-0 lg:block lg:gap-0 lg:rounded-t-4xl lg:p-10 lg:pb-6"
      >
        <div>
          <div className="flex items-baseline justify-between gap-4 lg:block">
            <Label className="text-gold lg:mb-6 lg:block">
              {t(`pricing.calculator.${unitTitleKey}`)}
            </Label>
            <div className="flex items-baseline gap-1 lg:gap-2">
              <span className="font-heading text-2xl font-semibold tabular-nums lg:text-6xl">
                {eur(unitPrice, locale)}
              </span>
              <span className="font-heading text-base lg:text-3xl">€</span>
            </div>
          </div>
          <div className="mt-2 hidden text-sm text-off-white-secondary lg:block">
            {dogs} × {times} · {t(`pricing.bands.${band.id}`).toLowerCase()}
          </div>
        </div>
        <div className="flex items-baseline justify-between gap-4 lg:mt-6 lg:border-y lg:border-off-white-subtle lg:py-6">
          <span className="text-xs text-off-white-strong lg:text-sm">
            {t('pricing.calculator.weekTotal')}
          </span>
          <span className="font-heading text-xl font-semibold tabular-nums lg:text-3xl">
            {eur(weekTotal, locale)}€
          </span>
        </div>
      </div>

      <div className="lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:rounded-4xl lg:border lg:border-ink-subtle lg:bg-white lg:p-10">
        <fieldset className="mb-6">
          <Label as="legend" className="mb-3 text-ink-muted">
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
        </fieldset>

        <div className="mb-8 flex flex-wrap gap-6">
          <fieldset>
            <Label as="legend" className="mb-2 text-ink-muted">
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
          </fieldset>
          {isBoarding && (
            <fieldset>
              <Label as="legend" className="mb-2 text-ink-muted">
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
            </fieldset>
          )}
        </div>
        <div className="mb-8">
          <div className="mb-4 flex items-baseline justify-between">
            <Label className="text-ink-muted">
              {t('pricing.calculator.dogs')}
            </Label>
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

      <div className="mt-8 flex flex-col gap-3 text-sm text-ink-secondary lg:col-start-2 lg:row-start-2 lg:mt-0 lg:rounded-b-4xl lg:bg-navy lg:px-10 lg:pb-6 lg:text-off-white-strong">
        <Button
          to={WHATSAPP_HREF}
          className="mb-3 w-full bg-navy text-cream hover:bg-indigo-light hover:text-off-white lg:order-last lg:mt-5 lg:mb-0 lg:bg-gold lg:text-ink lg:hover:bg-cream lg:hover:text-ink"
        >
          {t('pricing.calculator.requestQuote')}
        </Button>
        <span>{t('pricing.calculator.assessment')}</span>
        <span>{t('pricing.calculator.deposit')}</span>
        <span>
          {t.rich('pricing.calculator.cancellation', {
            link: (chunks) => (
              <Button
                variant="link"
                to={pagePath('booking', locale)}
                className="lg:text-gold lg:hover:text-cream"
              >
                {chunks}
              </Button>
            ),
          })}
        </span>
        <span>
          <span className="font-semibold text-gold-dark lg:text-gold">
            {t('pricing.highSeasonLabel')}:
          </span>{' '}
          {highSeasonDates.join(' · ')}
        </span>
      </div>
    </div>
  )
}
