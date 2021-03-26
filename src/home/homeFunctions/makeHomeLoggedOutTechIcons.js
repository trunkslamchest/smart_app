import React from 'react'

import homeTechIcons from '../homeComponents/homeTech/homeTechIcons'

const makeHomeTechIcons = (props) => {

  // const makeHomeTechIcons = homeTechIcons(
  //   cssIMG,
  //   scssIMG,
  //   firebaseIMG,
  //   htmlIMG,
  //   jsIMG,
  //   otdbIMG,
  //   reactIMG,
  //   reduxIMG
  // )

  const makeHomeTechIcons = homeTechIcons()

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
                <img
                  alt={ icon.id }
                  id={ `${icon.id}_image` }
                  name={ `${icon.name}Image` }
                  src={ icon.image }
                />
              </div>
                <div className='home_logged_out_tech_icon_text_container'>
                  <span>
                    { icon.text }
                  </span>
                </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default makeHomeTechIcons