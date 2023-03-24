import Color from 'colorjs.io'

export function toHsl(color: string): string {
  return new Color(color).to('hsl').toString()
}

const MIDDLE_LIGHTNESS = 0.75

export function calculateHoverColor(baseColor: string): string {
  const color = new Color(baseColor)
  if (color.alpha === 0) {
    return new Color('oklch', [MIDDLE_LIGHTNESS, 0, 0], 0.2).to('hsl').toString()
  }

  const maxChroma = calculateMaxChromaInGamut(color.oklch.lightness, color.oklch.hue)
  const chromaRatio = color.oklch.chroma / maxChroma

  const newLightness =
    color.oklch.lightness > MIDDLE_LIGHTNESS
      ? color.oklch.lightness - 0.05 / color.oklch.lightness
      : 1 - (1 - color.oklch.lightness) * 0.8

  const newColor = createColorUsingChromaRatio(newLightness, chromaRatio, color.oklch.hue)
  return newColor.to('hsl').toString()
}

export function calculateActiveColor(baseColor: string): string {
  const color = new Color(baseColor)
  if (color.alpha === 0) {
    const transparentColor = new Color('oklch', [MIDDLE_LIGHTNESS, 0, 0], 1)
    transparentColor.alpha = 0.3
    return transparentColor.to('hsl').toString()
  }

  const lightnessCoefficient = Math.pow(0.9, 1 / color.alpha)

  if (color.oklch.lightness > MIDDLE_LIGHTNESS) {
    color.oklch.lightness = color.oklch.lightness * lightnessCoefficient
  } else {
    color.oklch.lightness = color.oklch.lightness / lightnessCoefficient
  }
  return color.to('hsl').toString()
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
