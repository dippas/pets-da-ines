import { useTranslations } from 'use-intl'
import Label from '../../components/Label'

interface Step {
  title: string
  body: string
}

interface CancellationBlock {
  label: string
  lines: string[]
}

export default function BookingConditions() {
  const t = useTranslations()
  const steps = t.raw('booking.steps') as Step[]
  const highSeasonDates = t.raw('pricing.highSeasonDates') as string[]
  const cancelHigh = t.raw('booking.cancellation.high') as CancellationBlock
  const cancelLow = t.raw('booking.cancellation.low') as CancellationBlock

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-8 sm:py-16">
      <Label tracking="eyebrow" className="mb-4">
        {t('booking.eyebrow')}
      </Label>
      <h1 className="mb-4 text-4xl font-bold tracking-tight text-ink sm:text-6xl">
        {t('booking.heading')}
      </h1>
      <p className="mb-10 max-w-measure text-lg prose">{t('booking.intro')}</p>

      <ol className="flex flex-col">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="flex flex-col gap-2 border-t border-ink-subtle py-8 sm:flex-row sm:gap-6"
          >
            <span className="shrink-0 font-heading text-3xl text-gold-dark sm:w-16">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="mb-2 text-2xl font-bold text-ink">{step.title}</h2>
              {step.body && (
                <p className="max-w-measure text-base prose">{step.body}</p>
              )}

              {index === 2 && (
                <>
                  <div className="my-4 grid gap-6 md:grid-cols-2">
                    <div className="rounded-2xl bg-panel p-6">
                      <Label className="mb-3 text-gold-dark">
                        {cancelHigh.label}
                      </Label>
                      {cancelHigh.lines.map((line) => (
                        <p
                          key={line}
                          className="mb-2 text-base prose last:mb-0"
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                    <div className="rounded-2xl border border-ink-subtle bg-cream p-6">
                      <Label className="mb-3 text-ink-muted">
                        {cancelLow.label}
                      </Label>
                      {cancelLow.lines.map((line) => (
                        <p
                          key={line}
                          className="mb-2 text-base prose last:mb-0"
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="mb-3 text-sm text-ink-muted">
                    {t('booking.cancellation.highSeasonLabel')}
                  </div>
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
                </>
              )}
            </div>
          </li>
        ))}
        <li className="border-t border-ink-subtle" />
      </ol>
    </div>
  )
}
