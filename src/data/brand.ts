/**
 * The Upgrade Lab — brand tokens.
 *
 * These are not design choices. Every logo value below was measured out of the
 * client's own artwork, extracted from page 1 of "the Upgrade lab project.pdf"
 * (xref 21, 1254x1254 JPEG) and clustered by pixel share on 2026-09-06.
 *
 * ---------------------------------------------------------------------------
 * CORRECTION, 2026-09-08. An earlier version of this file claimed the three
 * brand hues sat on a "plateau" of identical saturation and near-identical
 * lightness, and declared that plateau a law any new colour had to obey.
 *
 * That was wrong, and it was measured wrong. It used HSL lightness, which is
 * not perceptual. In OKLCH the same three hues are:
 *
 *   blue  #0068E0 -> L 0.542
 *   rose  #F0005A -> L 0.609
 *   amber #F89800 -> L 0.762
 *
 * A 4-point HSL spread is a 22-point PERCEPTUAL spread. Amber is far lighter
 * to the eye than blue. That is not a set, and it is precisely why contrast
 * broke: on black, blue lands at 4.06:1 and FAILS WCAG AA, while amber sails
 * past at 9.48:1. If they were really a plateau their contrast would match.
 * ---------------------------------------------------------------------------
 *
 * Black is not the background. Black is the first brand colour: 63.7% of the
 * logo canvas, and every hue below is calibrated to sit on it.
 */

/** The logo, exactly as drawn. These are FILL colours — flat areas, never type. */
export const BRAND = {
  black: '#000000',
  blue: '#0068E0',
  rose: '#F0005A',
  amber: '#F89800',
  ball: '#DC4600',
  steel: '#EEEEEE'
} as const;

/** OKLCH hue angles of the logo, measured. The hue is what we preserve; the
 *  lightness is what we move, because lightness is what legibility is made of. */
export const HUE = { blue: 258.0, rose: 12.3, amber: 66.3, ball: 38.2 } as const;

/**
 * Two ramps, and this is the actual law.
 *
 * The technique is taken from motion.dev, which authors every accent in oklch
 * with the LIGHTNESS LOCKED INTO A NARROW BAND and lets chroma vary per hue.
 * Solving for maximum in-gamut chroma at a fixed L gives a set whose members
 * are genuinely interchangeable — the measured perceptual spread is 0.0 points
 * instead of 22, and the contrast ratios land within 0.6 of one another, which
 * is the proof rather than the claim.
 *
 * Rule: on black, read from ON_DARK. On paper, read from ON_LIGHT. Never use a
 * BRAND value for text — those are fills.
 */
export const ON_DARK = {
  /** L = 0.72, on #000000 */
  blue: '#68A5FF',   // 8.41:1
  rose: '#FF6D86',   // 7.78:1
  amber: '#E68D00',  // 8.17:1
  ink: '#F2F3F5',    // 18.91:1
  dim: '#7E848C'     //  5.28:1 on #08090B
} as const;

export const ON_LIGHT = {
  /** L = 0.50, on #FAFAF8 */
  blue: '#005DC9',   // 5.89:1
  rose: '#B90043',   // 6.39:1
  amber: '#8D5400',  // 5.91:1
  ink: '#08090B',    // 19.7:1
  muted: '#585F6A'   //  6.1:1
} as const;

/**
 * The five pathway levels.
 *
 * The reading: an athlete starts in blue — the U, the arrow, the climb — moves
 * into rose as they become part of the LAB, and finishes on amber, the colour
 * of the court lines themselves. No hue outside the logo is introduced.
 *
 * `fill` is the flat brand colour for large areas. `text` is the ramp value,
 * and it is the ONLY one allowed to carry type. Getting this pair backwards is
 * the bug that shipped on 2026-09-06.
 */
export const PATHWAY = [
  { key: 'discover', label: 'Discover', fill: BRAND.blue,  textOnDark: ON_DARK.blue,  textOnLight: ON_LIGHT.blue },
  { key: 'develop',  label: 'Develop',  fill: BRAND.blue,  textOnDark: ON_DARK.blue,  textOnLight: ON_LIGHT.blue },
  { key: 'compete',  label: 'Compete',  fill: BRAND.rose,  textOnDark: ON_DARK.rose,  textOnLight: ON_LIGHT.rose },
  { key: 'perform',  label: 'Perform',  fill: BRAND.rose,  textOnDark: ON_DARK.rose,  textOnLight: ON_LIGHT.rose },
  { key: 'progress', label: 'Progress', fill: BRAND.amber, textOnDark: ON_DARK.amber, textOnLight: ON_LIGHT.amber }
] as const;

/**
 * Placement rule, and it is not decoration.
 *
 * The logo is a raster with photographic gradients, bevels and glow, drawn to
 * sit on black. It has no usable knockout: keying the black away also eats the
 * dark outlines that separate the blue from the rose. So on any light surface
 * the logo goes inside a black panel. That is how the artwork actually works.
 *
 * Weight, measured: 1024px WebP = 391 KB, 512px = 143 KB, 256px = 50 KB.
 * The traced vector monogram is 3.5 KB gzip — 112x lighter — and is sharp at
 * 32px and at print size, which the raster never was. Use the vector for the
 * mark and set the name as type; keep the raster badge only where the ball and
 * net matter and the bytes are paid once.
 */
export const LOGO = {
  mark: '/brand/ugl-mark.svg',
  onDark: '/brand/ugl-logo.png',
  onLight: '/brand/ugl-logo-black.png',
  web: {
    w1024: '/brand/ugl-logo-1024.webp',
    w512: '/brand/ugl-logo-512.webp',
    w256: '/brand/ugl-logo-256.webp',
    w96: '/brand/ugl-logo-96.webp'
  },
  /** Reads UPGRADES-LAB in the artwork. The plural and the hyphen are finding
   *  09; the mark carries no lettering, so the name is set as type instead. */
  wordmarkAsDrawn: 'THE UPGRADES-LAB',
  wordmarkAgreed: 'THE UPGRADE LAB',
  /** The logo's italic is a mechanical oblique, not a true italic. 9 degrees is
   *  a system constant: headings, buttons, dividers and image masks all lean. */
  obliqueDeg: 9,
  alt: 'The Upgrade Lab — monogramme UGL, ballon de basket et panier'
} as const;
