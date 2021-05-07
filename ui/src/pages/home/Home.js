import { FooterComponent } from './components/footer';
import { AboutUsComponent } from './components/who-we-are';
import { WhatWeOfferComponent } from './components/what-offer';
import { WeAreWorkingComponent } from './components/working-with';
import './home.scss';

export const HomePage = () => {
  return (
    <section>
      <AboutUsComponent></AboutUsComponent>
      <WhatWeOfferComponent></WhatWeOfferComponent>
      <WeAreWorkingComponent></WeAreWorkingComponent>
      <FooterComponent></FooterComponent>
    </section>
  )
}