import './styles.css'

/* ─── Sound Toggle ─── */
const soundBtn = document.getElementById('soundToggle')
let soundOn = false

if (soundBtn) {
  soundBtn.addEventListener('click', () => {
    soundOn = !soundOn
    const label = soundBtn.querySelector('span')
    const icon  = soundBtn.querySelector('svg')
    label.textContent = soundOn ? 'SOUND ON' : 'SOUND OFF'
    icon.innerHTML = soundOn
      ? `<path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>`
      : `<line x1="1" y1="1" x2="23" y2="23"></line>
         <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path>
         <path d="M17 16.95A7 7 0 0 0 19 12v-2M5 10v2a7 7 0 0 0 11.08 5.83"></path>`
    icon.setAttribute('fill', soundOn ? 'currentColor' : 'none')
  })
}

/* ─── Nav glass on scroll ─── */
const nav = document.getElementById('nav')
if (nav) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      nav.style.background = 'rgba(11,13,21,0.96)'
      nav.style.backdropFilter = 'blur(14px)'
      nav.style.webkitBackdropFilter = 'blur(14px)'
    } else {
      nav.style.background = '#0b0d15'
      nav.style.backdropFilter = 'none'
      nav.style.webkitBackdropFilter = 'none'
    }
  }, { passive: true })
}

/* ─── Card scroll-reveal ─── */
const cards = document.querySelectorAll('.mode-card')
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1'
      entry.target.style.transform = 'translateY(0)'
      revealObs.unobserve(entry.target)
    }
  })
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' })

cards.forEach((card, i) => {
  card.style.opacity = '0'
  card.style.transform = 'translateY(24px)'
  card.style.transition = `opacity 0.55s ease ${i * 0.13}s, transform 0.55s ease ${i * 0.13}s`
  revealObs.observe(card)
})

/* ─── Ticker speed auto-calibrate ─── */
const ticker = document.getElementById('tickerInner')
if (ticker) {
  const speed = 65 // px per second
  const w = ticker.scrollWidth / 2
  ticker.style.animationDuration = (w / speed).toFixed(1) + 's'
}
