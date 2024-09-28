import React from 'react'
import MainPageSlider from '../MainPageSlider/MainPageSlider'
import Main_sec_1_cards from '../MainPageSection_1_Cards/Main_sec_1_cards'
import MainPageCarousel from '../MainPageCarousel/MainPageCarousel'
import MainPageSellGold from '../MainPageSellGold/MainPageSellGold'
import MainPageTrustPilot from '../MainPageTrustPilot/MainPageTrustPilot'
import Crown_cards from '../MainPageCrownCards/Crown_cards'
const MainPageWrapper = () => {
  return (
    <div>
      <MainPageSlider />
      <Main_sec_1_cards />
      <MainPageCarousel />
      <MainPageSellGold />
      {/* <Crown_cards /> */}
      <MainPageTrustPilot />
    </div>
  )
}

export default MainPageWrapper
