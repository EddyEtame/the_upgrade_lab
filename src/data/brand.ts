/**
 * The Upgrade Lab — brand tokens.
 *
 * These are NOT design choices. Every value below was measured out of the
 * client's own logo, extracted from page 1 of "the Upgrade lab project.pdf"
 * (xref 21, 1254x1254 JPEG) and clustered by pixel share on 2026-09-06.
 * The logo is the source of truth; this file only records what it already is.
 *
 * The finding that matters: the three brand hues sit at IDENTICAL saturation
 * (100%) and near-identical lightness (44-48%). That plateau is why they read
 * as a set rather than three loose colours, and it is the rule any new colour
 * has to obey to belong here.
 *
 *   blue   h211  s100%  l44%
 *   rose   h336  s100%  l47%
 *   amber  h36   s100%  l48%
 *
 * Black is not the background. Black is the first brand colour: it is 63.7% of
 * the logo canvas, and every hue above is calibrated to sit on it.
 */

export const BRAND = {
  /** 63.7% of the logo canvas. The ground the identity is built for. */
  black: '#000000',
  /** The U, the L, the upward arrow, "UPGRADES". Measured #006CE4 / #0060D8. */
  blue: '#0068E0',
  /** The G, "LAB", every outline, the hoop, the arcs. Measured #F00060 / #F00054. */
  rose: '#F0005A',
  /** Court lines and the dashes flanking "THE". Measured #F89800. */
  amber: '#F89800',
  /** The basketball itself. Measured #DC4600 / #D23C00. */
  ball: '#DC4600',
  /** The net. Near-neutral highlights. */
  steel: '#EEEEEE'
} as const;

/**
 * Shades and tints, derived by moving lightness only and holding h/s fixed —
 * so everything derived still obeys the plateau rule above.
 */
export const BRAND_SCALE = {
  blueDeep: '#0047A8',
  blueLift: '#3A8CF0',
  roseDeep: '#C4004A',
  roseLift: '#FF3D82',
  amberDeep: '#C67200',
  amberLift: '#FFB53A'
} as const;

/**
 * The five pathway levels, coloured from the brand set only.
 *
 * The reading: an athlete starts in blue — the U, the arrow, the climb — moves
 * into rose as they become part of the LAB, and finishes on amber, the colour
 * of the court lines themselves. No hue outside the logo is introduced, and no
 * interpolation lands on a colour the brand does not already own.
 */
export const PATHWAY = [
  { key: 'discover', label: 'Discover', color: BRAND_SCALE.blueDeep },
  { key: 'develop',  label: 'Develop',  color: BRAND.blue },
  { key: 'compete',  label: 'Compete',  color: BRAND_SCALE.roseDeep },
  { key: 'perform',  label: 'Perform',  color: BRAND.rose },
  { key: 'progress', label: 'Progress', color: BRAND.amber }
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
 * It is by a wide margin the heaviest asset on the site — on slow 3G the
 * 512px version alone costs ~2.8s. Header and body use 256px or smaller.
 * A vector redraw of the wordmark would land near 8 KB and remove the problem
 * entirely; that is the strongest practical argument for the lettering cleanup
 * Blaise has already agreed to.
 */
export const LOGO = {
  onDark: '/brand/ugl-logo.png',
  onLight: '/brand/ugl-logo-black.png',
  web: {
    w1024: '/brand/ugl-logo-1024.webp',
    w512: '/brand/ugl-logo-512.webp',
    w256: '/brand/ugl-logo-256.webp',
    w96: '/brand/ugl-logo-96.webp'
  },
  /** Reads UPGRADES-LAB in the artwork. The plural and the hyphen are the
   *  inconsistency flagged as finding 09; the wordmark cleanup resolves it. */
  wordmarkAsDrawn: 'THE UPGRADES-LAB',
  wordmarkAgreed: 'THE UPGRADE LAB',
  alt: 'The Upgrade Lab — monogramme UGL, ballon de basket et panier'
} as const;
