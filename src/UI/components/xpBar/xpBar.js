import React from 'react'
import { useEffect, useState } from 'react'

import './xpBar.css'

const XPBar = (props) => {

  const [xpBarWidth, setXPBarWidth] = useState(0)

  const { userXP, userLevel, prevLevelXP } = props

  const startAnimation = (callback) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        callback();
      });
    });
  }

  useEffect(() => {
    startAnimation(() => {
      setXPBarWidth(() => {
        if(userLevel === 1) return userXP
        else return userXP - prevLevelXP
      })
    });
  }, [userXP, prevLevelXP, userLevel])

  return(
    <div className='xp_bar_container'>
    <div className='xp_bar_background'>

        <div
          className='xp_bar'
          style={{
            width: `${xpBarWidth}%`,
            transition: 'width 2s ease-in-out 0s'
          }}
        />
      </div>
    </div>
  )
}

export default XPBar