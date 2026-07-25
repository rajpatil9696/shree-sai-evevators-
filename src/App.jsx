import FloorRail from './components/FloorRail.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Products from './components/Products.jsx'
import Safety from './components/Safety.jsx'
import WhyUs from './components/WhyUs.jsx'
import Offices from './components/Offices.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import WhatsAppFloat from './components/WhatsAppFloat.jsx'


export default function App() {
  return (
    <>
      <FloorRail />
      <Header />
      <main>
        <Hero />
        <About />
        <Products />
        <Safety />
        <WhyUs />
        <Offices />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
