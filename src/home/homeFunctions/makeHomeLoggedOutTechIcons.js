import React from 'react'

import homeTechIcons from '../homeComponents/homeTech/homeTechIcons'
import homeIconsIndex from '../../assets/home_icons/homeIconsIndex'

const makeHomeTechIcons = (props) => {

  const makeHomeTechIcons = homeTechIcons(homeIconsIndex)

  return(
    <div className='home_logged_out_tech_sub_container'>
      {
        makeHomeTechIcons.map((icon, index) => {
          return(
            <div
              className='home_logged_out_tech_icon_container'
              key={ index }
            >
              <div className='home_logged_out_tech_icon_img_container'>
                <a
                  href={ icon.route }
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  <img
                    alt={ icon.id }
                    id={ `${icon.id}_image` }
                    name={ `${icon.name}Image` }
                    src={ icon.image }
                  />
                </a>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default makeHomeTechIcons