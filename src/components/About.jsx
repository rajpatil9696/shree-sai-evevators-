export default function About() {
  return (
    <section className="about" id="about">
      <div className="container about__grid">
        <div className="about__tag"></div>
        <div className="about__copy">
          <h2>Lift engineering that treats every floor as important as the top one</h2>
          <p>
            Shree Sai Elevators was built on a simple idea: elevators are the part of a building
            people trust with their safety every single day, so they deserve a team that never
            disappears after installation. From compact geared traction machines to
            permanent-magnet gearless drives for high-rises, we design, supply, install and
            maintain the full elevator system — machine, control panel, doors, cabin and safety
            gear — as one accountable package.
          </p>
          <p>
            We work directly with builders, housing societies, hospitals and industrial clients
            across Baramati, Pune and Beed, with OEM stock held locally so controller boards,
            doors and safety components ship fast when a lift needs to come back online.
          </p>
          <div className="about__pillars">
            <div className="pillar">
              <span className="pillar__icon">▲</span>
              <h3>Easier</h3>
              <p>Simple, collective &amp; duplex control logic that's intuitive from the first ride.</p>
            </div>
            <div className="pillar">
              <span className="pillar__icon">V</span>
              <h3>Smarter</h3>
              <p>V3F drives, ARD auto-rescue and MRL panel systems built for modern buildings.</p>
            </div>
            <div className="pillar">
              <span className="pillar__icon">✓</span>
              <h3>Trusted</h3>
              <p>Governor-tested safety systems and a service desk that answers on WhatsApp.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
