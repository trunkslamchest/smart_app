import React from 'react'

import homeFeaturesList from '../homeComponents/homeFeatures/homeFeaturesList'
import homeFeaturesIndex from '../../assets/home_features/homeFeaturesIndex'

const makeHomeLoggedOutFeaturesList = (props) => {

  const makeHomeFeaturesList = homeFeaturesList(homeFeaturesIndex)

  const imgContainer = (feature) => {
    return(
      <div className='home_logged_out_features_sub_img_container'>
          <img
            alt={ feature.id }
            id={ `${feature.id}_image` }
            name={ `${feature.name}Image` }
            src={ feature.image }
          />
      </div>
    )
  }

  const textContainer = (feature) => {
    return(
      <div className='home_logged_out_features_sub_desc_container'>
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
          { feature.highlights &&
            <div className='home_logged_out_features_sub_right_highlights_container'>
              { feature.highlights.map((highlight, h_index) => {
                return(
                  <p key={ h_index }>
                    { highlight }
                  </p>
                )
              }) }
            </div>
          }
        </div>
      </div>
    )
  }

  return(
    <>
      { makeHomeFeaturesList.map((feature, index) => {
        return(
          <React.Fragment key={ index }>
              <div className='home_logged_out_features_sub_container'>
                { index % 2 === 0 ?
                    <>
                      { imgContainer(feature) }
                      { textContainer(feature) }
                    </>
                  :
                    <>
                      { textContainer(feature) }
                      { imgContainer(feature) }
                    </>
                }
            </div>
          </React.Fragment >
        )
      })}
    </>
  )
}

export default makeHomeLoggedOutFeaturesList