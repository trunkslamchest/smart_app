import React from 'react'

import DefaultButtonsContainer from '../../../buttons/defaultButtonsContainer/defaultButtonsContainer'

import flagIconIndex from '../../../../assets/flag_icons/flagIconIndex'

import './containerProfileHeader.css'

const ContainerProfileHeader = (props) => {

  return(
    <div className='container_profile_header'>
      <div className='container_profile_header_top'>
        <div className='container_profile_header_top_left'>
          { !!props.avatar &&
          <img
              alt={ `${props.user_name}'s Avatar` }
              className='container_profile_header_top_left_img'
              src={ props.avatar }
              title={ `${props.user_name}'s Avatar` }
            />
          }
          <div className='container_profile_header_top_left_text'>
            <div className='container_profile_header_top_left_text_top'>
              <h3>{ props.user_name }</h3>
              { !!props.email && <span>{ props.email }</span> }
              { (!!props.first_name || !!props.last_name) &&
                <div className='container_profile_header_top_left_text_sub_countainer'>
                  { !!props.first_name && <span>{ props.first_name }</span> }
                  { !!props.last_name && <span>{ props.last_name }</span> }
                </div>
              }
            </div>
            <div className='container_profile_header_top_left_text_bottom'>
              { (!!props.gender || !!props.gender_pronouns) &&
                <div className='container_profile_header_top_left_text_sub_countainer'>
                  { !!props.gender && <span>{ props.gender }</span> }
                  { !!props.gender_pronouns && <span>({ props.gender_pronouns })</span> }
                </div>
              }
              { !!props.country &&
                <div className="container_profile_header_top_left_text_sub_countainer">
                  <img
                    alt={ props.country }
                    className='user_profile_info_flag_img'
                    src={ flagIconIndex[props.country].image }
                  />
                  <span>{ props.country }</span>
                </div>
              }
              { !!props.age &&
                <div className='container_profile_header_top_left_text_sub_countainer'>
                  <span>{ props.age } Years Old</span>
                </div>
              }
            </div>
          </div>
        </div>
        <div className='container_profile_header_top_right'>
          { !!props.buttons &&
            <DefaultButtonsContainer
              buttons={ props.buttons }
              containerClass={ props.containerClass }
              enableButton={ true }
            />
          }
          { !!props.date_block && props.date_block }
        </div>
      </div>
      { !!props.bio &&
        <div className='container_profile_header_bottom'>
          <p>{ props.bio }</p>
        </div>
      }
    </div>
  )
}

export default ContainerProfileHeader