import { assertInstanceOf, includes } from 'base-up'
import { createFocusTrap } from 'focus-trap'
import { JSX, onCleanup } from 'solid-js'

export function isNestedClickEvent(event: MouseEvent) {
  assertInstanceOf(event.target, Element)
  assertInstanceOf(event.currentTarget, Element)
  return detectNestedClickableElement(event.currentTarget, event.target)
}

function detectNestedClickableElement(currentTarget: Element, target: Element): boolean {
  if (currentTarget === target) return false

  if (isClickable(target)) return true

  return detectNestedClickableElement(currentTarget, target.parentElement!)
}

function isClickable(element: Element): boolean {
  const contenteditable = element.getAttribute('contenteditable')
  if (contenteditable && contenteditable !== 'false') return true

  return (
    includes(['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'SELECT', 'OPTION'], element.tagName) ||
    includes(
      [
        'link',
        'menuitem',
        'button',
        'spinbutton',
        'slider',
        'scrollbar',
        'textbox',
        'option',
        'radio',
        'menuitemradio',
        'checkbox',
        'menuitemcheckbox',
        'treeitem',
        'switch',
        'tab',
      ],
      element.getAttribute('role')
    )
  )
}

export function isInsideOf(x: number, y: number, rect: DOMRect): boolean {
  if (x < rect.left) return false
  if (rect.right < x) return false
  if (y < rect.top) return false
  if (rect.bottom < y) return false

  return true
}

export function toArray(children: JSX.Element): JSX.Element[] {
  if (children instanceof Array) return children

  return [children]
}

/**
 * Observe element width in px using ResizeObserver.
 * Callback immediately when this function is called.
 */
export function observeWidthPx(element: HTMLElement, callback: (widthPx: number) => void) {
  callback(element.getBoundingClientRect().width)
  const resizeObserver = new ResizeObserver(() => {
    callback(element.getBoundingClientRect().width)
  })
  resizeObserver.observe(element)

  onCleanup(() => {
    resizeObserver.unobserve(element)
  })
}

/**
 * Observe element height in px using ResizeObserver.
 * Callback immediately when this function is called.
 */
export function observeHeightPx(element: HTMLElement, callback: (heightPx: number) => void) {
  callback(element.getBoundingClientRect().height)
  const resizeObserver = new ResizeObserver(() => {
    callback(element.getBoundingClientRect().height)
  })
  resizeObserver.observe(element)

  onCleanup(() => {
    resizeObserver.unobserve(element)
  })
}

/**
 * Confine focus under the given element.
 * Calling this function will focus the element, so the element must be focusable.
 * It is recommended that tabindex="-1" and outline:none be specified for the element.
 */
export function setupFocusTrap(element: HTMLElement) {
  const focusTrap = createFocusTrap(element, {
    escapeDeactivates: false,
    fallbackFocus: element,
  })
  focusTrap.activate()

  onCleanup(() => {
    focusTrap.deactivate()
  })
}

/**
 * Extract texts from JSX.Element.
 * @example
 * extractContainedTexts(<div title="title">abc<p>{123}</p></div>) results ['abc', '123']
 * extractContainedTexts(<img src="http://example.com" alt="example" />) results []
 * extractContainedTexts(<>{undefined}{false}</>) results []
 */
export function extractContainedTexts(element: JSX.Element): string[] {
  switch (typeof element) {
    case 'undefined':
    case 'boolean':
      return []
    case 'string':
      return [element]
    case 'number':
      return [String(element)]
    case 'function':
      return extractContainedTexts(element())
    case 'object':
      if (element === null) return []

      if (element instanceof Array) return element.flatMap(extractContainedTexts)

      if (element.nodeType === element.TEXT_NODE) {
        return element.textContent === null ? [] : [element.textContent]
      }

      return [...element.childNodes].flatMap(extractContainedTexts)
  }
}
