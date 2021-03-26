import React from 'react'

import MakeHomeLoggedOutFeaturesList from '../../homeFunctions/makeHomeLoggedOutFeaturesList'

import './homeFeatures.css'

const HomeFeatures = (props) => {
  return(
    <div className='home_logged_out_features_container'>
      <MakeHomeLoggedOutFeaturesList />
    </div>
  )
}

export default HomeFeatures