import React from 'react'

import LeaderBoardsCountriesCard from '../leaderBoardsCountriesCard/leaderBoardsCountriesCard'

import './leaderBoardsCountriesContainer.css'

class LeaderBoardsCountriesContainer extends React.Component {
  render() {

  const countries = Object.entries(this.props.scores)

  const distribCountries = countries.map(country => {
    return(
      <div
        className='leader_boards_countries_sub_container'
        key={ countries.indexOf(country) }
      >
        <LeaderBoardsCountriesCard
          history={ this.props.history }
          countryName={ country[0] }
          sub_text={ 'Rating' }
          scores={ country[1] }
          key={ countries.indexOf(country) + country[0] }
        />

      </div>
    )
  })

    return (
      <div className='leader_boards_countries_container'>
        { distribCountries }
      </div>
    )
  }
}

export default LeaderBoardsCountriesContainer