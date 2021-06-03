import React from 'react'

import './leaderBoardsScoresRowTop3Card.css'

const LeaderBoardsScoresRowTop3Card = (props) => {

  const componentClasses = {
    top3cardWrapper: props.blankTop3Card ? 'leader_boards_top3_card_wrapper_blank' : 'leader_boards_top3_card_wrapper',
    top3cardImgAvatarContainer: 'leader_boards_top3_card_img_avatar_container',
    top3cardImgAvatar: 'leader_boards_top3_card_img_avatar',
    top3cardTextWrapper: 'leader_boards_top3_card_text_wrapper',
    top3cardImgFlag: 'leader_boards_top3_card_img_flag',
    top3cardCountryWrapper: 'leader_boards_top3_card_country_wrapper',
    top3CardBottomWrapper: 'leader_boards_top3_card_bottom_wrapper'
  }

  const formatCardNumber = (cardNumber) => {
    if(cardNumber === 1) return '1st'
    if(cardNumber === 2) return '2nd'
    if(cardNumber === 3) return '3rd'
  }

  const countryText = props.country === 'null' ? 'No Country': props.country

  return(
    <div className={ componentClasses.top3cardWrapper }>
      <h1>{ formatCardNumber(props.cardNumber) }</h1>
        <div className={ componentClasses.top3CardBottomWrapper }>
          <div className={ componentClasses.top3cardImgAvatarContainer }>
            { props.avatar &&
              <img
                alt={ `${props.userName}'s Avatar` }
                src={ props.avatar }
                title={ `${props.userName}'s Avatar`}
              />
            }
          </div>
          <div className={ componentClasses.top3cardTextWrapper }>
            { props.userName && <h2>{ props.userName }</h2> }
            { props.countryFlag &&
              <div className={ componentClasses.top3cardCountryWrapper }>
                <img
                  alt={ countryText }
                  className={ componentClasses.top3cardImgFlag }
                  src={ props.countryFlag.image }
                  title={ countryText }
                />
                <h4>{ countryText }</h4>
              </div>
              }
            { props.rating &&<h3 className={ componentClasses.top3cardSpan }>{ (props.rating * 10).toFixed(2) }</h3> }
        </div>
      </div>
    </div>
  )
}

export default LeaderBoardsScoresRowTop3Card