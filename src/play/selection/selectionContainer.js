import React from 'react'
import { connect } from 'react-redux'

import gameModes from '../../datasets/gameModes'
import difficulties from '../../datasets/difficulties'
import categories from '../../datasets/categories'

import SelectionButton from './selectionButton/selectionButton'

import './selectionContainer.css'

class SelectionContainer extends React.Component {

  state = {
    set: null,
    subSet: null,
    gameModes: null
  }

  componentDidMount(){
    if(this.props.play.gameMode === 'by_diff') {
      document.title = "SmartApp™ | Play | Difficulty | Select"
      this.setState({ set: 'Difficulty', subSet: difficulties })
    } else if(this.props.play.gameMode === 'by_cat') {
      document.title = "SmartApp™ | Play | Category | Select"
      this.setState({ set: 'Category', subSet: categories })
    } else {
      document.title = "SmartApp™ | Play | Select"
      this.setState({ gameModes: gameModes })
    }
  }

  componentDidUpdate(){
  }

  componentWillUnmount(){
  }

  render(){

    let distribButtons, varHeaderText = ''

    if(this.state.gameModes){
      varHeaderText = 'Game Mode'
      distribButtons = this.state.gameModes.map(gameMode =>
        <SelectionButton
          key={ this.state.gameModes.indexOf(gameMode) }
          name={ gameMode.name }
          gameMode={ gameMode.val }
        />
      )
    }

    if(this.state.subSet){
      varHeaderText = this.state.set
      distribButtons = this.state.subSet.map(qSet =>
        <SelectionButton
          key={ this.state.subSet.indexOf(qSet) }
          qSet={ qSet }
        />
      )
    }

    return(
      <div className='selection_container'>
        <h1> Select A { varHeaderText } </h1>
        <div className="selection_buttons_container">
          { distribButtons }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    play: state.play
  }
}

export default connect(mapStateToProps)(SelectionContainer)