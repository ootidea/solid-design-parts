/** Count the number of characters. If possible, use Intl.Segmenter */
export function countCharacters(text: string): number {
  if (Intl?.Segmenter !== undefined) {
    const segmenter = new Intl.Segmenter([], { granularity: 'grapheme' })
    return [...segmenter.segment(text)].length
  } else {
    return [...text].length
  }
}
