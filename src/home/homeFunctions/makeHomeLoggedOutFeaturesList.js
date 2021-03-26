import React from 'react'

import homeFeaturesList from '../homeComponents/homeFeatures/homeFeaturesList'

const makeHomeLoggedOutFeaturesList = (props) => {

  // const makeHomeFeaturesList = homeFeaturesList(
  //   usersIMG,
  //   questionsIMG,
  //   statsIMG,
  //   achievementsIMG,
  //   xpIMG,
  //   rankRatingIMG,
  //   leaderboardsIMG
  // )

  const makeHomeFeaturesList = homeFeaturesList()

  return(
    <>
      {
        makeHomeFeaturesList.map((feature, index) => {
          return(
            <div
              className='home_logged_out_features_sub_container'
              key={ index }
            >
              <div className='home_logged_out_features_sub_left_container'>
                <div className='home_logged_out_features_sub_left_img_container'>
                  <img
                    alt={ feature.id }
                    id={ `${feature.id}_image` }
                    name={ `${feature.name}Image` }
                    src={ feature.image }
                  />
                </div>
              </div>
              <div className='home_logged_out_features_sub_right_container'>
                <div className='home_logged_out_features_sub_right_headline_container'>
                  <h2>{ feature.headline }</h2>
                </div>
                <div className='home_logged_out_features_sub_right_text_container'>
                  <span>{ feature.desc }</span>
                </div>
                <div className='home_logged_out_features_sub_right_highlights_container'>
                  { feature.highlights.map((highlight, h_index) => {
                    return(
                      <p key={ h_index }>
                        { highlight }
                      </p>
                    )
                  }) }
                </div>
              </div>
            </div>
          )
        })
      }
    </>
  )
}

export default makeHomeLoggedOutFeaturesList