import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SocialProof from './components/SocialProof'
import Marquee from './components/Marquee'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import Process from './components/Process'
import Results from './components/Results'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Scroll3DScene from './components/Scroll3DScene'
import ParallaxShowcase from './components/ParallaxShowcase'

function App() {
  return (
    <>
      <Scroll3DScene />
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <ParallaxShowcase />
        <Marquee />
        <Services />
        <Portfolio />
        <Process />
        <Results />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
