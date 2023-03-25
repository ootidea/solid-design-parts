import Color from 'colorjs.io'

export function resolveColorOnBodyElement(color: string): string {
  const backup = document.body.style.color
  document.body.style.color = color
  const computedColor = getComputedStyle(document.body).color
  document.body.style.color = backup
  return computedColor
}

const MIDDLE_LIGHTNESS = 0.75

export function calculateHoverColor(baseCssColor: string): string {
  const color = new Color(baseCssColor)
  if (Number(color.alpha) === 0) {
    return new Color('oklch', [MIDDLE_LIGHTNESS, 0, 0], 0.2).to('hsl').toString()
  }

  const oklch = color.oklch
  const maxChroma = calculateMaxChromaInGamut(oklch.lightness, oklch.hue)
  const chromaRatio = oklch.chroma / maxChroma

  const newLightness =
    oklch.lightness > MIDDLE_LIGHTNESS ? oklch.lightness - 0.05 / oklch.lightness : 1 - (1 - oklch.lightness) * 0.8

  return createColorUsingChromaRatio(newLightness, chromaRatio, oklch.hue).to('hsl').toString()
}

export function calculateActiveColor(baseCssColor: string): string {
  const color = new Color(baseCssColor)
  if (Number(color.alpha) === 0) {
    return new Color('oklch', [MIDDLE_LIGHTNESS, 0, 0], 0.3).to('hsl').toString()
  }

  const oklch = color.oklch
  const maxChroma = calculateMaxChromaInGamut(oklch.lightness, oklch.hue)
  const chromaRatio = oklch.chroma / maxChroma

  const newLightness =
    oklch.lightness > MIDDLE_LIGHTNESS ? oklch.lightness - 0.1 / oklch.lightness : 1 - (1 - oklch.lightness) * 0.7

  return createColorUsingChromaRatio(newLightness, chromaRatio, oklch.hue).to('hsl').toString()
}

// An object to cache the return value of the calculateMaxChromaInGamut function.
const maxChromaMemos: Record<string, number> = {}

/** Searching for the maximum chroma value that fits within the sRGB color space using the bisection method */
export function calculateMaxChromaInGamut(lightness: number, hue: number, delta: number = 0.001): number {
  const memoKey = `${lightness},${hue},${delta}`
  const cachedValue = maxChromaMemos[memoKey]
  if (cachedValue !== undefined) return cachedValue

  // Lower limit of the search range for the bisection method.
  let lowerBound = 0
  // Upper limit of the search range for the bisection method.
  // The maximum value in sRGB is in the 0.321 range, and it is known to be 0.322 or less.
  // This can also be confirmed on the following webpage.
  // https://oklch.evilmartians.io/#69.9,0.321,328.24,100
  let upperBound = 0.322
  while (upperBound - lowerBound > delta) {
    const chroma = lowerBound + (upperBound - lowerBound) / 2
    if (new Color('oklch', [lightness, chroma, hue], 1).inGamut('srgb')) {
      lowerBound = chroma
    } else {
      upperBound = chroma
    }
  }
  return (maxChromaMemos[memoKey] = lowerBound)
}

function createColorUsingChromaRatio(lightness: number, chromaRatio: number, hue: number) {
  const maxChroma = calculateMaxChromaInGamut(lightness, hue)
  return new Color('oklch', [lightness, maxChroma * chromaRatio, hue], 1)
}
