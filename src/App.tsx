import { Nav } from './sections/Nav'
import { ChapterRail } from './sections/ChapterRail'
import { Hero } from './sections/Hero'
import { SportsMarquee } from './sections/SportsMarquee'
import { Problem } from './sections/Problem'
import { Costs } from './sections/Costs'
import { Turn } from './sections/Turn'
import { Solution } from './sections/Solution'
import { Bento } from './sections/Bento'
import { Day } from './sections/Day'
import { Calculator } from './sections/Calculator'
import { Audiences } from './sections/Audiences'
import { GetStarted } from './sections/GetStarted'
import { Trust } from './sections/Trust'
import { Pricing } from './sections/Pricing'
import { Faq } from './sections/Faq'
import { FinalCta } from './sections/FinalCta'
import { Footer } from './sections/Footer'
import { useSmoothScroll } from './lib/smooth'

export default function App() {
  useSmoothScroll()
  return (
    <>
      <div className="grain" aria-hidden />
      <Nav />
      <ChapterRail />
      <main>
        <Hero />
        <SportsMarquee />
        <Problem />
        <Costs />
        <Turn />
        <Solution />
        <Bento />
        <Day />
        <Calculator />
        <Audiences />
        <GetStarted />
        <Trust />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
