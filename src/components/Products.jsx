import { useState } from 'react'
import { productTabs, manualDoors, autoDoors, cabins } from '../data/productsData.js'

function CardGrid({ items, extraClass = '' }) {
  return (
    <div className={`card-grid ${extraClass}`.trim()}>
      {items.map((item) => (
        <figure className="card" key={item.img}>
          <img src={`/assets/images/${item.img}`} alt={item.alt} loading="lazy" />
          <figcaption>{item.label}</figcaption>
        </figure>
      ))}
    </div>
  )
}

export default function Products() {
  const [activeTab, setActiveTab] = useState('machines')

  return (
    <section className="products" id="products">
      <div className="container">
        <h2 className="section-title section-title--light">Everything that goes into your lift shaft</h2>
        <p className="section-sub">Every component below is engineered, stocked and fitted by our own team — nothing is outsourced sight unseen.</p>

        <div className="tabs" id="productTabs">
          <div className="tabs__nav" role="tablist">
            {productTabs.map((tab) => (
              <button
                key={tab.key}
                className={`tabs__btn${activeTab === tab.key ? ' is-active' : ''}`}
                data-tab={tab.key}
                role="tab"
                aria-selected={activeTab === tab.key}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* MACHINES */}
          <div className={`tabs__panel${activeTab === 'machines' ? ' is-active' : ''}`} data-panel="machines">
            <div className="product-row">
              <img src="/assets/images/traction-machines.jpg" alt="Geared traction machines for elevators" loading="lazy" />
              <div className="product-copy">
                <span className="mono-tag">GEARED &middot; UP TO 1000 KG</span>
                <h3>Traction Machine</h3>
                <p>Small, compact and light, engineered for loads up to 1000&nbsp;kg at speeds of 0.5, 0.6 and 1&nbsp;m/s, in line with European lift directives.</p>
                <ul className="spec-list">
                  <li>Worm made of hardened, ground steel</li>
                  <li>Crown of centrifugally cast antifriction bronze</li>
                  <li>Slow shaft in hardened &amp; tempered alloy steel</li>
                  <li>Twin magnetic-circuit brake, 110–220V DC</li>
                </ul>
              </div>
            </div>
            <div className="product-row product-row--reverse">
              <img src="/assets/images/gearless-machines.jpg" alt="Permanent magnet gearless elevator machines" loading="lazy" />
              <div className="product-copy">
                <span className="mono-tag">GEARLESS &middot; 3–20 PASSENGERS</span>
                <h3>Permanent Magnet Gear-less Machine</h3>
                <p>Suitable for elevators with or without a machine room, built for high-rise buildings carrying 3 to 20 passengers.</p>
                <ul className="spec-list">
                  <li>Energy saving of up to 30%</li>
                  <li>Low noise, no oil-spillage problems</li>
                  <li>Less maintenance, suitable for any speed</li>
                  <li>Outstanding torque &amp; cogging characteristics</li>
                </ul>
              </div>
            </div>
          </div>

          {/* PANELS */}
          <div className={`tabs__panel${activeTab === 'panels' ? ' is-active' : ''}`} data-panel="panels">
            <div className="product-row">
              <img src="/assets/images/cop-landing-panels.jpg" alt="Car operation panel and landing operation panel finishes" loading="lazy" />
              <div className="product-copy">
                <span className="mono-tag">COP &amp; LOP</span>
                <h3>Car &amp; Landing Operation Panels</h3>
                <p>Face-flat panels in hairline, 8-finish, satin, gold-mirror, matt, rose and black stainless steel, with your choice of push button and a 7-segment + arrow position indicator.</p>
              </div>
            </div>
            <div className="product-row product-row--reverse">
              <img src="/assets/images/control-cabinets.jpg" alt="Elevator control panel cabinets" loading="lazy" />
              <div className="product-copy">
                <span className="mono-tag">V3F &middot; AUTO SERIES &middot; MRL</span>
                <h3>Elevator Control Panel</h3>
                <p>Every-floor reed, car-top reed and gang-switch sensing, with inspection-mode operation and OEM parts kept in stock for immediate service.</p>
                <ul className="spec-list">
                  <li><strong>V3F Series</strong> — smooth start-up &amp; landing, longer machine life, assured levelling in both directions</li>
                  <li><strong>Auto Series</strong> — motor-operated auto doors, manual open/close, optical safety sensors</li>
                  <li>Down collective, up collective &amp; two-button collective-selective programming</li>
                  <li>Duplex, ARD auto-rescue, hydraulic &amp; machine-room-less (MRL) systems</li>
                </ul>
              </div>
            </div>
          </div>

          {/* MANUAL DOORS */}
          <div className={`tabs__panel${activeTab === 'manual-doors' ? ' is-active' : ''}`} data-panel="manual-doors">
            <CardGrid items={manualDoors} />
          </div>

          {/* AUTO DOORS */}
          <div className={`tabs__panel${activeTab === 'auto-doors' ? ' is-active' : ''}`} data-panel="auto-doors">
            <CardGrid items={autoDoors} />
          </div>

          {/* CABINS */}
          <div className={`tabs__panel${activeTab === 'cabins' ? ' is-active' : ''}`} data-panel="cabins">
            <CardGrid items={cabins} extraClass="card-grid--3" />
          </div>
        </div>
      </div>
    </section>
  )
}
