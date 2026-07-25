const WHY_ITEMS = [
  { num: '01', title: 'Local OEM stock', copy: 'Controller boards, door parts and safety components held in-region for fast turnaround, not shipped from a distant depot.' },
  { num: '02', title: 'Full-system accountability', copy: 'Machine, panel, doors, cabin and safety gear from one team — no finger-pointing between vendors when something needs attention.' },
  { num: '03', title: 'Built for every building type', copy: 'From MRL residential lifts to hospital lifts and glass capsule lifts, we scope the right machine and cabin for your building, not a one-size-fits-all unit.' },
  { num: '04', title: 'A number that actually rings', copy: 'Sales, service and regional office contacts are listed on this page — no ticket queue, just a call or a WhatsApp message.' },
]

export default function WhyUs() {
  return (
    <section className="why" id="why">
      <div className="container why__grid">
        <div>
          <h2 className="section-title">Built by people who answer the service call</h2>
          <p className="section-sub section-sub--left" style={{ color: 'beige' }}>
            Most of what goes wrong with a lift isn't the machine — it's what happens after
            installation, when nobody picks up. We keep OEM parts in stock and regional offices
            close to site.
          </p>
        </div>
        <div className="why-list">
          {WHY_ITEMS.map((item) => (
            <div className="why-item" key={item.num}>
              <span className="why-num">{item.num}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
