import React from 'react'

import './userProfileInfoContainer.css'

const UserProfileInfoContainer = (props) => {

  let bio = props.bio !== 'null' && props.bio

  return(
    <>
      { bio &&
        <div className="user_profile_info_container">
          <div className="user_profile_info_sub_container">
            <span>{ bio }</span>
          </div>
        </div>
      }
    </>
  )
}


export default UserProfileInfoContainer