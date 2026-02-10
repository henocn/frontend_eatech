import React, { useRef, useState, useEffect } from 'react'
import sets from './photographysets.json'
import './PhotographySets.css'

function PhotographySets() {
  const containerRef = useRef(null)
  const itemRefs = useRef([])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, sets.length)
  }, [])

  // scroll to current slide programmatically (no auto-advance)
  useEffect(() => {
    const el = itemRefs.current[index]
    const container = containerRef.current
    if (el && container) {
      const left = el.offsetLeft - container.offsetLeft
      container.scrollTo({ left, behavior: 'smooth' })
    }
  }, [index])

  const prev = () => setIndex(i => (i - 1 + sets.length) % sets.length)
  const next = () => setIndex(i => (i + 1) % sets.length)

  return (
    <section className="photography-carousel">
      <div className="carousel-wrapper">
        <button className="carousel-nav left" onClick={prev} aria-label="Précédent">‹</button>
        <div className="carousel" ref={containerRef}>
          {sets.map((s, i) => (
            <div
              key={s.id}
              className={`carousel-item ${i === index ? 'active' : ''}`}
              ref={el => itemRefs.current[i] = el}
            >
              <video
                className="carousel-video"
                src={s.video}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
              />
              <div className="overlay top" />
              <div className="overlay bottom" />
              <div className="carousel-caption">
                <div className="tag">Décor</div>
                <h3><span className="label label-name">{s.name}</span></h3>
                <button className="book-btn" onClick={() => window.location.href = '/booking'}>Réserver une session</button>
              </div>
              <div className="carousel-bottom">
                <div className="bottom-left"><span className="label">{s.location}</span></div>
                <div className="bottom-right"><span className="label">{s.maxPeople} Pers.</span></div>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-nav right" onClick={next} aria-label="Suivant">›</button>
      </div>
    </section>
  )
}

export default PhotographySets
