export type Season = 'low' | 'high'
export type Service = 'boarding' | 'sitting' | 'walking'
export type Stay = 'full' | 'half'

export type BandId = 'gt4' | '3to4' | '1to2' | 'gt9' | '5to9' | '1to4'

export interface PriceBand {
  id: BandId
  min: number
  row: [number, number, number]
}

type TableKey = `boarding-${Stay}-${Season}` | `visit-${Season}`

export const TABLES: Record<TableKey, PriceBand[]> = {
  'boarding-full-low': [
    { id: 'gt4', min: 5, row: [25, 38, 50.5] },
    { id: '3to4', min: 3, row: [28.5, 42.5, 56.5] },
    { id: '1to2', min: 1, row: [31.5, 47.5, 63] },
  ],
  'boarding-full-high': [
    { id: 'gt4', min: 5, row: [27.5, 42, 55.5] },
    { id: '3to4', min: 3, row: [31.5, 47, 62] },
    { id: '1to2', min: 1, row: [34.5, 52.5, 69.5] },
  ],
  'boarding-half-low': [
    { id: 'gt4', min: 5, row: [15.5, 23, 31] },
    { id: '3to4', min: 3, row: [17.5, 26, 34.5] },
    { id: '1to2', min: 1, row: [19.5, 29, 38.5] },
  ],
  'boarding-half-high': [
    { id: 'gt4', min: 5, row: [17, 25.5, 34] },
    { id: '3to4', min: 3, row: [19.5, 28.5, 38] },
    { id: '1to2', min: 1, row: [21.5, 32, 42.5] },
  ],
  'visit-low': [
    { id: 'gt9', min: 10, row: [9.5, 12, 14.5] },
    { id: '5to9', min: 5, row: [10.75, 13.5, 16.25] },
    { id: '1to4', min: 1, row: [12, 15, 18] },
  ],
  'visit-high': [
    { id: 'gt9', min: 10, row: [10.5, 13.25, 16] },
    { id: '5to9', min: 5, row: [11.75, 14.75, 18] },
    { id: '1to4', min: 1, row: [13.25, 16.5, 19.75] },
  ],
}

export type PriceKind = 'boarding' | 'visit'

export function priceRange(kind: PriceKind) {
  const prices = Object.entries(TABLES)
    .filter(([key]) => key.startsWith(kind))
    .flatMap(([, bands]) => bands.flatMap(({ row }) => row))

  return { min: Math.min(...prices), max: Math.max(...prices) }
}

export type TransportId = 'r0_3' | 'r3_7' | 'r7_12' | 'r12_20' | 'r20plus'

export const TRANSPORT: TransportId[] = [
  'r0_3',
  'r3_7',
  'r7_12',
  'r12_20',
  'r20plus',
]

export const eur = (n: number, locale: 'pt' | 'en' = 'pt') =>
  new Intl.NumberFormat(locale === 'en' ? 'en-US' : 'pt-PT', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n)
