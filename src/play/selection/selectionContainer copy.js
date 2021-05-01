import React from 'react'
import { connect } from 'react-redux'
import { setGameMode, setGameQset } from '../../store/actions/actionIndex'

import gameModes from '../../datasets/gameModes'
import difficulties from '../../datasets/difficulties'
import categories from '../../datasets/categories'

// import ContainerHeaderCentered from '../../UI/components/headers/containerHeaderCentered/containerHeaderCentered'
// import ContainerSubHeaderCentered from '../../UI/components/subHeaders/containerSubHeaderCentered/containerSubHeaderCentered'

// import PlayHeaderCentered from '../playComponents/playHeaderCentered/playHeaderCentered'
// import PlaySubHeaderCentered from '../playComponents/playSubHeaderCentered/playSubHeaderCentered'
import PlayHeaderCentered from '../playComponents/playHeaderCentered/playHeaderCentered'



import DefaultButtonsContainer from '../../UI/buttons/defaultButtonsContainer/defaultButtonsContainer'

import './selectionContainer.css'

class SelectionContainer extends React.Component {

  state = {
    buttonClass: null,
    containerClass: null,
    enableButton: false,
    gameModes: null,
    set: null,
    subSet: null,
    tooltipClass: null
  }

  componentDidMount(){
    if(this.props.play.gameMode === 'by_diff') {
      document.title = "SmartApp™ | Play | Difficulty | Select"
      this.setState({ set: 'Difficulty', subSet: difficulties, buttonClass: 'game_modes_button', containerClass: 'game_modes_buttons_container', tooltipClass: 'diff_button_tooltip', enableButton: true })
    } else if(this.props.play.gameMode === 'by_cat') {
      document.title = "SmartApp™ | Play | Category | Select"
      this.setState({ set: 'Category', subSet: categories, buttonClass: 'game_modes_button', containerClass: 'game_modes_buttons_container', tooltipClass: 'cat_button_tooltip', enableButton: true })
    } else {
      document.title = "SmartApp™ | Play | Select"
      this.setState({ gameModes: gameModes, buttonClass: 'game_modes_button', containerClass: 'game_modes_buttons_container', tooltipClass: 'game_modes_button_tooltip', enableButton: true })
    }
  }

  componentDidUpdate(){ }

  componentWillUnmount(){ }

  onClickGameModeFunction = (event) => {
    let buttonParams = JSON.parse(event.target.attributes.params.value)
    localStorage.gameMode = buttonParams.gameMode
    this.props.onSetGameMode(buttonParams.gameMode)
  }

  onClickQsetFunction = (event) => {
    let buttonParams = JSON.parse(event.target.attributes.params.value)
    this.props.onSetGameQset(buttonParams.qSet)
  }

  render(){

    let selectionButtons
    let varHeaderText = ''

    if(this.state.gameModes){
      varHeaderText = 'Game Mode'
      selectionButtons = this.state.gameModes.map((gameMode, index) => {
        return {
          id: `${gameMode.val}_button`,
          key: index,
          name: gameMode.name,
          onClickFunction: this.onClickGameModeFunction,
          params: JSON.stringify({ gameMode: gameMode.val }),
          type: 'button',
          text: gameMode.name,
          tooltipText: gameMode.description
        }
      })
    }

    if(this.state.subSet){
      varHeaderText = this.state.set
      selectionButtons = this.state.subSet.map((qSet, index) => {
        return {
          id: `${qSet.val}_button`,
          key: index,
          name: qSet.name,
          onClickFunction: this.onClickQsetFunction,
          params: JSON.stringify({ qSet: qSet.name }),
          type: 'button',
          text: qSet.name,
          tooltipText: qSet.description
        }
      })
    }

    return(
      <div className='selection_wrapper'>
        {/* <ContainerHeaderCentered header_text={ `Select A ${varHeaderText}` } /> */}
        {/* <ContainerSubHeaderCentered header_text={ `Select A ${varHeaderText}` } /> */}
        {/* <PlaySubHeaderCentered header_text={ `Select A ${varHeaderText}` } /> */}
        <PlayHeaderCentered header_text={ `Select A ${varHeaderText}` } />

        <DefaultButtonsContainer
          buttons={ selectionButtons }
          buttonClass={ this.state.buttonClass }
          buttonContainerClass={ 'game_modes_button_container' }
          containerClass={ this.state.containerClass }
          enableButton={ this.state.enableButton }
          tooltipClass={ this.state.tooltipClass }
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    play: state.play
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSetGameMode: (mode) => dispatch(setGameMode(mode)),
    onSetGameQset: (set) => dispatch(setGameQset(set))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectionContainer)