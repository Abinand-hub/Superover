// Map team codes / names to official high-resolution country & club crest URLs
export const TEAM_LOGO_MAP: Record<string, string> = {
  // European Clubs & Nations
  MAD: 'https://flagcdn.com/w160/es.png',
  MADRID: 'https://flagcdn.com/w160/es.png',
  ESP: 'https://flagcdn.com/w160/es.png',
  SPAIN: 'https://flagcdn.com/w160/es.png',
  CTL: 'https://flagcdn.com/w160/es-ct.png',
  CATALUNYA: 'https://flagcdn.com/w160/es-ct.png',
  PIC: 'https://flagcdn.com/w160/es.png',
  'PAK I CARE': 'https://flagcdn.com/w160/es.png',
  ROR: 'https://flagcdn.com/w160/it.png',
  'ROYAL ROMA': 'https://flagcdn.com/w160/it.png',
  BRE: 'https://flagcdn.com/w160/it.png',
  BRESCIA: 'https://flagcdn.com/w160/it.png',
  ITA: 'https://flagcdn.com/w160/it.png',
  ITALY: 'https://flagcdn.com/w160/it.png',
  NED: 'https://flagcdn.com/w160/nl.png',
  NETHERLANDS: 'https://flagcdn.com/w160/nl.png',
  DRX: 'https://flagcdn.com/w160/fr.png',
  DREUX: 'https://flagcdn.com/w160/fr.png',
  FRA: 'https://flagcdn.com/w160/fr.png',
  FRANCE: 'https://flagcdn.com/w160/fr.png',
  OV: 'https://flagcdn.com/w160/je.png',
  'OLD VICTORIANS': 'https://flagcdn.com/w160/je.png',
  JERSEY: 'https://flagcdn.com/w160/je.png',
  FOR: 'https://flagcdn.com/w160/gb-sct.png',
  FORFARSHIRE: 'https://flagcdn.com/w160/gb-sct.png',
  SCOTLAND: 'https://flagcdn.com/w160/gb-sct.png',
  GER: 'https://flagcdn.com/w160/de.png',
  GERMANY: 'https://flagcdn.com/w160/de.png',
  AUT: 'https://flagcdn.com/w160/at.png',
  AUSTRIA: 'https://flagcdn.com/w160/at.png',
  BEL: 'https://flagcdn.com/w160/be.png',
  BELGIUM: 'https://flagcdn.com/w160/be.png',
  LUX: 'https://flagcdn.com/w160/lu.png',
  LUXEMBOURG: 'https://flagcdn.com/w160/lu.png',
  SUI: 'https://flagcdn.com/w160/ch.png',
  SWITZERLAND: 'https://flagcdn.com/w160/ch.png',

  // International Teams
  IND: 'https://flagcdn.com/w160/in.png',
  INDIA: 'https://flagcdn.com/w160/in.png',
  ENG: 'https://flagcdn.com/w160/gb-eng.png',
  ENGLAND: 'https://flagcdn.com/w160/gb-eng.png',
  PAK: 'https://flagcdn.com/w160/pk.png',
  PAKISTAN: 'https://flagcdn.com/w160/pk.png',
  AUS: 'https://flagcdn.com/w160/au.png',
  AUSTRALIA: 'https://flagcdn.com/w160/au.png',
  SA: 'https://flagcdn.com/w160/za.png',
  'SOUTH AFRICA': 'https://flagcdn.com/w160/za.png',
  NZ: 'https://flagcdn.com/w160/nz.png',
  'NEW ZEALAND': 'https://flagcdn.com/w160/nz.png',
  WI: 'https://flagcdn.com/w160/jm.png',
  'WEST INDIES': 'https://flagcdn.com/w160/jm.png',
  SL: 'https://flagcdn.com/w160/lk.png',
  'SRI LANKA': 'https://flagcdn.com/w160/lk.png',
  BAN: 'https://flagcdn.com/w160/bd.png',
  BANGLADESH: 'https://flagcdn.com/w160/bd.png',
  AFG: 'https://flagcdn.com/w160/af.png',
  AFGHANISTAN: 'https://flagcdn.com/w160/af.png',
};

export function getTeamLogoUrl(code?: string, name?: string, fallbackUrl?: string): string {
  if (fallbackUrl && !fallbackUrl.includes('ui-avatars.com')) {
    return fallbackUrl;
  }

  const codeKey = (code || '').toUpperCase().trim();
  const nameKey = (name || '').toUpperCase().trim();

  if (TEAM_LOGO_MAP[codeKey]) return TEAM_LOGO_MAP[codeKey];
  if (TEAM_LOGO_MAP[nameKey]) return TEAM_LOGO_MAP[nameKey];

  for (const [key, url] of Object.entries(TEAM_LOGO_MAP)) {
    if (nameKey.includes(key) || codeKey.includes(key)) {
      return url;
    }
  }

  return fallbackUrl || `https://flagcdn.com/w160/un.png`;
}
