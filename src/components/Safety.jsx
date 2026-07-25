const SAFETY_ITEMS = [
  {
    img: 'ups-system.jpg',
    alt: 'External battery UPS for elevators',
    title: 'External Battery UPS',
    copy: "We fit Microtek external battery UPS units — India's No.1 power-products brand (IBC Infomedia, 2016) — built on IPS technology, from 700VA up to 10KVA, so your lift keeps running through outages.",
  },
  {
    img: 'over-speed-governor.jpg',
    alt: 'Elevator over speed governor',
    title: 'Over Speed Governor',
    copy: 'A compact, reliable governor with an electrical safety switch, sleeve bearings for smooth low-maintenance movement, and a test groove — each unit is tested and locked to its tripping speed before it leaves us.',
  },
  {
    img: 'cabin-fall-sealing.jpg',
    alt: 'Cabin ceiling fall sealing designs',
    title: 'Cabin Fall Sealing',
    copy: 'A range of ceiling and fall-sealing designs that finish the cabin cleanly while keeping every safety clearance intact.',
  },
]

export default function Safety() {
  return (
    <section className="safety" id="safety">
      <div className="container">
        <h2 className="section-title">Every lift ships with three layers of protection</h2>
        <div className="safety-grid">
          {SAFETY_ITEMS.map((item) => (
            <article className="safety-card" key={item.img}>
              <img src={`/assets/images/${item.img}`} alt={item.alt} loading="lazy" />
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
