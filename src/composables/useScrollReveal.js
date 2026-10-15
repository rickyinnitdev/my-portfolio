import { onMounted, onUnmounted } from 'vue'

export function useScrollReveal(selector = '.reveal') {
  let observer = null
  let timer = null
  const animations = new Map()

  const clearAnimations = () => {
    animations.forEach(animation => animation.cancel())
    animations.clear()
  }

  const init = () => {
    if (typeof window === 'undefined') return

    if (!('IntersectionObserver' in window)) return
    observer?.disconnect()
    clearAnimations()
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    observer = new IntersectionObserver(
      (entries) => {
        let stagger = 0
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (document.documentElement.classList.contains('welcome-playing')) return
            const animation = animations.get(entry.target)
            if (animation) {
              animation.effect.updateTiming({ delay: Math.min(stagger * 100, 300) })
              animation.play()
              stagger++
              animation.onfinish = () => {
                animation.cancel()
                animations.delete(entry.target)
              }
            }
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0, rootMargin: '0px 0px -32px 0px' }
    )

    document.querySelectorAll(selector).forEach((el) => {
      // Already-painted content should never disappear when hydration starts.
      if (el.classList.contains('visible') || el.getBoundingClientRect().top < window.innerHeight || reducedMotion || !el.animate) {
        el.classList.add('visible')
        return
      }
      // Only offscreen elements are prepared; the initial viewport never flashes.
      const animation = el.animate([
        { opacity: 0, transform: 'translateY(48px) scale(0.985)' },
        { opacity: 1, transform: 'translateY(0) scale(1)' },
      ], { duration: 950, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'both' })
      animation.pause()
      animations.set(el, animation)
      observer.observe(el)
    })
  }

  onMounted(() => {
    // slight delay so DOM is fully painted
    timer = setTimeout(init, 80)
    document.addEventListener('portfolio-ready', init)
  })

  onUnmounted(() => {
    clearTimeout(timer)
    document.removeEventListener('portfolio-ready', init)
    if (observer) observer.disconnect()
    clearAnimations()
  })

  return { init }
}
