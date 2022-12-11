// @ts-ignore colorjs.io does not support TypeScript
import Color from 'colorjs.io'

export function toHsl(color: string): string {
  return new Color(color).to('hsl').toString()
}

const MIDDLE_LIGHTNESS = 0.75

export function calculateHoverColor(baseColor: string): string {
  const color = new Color(baseColor)
  if (color.alpha === 0) {
    const transparentColor = new Color('oklch', [MIDDLE_LIGHTNESS, 0, 0])
    transparentColor.alpha = 0.2
    return transparentColor.to('hsl').toString()
  }

  const lightnessCoefficient = Math.pow(0.95, 1 / color.alpha)

  if (color.oklch.lightness > MIDDLE_LIGHTNESS) {
    color.oklch.lightness = color.oklch.lightness * lightnessCoefficient
  } else {
    color.oklch.lightness = color.oklch.lightness / lightnessCoefficient
  }
  return color.to('hsl').toString()
}

export function calculateActiveColor(baseColor: string): string {
  const color = new Color(baseColor)
  if (color.alpha === 0) {
    const transparentColor = new Color('oklch', [MIDDLE_LIGHTNESS, 0, 0])
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
