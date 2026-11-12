import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react'
import {
  BadmintonIcon,
  BasketballIcon,
  CricketBatIcon,
  FootballIcon,
  HockeyIcon,
  SwimmingIcon,
  TableTennisBatIcon,
  TennisBallIcon,
  VolleyballIcon,
} from '@hugeicons/core-free-icons'

/** The same Hugeicons glyphs the Turfleo dashboard draws for each sport. */
export type SportKey =
  | 'football'
  | 'cricket'
  | 'pickleball'
  | 'badminton'
  | 'tennis'
  | 'table-tennis'
  | 'basketball'
  | 'volleyball'
  | 'hockey'
  | 'swimming'

const ICONS: Record<SportKey, IconSvgElement> = {
  football: FootballIcon,
  cricket: CricketBatIcon,
  pickleball: TableTennisBatIcon,
  badminton: BadmintonIcon,
  tennis: TennisBallIcon,
  'table-tennis': TableTennisBatIcon,
  basketball: BasketballIcon,
  volleyball: VolleyballIcon,
  hockey: HockeyIcon,
  swimming: SwimmingIcon,
}

export const SPORT_NAMES: Record<SportKey, string> = {
  football: 'Football',
  cricket: 'Box cricket',
  pickleball: 'Pickleball',
  badminton: 'Badminton',
  tennis: 'Tennis',
  'table-tennis': 'Table tennis',
  basketball: 'Basketball',
  volleyball: 'Volleyball',
  hockey: 'Hockey',
  swimming: 'Swimming',
}

export function SportGlyph({
  sport,
  size = 20,
  className,
}: {
  sport: SportKey
  size?: number
  className?: string
}) {
  return <HugeiconsIcon icon={ICONS[sport]} size={size} strokeWidth={1.7} className={className} />
}
