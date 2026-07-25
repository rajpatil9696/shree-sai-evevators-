import { useEffect, useRef, useState } from 'react'

const STOPS = [
  { target: 'home', num: 'G', label: 'Home' },
  { target: 'about', num: '1', label: 'About' },
  { target: 'products', num: '2', label: 'Products' },
  { target: 'safety', num: '3', label: 'Safety' },
  { target: 'why', num: '4', label: 'Why Us' },
  { target: 'offices', num: '5', label: 'Offices' },
  { target: 'contact', num: '6', label: 'Contact' },
]

export default function FloorRail() {
  const [activeIndex, setActiveIndex] = useState(0)
  const railRef = useRef(null)

  useEffect(() => {
    function updateRail() {
      const scrollPos = window.scrollY + window.innerHeight * 0.35
      let idx = 0
      STOPS.forEach((stop, i) => {
        const sec = document.getElementById(stop.target)
        if (sec && sec.offsetTop <= scrollPos) idx = i
      })
      setActiveIndex(idx)
    }
    window.addEventListener('scroll', updateRail, { passive: true })
    updateRail()
    return () => window.removeEventListener('scroll', updateRail)
  }, [])

  const trackHeight = 280
  const step = trackHeight / (STOPS.length - 1)

  const handleClick = (target) => {
    const el = document.getElementById(target)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav className="floor-rail" aria-label="Section progress">
      <div className="floor-rail__track">
        <div
          className="floor-rail__cab"
          ref={railRef}
          style={{ top: `${activeIndex * step}px` }}
        />
      </div>
      <ul className="floor-rail__stops">
        {STOPS.map((stop, i) => (
          <li
            key={stop.target}
            data-target={stop.target}
            className={i === activeIndex ? 'is-active' : ''}
            onClick={() => handleClick(stop.target)}
          >
            <span className="stop-num">{stop.num}</span>
            <span className="stop-label">{stop.label}</span>
          </li>
        ))}
      </ul>
    </nav>
  )
}
