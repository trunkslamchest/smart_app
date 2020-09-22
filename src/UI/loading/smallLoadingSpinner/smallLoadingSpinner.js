import React from 'react'

import './smallLoadingSpinner.css'

const SmallLoadingSpinner = () => {
  return (
    <div className="spinner_container">
      <div className="spinner_animation_container">
        <div className="roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      </div>
    </div>
  )
}

export default SmallLoadingSpinner