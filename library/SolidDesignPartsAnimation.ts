export type SolidDesignPartsAnimation = {
  keyframes: Keyframe[]
  options: KeyframeAnimationOptions
}

const DEFAULT_DURATION = 300

export function createFadeAnimation(options: KeyframeAnimationOptions = {}): SolidDesignPartsAnimation {
  return {
    keyframes: [{ opacity: 0 }, { opacity: 1 }],
    options: Object.assign({ duration: DEFAULT_DURATION }, options),
  }
}

const TRANSLATE_Y = { top: '-50%', center: '0%', bottom: '50%' } as const

export function createScaleYAnimation(
  options: KeyframeAnimationOptions = {},
  align: 'top' | 'center' | 'bottom' = 'center'
): SolidDesignPartsAnimation {
  return {
    keyframes: [
      { transform: `translateY(${TRANSLATE_Y[align]}) scaleY(0)` },
      { transform: 'translateY(0%) scaleY(1)' },
    ],
    options: Object.assign({ duration: DEFAULT_DURATION }, options),
  }
}
