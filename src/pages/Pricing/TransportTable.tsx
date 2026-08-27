import { useTranslations } from 'use-intl'
import { TRANSPORT } from '../../data/pricing'

export default function TransportTable() {
  const t = useTranslations()

  return (
    <div className="mb-16">
      <h2 className="mb-2 text-2xl font-bold text-ink">
        {t('pricing.transportHeading')}
      </h2>
      <p className="mb-6 text-sm text-ink-muted">
        {t('pricing.transportIntro')}
      </p>
      <div className="card overflow-x-auto">
        <table className="w-full min-w-md border-collapse text-left">
          <thead>
            <tr className="bg-panel">
              <th className="px-6 py-4 text-xs font-bold tracking-wider text-ink-muted uppercase">
                {t('pricing.transportRange')}
              </th>
              <th className="px-6 py-4 text-right font-heading text-lg font-semibold">
                {t('pricing.transportOne')}
              </th>
              <th className="px-6 py-4 text-right font-heading text-lg font-semibold">
                {t('pricing.transportBoth')}
              </th>
            </tr>
          </thead>
          <tbody>
            {TRANSPORT.map((id) => (
              <tr key={id} className="border-t border-ink-subtle">
                <td className="px-6 py-4 text-sm text-ink-secondary">
                  {t(`pricing.transport.${id}.range`)}
                </td>
                <td className="px-6 py-4 text-right text-ink-secondary">
                  {t(`pricing.transport.${id}.one`)}
                </td>
                <td className="px-6 py-4 text-right text-ink-secondary">
                  {t(`pricing.transport.${id}.both`)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
