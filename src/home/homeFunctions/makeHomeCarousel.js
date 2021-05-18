import React from 'react'

import makeHomeCarouselSlides from './makeHomeCarouselSlides'
import homeCarouselIndex from '../../assets/carousel/home_carousel/homeCarouselIndex'

const makeHomeCarousel = () => {

  const homeCarouselSlides = makeHomeCarouselSlides(homeCarouselIndex)

  const featureImage = (feature) => {
    return(
      <img
        alt={ feature.id }
        id={ `${feature.id}_image` }
        name={ `${feature.name}Image` }
        src={ feature.image }
      />
    )
  }

  const featureText = (feature) => {
    return(
      <div className='home_logged_out_features_sub_desc_wrapper'>

        <div className='home_logged_out_features_sub_desc_headline_container'>
          <h2><span>SmartApp<span>™</span></span> { feature.headline }</h2>
        </div>
        <div className='home_logged_out_features_sub_desc_text_container'>
            { feature.desc.map((text, d_index) => {
              return(
                <p key={ d_index }>
                  { text }
                </p>
              )
            }) }
        </div>
      </div>
    )
  }

  return(
    <>
      { homeCarouselSlides.map((feature, index) => {
        return(
          <React.Fragment key={ index }>
            { index % 2 === 0 ?
              <div className='home_logged_out_features_sub_container'>
                <div className='home_logged_out_features_sub_left_img_container'>
                  { featureImage(feature) }
                </div>
                <div className='home_logged_out_features_sub_right_desc_container'>
                  { featureText(feature) }
                </div>
              </div>
            :
              <div className='home_logged_out_features_sub_container'>
                <div className='home_logged_out_features_sub_left_desc_container'>
                  { featureText(feature) }
                </div>
                <div className='home_logged_out_features_sub_right_img_container'>
                  { featureImage(feature) }
                </div>
              </div>
            }
          </React.Fragment >
        )
      })}
    </>
  )
}

export default makeHomeCarousel