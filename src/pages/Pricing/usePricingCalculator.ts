import { useState } from 'react'
import {
  type Season,
  type Service,
  type Stay,
  TABLES,
} from '../../data/pricing'

export function usePricingCalculator() {
  const [service, setService] = useState<Service>('boarding')
  const [season, setSeason] = useState<Season>('low')
  const [stay, setStay] = useState<Stay>('full')
  const [dogs, setDogs] = useState(1)
  const [times, setTimes] = useState(3)

  const isBoarding = service === 'boarding'
  const tableKey = isBoarding
    ? (`boarding-${stay}-${season}` as const)
    : (`visit-${season}` as const)
  const bands = TABLES[tableKey]
  const timesMax = isBoarding ? 7 : 14
  const clampedTimes = Math.min(times, timesMax)
  const band =
    bands.find((band) => clampedTimes >= band.min) ?? bands[bands.length - 1]
  const unitPrice = band.row[dogs - 1]
  const weekTotal = unitPrice * clampedTimes

  const unitTitleKey = isBoarding
    ? 'perNight'
    : service === 'sitting'
      ? 'perVisit'
      : 'perWalk'
  const unitLabelKey = isBoarding ? 'nightsPerWeek' : 'timesPerWeek'

  return {
    service,
    setService,
    season,
    setSeason,
    stay,
    setStay,
    dogs,
    setDogs,
    times: clampedTimes,
    setTimes,
    timesMax,
    isBoarding,
    bands,
    band,
    unitPrice,
    weekTotal,
    unitTitleKey,
    unitLabelKey,
  }
}

export type PricingCalculator = ReturnType<typeof usePricingCalculator>
